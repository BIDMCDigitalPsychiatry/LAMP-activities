# ScratchImage (Scratch Card) — Data Dictionary

## Activity Background

ScratchImage is a **motor engagement and relaxation activity** in which the participant scratches away a grey cover layer on a virtual scratch card to reveal a hidden illustrated scene. Unlike structured cognitive assessments, it is designed as a low-demand filler task, warm-up exercise, or engagement activity between more demanding tests.

### Psychological and Cognitive Constructs

ScratchImage is not a standardized neuropsychological test, but the data it produces maps onto several measurable constructs:

| Construct | How Measured | Relevance |
|-----------|-------------|-----------|
| **Fine motor control** | Scratch path smoothness, accuracy of pointer tracking | Degraded in tremor disorders, neuropathy, motor decline with aging |
| **Motor persistence / task completion** | `final_pct`, `threshold_reached`, time to reach threshold | Reduced in apathy, depression, executive dysfunction |
| **Processing speed (motor)** | `time_ms` per card, total scratch time | Gross motor speed; sensitive to psychomotor slowing in depression, medication effects |
| **Completionism / perfectionism** | Gap between `threshold` and `final_pct` | Participants who far exceed the minimum threshold may exhibit perfectionistic tendencies; those who stop at threshold may be more goal-efficient or disengaged |
| **Visual salience and attentional bias** | `scratch_path` trajectory relative to `elements` bounding boxes | Whether participants preferentially uncover faces, figures, or other socially salient visual elements vs. random coverage patterns |
| **Engagement / hedonic response** | Questionnaire ratings, time voluntarily spent beyond threshold | Low engagement may correlate with anhedonia |

### Related Tests and Paradigms

- **Purdue Pegboard Test** — Measures fine motor dexterity and speed; ScratchImage captures analogous touch/drag motor data in a more engaging format
- **Trail Making Test (Part A)** — Measures visuomotor speed; the scratch path trajectory provides a comparable continuous motor trace
- **Behavioral Activation tasks** — ScratchImage's low-demand, mildly rewarding nature (revealing a hidden picture) parallels behavioral activation interventions for depression
- **Visual search / salience paradigms** — The element-level scratch analysis is analogous to eye-tracking visual salience research, but using motor behavior (where people scratch) rather than gaze fixation
- **Dot-to-dot / coloring tasks** — Used in occupational therapy to assess fine motor coordination; ScratchImage is a digital equivalent with richer temporal data

### Research Applications

The scratch path data enables several novel analyses not possible with traditional motor assessments:

1. **Directed vs. random scratching** — Compare the proportion of path points falling within element bounding boxes against chance (element area / total area). A ratio significantly above chance suggests directed, visually-guided scratching.

2. **Element discovery order** — Which visual elements does the user uncover first? Preferential early uncovering of faces/figures may reflect social attention biases; systematic edge-to-center patterns may reflect task strategy.

3. **Completionism signal** — `final_pct` minus `threshold` captures voluntary effort beyond the minimum. This gap correlates with perfectionistic traits and may serve as a behavioral marker for obsessive-compulsive tendencies or, conversely, disengagement when the gap is zero.

4. **Motor trajectory analysis** — Path smoothness (curvature variance), velocity consistency, and pause patterns can index motor control quality and may be sensitive to medication effects or disease progression.

5. **Cross-card consistency** — Comparing scratch patterns across multiple cards reveals whether motor strategy is stable (suggesting habitual behavior) or variable (suggesting exploration or adaptation).

---

## Payload Structure

```json
{
  "duration": 45000,
  "timestamp": 1712084400000,
  "static_data": { ... },
  "temporal_slices": [ ... ],
  "done": true
}
```

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | Total task duration in ms (from instruction close to final submit) |
| `timestamp` | integer | Unix epoch ms when the task started |
| `done` | boolean | `true` when the task completed normally (questionnaire submitted) |
| `forward` | boolean | *(optional)* Present only when forward navigation is used to exit |
| `clickBack` | boolean | *(optional)* Present only when the user tapped the back arrow to exit early |

## static_data — Summary Metrics

### Performance Metrics

| Field | Type | Description |
|-------|------|-------------|
| `num_cards` | integer | Number of scratch cards configured for this session (1–5) |
| `cards_completed` | integer | Number of cards where the user reached the scratch threshold |
| `cards_attempted` | integer | Number of cards the user started scratching (may be less than `num_cards` if they exited early) |
| `total_scratch_time_ms` | integer | Sum of `time_ms` across all attempted cards |
| `avg_scratch_time_ms` | integer | `total_scratch_time_ms / cards_attempted`, rounded |
| `threshold` | integer | Percentage of canvas required to trigger the completion prompt (0–100) |

### Card Results

