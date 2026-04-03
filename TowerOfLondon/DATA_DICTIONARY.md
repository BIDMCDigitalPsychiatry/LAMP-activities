# Tower of London — Data Dictionary

## Cognitive Background

The Tower of London (TOL; Shallice, 1982) is a classic neuropsychological test of executive function, specifically **planning ability** and **problem-solving**. Participants rearrange colored balls on pegs of varying heights to match a goal configuration in the minimum number of moves. The task engages prefrontal cortical regions and is sensitive to executive dysfunction in clinical populations.

### Task Design

- **3 pegs** with capacities: left = 3 balls, middle = 2 balls, right = 1 ball
- **3 colored balls**: Red (R), Green (G), Blue (B)
- Only the **top ball** on a peg can be moved
- Problems progress from **1-move** to **5-move** solutions
- Each problem has a **BFS-computed minimum** number of moves
- A **per-problem time limit** prevents indefinite stalling

### Key Metrics

- **Planning time** (first-move latency): time from problem display to first move — reflects pre-planning
- **Execution time**: time from first move to solution — reflects plan execution
- **Excess moves**: actual moves minus minimum moves — reflects plan quality
- **Problems solved in minimum**: the primary accuracy measure

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `difficulty` | string | "medium" | Difficulty level: "easy" (1–3 moves), "medium" (2–5 moves), "hard" (4–7 moves) |
| `max_problems` | number | 12 | Number of problems to present (drawn from pool, sorted by difficulty) |
| `time_limit_per_problem_s` | number | 60 | Time limit per problem in seconds |

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | % problems solved in minimum moves (legacy compat, 0–100) |
| `correct_answers` | number | Problems solved in minimum moves (legacy compat) |
| `total_questions` | number | Total problems attempted (legacy compat) |
| `max_problems` | number | Max problems setting |
| `time_limit_per_problem_s` | number | Time limit setting |
| `problems_attempted` | number | Total problems shown |
| `problems_solved` | number | Problems solved (any move count) |
| `problems_solved_in_minimum` | number | Problems solved in exactly the minimum moves |
| `total_excess_moves` | number | Sum of (actual − minimum) across solved problems |
| `mean_excess_moves` | number | Average excess moves per solved problem |
| `mean_planning_time_ms` | number | Mean first-move latency across all problems |
| `mean_execution_time_ms` | number | Mean execution time across solved problems |
| `problems_timed_out` | number | Problems where time ran out |
| `questionnaire` | {clarity, happiness} | Post-game ratings (1–5 each) |

## `temporal_slices` Fields

Each entry represents one problem (not individual moves).

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Problem identifier (e.g., "problem_3") |
| `type` | string | "solved", "timeout", or "exit" |
| `problem_number` | number | Problem number (1-indexed) |
| `minimum_moves` | number | BFS-computed optimal solution length |
| `actual_moves` | number | Moves the participant made |
| `excess_moves` | number | actual_moves − minimum_moves |
| `solved` | boolean | Whether the goal was reached |
| `planning_time_ms` | number | Time from display to first move (ms) |
| `execution_time_ms` | number | Time from first move to solution (ms) |
| `duration` | number | Total time for this problem (ms) |
| `move_sequence` | string[] | Sequence of moves (e.g., ["0→2", "0→1"]) |
| `level` | number | Difficulty level (= minimum moves) |

## References

- Shallice, T. (1982). Specific impairments of planning. *Philosophical Transactions of the Royal Society of London B*, 298, 199–209.
- Owen, A. M., Downes, J. J., Sahakian, B. J., Polkey, C. E., & Robbins, T. W. (1990). Planning and spatial working memory following frontal lobe lesions in man. *Neuropsychologia*, 28(10), 1021–1034.
