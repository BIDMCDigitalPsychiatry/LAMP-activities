# Sliding Puzzle — Data Dictionary

## Cognitive Test Background

The **sliding puzzle** (also known as the n-puzzle, 15-puzzle, or taquin) is a classic spatial problem-solving task that has been used in cognitive psychology since Klahr & Robinson (1981) to study **planning depth**, **spatial working memory**, and **problem-solving strategy**. The participant must rearrange numbered tiles on a grid by sliding them into an adjacent empty space until they reach the goal configuration (1 in the top-left, ascending left-to-right, top-to-bottom).

The task is computationally well-characterized: the 8-puzzle (3×3) is in NP but practically solvable, the 15-puzzle (4×4) is NP-hard in general but solvable with admissible heuristics, and the 24-puzzle (5×5) is too large for exhaustive optimal solving. This computational gradient makes the puzzle uniquely suited for measuring planning ability — the gap between a participant's actual move count and the mathematically optimal solution directly quantifies planning efficiency.

Unlike the Tower of London or Tower of Hanoi (which present subgoal hierarchies), the sliding puzzle requires continuous spatial reconfiguration where every move changes the global state. This makes it a strong measure of **spatial planning** (mentally simulating move sequences) and **spatial working memory** (maintaining the current and goal configurations in mind simultaneously).

### What the Sliding Puzzle Measures

| Construct | How Measured | Clinical / Research Relevance |
|-----------|-------------|-------------------------------|
| **Spatial planning** | Move efficiency (optimal / actual moves) | Impaired in frontal lobe damage (Owen et al., 1990); reduced in Parkinson's (Robbins et al., 1994) |
| **Problem-solving strategy** | Move count, move efficiency | Distinguishes planful solvers (few moves, high efficiency) from trial-and-error (many moves, low efficiency) |
| **Spatial working memory** | Performance on larger grids (4×4, 5×5) | Larger grids demand maintaining more tile positions; sensitive to WM capacity |
| **Processing speed** | Solve time | Time to complete the puzzle; modulated by both planning and motor execution |
| **Cognitive persistence** | Completion rate, moves on unsolved puzzles | Willingness to sustain effort on difficult configurations |
| **Planning depth** | Efficiency gap across grid sizes | Planning degrades more steeply with grid size in participants with lower WM capacity |

### Related Standardized Tests

| Test | Publisher | Relationship to Sliding Puzzle |
|------|-----------|-------------------------------|
| **Tower of London (Shallice, 1982)** | Various | Both measure look-ahead planning; ToL uses discrete subgoals, sliding puzzle uses continuous reconfiguration |
| **Stockings of Cambridge (SOC)** (CANTAB) | Cambridge Cognition | Computerized Tower of London variant; same planning construct |
| **Tower of Hanoi** | — | Recursive subgoal decomposition; related but structurally different |
| **Spatial Working Memory (SWM)** (CANTAB) | Cambridge Cognition | Measures spatial WM directly; the sliding puzzle taxes the same resource |
| **Block Design (WAIS-IV)** | Pearson | Visuospatial construction; related spatial analysis component |

### The Optimal Solution as a Cognitive Benchmark

A unique feature of this implementation is the computation of the **mathematically optimal solution** for each puzzle configuration using the IDA* (Iterative Deepening A*) search algorithm. This provides an objective benchmark against which human performance is measured.

**Why this matters for research:** Human move counts are typically 5–10× the optimal solution. The ratio (optimal / actual) — reported as `move_efficiency` — isolates planning ability from motor speed, puzzle difficulty, and individual baseline differences. An efficiency of 1.0 means the participant solved the puzzle in the minimum possible moves; 0.5 means they used twice the optimal number.

### References

> Klahr, D., & Robinson, M. (1981). Formal assessment of problem-solving and planning processes in preschool children. *Cognitive Psychology, 13*(1), 113–148.

> Korf, R. E. (1985). Depth-first iterative-deepening: An optimal admissible tree search. *Artificial Intelligence, 27*(1), 97–109.

> Ratner, D., & Warmuth, M. K. (1990). The (n²−1)-puzzle and related relocation problems. *Journal of Symbolic Computation, 10*(2), 111–137.

> Owen, A. M., Downes, J. J., Sahakian, B. J., Polkey, C. E., & Robbins, T. W. (1990). Planning and spatial working memory following frontal lobe lesions in man. *Neuropsychologia, 28*(10), 1021–1034.

