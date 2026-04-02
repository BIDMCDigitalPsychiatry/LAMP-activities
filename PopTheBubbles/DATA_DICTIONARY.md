# Pop the Bubbles Data Dictionary

This document describes the data emitted by the Pop the Bubbles activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | number | Total elapsed time in milliseconds from game start to result submission |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-tap event log (see below) |
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `forward` | boolean | *(optional)* If the activity was configured with a forward nav button, indicates whether the user advanced forward (`true`) or clicked back (`false`) |
| `done` | boolean | *(optional)* `true` when the game ended normally (not via back/forward navigation) |
| `clickBack` | boolean | *(optional)* `true` when the user exited via the back arrow |

---

## static_data

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Overall accuracy percentage (0–100). Computed as `Math.round(correctTaps / totalTaps * 100)` across all levels. |
| `correct_answers` | number | Total number of correct taps across all levels. A tap is correct if the participant popped a go bubble or correctly avoided a no-go bubble. |
| `wrong_answers` | number | Total number of incorrect taps across all levels. A tap is incorrect if the participant popped a no-go bubble. |
| `total_questions` | number | Total number of taps made (correct + incorrect) across all levels. |
| `point` | number | `2` if `score === 100`, else `1` |
| `is_favorite` | boolean | Whether the activity was marked as a favorite in the dashboard configuration |
| `levels` | array | Per-level go/no-go performance breakdown (see below) |
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally (not via early exit). |

---

## static_data.levels — Per-Level Go/No-Go Performance

An array of objects, one per completed level. This is the primary data source for go/no-go analysis.

| Field | Type | Description |
|-------|------|-------------|
| `level` | number | Level number (1, 2, or 3) |
| `go_correct` | number | Number of go bubbles correctly popped (hits) |
| `go_total` | number | Total number of go bubbles presented |
| `go_missed` | number | Number of go bubbles not popped (omission errors) |
| `nogo_correct` | number | Number of no-go bubbles correctly ignored (correct rejections) |
| `nogo_total` | number | Total number of no-go bubbles presented |
| `nogo_wrong` | number | Number of no-go bubbles incorrectly popped (commission errors) |
| `false_hits` | number | Taps on screen areas outside any bubble |

### Derived Metrics

| Metric | Formula | Description |
|--------|---------|-------------|
| Go hit rate | `go_correct / go_total` | Proportion of go targets correctly responded to |
| No-go correct rejection rate | `nogo_correct / nogo_total` | Proportion of no-go distractors correctly withheld |
| Commission error rate | `nogo_wrong / nogo_total` | Proportion of no-go distractors incorrectly responded to (measure of inhibitory control) |
| Omission error rate | `go_missed / go_total` | Proportion of go targets missed (measure of sustained attention) |

---

## temporal_slices — Event Log

An array of event objects, one per bubble tap plus a final exit event.

### Tap Entry

| Field | Type | Description |
|-------|------|-------------|
| `item` | number | Sequential tap number within the current level (1-indexed) |
| `level` | number | The game level during which the tap occurred (1, 2, or 3) |
| `type` | boolean | Whether the tap was correct (`true`) or incorrect (`false`) |
| `duration` | number | Milliseconds since the previous tap (or since the level started, for the first tap) |
| `value` | string | Bubble classification string: `"<color> <trial_type>"`. Color is one of `yellow`, `pink`, `blue`, `red`, `green`. Trial type is one of `go`, `no-go`, `no-go-constant`, `no-go-lure`, `no-go-2inrow`. |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": true }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

### Level Progression

The game has three levels, played in sequence:

| Level | Go Bubbles | No-Go Bubbles | Additional Rules |
|-------|-----------|---------------|-----------------|
| 1 | Pink, Blue, Yellow (80%) | Red, Green (20%) | Pop all go colors, ignore no-go colors |
| 2 | Yellow, Blue (75%) | Red/Green constant (7.5%), Pink lure (8.75%), Same-color two-in-row (8.75%) | Pop go colors, but don't pop two of the same color in a row |
| 3 | Pink, Yellow, Blue (75%) | Red/Green constant (12.5%), Same-color two-in-row (12.5%) | Pop go colors, but don't pop two of the same color in a row |

### Round Flow

1. A 3-2-1-GO countdown plays (1.5s per step)
2. Bubbles appear one at a time at random screen positions
3. Each bubble is visible for `bubble_duration` seconds (default: 1.5s)
4. Next bubble appears `intertrial_duration` seconds after the previous (default: 1.5s)
5. After all bubbles have been shown, the level ends automatically
6. Results screen shows accuracy percentage and a "Next Level" button
7. After level 3, a post-game questionnaire appears

### Configurable Settings

These can be set via `activity.settings` in the postMessage config:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `bubble_count` | number[3] | `[10, 10, 80]` | Number of bubbles per level |
| `bubble_duration` | number | `1.5` | Seconds each bubble remains visible |
| `intertrial_duration` | number | `1.5` | Seconds between bubble onsets |
| `bubble_speed` | number[3] | `[30, 40, 50]` | Initial delay (ms) before first bubble per level |

---

## Scoring Guidance for Analysts

- **Use `static_data.levels`** for go/no-go analysis — it provides per-level hit rates, correct rejections, commission errors, and omission errors
- Commission error rate (`nogo_wrong / nogo_total`) is the primary measure of **inhibitory control**
- Omission error rate (`go_missed / go_total`) is the primary measure of **sustained attention**
- `score` is a simple overall tap accuracy percentage — useful as a quick summary but does not distinguish go from no-go performance
- `temporal_slices` provides per-tap reaction times (`duration`) and bubble classification (`value`), enabling response-time analysis by trial type
- The `value` field in temporal slices encodes both bubble color and trial classification (go, no-go, no-go-constant, no-go-lure, no-go-2inrow)
- **Important**: temporal slices only contain *tapped* bubbles — un-tapped go bubbles (omissions) do not generate entries. Use `levels[].go_missed` for omission counts.
- `correct_answers`, `wrong_answers`, and `total_questions` are legacy cumulative fields that do not distinguish go from no-go performance
