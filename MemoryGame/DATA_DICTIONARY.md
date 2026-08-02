# MemoryGame — Data Dictionary

## Cognitive Background

MemoryGame is a **visual-spatial associative memory** task modelled on list-learning paradigms
such as the Rey Auditory Verbal Learning Test and the Brief Visuospatial Memory Test. It
separates three processes that are often conflated in simpler memory tasks:

- **Encoding** — a sequence of images appears in specific grid locations across repeated
  learning trials. Repetition across trials yields a learning curve.
- **Delay** — a filled interval during which an orientation survey is administered, preventing
  rehearsal and providing an independent clinical measure.
- **Retrieval** — the participant identifies each target image from a selection grid containing
  same-category distractors, then places it in its original location.

Because each trial scores image identity and spatial location separately, the task distinguishes
**item memory** (which picture) from **source/spatial memory** (where it was). These dissociate
in several clinical populations, so they are worth analysing separately rather than collapsing
into one accuracy score.

Distractors are drawn from the **same semantic category** as the target, so recognition errors
reflect genuine visual discrimination rather than category-level guessing.

### Task Design

- **18 categories × 6 images** (stimulus set `memory-game-v2-2026-08`)
- Each round selects `seqLength` targets, each from a **distinct** category
- The selection grid holds each target plus **2 same-category distractors** (3× `seqLength` items)
- Learning trials repeat the same sequence, producing a per-trial learning curve
- Delay is filled by the orientation survey, whose duration is set by `retrieval_delay`

### Key Metrics

- **Encoding points** — cumulative correct responses across learning trials
- **Recall points** — correct responses after the delay; the primary memory outcome
- **Selection vs. placement accuracy** — item memory vs. spatial memory, scored separately
- **Time to select vs. placement time** — retrieval latency vs. spatial decision latency
- **Orientation survey** — clinical orientation to time, scored independently

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `foils` | number | 2 | Distractor level. `1` → 3 targets per round; any other value → 4 |
| `encoding_trials` | number | 3 | Number of learning trials before the delay |
| `animation_interval` | number (s) | 2 | Delay between images during encoding (stored as ms) |
| `animation_persistance` | number (s) | 1 | How long each image stays visible (stored as ms) |
| `retrieval_delay` | number (min) | 1 | Filled delay before recall (stored as seconds) |

`seqLength` is derived from `foils` and is not settable directly. It is always 3 or 4, well
below the 18 available categories.

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `stimulus_set_version` | string | Stimulus set identifier, e.g. `memory-game-v2-2026-08`. Use this to separate sessions when the image library changes |
| `score` | number | Not emitted by this activity — see *Notes* |
| `point` | 1 \| 2 | 2 if all targets correct, else 1 |
| `correct_answers` | number | Correct taps in the final recall phase |
| `wrong_answers` | number | Incorrect taps in the final recall phase |
| `total_questions` | number | `seqLength` — targets per round |
| `total_learning/encoding_points` | number | Cumulative correct responses across learning trials |
| `total_recall/recall_points` | number | Correct responses in the recall phase |
| `time_of_recall_phase` | number (ms) | Duration of the recall phase |
| `time_taken_for_each_trial` | number[] | Per-trial durations across learning trials |
| `locations` | number[] | Grid cell indices (1–9) used for this session |
| `images` | object[] | Per-target `{ category, index }`, both 1-based |
| `target_sequence` | object | See below |
| `images_in_selection_grid` | object[] | See below |
| `per_round` | array[] | See below |
| `is_favorite` | boolean | Dashboard favourite flag |

### `target_sequence`

| Field | Type | Description |
|-------|------|-------------|
| `image_id` | string[] | Stimulus IDs of the targets, `"001"`–`"108"` |
| `image_boxes` | object[] | Serialized target elements (see *Notes*) |
| `selection_boxes` | object[] | Serialized selection-grid elements (see *Notes*) |
| `image_sequence` | object[] | Same as `static_data.images` |

### `images_in_selection_grid`

One entry per selection-grid item (`3 × seqLength`).

| Field | Type | Description |
|-------|------|-------------|
| `item_id` | string | Stimulus ID, `"001"`–`"108"` |
| `selection_grid_location` | number | 0-based position in the grid as displayed |
| `used` | boolean | Whether this item was one of the targets (vs. a distractor) |

### `per_round`

Array of learning trials; each trial is an array of paired select/place actions.

| Field | Type | Description |
|-------|------|-------------|
| `time_to_select` | number (ms) | Latency to pick an image from the selection grid |
| `selection_grid_box_selection.value` | number | Which grid item was chosen |
| `selection_grid_box_selection.is_correct` | boolean | Whether the correct image was chosen |
| `placement_time` | number (ms) | Latency to place the chosen image |
| `placement_location.value` | number | Grid cell where it was placed |
| `placement_location.is_correct` | boolean | Whether placement matched the original location |
| `total_time_per_trial` | number (ms) | `time_to_select + placement_time` |

### Orientation survey

Administered during the delay. Each field is `{ value, is_correct }`.

| Field | Description |
|-------|-------------|
| `start_time` | Participant's estimate of the current time, `H:MM` |
| `day` | Day of week |
| `today_date` | Day of month |
| `month` | Month |
| `year` | Year |
| `season` | Season |

## `temporal_slices`

One entry per action, plus a final `manual_exit` route marker. Each carries `duration`, `value`,
and `type` (`true` = correct). `per_round` is the derived, analysis-friendly view of this array.

## Key Analysis Variables

| Variable | Derivation |
|----------|------------|
| Learning slope | Correct responses per learning trial across `per_round` |
| Delayed recall | `total_recall/recall_points` — primary memory outcome |
| Retention ratio | `total_recall/recall_points` ÷ final learning-trial score |
| Item memory | `selection_grid_box_selection.is_correct` rate |
| Spatial memory | `placement_location.is_correct` rate |
| Recognition discriminability | Target hits vs. same-category distractor false alarms, via `images_in_selection_grid.used` |
| Orientation score | Count of `is_correct` across the six survey fields |

## Notes and Caveats

**`score` is not emitted.** Unlike most activities, MemoryGame does not write a `static_data.score`
field. Use `total_recall/recall_points ÷ total_questions` for a comparable 0–100 measure.

**Orientation survey shape is inconsistent.** If the participant submits the survey, its fields
are nested under `orientation_survey`. If the session ends without submission, an earlier
code path writes the same fields **flat** at the top level of `static_data`. Analysis code
should handle both. This predates the v2 stimulus work and is not yet fixed, because changing it
alters the shape of already-collected data.

**`image_boxes` and `selection_boxes` are serialized React elements**, not plain data. They
survive `JSON.stringify` as `{ type, key, props, ... }`. The `key` field is the stimulus ID and
is the only reliable part; prefer `target_sequence.image_id` and
`images_in_selection_grid.item_id`. These fields are retained for backward compatibility.

**Stimulus ID ranges changed in `memory-game-v2-2026-08`.** `images[].category` now spans 1–18
(previously 1–12) and `images[].index` spans 1–6 (previously 1–4). Stimulus IDs span
`"001"`–`"108"` (previously `"01"`–`"48"`). Filter on `stimulus_set_version` when combining
sessions across that boundary.