| Field | Type | Description |
|-------|------|-------------|
| `card_results` | object[] | One entry per card attempted, in order presented |

Each entry in `card_results`:

| Field | Type | Description |
|-------|------|-------------|
| `card` | integer | Card number (1-indexed) |
| `background_name` | string | Identifier for the SVG scene shown (e.g., `"tree_reader"`, `"lake_boat"`, `"stargazer"`, `"garden"`, `"sleepy_cat"`) |
| `time_ms` | integer | Time spent scratching this card in ms (from card start to user tapping Next/Finish) |
| `final_pct` | integer | Percentage of the canvas actually scratched (0–100). May exceed `threshold` if the user continued scratching after the prompt appeared |
| `threshold_reached` | boolean | `true` if `final_pct >= threshold` |
| `elements` | object[] | Visual element bounding boxes for this scene (see Element Regions below) |
| `scratch_path` | object[] | Sampled pointer trajectory (see Scratch Path below) |

### Element Regions

Each scene contains annotated visual elements with normalized bounding boxes. These enable spatial analysis of scratch patterns relative to scene content.

```json
{ "name": "person", "x": 0.38, "y": 0.74, "w": 0.12, "h": 0.17 }
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Human-readable label (e.g., `"sun"`, `"person"`, `"tree"`, `"cat"`, `"house"`) |
| `x` | float | Left edge of bounding box, normalized 0–1 (0 = left edge of canvas) |
| `y` | float | Top edge of bounding box, normalized 0–1 (0 = top edge of canvas) |
| `w` | float | Width of bounding box, normalized 0–1 |
| `h` | float | Height of bounding box, normalized 0–1 |

All coordinates are relative to the canvas dimensions. To convert to pixel coordinates, multiply by the canvas width/height.

**Scenes and their elements:**

| Scene | Elements |
|-------|----------|
| `tree_reader` | sun, tree, person, book, hill |
| `lake_boat` | sun, mountains, boat, person, sail, lake |
| `stargazer` | moon, stars, person, blanket, hill |
| `garden` | sun, house, flower_red, flower_purple, sunflower, flower_pink, butterfly_1, butterfly_2, meadow |
| `sleepy_cat` | window, cat, cat_face, tail, windowsill, phone, rain |

### Scratch Path

The scratch path is a sampled sequence of pointer positions recorded during scratching. Combined with element regions, it enables analysis of whether users directed their scratching toward specific visual elements or scratched randomly.

```json
{ "x": 0.452, "y": 0.318, "t": 1240 }
```

| Field | Type | Description |
|-------|------|-------------|
| `x` | float | Pointer x-position, normalized 0–1 (0 = left edge of canvas). Rounded to 3 decimal places |
| `y` | float | Pointer y-position, normalized 0–1 (0 = top edge of canvas). Rounded to 3 decimal places |
| `t` | integer | Milliseconds since this card started |

**Sampling interval:** Configurable via `scratch_path_interval_ms` setting (33–200ms, default 50ms / ~20 samples per second). At default settings, a typical 15-second card produces ~300 points (~9 KB of path data).

**Gaps in the path:** When the pointer leaves the canvas and re-enters, there will be a time gap between consecutive points. This occurs naturally when the user lifts their finger or drags off-edge. Path points are only recorded while the pointer is actively drawing on the canvas.

### Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object | Post-task subjective ratings (present only on normal completion) |
| `questionnaire.clarity` | integer | 1–5 rating: "How clear were the instructions?" |
| `questionnaire.happiness` | integer | 1–5 rating: "How happy would you be to do this again?" |

### Legacy Fields

These fields exist for backward compatibility with the LAMP dashboard. Use the performance metrics above for analysis.

| Field | Type | Mapping |
|-------|------|---------|
| `correct_answers` | integer | Number of cards where threshold was reached (= `cards_completed`) |
| `total_questions` | integer | Number of cards configured (= `num_cards`) |
| `wrong_answers` | integer | Cards not completed (= `num_cards - cards_completed`) |
| `score` | integer | `round(cards_completed / num_cards * 100)` |
| `point` | integer | 2 if any cards completed, else 0 |

## temporal_slices — Event Log

One entry per card attempted, ordered chronologically.

### Card Entry

```json
{
  "duration": 15000,
  "item": 1,
  "level": 1,
  "type": true,
  "value": 92,
  "background_name": "tree_reader"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | Time spent on this card in ms |
| `item` | integer | Card number (1-indexed) |
| `level` | integer | Always `1` (no difficulty progression in this activity) |
| `type` | boolean | `true` if the scratch threshold was reached, `false` otherwise |
| `value` | integer | Final scratch coverage percentage (0–100) |
| `background_name` | string | Scene identifier for this card |

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `threshold` | integer | `80` | 0–100 | Percentage of canvas that must be scratched before the completion prompt appears. The user can continue scratching past this point |
| `num_cards` | integer | `3` | 1–5 | Number of scratch cards to present. Each card shows a unique scene (no repeats within a session) |
| `scratch_path_interval_ms` | integer | `50` | 33–200 | Sampling interval for scratch path recording. Lower values = more points and higher spatial resolution. 33ms ≈ 30hz, 50ms ≈ 20hz, 200ms ≈ 5hz |

## Game Flow

1. Instruction modal explains the task
2. First scratch card appears with a grey cover layer and "Scratch here!" hint text
3. User scratches by dragging finger/mouse — cover erases to reveal the hidden scene beneath
4. Progress bar shows percentage scratched; card counter shows position in sequence
5. When coverage reaches `threshold`%, a "Next Card" (or "Finish") button appears — but scratching can continue
6. User taps the button to advance; card result (including final coverage and scratch path) is recorded
7. Steps 2–6 repeat for each remaining card with a new scene
8. After the final card, a questionnaire collects clarity and happiness ratings
9. Results are sent via `postMessage` to the parent frame

## Special Considerations

### Two-Layer Canvas Architecture

The scratch mechanic uses a two-layer DOM structure: an `<img>` element renders the SVG scene (always visible, behind the canvas), while a `<canvas>` element on top holds only the grey cover layer. Scratching uses `destination-out` compositing to erase the cover, revealing the image underneath. This architecture is important because `destination-out` erases *all* content on a canvas — a single-canvas approach would erase both the background image and the cover, leaving transparent pixels instead of revealing the scene.

### Completionism as Behavioral Data

The threshold prompt does not end the card — it merely offers the option to advance. Users who continue scratching past the threshold produce a `final_pct` significantly higher than `threshold`, which serves as a completionism signal. This is by design: the gap between threshold and final coverage is a behavioral measure, not a bug. When analyzing this data, consider both `threshold_reached` (binary: did they meet the minimum?) and `final_pct - threshold` (continuous: how much voluntary effort beyond the minimum?).

### Scratch Path and Element Positions Share a Coordinate System

Both `scratch_path` points and `elements` bounding boxes use the same normalized 0–1 coordinate system, with (0, 0) at the top-left corner of the canvas. This means spatial overlap analysis requires no coordinate transformation — a path point `(px, py)` falls within an element if `px >= e.x && px <= e.x + e.w && py >= e.y && py <= e.y + e.h`.

### Path Data Storage Sizing

At the default 50ms sampling interval with 3 cards averaging 15 seconds of active scratching each, expect ~900 total path points per session (~27 KB of JSON). At maximum frequency (33ms) with 5 cards, worst case is ~2300 points (~70 KB). At minimum frequency (200ms) with 1 card, expect ~75 points (~2 KB). For large studies (1000+ participants), the `scratch_path_interval_ms` setting can be increased to reduce storage without losing the ability to perform spatial analysis.

### Brush Size and Path Resolution

The scratch brush has a 50 CSS-pixel diameter. Path points represent the center of the brush, so the actual scratched area extends 25px in all directions from each point. When computing whether a path point "covers" an element, researchers may want to account for the brush radius (approximately 0.06 in normalized coordinates on a 400px canvas, though this varies with actual canvas size on different devices).

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Gross motor speed | `time_ms` per card, `avg_scratch_time_ms` | Sensitive to psychomotor slowing; compare across sessions for longitudinal tracking |
| Motor persistence | `cards_completed / cards_attempted` | Incomplete cards may indicate fatigue, disengagement, or motor difficulty |
| Completionism / perfectionism | `final_pct - threshold` | Higher values = more voluntary effort beyond minimum; may correlate with OCD tendencies or conscientiousness |
| Visual salience bias | Path point density within element regions vs. overall | Compare proportion of path in "person" or "face" elements against their area proportion; above-chance density suggests directed attention |
| Element discovery order | First `t` value where path enters each element's bounding box | Which scene elements users uncover first; social elements (faces, figures) uncovered early may indicate social attention bias |
| Motor strategy consistency | Cross-card comparison of path patterns | Stable patterns suggest habitual motor behavior; variable patterns suggest exploration or adaptation |
| Scratch trajectory smoothness | Path curvature variance, velocity from consecutive `(x, y, t)` triples | Erratic trajectories may indicate tremor, poor motor control, or impulsivity |
| Engagement / hedonic response | `questionnaire.happiness`, time beyond threshold | Low scores combined with minimal post-threshold scratching may indicate anhedonia |
| Task comprehension | `questionnaire.clarity`, initial scratch pattern | Confused participants may show scattered initial path before settling into systematic scratching |
