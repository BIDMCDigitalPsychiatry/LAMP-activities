# Spin the Wheel — Data Dictionary

## Cognitive Test Background

Spin the Wheel implements a **Wheel of Fortune** gambling paradigm for measuring **risk preference**, **reward sensitivity**, and **loss aversion** under conditions of explicit probability. Unlike the Iowa Gambling Task (IGT), which requires learning hidden contingencies through experience, Spin the Wheel presents probabilities visually on the wheel — isolating decision-making preferences from learning ability.

The participant chooses between two wheels on each trial: typically a "safe" option (higher probability of a smaller reward) versus a "risky" option (lower probability of a larger reward). This maps directly onto prospect theory's distinction between risk-averse and risk-seeking behavior, and the pattern of choices across trials reveals individual risk profiles.

### Related Tests and Constructs

| Construct | How Measured | Related Standardized Test |
|-----------|-------------|--------------------------|
| **Risk preference** | Proportion of risky vs. safe wheel choices | Cambridge Gambling Task (CGT, Rogers et al., 1999); Wheel of Fortune task (Ernst et al., 2004) |
| **Loss aversion** | Behavior change on trials with potential losses | Prospect theory (Kahneman & Tversky, 1979); mixed gamble tasks |
| **Reward sensitivity** | Choices after wins vs. losses | IGT (Bechara et al., 1994); reward reactivity measures |
| **Decision speed** | `temporal_slices[].duration` | Longer deliberation may indicate greater conflict or uncertainty |
| **Post-outcome adjustment** | Sequential choice analysis (win→risk vs. loss→risk) | Reinforcement learning models; hot-hand / gambler's fallacy |

Key references:

> Ernst, M., Nelson, E. E., McClure, E. B., et al. (2004). Choice selection and reward anticipation: An fMRI study. *Neuropsychologia, 42*(12), 1585–1597.

> Rogers, R. D., Everitt, B. J., Baldacchino, A., et al. (1999). Dissociable deficits in the decision-making cognition of chronic amphetamine abusers, opiate abusers, patients with focal damage to prefrontal cortex, and tryptophan-depleted normal volunteers. *Neuropsychopharmacology, 20*(4), 322–339.

> Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. *Econometrica, 47*(2), 263–291.

---

This document describes the data emitted by the Spin the Wheel activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | number | Total elapsed time in milliseconds from game start to result submission |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-spin event log (see below) |
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `forward` | boolean | *(optional)* If the activity was configured with a forward nav button, indicates whether the user advanced forward (`true`) or clicked back (`false`) |
| `done` | boolean | *(optional)* `true` when the game ended normally (not via back/forward navigation) |
| `clickBack` | boolean | *(optional)* `true` when the user exited via the back arrow |

---

## static_data — Decision-Making Scores

These are the recommended fields for cognitive/behavioral analysis of risk-taking behavior.

| Field | Type | Description |
|-------|------|-------------|
| `final_balance` | number | **Balance at game end.** The participant's total money when the game finished (or when they exited). Starting balance is configurable (default: $2000). |
| `starting_balance` | number | **Initial balance.** The amount the participant started with (default: $2000). |
| `net_earnings` | number | **`final_balance - starting_balance`.** Positive means the participant gained money overall; negative means they lost money. This is the primary outcome measure. |
| `total_spins` | number | **Number of spins completed.** May be less than the configured maximum if the participant exited early. |
| `total_high_risk_choices` | number | **Number of times the participant chose a high-risk button.** Two of the four buttons are randomly assigned "high risk" at game start (shuffled each session). High-risk buttons have higher potential wins but also higher potential losses. |
| `total_low_risk_choices` | number | **Number of times the participant chose a low-risk button.** Two of the four buttons are randomly assigned "low risk." Low-risk buttons have smaller potential wins and losses. |
| `risk_taking_rate` | number | **`total_high_risk_choices / total_spins`.** Proportion of choices that were high-risk (0.0 to 1.0, rounded to 3 decimal places). This is the primary measure of risk preference. A rate of 0.5 indicates no preference; above 0.5 indicates risk-seeking; below 0.5 indicates risk-averse. |
| `mean_reaction_time` | number | **Average reaction time in milliseconds.** Measured from the end of the previous spin's result display (or game start for the first spin) to the button press. Rounded to the nearest integer. |
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally (not via early exit). |

## static_data — Legacy Fields

These fields are retained for backward compatibility with existing dashboard code. They map the activity's concepts onto the standard legacy schema but are **not** the recommended fields for decision-making analysis.

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | number | Set to `total_spins` (every completed spin counts). |
| `total_questions` | number | The configured maximum number of spins (e.g., 20). |
| `wrong_answers` | number | Always `0` (there are no "wrong" answers in a risk-taking task). |
| `score` | number | A 0–100 value derived from net earnings: `max(0, round((net_earnings / starting_balance) * 100 + 50))`. A score of 50 means break-even; above 50 means net gain; below 50 means net loss. |
| `point` | number | `2` if `final_balance >= starting_balance`, else `1`. |

