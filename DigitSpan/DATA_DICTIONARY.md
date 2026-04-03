# DigitSpan — Data Dictionary

## Cognitive Test Background

DigitSpan implements a digital version of the **Digit Span** subtest from the **Wechsler Adult Intelligence Scale (WAIS-IV)**, the most widely used clinical measure of verbal short-term and working memory. The examiner (computer) presents a sequence of digits; the participant reproduces them. Forward span measures phonological short-term memory; backward span measures working memory (requiring simultaneous storage and mental manipulation).

### Related Tests and Constructs

| Construct | How Measured | Related Standardized Test |
|-----------|-------------|--------------------------|
| **Phonological short-term memory** | Forward span (longest correct sequence) | WAIS-IV Digit Span Forward; WMS-IV |
| **Verbal working memory** | Backward span (longest correct reversed sequence) | WAIS-IV Digit Span Backward |
| **Executive function (manipulation)** | Forward–backward difference | Backward span requires reordering, engaging central executive (Baddeley, 2003) |
| **Attentional capacity** | `total_raw_score` | Composite measure sensitive to attentional deficits |

The forward–backward span difference is clinically informative: a large gap (forward much higher than backward) suggests intact storage but impaired executive manipulation, a pattern seen in frontal lobe dysfunction.

Key references:

> Wechsler, D. (2008). *Wechsler Adult Intelligence Scale — Fourth Edition (WAIS-IV).* Pearson.

> Baddeley, A. (2003). Working memory: Looking back and looking forward. *Nature Reviews Neuroscience, 4*(10), 829–839.

> Woods, D. L., Kishiyama, M. M., Yund, E. W., et al. (2011). Improving digit span assessment of short-term verbal memory. *Journal of Clinical and Experimental Neuropsychology, 33*(1), 101–111.

---

This document describes the data emitted by the DigitSpan activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

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

## static_data — Standard Scores

These fields follow standard Digit Span scoring conventions (WAIS-IV). They are the recommended fields for cognitive analysis.

| Field | Type | Description |
|-------|------|-------------|
| `forward_span` | number | **Longest forward sequence length recalled correctly.** This is the primary forward score. Example: if the participant correctly recalled sequences of length 3, 4, and 5 but failed at 6, the forward span is 5. |
| `backward_span` | number | **Longest backward sequence length recalled correctly (in reverse order).** Same logic as forward span but for the backward phase. |
| `forward_trials_correct` | number | **Number of forward trials passed.** A trial is one complete sequence presentation + response. The trial is scored pass/fail — all digits must be correct in the correct order. There is no partial credit. |
| `backward_trials_correct` | number | **Number of backward trials passed.** Same as above but for the backward phase. |
| `total_raw_score` | number | **`forward_trials_correct + backward_trials_correct`.** Total number of trials passed across both phases. This is the standard composite raw score. |
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally (not via early exit). |
| `question_sequences` | string[] | Every sequence presented during the game, as comma-separated digit strings. Example: `["3,7,2", "5,1,8,4"]`. Useful for auditing what was presented. |

## static_data — Legacy Fields

These fields are retained for backward compatibility with existing dashboard code. They use per-digit scoring (partial credit) which is **not** standard for Digit Span and should likely not be used for cognitive analysis.

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | number | Count of individually correct digit positions across all trials. A digit is "correct" if it matches the expected digit at that position. This gives partial credit within a trial, which is non-standard. |
| `total_questions` | number | Total number of digits presented across all trials (sum of all sequence lengths). |
| `wrong_answers` | number | `total_questions - correct_answers`. Per-digit wrong count. |
| `score` | number | `Math.round((correct_answers / total_questions) * 100)`. Percentage of individual digits correct. |
| `point` | number | `2` if `score === 100`, else `1`. |
| `bestForwardDigitSpan` | array | Route entries for the best (longest, then fastest) all-correct forward level. Each entry has the shape of a `temporal_slices` entry. Empty array if no forward level was fully correct. |
| `bestBackwardDigitSpan` | array | Same as above for backward mode. |

---

## temporal_slices — Event Log

An array of event objects, one per user tap plus a final exit event. These provide the raw data needed to reconstruct any scoring approach.

### Tap Entry

| Field | Type | Description |
|-------|------|-------------|
| `item` | number | The digit the user tapped (1–9) |
| `level` | number | The game level (increments by 1 each round, resets do not occur between modes) |
| `mode` | number | `0` = forward, `1` = backward |
| `type` | boolean | Whether this tap was positionally correct (`true`) or not (`false`). In forward mode, checks `answers[i] === sequence[i]`. In backward mode, checks `answers[i] === reversed_sequence[i]`. |
| `duration` | number | Milliseconds since the previous tap (or since the grid enabled, for the first tap in a round) |
| `value` | null | Reserved, always `null` |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": false }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

1. **Forward phase** starts with a 3-digit sequence
2. Correct recall → next round adds 1 digit (up to max 9)
3. Incorrect recall → error counter increments
4. **2 errors** or reaching 9 digits → forward phase ends, backward phase begins
5. **Backward phase** starts with a 2-digit sequence, same progression rules
6. 2 errors or reaching 9 digits → game ends, questionnaire is shown
7. **30-second timeout**: if the user does not respond within 30 seconds during any round, it is treated as an incorrect trial
8. Each round presents unique, non-repeating digits (1–9)

## Scoring Guidance for Analysts

- Use `forward_span` and `backward_span` as the primary cognitive measures
- Use `total_raw_score` as the composite measure
- The `temporal_slices` array can be used to compute reaction times, error patterns, or custom scoring
- Do **not** use `score`, `correct_answers`, or `wrong_answers` for cognitive analysis — they use non-standard per-digit partial credit
- `question_sequences` can be cross-referenced with `temporal_slices` to verify data integrity

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Verbal short-term memory | `forward_span` | Standard Digit Span Forward. Typical adult range: 6–8 |
| Verbal working memory | `backward_span` | Standard Digit Span Backward. Typically 1–2 lower than forward |
| Executive contribution to working memory | `forward_span - backward_span` | Larger gap suggests intact storage but impaired manipulation (frontal dysfunction) |
| Overall memory capacity | `total_raw_score` | `forward_trials_correct + backward_trials_correct`; composite measure |
| Processing speed | `temporal_slices[].duration` | Tap-to-tap response time within a sequence; faster responses may indicate stronger digit encoding |
| Serial position effects | `temporal_slices` error analysis | Which digit positions are most error-prone (primacy/recency effects) |
| Fatigue / capacity ceiling | Span at first error | The sequence length where errors first appear marks the functional capacity limit |
