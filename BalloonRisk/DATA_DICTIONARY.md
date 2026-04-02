# BalloonRisk (BART) — Data Dictionary

The Balloon Analogue Risk Task (BART) measures risk-taking propensity and impulsivity. Participants inflate a virtual balloon for points, deciding when to collect before it pops. Each pump earns one point; popping loses all points for that balloon.

## Payload Structure

```json
{
  "duration": 85000,
  "timestamp": 1712084400000,
  "static_data": { ... },
  "temporal_slices": [ ... ],
  "done": true
}
```

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | Total task duration in ms (from instruction close to final submit) |
| `timestamp` | integer | Unix epoch ms when the payload was sent |
| `done` | boolean | `true` when the task completed normally (questionnaire submitted) |
| `forward` | boolean | Present only when forward navigation is enabled; `true` = forward, `false` = back |
| `clickBack` | boolean | Present only when the user tapped the back arrow to exit early |

## static_data — Summary Metrics

### BART-Specific Metrics

| Field | Type | Description |
|-------|------|-------------|
| `total_earnings` | integer | Sum of points from all collected (non-popped) balloons |
| `total_pumps` | integer | Total pump count across all balloons (collected + popped) |
| `balloons_collected` | integer | Number of balloons the participant chose to collect |
| `balloons_popped` | integer | Number of balloons that burst |
| `total_balloons` | integer | Number of balloons actually played (may be less than `balloon_count` if exited early) |
| `avg_pumps` | float | Mean pumps per balloon (all balloons). Rounded to 1 decimal |
| `avg_pumps_collected` | float | Mean pumps per *collected* balloon only. **This is the standard BART risk-taking index** — higher values indicate greater risk tolerance. Rounded to 1 decimal |
| `pop_rate` | integer | Percentage of balloons that popped (0–100) |

### Configuration Echo

These fields record the settings used so results are interpretable without needing the original config.

| Field | Type | Description |
|-------|------|-------------|
| `balloon_count` | integer | Number of balloons configured for the session (default: 15) |
| `breakpoint_mean` | integer | Mean of the Gaussian distribution used to generate breakpoints (default: 64) |
| `breakpoint_std` | integer | Standard deviation of the Gaussian distribution (default: 37) |
| `breakpoints` | integer[] | The actual breakpoint (pop threshold) generated for each balloon. Length = `balloon_count`. Each value is the pump count at which that balloon would burst. Clamped to [1, 127] |

### Per-Balloon Results

| Field | Type | Description |
|-------|------|-------------|
| `balloon_results` | object[] | One entry per balloon played, in order |

Each entry in `balloon_results`:

| Field | Type | Description |
|-------|------|-------------|
| `pumps` | integer | Number of pumps on this balloon |
| `collected` | boolean | `true` if the participant collected; `false` if it burst |
| `earnings` | integer | Points earned (= pumps if collected, 0 if burst) |
| `breakpoint` | integer | The hidden breakpoint for this balloon |

### Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object | Post-task subjective ratings (present only on normal completion) |
| `questionnaire.clarity` | integer | 1–5 rating: "How clear were the instructions?" |
| `questionnaire.happiness` | integer | 1–5 rating: "How happy would you be to do this again?" |

### Legacy Fields

These fields exist for backward compatibility with the LAMP dashboard. Use the BART-specific fields above for analysis.

| Field | Type | Mapping |
|-------|------|---------|
| `correct_answers` | integer | = `balloons_collected` |
| `total_questions` | integer | = `total_balloons` |
| `wrong_answers` | integer | = `balloons_popped` |
| `score` | integer | = `round(balloons_collected / balloon_count * 100)` |
| `point` | integer | 2 if score >= 50, else 1 |

## temporal_slices — Event Log

Each user action produces one entry. Events are ordered chronologically.

### Pump Event

Recorded on every successful pump (balloon did not burst).

```json
{
  "duration": 340,
  "item": 3,
  "level": 3,
  "type": true,
  "value": 12,
  "pumps": 12,
  "event": "pump"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | ms since the previous event (inter-pump interval) |
| `item` | integer | Balloon number (1-indexed) |
| `level` | integer | Same as `item` |
| `type` | boolean | `true` (successful action) |
| `value` | integer | Cumulative pump count after this pump |
| `pumps` | integer | Same as `value` |
| `event` | string | `"pump"` |

### Burst Event

Recorded when a pump causes the balloon to pop.

```json
{
  "duration": 280,
  "item": 3,
  "level": 3,
  "type": false,
  "value": 0,
  "pumps": 45,
  "event": "burst"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | ms since the previous event |
| `item` | integer | Balloon number (1-indexed) |
| `level` | integer | Same as `item` |
| `type` | boolean | `false` (failed / lost points) |
| `value` | integer | `0` (no points earned) |
| `pumps` | integer | Total pumps at moment of burst (= breakpoint) |
| `event` | string | `"burst"` |

### Collect Event

Recorded when the participant banks their points.

```json
{
  "duration": 1200,
  "item": 4,
  "level": 4,
  "type": true,
  "value": 22,
  "pumps": 22,
  "event": "collect"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | ms since the previous event (decision latency) |
| `item` | integer | Balloon number (1-indexed) |
| `level` | integer | Same as `item` |
| `type` | boolean | `true` (successful collection) |
| `value` | integer | Points collected (= pump count) |
| `pumps` | integer | Same as `value` |
| `event` | string | `"collect"` |

### Manual Exit Event

Recorded when the participant uses navigation arrows to leave early.

```json
{
  "type": "manual_exit",
  "value": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | `"manual_exit"` |
| `value` | boolean | `true` = back arrow, `false` = forward arrow |

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Risk-taking propensity | `avg_pumps_collected` | Standard BART index — exclude popped balloons to avoid ceiling effects |
| Overall risk behavior | `avg_pumps` | Includes popped balloons; less standard but useful |
| Risk consequence | `pop_rate` | Higher = more risk-seeking behavior |
| Total reward | `total_earnings` | Outcome of risk/reward trade-off |
| Decision speed | `temporal_slices[].duration` | Inter-pump interval; shorter = more impulsive |
| Learning effects | `balloon_results` sequence | Plot pumps across balloons to detect risk adjustment over time |
| Risk calibration | `balloon_results[i].pumps` vs `breakpoints[i]` | How close participants pump to the hidden threshold |
