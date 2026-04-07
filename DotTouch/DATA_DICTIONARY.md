# DotTouch (Trails B) — Data Dictionary

## Cognitive Test Background

DotTouch implements a digital adaptation of the **Trail Making Test Part B (TMT-B)**, a cornerstone neuropsychological measure of **cognitive flexibility**, **set-shifting**, and **visuomotor sequencing**. The participant taps dots in an alternating number-letter sequence (1→A→2→B→3→C→...), requiring them to maintain two mental sets simultaneously and switch between them.

TMT-B is one of the most widely used tests of executive function in clinical neuropsychology. It is sensitive to frontal lobe damage, ADHD, depression, schizophrenia, and early dementia. The alternating sequence requirement distinguishes it from TMT-A (sequential numbers only) by adding a set-shifting demand that engages prefrontal executive circuits.

DotTouch extends the standard TMT-B with three progressive difficulty levels (increasing dot count) and random spatial placement, adding visuospatial scanning demands that scale with difficulty.

### Related Tests and Constructs

| Construct | How Measured | Related Standardized Test |
|-----------|-------------|--------------------------|
| **Cognitive flexibility / set-shifting** | Correct alternation between numbers and letters | TMT Part B (Reitan, 1958); WCST (Heaton, 1993) |
| **Visuomotor speed** | Completion time per level, `temporal_slices[].duration` | TMT Part A; Coding/DSST (WAIS-IV) |
| **Visual scanning** | Inter-tap intervals with scattered dot positions | TMT-A; UFOV; visual search paradigms |
| **Error monitoring** | `wrong_taps`, mistake patterns | TMT-B errors (perseverative vs. set-loss) |
| **Processing speed under load** | Performance across increasing dot counts | Timed executive function tasks generally |

Key references:

> Reitan, R. M. (1958). Validity of the Trail Making Test as an indicator of organic brain damage. *Perceptual and Motor Skills, 8*(3), 271–276.

> Arbuthnott, K., & Frank, J. (2000). Trail Making Test, Part B as a measure of executive control: Validation using a set-switching paradigm. *Journal of Clinical and Experimental Neuropsychology, 22*(4), 518–528.

> Kortte, K. B., Horner, M. D., & Windham, W. K. (2002). The Trail Making Test, Part B: Cognitive flexibility or ability to maintain set? *Applied Neuropsychology, 9*(2), 106–109.

---

## Payload Structure

```json
{
  "duration": 95000,
  "timestamp": 1712084400000,
  "static_data": { ... },
  "temporal_slices": [ ... ],
  "done": true
}
```

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | Total task duration in ms (from game start to result submission) |
| `timestamp` | integer | Unix epoch ms when the payload was sent |
| `done` | boolean | *(optional)* `true` when the task completed normally |
| `forward` | boolean | *(optional)* Present only when forward navigation is used to exit |
| `clickBack` | boolean | *(optional)* Present only when the user tapped the back arrow to exit early |

## static_data — Summary Metrics

### Performance Metrics

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | integer | Total correct taps across all levels |
| `wrong_answers` | integer | Total incorrect taps across all levels |
| `total_questions` | integer | Total taps made (correct + incorrect) |
| `total_taps` | integer | Same as `total_questions` |
| `total_items` | integer | Sum of all dot counts across all levels attempted |
| `score` | integer | Accuracy percentage: `round((correct_answers / total_questions) * 100)` |
| `percentageCorrectOverall` | integer | Same as `score` |
| `total_levels` | integer | Highest level reached (1–3) |
| `end_reason` | string | `"completed"`, `"timeout"`, `"too_many_mistakes"`, or `"manual_exit"` |
| `point` | integer | `2` if score = 100, else `1` |

### Level Summaries

| Field | Type | Description |
|-------|------|-------------|
| `level_summaries` | object[] | One entry per level attempted |

Each entry in `level_summaries`:

| Field | Type | Description |
|-------|------|-------------|
| `level` | integer | Level number (1–3) |
| `duration_ms` | integer | Time spent on this level in ms |
| `correct_taps` | integer | Correct taps on this level |
| `wrong_taps` | integer | Incorrect taps on this level |
| `total_items` | integer | Number of dots on this level |
| `sequence` | string[] | The correct alternating sequence (e.g., `["1", "A", "2", "B", ...]`) |
| `dot_positions` | object[] | Spatial positions of each dot: `{ x, y, label }` where x/y are percentages |

### Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object | *(optional)* Post-task subjective ratings. Contains `clarity` (1–5) and `happiness` (1–5) |

## temporal_slices — Event Log

One entry per tap, ordered chronologically.

### Tap Entry

```json
{
  "duration": 1200,
  "item": "A",
  "tapped": "A",
  "expected": "A",
  "level": 1,
  "type": true,
  "correct": true,
  "value": null
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | ms since previous tap (or since level start for first tap) |
| `item` | string | The label on the dot that was tapped |
| `tapped` | string | Same as `item` |
| `expected` | string | What the next correct tap should have been |
| `level` | integer | Current game level (1–3) |
| `type` | boolean | `true` = correct tap, `false` = incorrect |
| `correct` | boolean | Same as `type` |
| `value` | null | Reserved (always `null`) |

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `level1_dot_count` | integer | `12` | Number of dots on level 1 (6 numbers + 6 letters) |
| `level1_timeout` | integer | `60` | Time limit for level 1 in seconds |
| `level2_dot_count` | integer | `24` | Number of dots on level 2 |
| `level2_timeout` | integer | `120` | Time limit for level 2 in seconds |
| `timer_enabled` | boolean | `false` | Whether countdown timers are active |

## Game Logic Summary

1. Dots are placed randomly on screen (non-overlapping, with grid fallback)
2. Participant taps dots in alternating number-letter sequence: 1→A→2→B→3→C→...
3. Correct taps highlight green; incorrect taps highlight red
4. 5 incorrect taps → game over ("Too many mistakes")
5. Timer expiry → game over ("Time's up!")
6. Completing all items on a level → advance to next level (up to 3 levels)
7. Completing level 3 or hitting a game-over condition → game over screen
8. Participant taps "Continue" → questionnaire → results sent via `postMessage`

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Cognitive flexibility / set-shifting | `correct_answers / total_items`, error analysis | Errors on switch points (number→letter or letter→number) specifically indicate set-shifting difficulty |
| Visuomotor speed | `level_summaries[].duration_ms`, `temporal_slices[].duration` | Completion time per level; analogous to TMT-B completion time |
| Visual scanning efficiency | Inter-tap intervals with `dot_positions` | Longer search times for distant dots indicate scanning inefficiency |
| Error type analysis | `temporal_slices` where `tapped !== expected` | Compare errors at switch points vs. within-set errors to distinguish set-loss from sequencing errors |
| Processing speed under load | Performance across levels (12→24→48 dots) | Speed/accuracy changes with increasing dot count reveal capacity limits |
| Spatial planning | `dot_positions` + tap sequence | Whether participants scan systematically or erratically |
| Fatigue / endurance | `end_reason`, accuracy decline across levels | `"timeout"` or `"too_many_mistakes"` end reasons suggest cognitive fatigue |
