# D-Cog (Cats and Dogs) Data Dictionary

This document describes the data emitted by the D-Cog activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

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
| `score` | number | **IRT-based ability estimate.** Computed using a maximum likelihood estimation (MLE) approach: the score is the theta value (on a 0–10 scale, step 0.1) whose expected score most closely matches the participant's actual number of correct rounds. Higher values indicate greater cognitive ability. |
| `correct_answers` | number | **Total correct taps** across all rounds. A tap is correct if the participant tapped a box that had the target animal behind it. |
| `wrong_answers` | number | **Total incorrect taps** across all rounds. A tap is incorrect if the participant tapped a box that did not have the target animal behind it. |
| `total_questions` | number | **Total target animals presented** across all rounds. This is the cumulative count of dogs (or cats, depending on the level) that appeared on screen — i.e., the number of boxes the participant should have tapped. |
| `point` | number | `2` if `score === 100`, else `1` |
| `is_favorite` | boolean | Whether the activity was marked as a favorite in the dashboard configuration |

**Note:** The questionnaire component is rendered but its responses are not currently included in the postMessage payload.

---

## temporal_slices — Event Log

An array of event objects, one per tap plus a final exit event.

### Tap Entry

| Field | Type | Description |
|-------|------|-------------|
| `item` | number | The box index that was tapped (position on the grid) |
| `level` | number | The number of dogs on screen in the current round (reflects difficulty) |
| `type` | boolean | Whether the tap was correct (`true`) or incorrect (`false`) |
| `duration` | number | Milliseconds since the previous tap (or since the round started, for the first tap) |
| `value` | null | Reserved, always `null` |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": false }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

### Phases

The game progresses through three phases with changing instructions:

1. **Phase 1 — Tap dogs**: Participant taps boxes that have a dog behind them
2. **Phase 2 — Tap dogs, avoid cats**: Same as Phase 1, but cats are now present as distractors (participant must avoid tapping cats)
3. **Phase 3 — Tap cats, avoid dogs**: Instructions reverse — participant must tap cats and avoid dogs

### Round Flow

1. A grid of boxes is displayed (count increases with difficulty)
2. Boxes "lift" to reveal dogs, cats, or nothing behind them for a brief period
3. Boxes close, and the participant must tap the boxes where the target animal was
4. Correct taps highlight green, incorrect taps highlight red
5. After tapping, the game evaluates the round and advances

### Difficulty Progression

- The number of dogs on screen increases as the game progresses
- Box grid size increases with dog count
- Each round's difficulty (dog count) is recorded in `temporal_slices[].level`
- Round outcomes (pass/fail) feed into the IRT scoring model

### Scoring Algorithm (IRT)

The `score` field uses Item Response Theory (2-parameter logistic model):
1. Each round is scored binary: pass (all target animals tapped correctly) or fail
2. Round difficulty = number of dogs on screen
3. MLE finds the ability theta (0–10 range) whose expected score best matches the participant's actual correct-round count
4. The score is `Math.round(theta * 10) / 10`

---

## Scoring Guidance for Analysts

- Use `score` (IRT ability estimate) as the primary cognitive measure — it accounts for round difficulty
- `correct_answers` and `wrong_answers` provide raw tap-level accuracy but do not account for difficulty
- `total_questions` is the total number of target animals presented, not the number of rounds
- The `temporal_slices` array can be used to compute per-round performance, reaction times, and error patterns across phases
- Phase transitions (dog-only → dog+cat → cat-only) can be inferred from changes in the instruction prompts shown during gameplay
