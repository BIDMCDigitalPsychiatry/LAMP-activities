# MemoryMatch — Data Dictionary

## Cognitive Background

Memory Match (also called Concentration or Pairs) is a classic card-matching task that engages **visual-spatial recognition memory** and **working memory**. Participants flip pairs of face-down cards to find matching symbols, requiring them to encode and maintain spatial locations of previously seen items. The task measures recognition accuracy, spatial recall efficiency, and working memory load management.

### Task Design

- **Grid sizes**: 3×4 (easy, 6 pairs), 4×5 (medium, 10 pairs), 5×6 (hard, 15 pairs)
- Cards display visually distinct emoji symbols
- Two cards flipped per move — if symbols match, both stay face-up; if not, both flip back after 700ms
- **Immediate feedback**: matched pairs stay revealed with green border; mismatches flip back
- A **per-round time limit** prevents indefinite play

### Key Metrics

- **Moves**: total pair-flip attempts — lower is better, minimum possible = number of pairs
- **Errors**: mismatch count — reflects spatial recall accuracy
- **Perfect rounds**: completed with zero errors (all pairs found on first encounter)
- **Planning time** (first-action latency): time from round start to first card flip
- **Execution time**: time from first flip to completion

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `difficulty` | string | "medium" | Grid size: "easy" (3×4, 6 pairs), "medium" (4×5, 10 pairs), "hard" (5×6, 15 pairs) |
| `max_rounds` | number | 4 | Number of rounds to present |
| `time_limit_per_round_s` | number | 120 | Time limit per round in seconds |

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | % rounds solved perfectly (legacy compat, 0–100) |
| `correct_answers` | number | Rounds solved with 0 errors (legacy compat) |
| `total_questions` | number | Total rounds attempted (legacy compat) |
| `max_rounds` | number | Max rounds setting |
| `time_limit_per_round_s` | number | Time limit setting |
| `difficulty` | string | Difficulty setting |
| `rounds_attempted` | number | Total rounds shown |
| `rounds_solved` | number | Rounds where all pairs found (any error count) |
| `rounds_perfect` | number | Rounds completed with 0 errors |
| `total_moves` | number | Sum of moves across all rounds |
| `total_errors` | number | Sum of errors across all rounds |
| `mean_errors` | number | Average errors per round |
| `mean_moves` | number | Average moves per round |
| `mean_planning_time_ms` | number | Mean first-action latency across all rounds |
| `mean_execution_time_ms` | number | Mean execution time across solved rounds |
| `rounds_timed_out` | number | Rounds where time ran out |
| `questionnaire` | {clarity, happiness} | Post-game ratings (1–5 each) |

## `temporal_slices` Fields

Each entry represents one round.

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Round identifier (e.g., "round_3") |
| `type` | string | "solved", "timeout", or "exit" |
| `round_number` | number | Round number (1-indexed) |
| `grid_size` | string | Grid dimensions (e.g., "4x5") |
| `total_pairs` | number | Number of pairs in the round |
| `pairs_found` | number | Pairs successfully matched |
| `moves` | number | Pair-flip attempts |
| `errors` | number | Mismatch count |
| `perfect` | boolean | Whether round was completed with 0 errors |
| `planning_time_ms` | number | Time from display to first flip (ms) |
| `execution_time_ms` | number | Time from first flip to completion (ms) |
| `duration` | number | Total time for this round (ms) |

## References

- Milner, B. (1971). Interhemispheric differences in the localization of psychological processes in man. *British Medical Bulletin*, 27(3), 272–277.
- Sahakian, B. J., & Owen, A. M. (1992). Computerized assessment in neuropsychiatry using CANTAB: discussion paper. *Journal of the Royal Society of Medicine*, 85(7), 399–402.
