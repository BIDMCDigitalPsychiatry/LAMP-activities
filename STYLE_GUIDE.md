# LAMP Activities Style Guide

This document defines the standard UI/UX patterns, component library, and design conventions for LAMP cognitive activities. All new and refactored activities should follow these patterns for a consistent participant experience.

## Architecture

### Entry Point (`index.tsx`)

Use `createRoot` from React 18. The activity initializes when it receives a `postMessage` from the dashboard iframe host.

```tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import Board from "./components/Board";

let root: ReturnType<typeof createRoot> | null = null;

window.addEventListener("message", (e: any) => {
  if (!root) {
    const el = document.getElementById("root");
    if (el) root = createRoot(el);
  }
  if (root) root.render(<Board data={e.data} />);
}, false);
```

### Phase State Machine

Each activity's `Board.tsx` orchestrator manages game flow through a typed phase enum:

```tsx
type Phase = "instructions" | "playing" | /* activity-specific phases */ | "gameOver" | "questionnaire" | "done";
const [phase, setPhase] = useState<Phase>("instructions");
```

Phases always start with `instructions` and end with `questionnaire` → `done`. Activity-specific phases go in between.

### Dependencies

| Package | Purpose |
|---------|---------|
| `bootstrap` + `react-bootstrap` | Modals, layout |
| `@fortawesome/react-fontawesome` | Header icons |
| `i18next` + `react-i18next` | Internationalization |
| `react-scripts` 5 | Build toolchain |

**Do not use**: MUI (`@material-ui/*`), `react-hot-loader`, direct `webpack` dependency.

---

## Header

A fixed 52px blue bar with white icons. Always present during gameplay.

```tsx
<div className="heading">
  <nav className="back-link" onClick={onBack}>
    <FontAwesomeIcon icon={faArrowLeft} />
  </nav>
  Activity Title
  {showForward && (
    <nav className="home-link-forward" onClick={onForward}>
      <FontAwesomeIcon icon={faArrowRight} />
    </nav>
  )}
  <nav className="home-link" onClick={onRefresh}>
    <FontAwesomeIcon icon={faRedo} />
  </nav>
</div>
```

### CSS

```css
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  background: rgba(53, 159, 254, 1);
  position: relative;
}
.back-link {
  position: absolute; left: 0; top: 0;
  height: 52px; display: flex; align-items: center;
  padding: 0 16px; color: white; cursor: pointer; z-index: 10;
}
.home-link {
  position: absolute; right: 0; top: 0;
  height: 52px; display: flex; align-items: center;
  padding: 0 16px; color: white; cursor: pointer; z-index: 10;
}
.home-link-forward {
  position: absolute; right: 48px; top: 0;
  height: 52px; display: flex; align-items: center;
  padding: 0 16px; color: white; cursor: pointer; z-index: 10;
}
```

### Navigation Callbacks

- **Back arrow**: calls `sendResult(isNav: true, isBack: true)` — emits current data and signals exit
- **Forward arrow**: calls `sendResult(isNav: true, isBack: false)` — only shown when `props.data.forward === true`
- **Refresh icon**: calls `window.location.reload()`

---

## Instruction Modal

Shown at activity start (`phase === "instructions"`). Uses `react-bootstrap` Modal with the D-Cog blue header. Instructions should be **1–3 concise sentences** that tell the participant what they will see and what they should do.

### Component Interface

```tsx
interface Props {
  show: boolean;
  modalClose(status: boolean): void;  // called when user clicks "Start"
  msg: string;                         // the instruction text (from i18n)
  language: string;
}
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.instruction-modal-header` | Blue background (`rgba(53, 159, 254, 1)`), white text, no border |
| `.instruction-modal-title` | Centered, 22px, font-weight 600 |
| `.instruction-modal-body` | 18px, line-height 1.6, centered text, `#333` color |
| `.instruction-modal-footer` | No border, centered content |
| `.instruction-modal-btn` | Blue button, 18px, rounded 8px, min-width 140px |

### Writing Instructions

