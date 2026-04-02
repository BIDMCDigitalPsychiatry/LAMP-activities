# Symbol Digit Substitution Test (SDST) Data Dictionary

This document describes the data emitted by the SDST activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) when the game started |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-trial event log (see below) |
| `forward` | boolean | *(optional)* If the activity was configured with a forward nav button, indicates whether the user advanced forward (`true`) or clicked back (`false`) |
| `done` | boolean | *(optional)* `true` when the game ended normally (not via back/forward navigation) |
| `clickBack` | boolean | *(optional)* `true` when the user exited via the back arrow |

---

## static_data — Standard Scores

These fields follow the standard DSST (Digit Symbol Substitution Test) scoring conventions. They are the recommended fields for cognitive analysis.

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | **Correct Responses Per Minute (CRPM).** The primary DSST processing speed metric. Calculated as `number_of_correct_responses / elapsed_minutes`. |
| `number_of_symbols` | number | **Total symbols presented** during the session. This is the number of trials the participant attempted. |
| `number_of_correct_responses` | number | **Number of correct responses.** The standard DSST raw score — how many symbols the participant matched correctly within the time limit. |
| `number_of_incorrect_responses` | number | **Number of incorrect responses.** How many symbols the participant matched to the wrong digit. |
| `avg_correct_response_time` | number | **Average response time for correct trials (ms).** Milliseconds from symbol presentation to correct button press, averaged across all correct trials. Rounded to the nearest integer. |
| `avg_incorrect_response_time` | number | **Average response time for incorrect trials (ms).** Same as above but for incorrect trials. Rounded to the nearest integer. |
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally (not via early exit). |

---

## temporal_slices — Event Log

An array of event objects, one per trial plus a final exit event. These provide the raw data needed to reconstruct any scoring approach.

### Trial Entry

| Field | Type | Description |
|-------|------|-------------|
| `duration` | number | Milliseconds since the previous trial response (or since game start, for the first trial) |
| `level` | null | Reserved, always `null` |
| `value` | boolean | Whether the response was correct (`true`) or incorrect (`false`) |
| `type` | number | The symbol index that was displayed (identifies which symbol-digit pair was being tested) |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": false }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

1. A **symbol-digit key** is displayed at the top of the screen, mapping 9 abstract symbols to the digits 1–9
2. A single **target symbol** is presented below the key
3. The participant selects the matching digit from a row of 9 numbered buttons
4. After each response, the next symbol is immediately presented (no inter-trial interval)
5. The game continues until the **timer expires** (configurable, default 120 seconds)
6. On timeout, a brief "Time's up!" overlay appears before the questionnaire
7. Three instruction modes are supported via configuration:
   - **During**: symbol-digit key is always visible during gameplay
   - **Before**: key is shown for memorization, then hidden during gameplay
   - **Hidden**: key is never shown (participant must know mappings in advance)

## Scoring Guidance for Analysts

- Use `number_of_correct_responses` as the primary cognitive measure — this is the standard DSST raw score
- Use `score` (CRPM) for rate-adjusted comparisons across sessions with different durations
- `avg_correct_response_time` provides a measure of processing speed per trial
- The `temporal_slices` array can be used to compute trial-level reaction times, error patterns, or fatigue effects over time
- `number_of_symbols` minus `number_of_correct_responses` minus `number_of_incorrect_responses` should always equal zero (every trial is scored correct or incorrect)
