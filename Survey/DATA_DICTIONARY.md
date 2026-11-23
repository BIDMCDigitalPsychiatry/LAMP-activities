# Survey — Data Dictionary

## Background

The Survey activity presents researcher-defined questions and returns one response per question. It does no scoring of its own: scores shown in the dashboard are computed by the dashboard from the raw responses (see [Scoring](#scoring)).

This document describes the current (v1) survey as implemented in `src/components/SurveyQuestions.tsx`.

---

## Settings

The activity receives its configuration via `postMessage` from the host (dashboard or app). Messages without a `configuration` field are ignored.

### Message fields

| Field                    | Type         | Description                                       |
| ------------------------ | ------------ | ------------------------------------------------- |
| `activity.id`            | `string`     | Activity ID. Used as the key for saved progress.  |
| `activity.settings`      | `Question[]` | The questions, in order (see below).              |
| `configuration.language` | `string`     | UI language, e.g. `"en-US"`. Defaults to `en-US`. |
| `noBack`                 | `boolean?`   | Hides the back arrow when `true`.                 |

### `Question`

| Field         | Type                        | Description                                                                                                                                                   |
| ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`        | `string`                    | Question text (Markdown). Also used as the `item` label in the output.                                                                                        |
| `type`        | `string`                    | One of `likert`, `boolean`, `list`, `select`, `rating`, `slider`, `multiselect`, `short`, `text`, `time`, `matrix`                                            |
| `description` | `string?`                   | Helper text shown under the question (Markdown)                                                                                                               |
| `required`    | `boolean?`                  | Submission is blocked until this question has a non-empty answer                                                                                              |
| `options`     | `{ value, description? }[]` | Answer options for `list`, `select`, `rating`, `slider`, `multiselect`. For `time`, `options[0].value === "standard"` switches to a 12-hour clock with AM/PM. |

### Fixed option sets

| Type      | Options (`value` → label)                                                               |
| --------- | --------------------------------------------------------------------------------------- |
| `likert`  | `0` Not at all, `1` Several Times, `2` More than Half the Time, `3` Nearly All the Time |
| `boolean` | `"Yes"`, `"No"`                                                                         |

### Matrix grouping

`matrix` is not a standalone scale. A question followed by one or more `matrix` questions is displayed as one grid: each `matrix` question becomes a row, and every row uses the **first** question's type and options. Each row is still saved as its own entry in `temporal_slices`.

---

## Payload Schema

The result is sent once, when the participant taps **Submit** and all required questions are answered.

### Top-level fields

| Field             | Type       | Description                                                                            |
| ----------------- | ---------- | -------------------------------------------------------------------------------------- |
| `timestamp`       | `number`   | Unix ms when the survey loaded                                                         |
| `duration`        | `number`   | ms from load to submit                                                                 |
| `static_data`     | `object`   | Always `{}` (see [Scoring](#scoring))                                                  |
| `temporal_slices` | `object[]` | One entry per question, in the same order and at the same index as `activity.settings` |

The survey does **not** send `done`, `forward` or `clickBack`. Tapping the back arrow sends the message `null` instead of a payload.

### `temporal_slices`

| Field      | Type     | Description                                                                                                                                                                           |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`     | `string` | The question's `text`                                                                                                                                                                 |
| `value`    | varies   | The answer. Format depends on question type (see below). `null` if unanswered.                                                                                                        |
| `duration` | `number` | ms since the survey screen last re-rendered, recorded at the participant's **last** change to this answer. `0` if unanswered. Approximate; not a reliable per-question response time. |
| `type`     | `null`   | Reserved. Missing on unanswered entries.                                                                                                                                              |
| `level`    | `null`   | Reserved. Missing on unanswered entries.                                                                                                                                              |

### `value` by question type

`value` is formatted differently for a standalone question and for a row inside a matrix.

| Type          | Standalone question                                        | Matrix row                                                       |
| ------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `likert`      | string, e.g. `"3"`                                         | string, e.g. `"3"`                                               |
| `boolean`     | `"Yes"` / `"No"`                                           | `"\"Yes\""` / `"\"No\""` (JSON-quoted)                           |
| `list`        | the option's `value` as a string                           | the option's `value`, JSON-encoded (strings quoted, numbers not) |
| `select`      | the option's `value` as a string                           | not supported in a matrix                                        |
| `rating`      | the option's `value`, type as configured                   | the option's `value`, JSON-encoded                               |
| `slider`      | number, the selected option's `value`                      | number as a string, e.g. `"5"`                                   |
| `multiselect` | comma-separated JSON strings, e.g. `"\"a\",\"b\""`         | same                                                             |
| `short`       | string                                                     | string                                                           |
| `text`        | string (max 800 characters)                                | string                                                           |
| `time`        | `"HH:MM"`, or `"HH:MMAM"` / `"HH:MMPM"` on a 12-hour clock | same                                                             |

To read a multiselect or matrix value, wrap it in brackets and parse it as JSON: `JSON.parse("[" + value + "]")`.

**Deselected answers:** tapping a selected radio option again clears it. The entry's `value` becomes `undefined`, so the `value` key is **missing** from the JSON for that entry rather than `null`.

---

## Saved Progress

Every answer is written to the browser's `localStorage` under `activity-survey-<activity.id>`, in the same format as `temporal_slices`. On the next open, the participant is asked whether to resume. Choosing **No** clears the saved answers. Saved progress lives only on that device and in that app's web view, and is not sent to the server.

---

## Scoring

The survey sends `static_data: {}` and none of the legacy fields (`score`, `correct_answers`, etc.). Any score shown for a survey is computed by the dashboard from `temporal_slices`. From a reading of the dashboard code (not yet checked against real responses):

- Answers are matched to questions by `item` (the question text). Rewording a question disconnects its past answers.
- Yes/No answers and worded options score `0`.
- Likert scores correctly (`0`–`3`).
- Branching rules in the dashboard depend on a score the survey never sends, so they never run.

---

## Key Analysis Guidance

1. **Join by position, not by text.** `temporal_slices[i]` corresponds to `activity.settings[i]`. Use `item` only as a label, since question text can change between versions of a survey.
2. **Normalize `value` by type** using the table above before analysis. The same question type can produce a string or a number depending on whether it was shown in a matrix.
3. **Treat a missing `value` key the same as `null`** (unanswered).
4. **Do not use `duration` as a response time.** Use the top-level `duration` for total time on the survey.
5. **Compute scores yourself** from `value` rather than relying on dashboard scores.

---

## Known Issues

- **Time questions** report their starting value (`01:00` or `01:00AM`) as soon as they're shown, so a time answer may be the default and not something the participant chose (#596).
- **Slider questions** record `null` as soon as they are shown, before any interaction.
- **No answers at all:** if no answer has been recorded yet, Submit is blocked even when no questions are required.
