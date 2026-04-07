# Stroop Color-Word Test — Data Dictionary

## Cognitive Test Background

The Stroop task implements a digital version of the **Stroop Color-Word Interference Test** (Stroop, 1935), one of the most widely used measures of **selective attention**, **cognitive control**, and **interference suppression** in neuropsychology. The participant sees a color word (e.g., "RED") printed in an incongruent ink color (e.g., blue) and must identify the *ink color* while suppressing the automatic tendency to read the word.

The **Stroop effect** — the increase in reaction time and errors on incongruent trials compared to congruent trials — is among the most robust findings in cognitive psychology. It reflects the cost of resolving conflict between two competing response channels (word reading vs. color naming), engaging the anterior cingulate cortex (ACC) and dorsolateral prefrontal cortex (DLPFC).

The Stroop task is clinically sensitive to frontal lobe damage, ADHD, depression, schizophrenia, and aging. Unlike Go/No-Go tasks (which measure response inhibition), the Stroop specifically measures **interference control** — the ability to suppress a prepotent but task-irrelevant response in favor of a weaker but task-relevant one.

### Related Tests and Constructs

| Construct | How Measured | Related Standardized Test |
|-----------|-------------|--------------------------|
| **Interference control** | Stroop effect (incongruent RT − congruent RT) | Golden Stroop (Golden, 1978); D-KEFS Color-Word Interference |
| **Selective attention** | Accuracy on incongruent trials | D-KEFS (Delis et al., 2001) |
| **Processing speed** | Congruent trial RT (baseline color naming speed) | WAIS-IV Processing Speed Index |
| **Cognitive control / conflict monitoring** | Incongruent accuracy and RT | Eriksen Flanker; Simon task |
| **Automaticity of reading** | Magnitude of Stroop effect | Reading fluency measures |
| **Facilitation effect** | Congruent RT − neutral RT | Stroop facilitation (less commonly reported) |

Key references:

> Stroop, J. R. (1935). Studies of interference in serial verbal reactions. *Journal of Experimental Psychology, 18*(6), 643–662.

> Golden, C. J. (1978). *Stroop Color and Word Test.* Stoelting.

> MacLeod, C. M. (1991). Half a century of research on the Stroop effect: An integrative review. *Psychological Bulletin, 109*(2), 163–203.

> Delis, D. C., Kaplan, E., & Kramer, J. H. (2001). *Delis-Kaplan Executive Function System (D-KEFS).* Psychological Corporation.

---

This document describes the data emitted by the Stroop activity via `postMessage` when the game ends. The payload is a JSON string with the following top-level structure.

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

## static_data — Stroop Metrics

### Primary Measures

| Field | Type | Description |
|-------|------|-------------|
| `stroop_effect` | number | **Incongruent mean RT − congruent mean RT (ms).** The primary measure of interference. Larger values indicate greater difficulty suppressing word reading. Typical range: 50–150ms in healthy adults. `0` if either condition was not administered. |
| `overall_mean_rt` | number | **Mean RT across all correct trials (ms).** |
| `overall_accuracy` | number | **Accuracy percentage (0–100) across all trials.** |
| `total_trials` | number | Total trials completed. |
| `total_correct` | number | Total correct responses. |
| `total_errors` | number | Total incorrect responses. |

### Per-Condition Breakdown

Each of the following fields (`congruent`, `incongruent`, `neutral`) is an object with:

| Field | Type | Description |
|-------|------|-------------|
| `count` | number | Number of trials in this condition |
| `correct_count` | number | Number of correct responses |
| `error_count` | number | Number of incorrect responses |
| `mean_rt` | number | Mean RT for correct trials (ms) |
| `median_rt` | number | Median RT for correct trials (ms) |
| `sd_rt` | number | Standard deviation of correct RTs (ms) |

### Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `trials_per_condition` | number | Configured trials per condition |
| `conditions` | string | Comma-separated list of conditions used (e.g., `"congruent,incongruent,neutral"`) |
| `fixation_ms` | number | Fixation cross duration (ms) |

### Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `correct_answers` | number | Total correct responses |
| `wrong_answers` | number | Total incorrect responses |
| `total_questions` | number | Total trials |
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
| `duration` | number | Reaction time in milliseconds from stimulus onset to button press. |
| `item` | number | Sequential trial number (1-indexed). |
| `level` | number | Always `1`. |
| `type` | boolean | `true` if the response was correct, `false` otherwise. |
| `value` | null | Reserved, always `null`. |
| `word` | string | The text displayed (e.g., `"RED"`, `"DESK"`). |
| `ink_color` | string | The ink color of the displayed word (`"red"`, `"blue"`, `"green"`, `"yellow"`). |
| `response` | string | The color button the participant tapped (`"red"`, `"blue"`, `"green"`, `"yellow"`). |
| `condition` | string | `"congruent"`, `"incongruent"`, or `"neutral"`. |

### Exit Entry

The final entry in `temporal_slices` is always:

```json
{ "type": "manual_exit", "value": true }
```

`value` is `true` if the user exited via navigation (back/forward), `false` for normal game completion.

---

## Game Logic Summary

### Trial Types

| Condition | Word | Ink Color | Example | Cognitive Demand |
|-----------|------|-----------|---------|-----------------|
| **Congruent** | Color name | Same color | "RED" in red ink | Baseline — word and color agree |
| **Incongruent** | Color name | Different color | "RED" in blue ink | Interference — must suppress reading |
| **Neutral** | Non-color word | Any color | "DESK" in green ink | No word-color conflict |

### Trial Flow

1. **Fixation cross** displayed briefly (configurable, default 500ms)
2. **Stimulus** appears: a word rendered in a colored ink
3. Participant taps one of **4 color buttons** (red, blue, green, yellow) to identify the ink color
4. **Feedback** flash (✓ green / ✗ red) for 500ms
5. Next trial begins

### Completion

1. After all trials, "Game Over" overlay appears briefly
2. Post-game questionnaire (clarity + happiness ratings)
3. Results sent via `postMessage`

### Configurable Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `trials_per_condition` | number | `20` | Number of trials per condition |
| `conditions` | string | `"congruent,incongruent,neutral"` | Comma-separated list of conditions to include |
| `fixation_ms` | number | `500` | Duration of fixation cross between trials (ms) |
| `feedback_ms` | number | `500` | Duration of correct/incorrect feedback (ms) |

### Design Notes

- Trials are randomized across all conditions (not blocked)
- Ink colors are balanced across conditions (each color appears equally often)
- Neutral words are common nouns matched for approximate length, with no color association
- 4 color buttons (red, blue, green, yellow) are always visible in a 2×2 grid

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Interference control | `stroop_effect` (incongruent − congruent RT) | The gold standard measure. Larger = more interference. Typical healthy adult: 50–150ms. Elevated in ADHD, frontal damage, aging |
| Facilitation | `neutral mean_rt − congruent mean_rt` | Benefit of word-color agreement. Usually smaller than interference (20–40ms) |
| Error-based interference | `incongruent.error_count − congruent.error_count` | Complements RT-based Stroop effect; more sensitive to impulsive responding |
| Selective attention | `incongruent.correct_count / incongruent.count` | Proportion correct on the hardest condition; floor effects indicate severe impairment |
| Processing speed baseline | `congruent.mean_rt` | Color naming speed without interference; comparable to simple naming tasks |
| Speed-accuracy tradeoff | `incongruent.mean_rt` vs. `incongruent.error_count` | Fast RTs + many errors = impulsive; slow RTs + few errors = cautious |
| Cognitive control efficiency | `stroop_effect / congruent.mean_rt` | Proportional interference — normalizes for baseline speed differences across participants |
| Fatigue / practice effects | RT trend across `temporal_slices` | Increasing RT may indicate fatigue; decreasing RT may indicate practice or habituation to interference |
