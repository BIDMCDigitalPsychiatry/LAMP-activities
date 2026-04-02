# JewelsPro Data Dictionary

This document describes the data emitted by the JewelsPro activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

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

| Field | Type | Description |
|-------|------|-------------|
| `score` | string | **Accuracy percentage.** `((total_jewels_collected / total_attempts) * 100).toFixed(2)`. Represents the proportion of taps that were correct. `"0.00"` if no attempts were made. |
| `total_jewels_collected` | number | **Total correct taps across all levels.** The participant clicked the correct next diamond in the sequence. This is the primary performance measure. |
| `total_attempts` | number | **Total taps across all levels.** Includes both correct and incorrect taps. |
| `total_bonus_collected` | number | **Cumulative bonus points across all levels.** Bonus is awarded only when all diamonds on a level are collected: `remaining_time - abs(penalty_points)`. Zero if the level timed out. |
| `point` | number | `2` if the final level was completed, `1` if the game ended on a timeout |
| `is_favorite` | boolean | Whether the activity was marked as a favorite in the dashboard configuration |
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally (not via early exit). |

---

## temporal_slices — Event Log

An array of event objects, one per tap plus a final exit event. These provide the raw data needed to reconstruct any scoring approach.

### Tap Entry

| Field | Type | Description |
|-------|------|-------------|
| `item` | number | The diamond position tapped (1-based, up to total diamonds on the level) |
| `level` | number | The game level when the tap occurred |
| `type` | boolean | Whether the tap was correct (`true`) — i.e., matched the next expected diamond in the sequence — or incorrect (`false`) |
| `duration` | number | Milliseconds since the previous tap (0 for the first tap in a level) |
| `value` | null | Reserved, always `null` |

Duplicate taps on the same diamond are deduplicated and do not appear in the event log.

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": false }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

### Variants

- **Trails A** (`variant="a"`): Single diamond shape. Participant taps diamonds numbered 1 → 2 → 3 → ... → N in order.
- **Trails B** (`variant="b"`): Multiple diamond shapes (up to 4). Participant alternates between shapes in numbered sequence.

### Level Progression

1. Diamonds are placed randomly on a 6×9 grid (up to 25 diamonds)
2. Participant taps diamonds in numerical order; incorrect taps incur a −2 penalty
3. **Level complete** (all diamonds collected) → bonus awarded, advance to next level
4. **Timeout** (timer reaches 0) → no bonus, game ends with "Time's up!" overlay
5. Game ends when the participant completes all levels or times out

### Dynamic Difficulty

- **Game time** decreases per level: `max(10s, initial_time - (level - 1) × time_decrease_per_level)`
- **Diamond count** increases at configurable intervals (`x_diamond_count` / `x_changes_in_level_count`), capped at 25
- **Shape count** (Trails B only) increases at configurable intervals (`y_shape_count` / `y_changes_in_level_count`), capped at 4

### Configuration (from activity settings)

| Setting | Description |
|---------|-------------|
| `mode` | Difficulty preset (1–4), determines initial game time |
| `diamond_count` | Starting number of diamonds per level |
| `shape_count` | Starting number of diamond shapes (1 for Trails A) |
| `bonus_point_count` | Points needed per level-up (default 40) |
| `total_levels` | Maximum number of levels |
| `time_decrease_per_level` | Seconds removed from the timer each level |

---

## Scoring Guidance for Analysts

- Use `total_jewels_collected` as the primary performance measure (total correct sequential taps)
- Use `score` (accuracy %) to compare performance across sessions with different numbers of attempts
- `total_bonus_collected` reflects both speed and accuracy — higher bonuses indicate completing levels quickly with few errors
- The `temporal_slices` array can be used to compute per-level performance, reaction times, error patterns, and fatigue effects
- Trails A vs Trails B results should be analyzed separately, as Trails B introduces task-switching demands
