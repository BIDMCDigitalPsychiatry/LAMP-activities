# N-Back — Data Dictionary

## Cognitive Background

The **N-Back task** is a continuous performance measure of **working memory updating** (Owen et al., 2005). On each trial a letter appears briefly; the participant taps "Match" whenever the current letter is the same as the one presented *N* items earlier. The task requires simultaneously encoding new items, maintaining a sliding window of recent items, and comparing incoming stimuli against that window.

Performance is quantified using **signal detection theory**: *d'* (d-prime) measures the participant's ability to discriminate targets from non-targets, while *criterion* (c) captures response bias (liberal vs. conservative). Higher d' indicates better working memory capacity; the 2-back condition is substantially more demanding than 1-back.

### References

- Owen, A. M., McMillan, K. M., Laird, A. R., & Bullmore, E. (2005). N-back working memory paradigm: A meta-analysis of normative functional neuroimaging studies. *Human Brain Mapping*, 25(1), 46–59.
- Jaeggi, S. M., Buschkuehl, M., Perrig, W. J., & Meier, B. (2010). The concurrent validity of the N-back task as a working memory measure. *Memory*, 18(4), 394–412.
- Hautus, M. J. (1995). Corrections for extreme proportions and their biasing effects on estimated values of d'. *Behavior Research Methods, Instruments, & Computers*, 27(1), 46–51.
- Kane, M. J., Conway, A. R., Miura, T. K., & Colflesh, G. J. (2007). Working memory, attention control, and the N-back task: A question of construct validity. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 33(3), 615–622.

---

## Trial Types

| Outcome | Target? | Responded? | Description |
|---------|---------|------------|-------------|
| Hit | Yes | Yes | Correctly identified a match |
| Miss | Yes | No | Failed to detect a match |
| False Alarm | No | Yes | Incorrectly reported a match |
| Correct Rejection | No | No | Correctly withheld response |

---

## Payload Schema

### `static_data`

| Field | Type | Description |
|-------|------|-------------|
| `n_level` | `number` | N-back level (1, 2, or 3) |
| `d_prime` | `number` | d' — sensitivity index (z(hit_rate) − z(false_alarm_rate)). Log-linear correction applied (Hautus, 1995). |
| `criterion` | `number` | c — response bias (−0.5 × (z(hit_rate) + z(false_alarm_rate))). Positive = conservative, negative = liberal. |
| `hit_rate` | `number` | Proportion of targets correctly identified (log-linear corrected) |
| `false_alarm_rate` | `number` | Proportion of non-targets incorrectly endorsed (log-linear corrected) |
| `hits` | `number` | Count of hits |
| `misses` | `number` | Count of misses |
| `false_alarms` | `number` | Count of false alarms |
| `correct_rejections` | `number` | Count of correct rejections |
| `hit_rt_mean` | `number` | Mean RT of hit responses (ms) |
| `hit_rt_median` | `number` | Median RT of hit responses (ms) |
| `hit_rt_sd` | `number` | SD of hit response RTs (ms) |
| `trials` | `number` | Setting: total trials |
| `stimulus_duration_ms` | `number` | Setting: letter display duration |
| `isi_ms` | `number` | Setting: inter-stimulus interval |
| `target_proportion` | `number` | Setting: proportion of trials that are targets |
| `correct_answers` | `number` | Legacy compat — hits + correct_rejections |
| `wrong_answers` | `number` | Legacy compat — misses + false_alarms |
| `total_questions` | `number` | Legacy compat — total trials |
| `score` | `number` | Legacy compat — percent correct (0–100) |
| `point` | `number` | Legacy compat — 2 if score >= 80%, else 1 |
| `questionnaire` | `object?` | Post-game self-report (`clarity`, `happiness`, 1–5) |

### `temporal_slices`

Each entry is one trial:

| Field | Type | Description |
|-------|------|-------------|
| `duration` | `number` | Response time in ms (0 if no response) |
| `item` | `number` | 1-indexed trial number |
| `level` | `number` | N-back level |
| `type` | `boolean` | `true` = correct (hit or correct_rejection), `false` = incorrect |
| `value` | `null` | Reserved |
| `letter` | `string` | Letter shown on this trial |
| `is_target` | `boolean` | Whether this trial was a target (matched N-back) |
| `responded` | `boolean` | Whether participant tapped Match |
| `outcome` | `string` | `"hit"`, `"miss"`, `"false_alarm"`, or `"correct_rejection"` |

Final entry:

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | `"manual_exit"` |
| `value` | `boolean` | `true` = navigated away, `false` = completed normally |

---

## Key Analysis Variables

1. **d' (d-prime)** (`d_prime`) — primary measure of working memory capacity / discriminability
2. **Criterion (c)** (`criterion`) — response bias; liberal responders have more false alarms, conservative responders have more misses
3. **Hit Rate** (`hit_rate`) — proportion of targets detected; low hit rate suggests poor memory updating
4. **False Alarm Rate** (`false_alarm_rate`) — proportion of non-targets incorrectly endorsed; elevated in impulsive responding
5. **Hit RT** (`hit_rt_mean`) — speed of correct target detection; slower RTs may indicate effortful retrieval
6. **Hit RT Variability** (`hit_rt_sd`) — response consistency; elevated in ADHD and fatigue
7. **Miss Rate** (`misses / (hits + misses)`) — failures to detect targets; increases with cognitive load
8. **1-back vs 2-back comparison** — the d' difference between levels indexes working memory capacity limits

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `n_level` | `number` | 1 | 1–3 | N-back level (how many items back to compare) |
| `trials` | `number` | 40 | 10–100 | Total number of trials |
| `stimulus_duration_ms` | `number` | 1500 | 200–2000 | How long each letter is displayed |
| `isi_ms` | `number` | 2000 | 500–5000 | Inter-stimulus interval (blank between letters) |
| `target_proportion` | `number` | 0.3 | 0.1–0.5 | Proportion of trials that are targets |
