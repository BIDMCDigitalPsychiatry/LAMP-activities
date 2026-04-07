# LAMP-activities

Each directory (except `./dist/`) is a different Activity that can be embedded in the LAMP Platform.

## Architecture Overview

Activities are standalone React apps that run inside an iframe in the LAMP dashboard. Communication between the dashboard and activities happens entirely via `postMessage`. Activities never talk to the LAMP server directly — the dashboard handles all API calls.

```
Dashboard (LAMP-dashboard)
  └─ iframe (activity HTML)
       ├─ receives config via postMessage
       ├─ renders game/survey/task
       └─ sends results back via postMessage
              └─ Dashboard saves via LAMP.ActivityEvent.create()
```

## Developing an Activity

### Standard setup

Activities use Create React App with React 18 and react-scripts 5:

```bash
cd <ActivityName>
npm install --legacy-peer-deps
npm start          # starts on localhost:3000
```

### Entry point pattern

Every activity's `index.tsx` follows the same pattern — listen for a postMessage from the dashboard, then render:

```typescript
import { createRoot } from "react-dom/client";

let root = null;
window.addEventListener("message", (e) => {
  if (!root) {
    root = createRoot(document.getElementById("root"));
  }
  root.render(<MyActivity data={e.data} />);
}, false);
```

### Configuration received from dashboard

The dashboard sends a config object via postMessage when the iframe loads:

```typescript
{
  configuration: {
    language: "en-US"    // user's language setting
  },
  noBack: boolean,       // if true, hide the back button
  forward: boolean,      // if true, show a forward nav button
  activity: {            // the ActivitySpec from the server
    id: string,
    spec: string,
    settings: object     // activity-specific settings
  }
}
```

### Sending results back

When the activity completes, send results to the dashboard via `parent.postMessage()`:

```typescript
parent.postMessage(JSON.stringify({
  timestamp: Date.now(),
  duration: elapsedMs,
  static_data: {
    // summary scores — stored as an opaque JSON blob on the server
    // add whatever fields are meaningful for the activity
  },
  temporal_slices: [
    // per-event log entries (taps, responses, etc.)
    { item: "...", duration: 123, type: true, value: null, level: 1 }
  ],
  // navigation signals:
  done: true,            // normal completion
  clickBack: true,       // user clicked back arrow
  forward: true          // user clicked forward arrow
}), "*");
```

**Important:** `static_data` is stored as-is on the server. The dashboard does not inspect or filter its fields, so any data you include will be persisted. The only field extracted separately is `is_favorite`.

## Build & Deployment

### Build pipeline

1. Each activity builds independently: `npm run build` produces an optimized bundle in `build/`
2. `compress_activity.sh` inlines all assets into a single HTML file, then base64-encodes it
3. Output goes to `dist/in/` (raw HTML) and `dist/out/` (base64)

### CI/CD

- Push to `master` triggers GitHub Actions (`build.yml`) which runs `build.sh` and deploys to the `dist` branch via GitHub Pages
- Releases are tagged and pushed to the `latest` branch

### How the dashboard loads activities

The dashboard maps activity spec names (e.g., `lamp.spatial_span`) to activity filenames (e.g., `boxgame`). At runtime it:

1. Checks the ActivitySpec for a `data:` URL (inline base64) or `https:` URL
2. Falls back to `https://raw.githubusercontent.com/BIDMCDigitalPsychiatry/LAMP-activities/latest/out/<name>.html.b64`
3. Decodes the base64 HTML and renders it in an iframe via `srcDoc`

## Test Harness

A generic test harness is provided at `test-harness.html` in this directory. It simulates the dashboard iframe environment, sends postMessage configs to the activity, and displays results in a data panel with four tabs:

- **Scores** — auto-renders all `static_data` fields as labeled score cards
- **Temporal Slices** — table view with auto-detected columns
- **Raw JSON** — syntax-highlighted full payload
- **Log** — message log for debugging

### Quick start

1. Start the activity dev server: `cd <ActivityName> && npm install --legacy-peer-deps && npm start`
2. Open `test-harness.html` in your browser (either the generic one or the activity-specific one)
3. The harness auto-sends config when the iframe loads. Play through the activity and results appear in the data panel.

### Using the generic harness

Open `test-harness.html` directly — it points at `localhost:3000` by default. Use the port selector to switch between activities running on different ports. Works for any activity without configuration.

### Creating an activity-specific harness

For activities that need custom score groupings (e.g., separating standard vs legacy scores, rendering subscales), create a `test-harness.html` inside the activity folder. The pattern:

1. Copy the generic `test-harness.html` into your activity directory
2. Add a `<script>` block **before** the base harness script that defines `window.HARNESS_CONFIG`:

```html
<script>
  window.HARNESS_CONFIG = {
    title: 'MyActivity Test Harness',

    // Optional: extra fields merged into the postMessage config
    extraConfig: { someFlag: true },

    // Optional: custom score renderer
    // Receives (staticData, fullData), returns an HTML string.
    // Uses scoreCard(label, value, highlight, fullWidth) and sectionTitle(text) helpers.
    renderScores: function(s, data) {
      var html = '';
      html += sectionTitle('Primary Scores');
      html += '<div class="score-grid">';
      html += scoreCard('Accuracy', s.accuracy, true);
      html += scoreCard('RT Mean', s.rt_mean + 'ms', true);
      html += '</div>';
      return html;
    }
  };
</script>
```

See `DigitSpan/test-harness.html` for a complete example.
