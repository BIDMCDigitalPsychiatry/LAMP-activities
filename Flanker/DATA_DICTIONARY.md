# Flanker — Data Dictionary

## Cognitive Background

The **Eriksen Flanker Task** (Eriksen & Eriksen, 1974) measures attentional control and conflict resolution. Participants identify the direction of a central target arrow while ignoring flanking arrows that may be congruent, incongruent, or neutral. The **flanker effect** — the RT cost of incongruent vs. congruent flankers — indexes the ability to suppress conflicting response-relevant information.

The task is widely used in cognitive psychology and clinical neuropsychology as a measure of executive attention and interference control. It is a core component of the NIH Toolbox Cognition Battery (Zelazo et al., 2013) and the Attention Network Test (Fan et al., 2002).

### References

- Eriksen, B. A., & Eriksen, C. W. (1974). Effects of noise letters upon the identification of a target letter in a nonsearch task. *Perception & Psychophysics*, 16(1), 143–149.
- Fan, J., McCandliss, B. D., Sommer, T., Raz, A., & Posner, M. I. (2002). Testing the efficiency and independence of attentional networks. *Journal of Cognitive Neuroscience*, 14(3), 340–347.
- Zelazo, P. D., Anderson, J. E., Richler, J., et al. (2013). NIH Toolbox Cognition Battery (CB): Measuring executive function and attention. *Monographs of the Society for Research in Child Development*, 78(4), 16–33.
- Mullane, J. C., Corkum, P. V., Klein, R. M., & McLaughlin, E. (2009). Interference control in children with and without ADHD: A systematic review of Flanker and Simon task performance. *Child Neuropsychology*, 15(4), 321–342.

---

## Conditions

| Condition | Display Example | Description |
|-----------|----------------|-------------|
| Congruent | →→→→→ or ←←←←← | Flankers match central target |
| Incongruent | ←←→←← or →→←→→ | Flankers oppose central target |
| Neutral | ——→—— or ——←—— | Dashes flank central target (no directional conflict) |

---

## Payload Schema

### `static_data`

| Field | Type | Description |
|-------|------|-------------|
| `flanker_effect` | `number` | Incongruent mean RT − Congruent mean RT (ms). Primary interference measure. |
| `congruent` | `object` | Per-condition breakdown (see below) |
| `incongruent` | `object` | Per-condition breakdown (see below) |
| `neutral` | `object` | Per-condition breakdown (see below) |
| `overall_mean_rt` | `number` | Mean RT across all correct trials (ms) |
| `overall_accuracy` | `number` | Percent correct across all trials (0–100) |
| `total_trials` | `number` | Total trials presented |
| `total_correct` | `number` | Total correct responses |
| `total_errors` | `number` | Total incorrect responses (including timeouts) |
| `trials_per_condition` | `number` | Setting: trials per condition |
| `conditions` | `string` | Setting: comma-separated condition list |
| `fixation_ms` | `number` | Setting: fixation cross duration |
| `stimulus_duration_ms` | `number` | Setting: max stimulus display time |
| `correct_answers` | `number` | Legacy compat — same as `total_correct` |
| `wrong_answers` | `number` | Legacy compat — same as `total_errors` |
| `total_questions` | `number` | Legacy compat — same as `total_trials` |
| `score` | `number` | Legacy compat — same as `overall_accuracy` |
| `point` | `number` | Legacy compat — 2 if score ≥ 80%, else 1 |
| `questionnaire` | `object?` | Post-game self-report (`clarity`, `happiness`, 1–5) |

#### Per-condition breakdown object

| Field | Type | Description |
|-------|------|-------------|
| `count` | `number` | Trials in this condition |
| `correct_count` | `number` | Correct responses |
| `error_count` | `number` | Incorrect responses |
| `mean_rt` | `number` | Mean RT of correct responses (ms) |
| `median_rt` | `number` | Median RT of correct responses (ms) |
| `sd_rt` | `number` | SD of correct response RTs (ms) |

### `temporal_slices`

Each entry is one trial:

| Field | Type | Description |
|-------|------|-------------|
| `duration` | `number` | Response time in ms |
| `item` | `number` | 1-indexed trial number |
| `level` | `number` | Always 1 |
| `type` | `boolean` | `true` = correct, `false` = incorrect |
| `value` | `null` | Reserved |
| `target` | `string` | `"left"` or `"right"` — correct direction |
| `response` | `string` | `"left"`, `"right"`, or `"timeout"` |
| `condition` | `string` | `"congruent"`, `"incongruent"`, or `"neutral"` |
| `display` | `string` | The 5-character arrow string shown |

Final entry:

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | `"manual_exit"` |
| `value` | `boolean` | `true` = navigated away, `false` = completed normally |

---

## Key Analysis Variables

1. **Flanker Effect** (`flanker_effect`) — primary measure of attentional interference control
2. **Incongruent Accuracy** (`incongruent.error_count / incongruent.count`) — error susceptibility under conflict
3. **Congruent Mean RT** (`congruent.mean_rt`) — baseline processing speed
4. **Incongruent Mean RT** (`incongruent.mean_rt`) — processing speed under interference
5. **Overall Accuracy** (`overall_accuracy`) — general task engagement / comprehension
6. **RT Variability** (`congruent.sd_rt`, `incongruent.sd_rt`) — response consistency; elevated in ADHD
7. **Neutral Mean RT** (`neutral.mean_rt`) — baseline without directional flanker information
8. **Timeout Rate** — proportion of trials with `response === "timeout"` — sustained attention failures

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `trials_per_condition` | `number` | 20 | 1–50 | Number of trials per condition |
| `conditions` | `string` | `"congruent,incongruent,neutral"` | Any comma-separated subset | Which conditions to include |
| `fixation_ms` | `number` | 500 | 200–2000 | Fixation cross duration before each trial |
| `stimulus_duration_ms` | `number` | 1500 | 500–5000 | Maximum time stimulus is displayed; auto-advances as timeout if no response |
| `feedback_ms` | `number` | 500 | 200–2000 | Duration of correct/incorrect feedback |