> Robbins, T. W., James, M., Owen, A. M., Sahakian, B. J., McInnes, L., & Rabbitt, P. (1994). Cambridge Neuropsychological Test Automated Battery (CANTAB): A factor analytic study of a large sample of normal elderly volunteers. *Dementia, 5*(5), 266–281.

> Shallice, T. (1982). Specific impairments of planning. *Philosophical Transactions of the Royal Society of London B, 298*(1089), 199–209.

---

## Puzzle Generation and Optimal Solving

### Puzzle Generation

Puzzles are generated by performing a random walk backward from the **solved state** (tiles in numerical order, empty space at bottom-right). This guarantees solvability without the need for inversion-counting parity checks.

**Algorithm:**
1. Start from the solved configuration: `[1, 2, 3, ..., n²−1, 0]`
2. Perform K random moves (K = scrambleMoves, varies by difficulty), each time swapping the empty space with a random adjacent tile
3. The previous move position is tracked to avoid immediately undoing the last move (which would waste scramble depth)
4. If the resulting configuration is still the solved state, retry

| Difficulty | Grid Size | Scramble Moves | Effect |
|-----------|-----------|----------------|--------|
| Easy | 3×3 (8-puzzle) | 30 | Moderate scramble; solvable in ~20–30 optimal moves |
| Medium | 4×4 (15-puzzle) | 60 | Deep scramble; solvable in ~40–60 optimal moves |
| Hard | 5×5 (24-puzzle) | 100 | Very deep scramble; optimal solution not computed |

### IDA* Solver

The optimal move count is computed using **Iterative Deepening A\*** (IDA*; Korf, 1985), the standard algorithm for optimally solving sliding puzzles.

**Heuristic:** Manhattan distance + linear conflict. Manhattan distance sums the taxicab distance of each tile from its goal position. Linear conflict adds 2 moves for each pair of tiles that are in their goal row (or column) but in reversed relative order — these tiles must leave and re-enter the row, requiring at least 2 extra moves beyond Manhattan distance.

```
h(state) = Manhattan distance + linear conflict
```

This heuristic is **admissible** (never overestimates) and **consistent**, guaranteeing that IDA* finds the optimal solution.

**Search budgets:**

| Grid | Max Nodes | Rationale |
|------|-----------|-----------|
| 3×3 | 500,000 | Always finds optimal; 8-puzzle has max ~31 optimal moves |
| 4×4 | 2,000,000 | Finds optimal for most configurations; some hard 15-puzzle instances may exceed budget |
| 5×5 | Skipped | 24-puzzle is NP-hard; optimal solutions require billions of nodes for hard instances |

When the search budget is exceeded (or for 5×5), `optimal_moves` is set to `-1` and `move_efficiency` is set to `-1`, indicating the optimal solution is unknown for that puzzle.

---

## Trial Design

### Difficulty Levels

| Setting | Grid | Puzzles | State Space | Scramble Depth | Optimal Solving | Expected Duration |
|---------|------|---------|-------------|----------------|-----------------|-------------------|
| **Easy** | 3×3 | 5 | 181,440 reachable states | 30 moves | Always computed | ~3–5 min |
| **Medium** | 4×4 | 3 | ~10¹³ reachable states | 60 moves | Usually computed | ~5–10 min |
| **Hard** | 5×5 | 3 | ~7.7×10²⁴ reachable states | 100 moves | Not computed | ~10–20 min |

### Session Flow

```
instruction → [puzzle₁ → solved₁] → [puzzle₂ → solved₂] → ... → questionnaire → done
```

1. **Instruction modal** — explains the goal (arrange tiles in order)
2. **Puzzle loop** — participant solves each puzzle by tapping tiles adjacent to the empty space
3. **Solved overlay** — "Solved!" banner with green tile highlighting, displayed for 1.5 seconds
4. **Questionnaire** — post-game self-report
5. **Done** — payload sent via `postMessage`

### Tile Interaction

- Only tiles **adjacent** to the empty space (horizontally or vertically) are movable
- Tapping a movable tile slides it into the empty space with a CSS transition animation
- Tapping a non-adjacent tile has no effect
- A move counter and elapsed timer are visible in the status bar

---

## Payload Schema

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `duration` | number | Total elapsed time across all puzzles (ms) |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-puzzle event log (see below) |

---

### `static_data` — Planning Metrics

