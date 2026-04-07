# BoxGame (Spatial Span) — Data Dictionary

## Cognitive Test Background

This activity implements a digital variant of the **Corsi Block-Tapping Test**, the standard clinical measure of visuospatial short-term and working memory. The examiner (computer) highlights blocks in a sequence; the participant reproduces the sequence by tapping. Forward span measures visuospatial short-term memory; backward (reverse) span measures visuospatial working memory.

The original test was introduced by:

> Corsi, P. M. (1972). *Human memory and the medial temporal region of the brain.* Unpublished doctoral dissertation, McGill University, Montreal.

The Corsi task has since been widely validated and normed. Key references for the digital adaptation and psychometric properties:

> Kessels, R. P. C., van Zandvoort, M. J. E., Postma, A., Kappelle, L. J., & de Haan, E. H. F. (2000). The Corsi Block-Tapping Task: Standardization and normative data. *Applied Neuropsychology, 7*(4), 252–258.

> Berch, D. B., Krikorian, R., & Huha, E. M. (1998). The Corsi block-tapping task: Methodological and theoretical considerations. *Brain and Cognition, 38*(3), 317–338.

This implementation uses a 4×4 regular grid (16 positions) rather than the standard 9 irregularly-placed blocks. The key measurement properties — sequential recall of spatial locations — are preserved.

---

## Payload Structure

```json
{
  "duration": 45000,
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
| `forward` | boolean | Present only when forward navigation is used to exit |
| `clickBack` | boolean | Present only when the user tapped the back arrow to exit early |

## static_data — Summary Metrics

### Corsi-Specific Metrics

| Field | Type | Description |
|-------|------|-------------|
| `mode` | string | `"forward"` or `"backward"` — which spatial span variant was administered |
| `max_span` | integer | Longest sequence length correctly reproduced. **Primary Corsi outcome.** |
| `total_score` | integer | Sum of span lengths for all correct trials (e.g., correct at span 2 + 3 + 4 = 9). Sometimes called "Corsi span score" |
| `starting_span` | integer | Initial sequence length (default: 2) |

### Level Results

| Field | Type | Description |
|-------|------|-------------|
| `level_results` | object[] | One entry per sequence attempted, in order |
| `levels_completed` | integer | Number of sequences attempted |
| `total_levels` | integer | Maximum levels configured (default: 5) |

Each entry in `level_results`:

| Field | Type | Description |
|-------|------|-------------|
| `level` | integer | Level number (1-indexed) |
| `span` | integer | Sequence length for this trial |
| `correct` | boolean | `true` if the entire sequence was reproduced correctly |
| `taps` | integer | Number of taps the participant made |
| `time_ms` | integer | Response time in ms (from "Your turn" to final tap) |

### Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object | Post-task subjective ratings (present only on normal completion) |
| `questionnaire.clarity` | integer | 1–5 rating: "How clear were the instructions?" |
| `questionnaire.happiness` | integer | 1–5 rating: "How happy would you be to do this again?" |

### Legacy Fields

These fields exist for backward compatibility with the LAMP dashboard. Use the Corsi-specific fields above for analysis.

| Field | Type | Mapping |
|-------|------|---------|
| `correct_answers` | integer | Number of correctly completed sequences (= levels where `correct: true`) |
| `total_questions` | integer | Total sequences attempted (= `levels_completed`) |
| `wrong_answers` | integer | Number of failed sequences |
| `score` | integer | `round(correct_answers / total_questions * 100)` |
| `point` | integer | 2 if score = 100, else 1 |

## temporal_slices — Event Log

Each tap produces one entry. Events are ordered chronologically.

### Tap Event

```json
{
  "duration": 890,
  "item": 5,
  "level": 1,
  "type": true,
  "value": null,
  "span": 2,
  "tap_index": 1
}
```

| Field | Type | Description |
|-------|------|-------------|
| `duration` | integer | ms since the previous tap (or since "Your turn" for the first tap in a sequence) |
| `item` | integer | Block number tapped (1–16, numbered left-to-right, top-to-bottom) |
| `level` | integer | Current level (1-indexed) |
| `type` | boolean | `true` = correct tap (matches expected position), `false` = wrong tap |
| `value` | null | Reserved (always `null`) |
| `span` | integer | Current sequence length |
| `tap_index` | integer | Which position in the sequence this tap corresponds to (1-indexed). In forward mode, tap 1 should match position 1 of the shown sequence; in backward mode, tap 1 should match the *last* position |

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `reverse_tapping` | boolean | `false` | If `true`, participant taps in reverse order (backward span) |
| `starting_span` | integer | `2` | Initial sequence length |
| `max_levels` | integer | `5` | Number of levels before game ends |
| `max_failures` | integer | `2` | Consecutive failures at the same span before game ends |

## Game Logic Summary

1. A random sequence of `span` unique blocks (from 16) is generated
2. Blocks highlight one at a time (800ms on, 300ms gap)
3. Participant taps blocks in the same order (forward) or reverse order (backward)
4. Each tap gives immediate green (correct) or red (wrong) visual feedback on the tapped block
5. After all taps: if all correct, span increases by 1 for the next level; if any wrong, failure count increments
6. Two consecutive failures at the same span → game over
7. Completing all configured levels → game over
8. Game over summary (2s) → questionnaire → results sent via `postMessage`

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| Visuospatial short-term memory | `max_span` (forward mode) | Standard Corsi forward span. Typical adult range: 5–7 |
| Visuospatial working memory | `max_span` (backward mode) | Standard Corsi backward span. Typically 1–2 lower than forward |
| Overall spatial memory capacity | `total_score` | Sum of correct span lengths; more sensitive than max_span alone |
| Processing speed | `temporal_slices[].duration` | Tap-to-tap response time; faster responses may indicate stronger spatial representations |
| Error patterns | `level_results` + `temporal_slices` | Which positions are confused, at what span length errors emerge |
| Learning effects | `level_results` sequence | Performance trajectory across trials |
| Forward–backward difference | `max_span` across sessions | Administer both modes; backward − forward difference indexes executive contribution to spatial memory |