---

## temporal_slices — Per-Spin Event Log

An array of event objects, one per completed spin plus a final exit event. These provide the raw data needed to reconstruct the full decision sequence.

### Spin Entry

| Field | Type | Description |
|-------|------|-------------|
| `item` | number | Spin number (1-indexed). The sequential position of this spin in the game. |
| `duration` | number | Reaction time in milliseconds — time from the previous result display (or game start) to the button press for this spin. |
| `level` | number | Button pressed (1–4). The button the participant chose. Note: button-to-risk mapping is shuffled each session, so button number alone does not indicate risk level. |
| `risk_level` | string | `"high"` or `"low"`. The actual risk category of the button that was pressed. This is the authoritative risk indicator (not the button number). |
| `win_amount` | number | Amount won on the win wheel (0, 50, 100, or 250). |
| `loss_amount` | number | Amount lost on the lose wheel (0, 50, 100, or 250). |
| `net_change` | number | `win_amount - loss_amount`. The net effect on balance for this spin. Can be positive, negative, or zero. |
| `balance_after` | number | Running balance after this spin's net change was applied. |
| `type` | boolean | `true` if `net_change >= 0` (net gain or break-even), `false` if `net_change < 0` (net loss). |
| `value` | null | Reserved, always `null`. |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": false }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

1. **Instruction modal** is shown at start with a brief explanation of the task
2. Four numbered buttons are presented — **two are randomly assigned high-risk, two low-risk** (shuffled each session via Fisher-Yates)
3. Buttons do **not** display their risk level — the participant must discover risk levels through experience (this is intentional for measuring risk learning)
4. Pressing a button spins both wheels simultaneously:
   - **Win wheel** determines the amount gained
   - **Lose wheel** determines the amount lost
   - Outcomes are determined probabilistically from configurable distributions before the spin animation begins
5. Balance updates only after both wheels finish spinning (deferred update)
6. Result is displayed for 1.5 seconds, then the next spin begins
7. Game ends when all configured spins are used (default: 20)
8. After a 2.5-second game-over display, the questionnaire is shown
9. Results are sent via postMessage after questionnaire submission

### Configurable Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `spins_per_game` | 20 | Total number of spins |
| `balance` | 2000 | Starting balance |
| `high_risk[0].win` | `{ probability: 50, sum: 100 }` | High-risk win distribution |
| `high_risk[0].loose` | `{ probability: 50, sum: 250 }` | High-risk loss distribution |
| `high_risk[0].zero` | `{ probability: 50 }` | High-risk zero-outcome probability |
| `low_risk[0].win` | `{ probability: 50, sum: 50 }` | Low-risk win distribution |
| `low_risk[0].loose` | `{ probability: 50, sum: 50 }` | Low-risk loss distribution |
| `low_risk[0].zero` | `{ probability: 50 }` | Low-risk zero-outcome probability |

### Wheel Values

Both wheels display the same segments: `$0, $50, $100, $250` (repeated twice for 8 segments). The actual outcome is determined by the probability distribution, and the wheel animation lands on the predetermined result.

---

## What This Task Measures

The Spin the Wheel task is a **Wheel of Fortune paradigm** designed to assess decision-making under uncertainty. Key constructs:

| Construct | Operationalized As |
|-----------|--------------------|
| **Risk preference** | `risk_taking_rate` — proportion of high-risk choices |
| **Reward sensitivity** | Tendency to increase risk-taking after wins (analyzable from temporal_slices sequence) |
| **Loss aversion** | Tendency to decrease risk-taking after losses (analyzable from temporal_slices sequence) |
| **Probability weighting** | Whether choices reflect true expected values or over/under-weight certain outcomes |
| **Post-outcome adjustment** | Change in risk level choice following wins vs. losses (requires sequential analysis of temporal_slices) |
| **Decision speed** | `mean_reaction_time` and per-spin `duration` — faster decisions may indicate more impulsive choice |

## Scoring Guidance for Analysts

- Use `risk_taking_rate` as the primary measure of risk preference
- Use `net_earnings` as the primary outcome measure
- Use `temporal_slices` for sequential analysis (e.g., did the participant switch to lower risk after a loss?)
- `mean_reaction_time` can indicate deliberation vs. impulsivity
- The `level` field in temporal_slices identifies which button was pressed, but `risk_level` is the authoritative risk indicator — button numbers are randomly mapped to risk levels each session
- Do **not** use `score`, `correct_answers`, or `wrong_answers` for cognitive analysis — they are legacy compatibility fields
