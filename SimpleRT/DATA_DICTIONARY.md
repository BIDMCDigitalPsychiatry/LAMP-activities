# Simple & Choice Reaction Time (SimpleRT) — Data Dictionary

## Cognitive Test Background

SimpleRT implements the two most fundamental paradigms in experimental psychology: **Simple Reaction Time (SRT)** and **Choice Reaction Time (CRT)**. These tasks have been used since Donders (1868) first demonstrated that the time required for a mental operation can be measured by comparing response latencies across conditions of increasing complexity.

- **Simple RT**: A single stimulus appears at a variable interval; the participant responds as quickly as possible. This isolates **psychomotor speed** — the minimum time needed to detect a stimulus and execute a motor response, with no decision component.
- **Choice RT**: A stimulus appears in one of two locations; the participant responds to the matching side. This adds a **stimulus-response mapping** decision, engaging response selection processes beyond simple detection.

The difference between CRT and SRT (Donders' "b-reaction" minus "a-reaction") provides a pure estimate of **decision time** — the cognitive cost of selecting among response alternatives. This subtraction method remains foundational to cognitive chronometry.

SRT and CRT are used as baseline measures in nearly all neuropsychological batteries because they quantify the speed of the information-processing pipeline independent of higher-order cognition. Slowed RT is among the most sensitive early indicators of neurological change and is affected by aging, traumatic brain injury, medication effects, fatigue, and sleep deprivation.

### Related Tests and Constructs

| Construct | How Measured | Related Standardized Test |
|-----------|-------------|--------------------------|
| **Psychomotor speed** | `simple_mean_rt`, `simple_median_rt` | Deary-Liewald RT task (Deary et al., 2011); CANTAB RTI |
| **Response selection / decision time** | `choice_mean_rt − simple_mean_rt` | Donders' subtraction method (1868); Hick's law paradigms |
| **Motor impulsivity** | `anticipation_count` (responses before stimulus) | CPT commission errors; Stop-Signal RT |
| **Response accuracy under speed pressure** | `choice_error_count` (wrong-side responses) | Eriksen Flanker errors; choice RT accuracy |
| **Processing speed variability** | `simple_sd_rt`, `choice_sd_rt` | Intra-individual RT variability (IIV); a sensitive marker of ADHD and TBI |
| **Vigilance / sustained readiness** | RT trend across trials in `temporal_slices` | Psychomotor Vigilance Task (PVT; Dinges & Powell, 1985) |

Key references:

> Donders, F. C. (1868/1969). On the speed of mental processes. *Acta Psychologica, 30*, 412–431. (Translated by W. G. Koster)

> Deary, I. J., Liewald, D., & Nissan, J. (2011). A free, easy-to-use, computer-based simple and four-choice reaction time programme: The Deary-Liewald reaction time task. *Behavior Research Methods, 43*(1), 258–268.

> Jensen, A. R. (2006). *Clocking the Mind: Mental Chronometry and Individual Differences.* Elsevier.

> Dinges, D. F., & Powell, J. W. (1985). Microcomputer analyses of performance on a portable, simple visual RT task during sustained operations. *Behavior Research Methods, Instruments, & Computers, 17*(6), 652–655.

---

This document describes the data emitted by the SimpleRT activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

## Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `duration` | number | Total elapsed time in milliseconds from game start to result submission |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-trial event log (see below) |
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `forward` | boolean | *(optional)* If the activity was configured with a forward nav button, indicates whether the user advanced forward (`true`) or clicked back (`false`) |
| `done` | boolean | *(optional)* `true` when the game ended normally (not via back/forward navigation) |
| `clickBack` | boolean | *(optional)* `true` when the user exited via the back arrow |

---

## static_data — RT Metrics

These are the recommended fields for cognitive analysis.

### Simple RT

| Field | Type | Description |
|-------|------|-------------|
| `simple_mean_rt` | number | **Mean reaction time (ms) for correct simple RT trials.** The primary measure of psychomotor speed. Excludes anticipation errors (RT < 100ms). |
| `simple_median_rt` | number | **Median reaction time (ms) for correct simple RT trials.** More robust to outliers than the mean; preferred for skewed RT distributions. |
| `simple_sd_rt` | number | **Standard deviation of correct simple RTs (ms).** Intra-individual variability (IIV) — elevated IIV is a sensitive marker of attentional lapses, ADHD, and TBI. |
| `simple_correct_count` | number | Number of valid simple RT responses (RT ≥ 100ms). |
| `simple_trial_count` | number | Total simple RT trials attempted (including anticipation errors). |

### Choice RT

| Field | Type | Description |
|-------|------|-------------|
| `choice_mean_rt` | number | **Mean reaction time (ms) for correct choice RT trials.** Reflects psychomotor speed plus response selection time. |
| `choice_median_rt` | number | **Median reaction time (ms) for correct choice RT trials.** |
| `choice_sd_rt` | number | **Standard deviation of correct choice RTs (ms).** |
| `choice_correct_count` | number | Number of choice RT trials with correct side response and RT ≥ 100ms. |
| `choice_error_count` | number | Number of choice RT trials where the participant tapped the wrong side. Indicates response selection errors. |
| `choice_trial_count` | number | Total choice RT trials attempted (including anticipation errors). |

### Overall

| Field | Type | Description |
|-------|------|-------------|
| `overall_mean_rt` | number | **Mean RT across all correct trials (both phases).** |
| `anticipation_count` | number | **Total anticipation errors across both phases.** A response during the inter-stimulus interval (before the stimulus appeared) or with RT < 100ms. Reflects motor impulsivity. |

### Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `simple_trials` | number | Configured number of simple RT trials |
| `choice_trials` | number | Configured number of choice RT trials |
| `min_isi_ms` | number | Minimum inter-stimulus interval (ms) |
| `max_isi_ms` | number | Maximum inter-stimulus interval (ms) |

### Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | number | Total correct responses across both phases |
| `wrong_answers` | number | Total errors (anticipations + wrong-side responses) |
| `total_questions` | number | Total trials attempted |
| `score` | number | Accuracy percentage (0–100) |
| `point` | number | `2` if score ≥ 80, else `1` |

### Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object | *(optional)* Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5) ratings. Only present when the game ends normally. |

---

## temporal_slices — Event Log

An array of event objects, one per trial plus a final exit event.

### Trial Entry

| Field | Type | Description |
|-------|------|-------------|
| `duration` | number | Reaction time in milliseconds. `−1` for anticipation errors (response before stimulus or RT < 100ms). |
| `item` | number | Sequential trial number across both phases (1-indexed). |
| `level` | number | `1` for simple RT phase, `2` for choice RT phase. |
| `type` | boolean | `true` if the response was correct and not an anticipation, `false` otherwise. |
| `value` | null | Reserved, always `null`. |
| `phase` | string | `"simple"` or `"choice"`. |
| `trial` | number | Trial number within the current phase (1-indexed). |
| `stimulus_side` | string | `"center"` for simple RT; `"left"` or `"right"` for choice RT. |
| `response_side` | string \| null | `"center"` for simple RT taps; `"left"` or `"right"` for choice RT taps; `null` for anticipation errors. |
| `anticipation` | boolean | `true` if the participant responded before the stimulus appeared or within 100ms. |
| `isi` | number | The inter-stimulus interval (ms) used for this trial — the random delay before the stimulus appeared. |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": true }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

### Phase 1 — Simple RT

1. A blank screen displays "Wait..." with a pulsing animation
2. After a random inter-stimulus interval (ISI, default 1000–4000ms), a blue circle appears in the center
3. The participant taps anywhere on the screen as quickly as possible
4. RT is displayed briefly (green if valid, red if anticipation)
5. Next trial begins with a new random ISI
6. Tapping during the ISI (before the stimulus) registers as an anticipation error

### Phase 2 — Choice RT

1. A transition card explains the new rules; the participant taps "Ready" to begin
2. A blank screen displays "Wait..."
3. After a random ISI, a blue circle appears on either the left or right half of the screen
4. The participant taps the matching side (left or right)
5. RT is displayed briefly (green if correct, red if wrong side or anticipation)
6. Next trial begins

### Completion

1. After all trials, a "Game Over" overlay appears briefly
2. Post-game questionnaire (clarity + happiness ratings)
3. Results sent via `postMessage`

### Configurable Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `simple_trials` | number | `20` | Number of simple RT trials |
| `choice_trials` | number | `20` | Number of choice RT trials (set to 0 to skip choice phase) |
| `min_isi_ms` | number | `1000` | Minimum inter-stimulus interval in ms |
| `max_isi_ms` | number | `4000` | Maximum inter-stimulus interval in ms |

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Psychomotor speed | `simple_median_rt` | The purest measure of stimulus detection + motor execution speed. Median is preferred over mean for RT data (positively skewed). Typical healthy adult range: 180–250ms |
| Response selection time | `choice_median_rt − simple_median_rt` | Donders' subtraction: isolates the cognitive cost of selecting among alternatives. Typical difference: 40–100ms |
| Motor impulsivity | `anticipation_count` | Responses before stimulus onset indicate failure to inhibit prepotent motor responses. Compare with CPT commission errors |
| Response accuracy | `choice_error_count / choice_trial_count` | Wrong-side errors in choice RT reflect response selection failures under speed pressure |
| Processing speed variability | `simple_sd_rt`, `choice_sd_rt` | Intra-individual RT variability (IIV) is elevated in ADHD, TBI, sleep deprivation, and early dementia. More sensitive than mean RT in many clinical populations |
| Vigilance decrement | RT trend across `temporal_slices` | Increasing RT over trials indicates declining sustained readiness. Analogous to Psychomotor Vigilance Task (PVT) time-on-task effects |
| Speed-accuracy tradeoff | `choice_mean_rt` vs. `choice_error_count` | Fast RTs with many errors suggest impulsive responding; slow RTs with few errors suggest cautious strategy |
| Fatigue / medication effects | Pre- vs. post-intervention `simple_median_rt` | SRT is highly sensitive to pharmacological effects, fatigue, and sleep deprivation due to minimal cognitive overhead |