| Field | Type | Description |
|-------|------|-------------|
| `mean_move_efficiency` | number | **Mean of (optimal_moves / actual_moves) across solved puzzles where optimal is known.** The primary cognitive metric. 1.0 = solved in minimum moves (perfect planning). Lower values indicate more exploration / less planning. **Typical range: 0.10–0.30 for 4×4 puzzles in healthy adults.** Only includes puzzles where `optimal_moves > 0`. |
| `total_moves` | number | Sum of moves across all puzzles (solved and unsolved) |
| `mean_solve_time_ms` | number | Mean time to solve across solved puzzles (ms) |
| `puzzles_total` | number | Total puzzles presented |
| `puzzles_solved` | number | Puzzles completed within time limit |
| `puzzles_timed_out` | number | Puzzles where time expired before solving |

### `static_data` — Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `difficulty` | string | `"easy"`, `"medium"`, or `"hard"` |
| `grid_size` | number | 3, 4, or 5 |
| `time_limit_per_puzzle_s` | number \| null | Per-puzzle timeout (seconds), or `null` if untimed |

### `static_data` — Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Percentage of puzzles solved (0–100). For backward compatibility. |
| `correct_answers` | number | Same as `puzzles_solved` |
| `total_questions` | number | Same as `puzzles_total` |

### `static_data` — Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object? | Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5). Only present when the game ends normally. |

---

### `temporal_slices` — Per-Puzzle Event Log

Each entry represents one puzzle attempt:

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Puzzle identifier (e.g., `"puzzle_1"`) |
| `type` | string | `"solved"` (completed) or `"timeout"` (time expired) |
| `puzzle_number` | number | 1-indexed puzzle number |
| `grid_size` | number | Grid dimension (3, 4, or 5) |
| `moves` | number | Total tile moves made by the participant |
| `optimal_moves` | number | Minimum possible moves computed by IDA*. `-1` if the optimal solution was not computed (5×5 grids or budget exceeded). |
| `move_efficiency` | number | `optimal_moves / moves` (0–1 range, higher = better). `-1` if optimal is unknown. `0` for timed-out puzzles. |
| `solved` | boolean | Whether the puzzle was completed |
| `rt_ms` | number | Time from puzzle start to solution (ms). Equals time limit for timeouts. |
| `duration` | number | Same as `rt_ms` |

**Final entry:**

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | `"exit"` |
| `type` | string | `"exit"` |

All other fields are zeroed in the exit entry.

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| **Planning ability** | `mean_move_efficiency` | The core metric; isolates planning from speed and difficulty. Higher = more planful |
| **Planning depth across difficulty** | Per-puzzle `move_efficiency` across grid sizes | Steeper efficiency drop from 3×3 to 4×4 may indicate lower WM capacity |
| **Problem-solving speed** | `mean_solve_time_ms` | Time to complete; confounded with motor speed and strategy |
| **Speed-efficiency tradeoff** | `rt_ms` vs. `move_efficiency` per puzzle | Fast + efficient = strong planner; slow + efficient = deliberate; fast + inefficient = impulsive |
| **Cognitive persistence** | `puzzles_solved / puzzles_total` | Completion rate; low values may reflect frustration or disengagement |
| **Move economy** | `total_moves` | Raw move count; useful for within-subject comparisons across sessions |
| **Strategy identification** | Per-puzzle `moves` vs. `optimal_moves` | Moves close to optimal suggest sequential subgoal strategy; very high moves suggest random exploration |

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `difficulty` | string | `"medium"` | `"easy"`, `"medium"`, `"hard"` | Controls grid size and number of puzzles |
| `time_limit_per_puzzle_s` | number | 0 | 0–600 | Maximum time per puzzle (seconds). 0 = untimed. |

---

## Game Logic Summary

### Phase Progression

```
instruction → [playing → solved] × N → questionnaire → done
```

### State Representation

- Tiles are stored as a flat array of length n², where `0` represents the empty space
- Goal state: `[1, 2, 3, ..., n²−1, 0]` (tiles in order, empty at bottom-right)
- A puzzle is solved when the tile array matches the goal state

### Move Validation

Only tiles **orthogonally adjacent** to the empty space can move. The game computes the empty space's grid neighbors and only accepts clicks on those positions. Each valid click swaps the clicked tile with the empty space.

### Timer

- Elapsed time is displayed in the status bar as `M:SS`
- If a per-puzzle time limit is set, a countdown timer replaces the elapsed timer
- When time expires, the puzzle is recorded as a timeout (`solved: false`, `move_efficiency: 0`) and the next puzzle begins
- The timer warns (red highlight) when under 10 seconds remain

### Solved State

When a puzzle is solved:
1. The timer stops
2. All tiles turn green with a "Solved!" overlay (1.5-second celebration)
3. The result is recorded with actual moves, optimal moves, and efficiency
4. The next puzzle begins automatically
