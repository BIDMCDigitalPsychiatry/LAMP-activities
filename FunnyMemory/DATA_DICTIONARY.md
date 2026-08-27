# FunnyMemory — Data Dictionary

## Cognitive Background

FunnyMemory is an associative episodic memory task built around incongruent
scenes: an everyday object appears somewhere it does not belong (an eggbeater
inside a microwave, a rabbit in a plant pot). Bizarre or incongruent pairings
are recalled better than plausible ones, and the size of that advantage is
sensitive to medial temporal lobe function, so the paradigm is used to probe
episodic binding rather than raw recognition.

The task separates three processes that a single recognition score would
conflate:

- **Free recall** — unprompted retrieval after a delay.
- **Cued recall** — retrieval given the scene minus the target object.
- **Forced-choice recognition** — recognition when retrieval demands are
  removed and only discrimination is required.

A participant who fails free recall but succeeds at recognition has a retrieval
deficit; one who fails both has an encoding or storage deficit. Because recall
responses are captured as audio rather than scored in-app, most recall measures
require transcription before analysis.

### Task Design

| Phase | What happens | Response |
|-------|--------------|----------|
| Learning | 6 scenes shown in sequence, each for `image_exposure_time`. Repeated `learning_trials` times. | Spoken naming of the 2 items per scene |
| Delay | Orientation survey fills the retention interval (`delay_time`) | Survey answers |
| Free recall | Participant recalls whatever they can | Audio |
| Cued recall (`recognition1`) | Scene shown with the target object removed, plus the question | Audio |
| Forced choice (`recognition2`) | 5 options: the primary scene plus 4 distractors, shuffled | Tap |

### Key Metrics

- Forced-choice accuracy — `number_of_correct_force_choice` out of 6
- Recall latency — `timeTakenForRecall`, `timeForRecognition1`
- Recognition decision time — `timeForRecognition2`
- Orientation — `orientation_survey.*.is_correct`

## Settings

| Setting | Meaning |
|---------|---------|
| `imageExposureTime` | Seconds each scene is displayed (multiplied by 1000 in code) |
| `numberOfTrials` | Learning repetitions over the same 6 scenes |
| `delayBeforeRecall` | Minutes of retention interval (multiplied by 60 in code) |

## `static_data` Fields

| Field | Type | Meaning |
|-------|------|---------|
| `stimulus_set_version` | string | Stimulus library identifier, e.g. `funny-memory-v2-2026-07`. **Always filter on this before pooling sessions** — see Notes |
| `image_set_shown` | number | Which monthly set (1–6) was served, derived from the calendar month |
| `image_load_failures` | number | Count of distinct stimulus URLs that failed to load this session. **Any value above 0 means the participant was shown a placeholder in place of a stimulus** |
| `image_exposure_time` | number | Milliseconds each scene was displayed |
| `learning_trials` | number | Configured learning repetitions |
| `delay_time` | number | Configured retention interval, seconds |
| `timeTakenForTrial` | number | Milliseconds spent in the learning phase |
| `timeTakenForRecall` | number | Milliseconds spent in free recall |
| `timeForRecognition1` | number | Milliseconds spent in cued recall |
| `timeForRecognition2` | number | Milliseconds spent in forced-choice recognition |
| `number_of_correct_force_choice` | number | Correct forced-choice selections, 0–6 |
| `total_number_of_pairings_listed` | number | Scenes reached, 1-based; below 6 indicates early exit |

### `orientation_survey`

Present only if the participant completed the delay survey. Each entry is
`{ value, is_correct }`.

| Key | Meaning |
|-----|---------|
| `start_time` | Reported time of day, `H:MM` |
| `day` | Reported day of week |
| `today_date` | Reported date |
| `month` | Reported month |
| `year` | Reported year |
| `season` | Reported season |

Note that `is_correct` is written as `true` for every field on the intermediate
`onStateChange` write and only reflects real validation on final `onSubmit`. Use
the last event for a session.

## `temporal_slices`

One entry per response.

| Field | Meaning |
|-------|---------|
| `duration` | Milliseconds since the previous response |
| `item` | Index of the scene within the monthly set |
| `level` | Phase: `Trial1`…`TrialN`, `recall`, `recognition1`, `recognition2`, or `manual_exit` |
| `type` | Forced choice only: `true` if the primary scene was selected, `false` otherwise. `null` for audio phases |
| `value` | Audio phases: `data:audio/mpeg;base64,…`. Forced choice: `null` |

Audio responses are **not** transcribed or scored in-app. Free-recall and
cued-recall accuracy require transcription against the `targetTerms` listed in
`src/components/DataForEachMonth/stimulusData.ts`.

## Key Analysis Variables

| Variable | Derivation |
|----------|------------|
| Forced-choice accuracy | `number_of_correct_force_choice / 6` |
| Chance performance | **0.20** for `funny-memory-v2-*` (5 options); **0.25** for v1 (4 options) |
| Recognition decision speed | `timeForRecognition2 / 6` |
| Completion | `total_number_of_pairings_listed === 6` and no `manual_exit` slice |
| Data validity | `image_load_failures === 0` |

## Notes and Caveats

- **Scores are not comparable across stimulus set versions.** The v2 library
  (`funny-memory-v2-2026-07`) is not a re-rendering of v1: the scenes, target
  objects and questions are all different, and forced-choice recognition
  presents 5 options rather than 4. Chance therefore moves from 25% to 20%.
  Sessions from different `stimulus_set_version` values must be analysed
  separately, not pooled.
- **v1 sessions carry no `stimulus_set_version` field.** Treat its absence as
  the v1 library.
- **Stimuli are fetched over the network at runtime**, not bundled into the
  activity. A participant without connectivity, or a change to the hosting
  location, produces placeholder tiles and a non-zero `image_load_failures`.
  Exclude affected sessions rather than scoring them as seen-but-incorrect.
- **The monthly set is chosen from the calendar month, not from study day.**
  Two participants enrolled in different months see different stimuli at the
  same study visit, and a participant crossing a month boundary between visits
  changes sets.
- **The six sets repeat twice per calendar year.** `getMonthIndex()` returns the
  calendar month for January–June and `month − 6` for July–December, so July
  serves set 1 again, August set 2, and so on. A participant in a study longer
  than six months is re-shown stimuli they have already encoded, at a fixed
  six-month lag. Check `image_set_shown` against session date before treating a
  later visit as a naive administration; adding sets for months 7–12 is what
  would remove this.
- `image_set_shown` records which set was served, so it is the field to check
  when a participant's scores shift unexpectedly between visits.
