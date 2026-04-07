# Delay Discounting — Data Dictionary

## Cognitive Background

Delay discounting measures the degree to which a person devalues rewards as a function of the delay to their receipt. Higher discounting (lower AUC, higher *k*) indicates greater impulsivity and preference for immediate gratification. It is one of the most robust behavioral markers of impulsivity across clinical populations (Mazur, 1987; Bickel & Marsch, 2001).

### Adjusting-Amount Procedure

Each delay block uses a bisection (titration) procedure to find the **indifference point** — the immediate amount at which the participant is equally likely to choose either option:

1. Start at `delayed_amount / 2`
2. If participant chooses "now" → decrease immediate offer by half the step
3. If participant chooses "later" → increase immediate offer by half the step
4. After `trials_per_delay` iterations, the final adjusted amount is the indifference point

### Hyperbolic Discounting Model

The standard model (Mazur, 1987): **V = A / (1 + kD)**

- V = indifference point (subjective value)
- A = delayed amount (objective value)
- D = delay in days
- k = discount rate (higher = more impulsive)

The `k` parameter is estimated per delay as `k_i = (A/V_i - 1) / D_i`, and the overall `hyperbolic_k` is the median across delays, which is robust to outliers.

### Area Under the Curve (AUC)

AUC (Myerson et al., 2001) provides a model-free measure of discounting:

- X-axis: delays normalized to [0, 1] by dividing by max delay
- Y-axis: indifference points normalized to [0, 1] by dividing by delayed amount
- A point (0, 1) is prepended (no delay = no discounting)
- Trapezoidal integration yields AUC ∈ [0, 1]
- AUC = 1 → no discounting (patient), AUC = 0 → maximum discounting (impulsive)

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `delayed_amount` | number | 100 | The larger, delayed reward amount ($) |
| `delays` | number[] | [1, 7, 30, 90, 365] | Delay durations in days, presented in order |
| `trials_per_delay` | number | 6 | Number of bisection trials per delay |

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | AUC × 100 (legacy compatibility, 0–100) |
| `correct_answers` | number | Total trials completed (legacy compat) |
| `total_questions` | number | Total trials expected |
| `delayed_amount` | number | Delayed reward amount setting |
| `delays` | number[] | Delay values used (days) |
| `trials_per_delay` | number | Trials per delay setting |
| `indifference_points` | Record<string, number> | Indifference point per delay (keyed by days) |
| `auc` | number | Area under the curve (0–1, model-free) |
| `hyperbolic_k` | number | Median discount rate across delays |
| `k_values` | Record<string, number> | Per-delay k values |
| `mean_rt_ms` | number | Mean response time in ms |
| `median_rt_ms` | number | Median response time in ms |
| `proportion_immediate` | number | Proportion of trials choosing immediate |
| `questionnaire` | {clarity, happiness} | Post-game ratings (1–5 each) |

## `temporal_slices` Fields

Each entry represents one binary choice trial.

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Description of chosen option (e.g., "$50.00 now") |
| `type` | string | "chose_immediate", "chose_delayed", or "exit" |
| `delay_days` | number | Delay for this trial (days) |
| `delay_index` | number | Index into the delays array (0-based) |
| `trial_in_delay` | number | Trial number within this delay block (0-based) |
| `immediate_amount` | number | Immediate offer shown |
| `delayed_amount` | number | Delayed reward amount |
| `chose_immediate` | boolean | Whether the immediate option was chosen |
| `duration` | number | Response time in ms |
| `level` | number | Delay block number (1-indexed) |

## References

- Mazur, J. E. (1987). An adjusting procedure for studying delayed reinforcement. In M. L. Commons et al. (Eds.), *Quantitative analyses of behavior* (Vol. 5, pp. 55–73). Erlbaum.
- Myerson, J., Green, L., & Warusawitharana, M. (2001). Area under the curve as a measure of discounting. *Journal of the Experimental Analysis of Behavior*, 76(2), 235–243.
- Bickel, W. K., & Marsch, L. A. (2001). Toward a behavioral economic understanding of drug dependence: Delay discounting processes. *Addiction*, 96(1), 73–86.