- Lead with what the participant will see: *"You will see two wheels and four numbered buttons."*
- Explain the core action: *"Press a button to spin both wheels."*
- State the goal: *"Try to finish with as much money as possible."*
- Do **not** explain scoring mechanics, risk levels, or implementation details
- Keep to 1–3 sentences for mobile readability

---

## Questionnaire Modal

Shown after game over (`phase === "questionnaire"`). Captures two self-report ratings on 5-point emoji scales. Uses static backdrop (participant must submit, cannot dismiss).

### Standard Questions

1. **"How clear were the instructions?"** → `clarity` (1–5)
2. **"How happy would you be to do this again?"** → `happiness` (1–5)

### Emoji Rating Scale

Uses 5 SVG face components (`1Star.tsx` through `5Star.tsx`) rendered as circular buttons. Active state uses the D-Cog blue highlight.

```css
.smileynav .btn {
  width: 71px; height: 71px; border-radius: 50%;
  padding: 3px; background-color: #333; border: 0;
}
.smileynav .btn.active {
  background-color: rgba(53, 159, 254, 1);
  border: 2px solid rgba(53, 159, 254, 1);
}
```

On mobile (≤500px), emoji buttons shrink to 41x41px.

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.questionnaire-modal-header` | Same blue as instruction modal |
| `.questionnaire-modal-title` | Centered, 22px |
| `.questionnaire-modal-body` | Padding 24px 20px |
| `.questionnaire-question` | Centered, 24px bottom margin |
| `.questionnaire-label` | 17px, font-weight 600, `#333` |
| `.questionnaire-faces` | Flex row, centered, wrapping, 10px gap |
| `.questionnaire-modal-btn` | Same blue button style as instruction modal |

### Data Shape

```json
{ "clarity": 4, "happiness": 3 }
```

Included in `static_data.questionnaire` only when the game ends normally (not via navigation).

---

## Color Palette

### Brand / Chrome

| Use | Color | Hex |
|-----|-------|-----|
| Header background | LAMP Blue | `#359FFE` |
| Header text | White | `#FFFFFF` |
| Button hover/active | LAMP Blue | `#359FFE` |
| Page background | Light grey | `#F8F9FB` |
| Body text | Dark | `#333333` |
| Secondary text | Muted | `#999999` |
| Card background | White | `#FFFFFF` |

### Semantic Feedback

| Use | Color | Hex |
|-----|-------|-----|
| Positive / correct / win | Green | `#27AE60` |
| Negative / incorrect / loss | Red | `#E74C3C` |
| Neutral / zero | Slate grey | `#B0B8C4` |

### Magnitude-Scaled Palettes

When values vary in magnitude, use intensity to communicate scale. Zero is always neutral grey.

**Win (green) scale:**

| Value | Color | Hex |
|-------|-------|-----|
| $0 | Neutral grey | `#B0B8C4` |
| Low | Light green | `#81C995` |
| Medium | Medium green | `#4CAF50` |
| High | Deep green | `#2E7D32` |

**Loss (red) scale:**

| Value | Color | Hex |
|-------|-------|-----|
| $0 | Neutral grey | `#B0B8C4` |
| Low | Light red | `#EF9A9A` |
| Medium | Medium red | `#EF5350` |
| High | Deep red | `#C62828` |

---

## Typography

Use the system font stack throughout:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

Do not import custom web fonts.

---

## Layout

### Vertical Centering

Activities should be vertically centered on any screen size. Use a flex shell:

