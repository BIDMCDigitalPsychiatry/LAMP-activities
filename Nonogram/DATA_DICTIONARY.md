# Nonogram — Data Dictionary

## Cognitive Background

Nonograms (also called Picross or Griddlers) are logic puzzles requiring constraint satisfaction and deductive reasoning. Participants fill cells in a grid based on numeric clues for each row and column, where each number indicates a run of consecutive filled cells. The task engages **logical deduction**, **working memory** (holding partial solutions across intersecting constraints), **spatial reasoning**, and **planning** (choosing which line to attack next for maximum information gain).

### Task Design

- **Grid sizes**: 5×5 (easy), 7×7 (medium), 10×10 (hard)
- Clues indicate consecutive filled-cell runs for each row and column
- All puzzles are verified solvable by **line logic alone** (no guessing required)
- Puzzles generated via random grid + solver verification at initialization
- **Immediate feedback** on errors: incorrect fills flash red and increment error counter
- Correctly filled cells are permanent (cannot be undone)
- **Mark mode** allows flagging cells known to be empty (visual aid, not scored)
- A **per-puzzle time limit** prevents indefinite stalling

### Key Metrics

- **Planning time** (first-action latency): time from puzzle display to first cell interaction
- **Execution time**: time from first action to solution
- **Errors**: incorrect fill attempts — reflects deductive accuracy
- **Puzzles solved perfectly**: solved with zero errors — the primary accuracy measure

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `difficulty` | string | "medium" | Grid size: "easy" (5×5), "medium" (7×7), "hard" (10×10) |
| `max_puzzles` | number | 6 | Number of puzzles to present |
| `time_limit_per_puzzle_s` | number | 120 | Time limit per puzzle in seconds |

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | % puzzles solved perfectly (legacy compat, 0–100) |
| `correct_answers` | number | Puzzles solved with 0 errors (legacy compat) |
| `total_questions` | number | Total puzzles attempted (legacy compat) |
| `max_puzzles` | number | Max puzzles setting |
| `time_limit_per_puzzle_s` | number | Time limit setting |
| `difficulty` | string | Difficulty setting |
| `puzzles_attempted` | number | Total puzzles shown |
| `puzzles_solved` | number | Puzzles completed (any error count) |
| `puzzles_solved_perfectly` | number | Puzzles completed with 0 errors |
| `total_errors` | number | Sum of errors across all puzzles |
| `mean_errors` | number | Average errors per puzzle |
| `mean_planning_time_ms` | number | Mean first-action latency across all puzzles |
| `mean_execution_time_ms` | number | Mean execution time across solved puzzles |
| `puzzles_timed_out` | number | Puzzles where time ran out |
| `questionnaire` | {clarity, happiness} | Post-game ratings (1–5 each) |

## `temporal_slices` Fields

Each entry represents one puzzle.

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Puzzle identifier (e.g., "puzzle_3") |
| `type` | string | "solved", "timeout", or "exit" |
| `puzzle_number` | number | Puzzle number (1-indexed) |
| `grid_size` | string | Grid dimensions (e.g., "7x7") |
| `total_filled` | number | Cells that should be filled in solution |
| `cells_filled` | number | Cells the participant correctly filled |
| `cells_marked` | number | Cells the participant marked with X |
| `errors` | number | Incorrect fill attempts |
| `accuracy` | number | cells_filled / total_filled (0–1) |
| `solved` | boolean | Whether all cells were correctly filled |
| `planning_time_ms` | number | Time from display to first action (ms) |
| `execution_time_ms` | number | Time from first action to completion (ms) |
| `duration` | number | Total time for this puzzle (ms) |
| `level` | number | Grid row count (difficulty proxy) |

## References

- Ueda, N., & Nagao, T. (1996). NP-completeness results for NONOGRAM via parsimonious reductions. Technical Report TR96-0008, University of Tokyo.
- Batenburg, K. J., & Kosters, W. A. (2009). Solving nonograms by combining relaxations. *Pattern Recognition*, 42(8), 1672–1683.