```css
.game-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 12px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

### Responsive Breakpoint

Use `500px` as the standard mobile breakpoint. Adapt layouts for narrow screens — for example, replacing circular canvases with vertical drum reels, or shrinking button sizes.

```css
@media (max-width: 500px) {
  /* mobile overrides */
}
```

---

## Internationalization (i18n)

### Setup

Use `i18next` with `react-i18next`. Define all translations inline in `src/i18n.js` (no external JSON files).

### Required Languages

All activities must provide translations for these locales:

| Code | Language |
|------|----------|
| `da-DK` | Danish |
| `de-DE` | German |
| `en-US` | English (default) |
| `es-ES` | Spanish |
| `fr-FR` | French |
| `hi-IN` | Hindi |
| `it-IT` | Italian |
| `ko-KR` | Korean |
| `zh-CN` | Chinese (Simplified) |
| `zh-HK` | Chinese (Traditional) |

### Required Keys

Every activity must define at minimum:

```
GAME, INSTRUCTIONS, GAME_OVER,
Instructions, Start, Questionnaire, Submit,
"How clear were the instructions?",
"How happy would you be to do this again?",
"Time's up!"
```

### Standard Timeout Message

Activities that end on a timer must use **"Time's up!"** as the timeout message (i18n key: `"Time's up!"`). Do not use "TIME OUT", "TIMEOUT", or excessive punctuation. The message should appear as a brief overlay (1–2 seconds) before transitioning to the questionnaire.

---

## postMessage Output Protocol

### Trigger

Results are sent via `parent.postMessage(JSON.stringify(payload), "*")`.

### When Results Are Sent

- **Normal completion**: after questionnaire submission (`done: true`)
- **Back navigation**: when back arrow is clicked (`clickBack: true`)
- **Forward navigation**: when forward arrow is clicked (`forward: true/false`)

### Payload Structure

```json
{
  "duration": 45000,
  "static_data": {
    // Activity-specific standard scores
    // Legacy compatibility fields (correct_answers, total_questions, wrong_answers, score, point)
    // "questionnaire": { "clarity": 4, "happiness": 3 }
  },
  "temporal_slices": [
    // Per-event entries with item, duration, level, type, value
    // Final entry: { "type": "manual_exit", "value": false }
  ],
  "timestamp": 1711929600000,
  "forward": true,
  "done": true,
  "clickBack": false
}
```

### Legacy Fields

All activities must include these fields in `static_data` for dashboard compatibility:

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | number | Activity-appropriate count |
| `total_questions` | number | Total items/trials |
| `wrong_answers` | number | Error count |
| `score` | number | 0–100 percentage |
| `point` | number | `2` if high performance, `1` otherwise |

---

## Test Harness

Each activity should include a `test-harness.html` that uses the `HARNESS_CONFIG` pattern. Define `window.HARNESS_CONFIG` with a custom `renderScores` function before loading the base harness script.

```js
window.HARNESS_CONFIG = {
  renderScores: function(data) {
    // Return HTML string that presents activity-specific scores
    // in a readable format for developer testing
  }
};
```

The harness sends configuration via `postMessage` to the activity iframe and displays structured results when the activity responds.

---

## Data Dictionary

Each activity must include a `DATA_DICTIONARY.md` file documenting:

1. **Top-level fields** — duration, static_data, temporal_slices, timestamp, navigation flags
2. **static_data standard scores** — the recommended fields for analysis, with types and descriptions
3. **static_data legacy fields** — backward-compatible fields with clear warnings about limitations
4. **temporal_slices event format** — per-event schema with field descriptions
5. **Game logic summary** — phase progression, scoring rules, timeout behavior
6. **Scoring guidance** — which fields analysts should and should not use

---

## File Structure Convention

```
ActivityName/
  package.json
  test-harness.html
  DATA_DICTIONARY.md
  src/
    index.tsx            -- createRoot entry point
    index.css            -- body reset (background: #f8f9fb)
    i18n.js              -- inline translations
    react-app-env.d.ts   -- module declarations
    components/
      Board.tsx           -- main orchestrator with phase state machine
      Header.tsx          -- 52px blue header
      InstructionModal.tsx
      Questionnaire.tsx
      1Star.tsx … 5Star.tsx  -- emoji face SVGs
      [ActivityName].css  -- all activity styles in one file
      [other components]  -- activity-specific UI components
```

### Naming Conventions

- Components: PascalCase (`WheelCanvas.tsx`, `DrumReel.tsx`)
- CSS file: PascalCase matching activity name (`SpinWheel.css`, `DigitSpan.css`)
- One CSS file per activity — no CSS modules, no CSS-in-JS
- No `containers/` directory — `Board.tsx` is the single orchestrator
