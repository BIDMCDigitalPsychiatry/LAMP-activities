# MentalRotation — Data Dictionary

## Cognitive Background

The Mental Rotation task (Shepard & Metzler, 1971) measures **spatial visualization** — the ability to mentally manipulate and transform spatial representations. Participants view two shapes and judge whether they are the same (one is a rotation of the other) or different (one is a mirror reflection). The classic finding is that reaction time increases linearly with the angular disparity between the two shapes, implying an analog "mental rotation" process.

### Task Design

- **Stimuli**: Randomly generated asymmetric polyomino shapes (connected block patterns)
- Each shape is verified asymmetric — no rotation equals its mirror image
- **Trial structure**: Two shapes displayed side-by-side. The left shape is always in canonical orientation; the right is rotated and optionally mirrored.
- **"Same" trials**: right shape is rotated only (same shape)
- **"Different" trials**: right shape is mirrored AND rotated (different shape)
- **Difficulty levels**:
  - Easy: 5 blocks, 4 cardinal rotations (0°, 90°, 180°, 270°), 16 trials
  - Medium: 6 blocks, 8 rotations (0°–315° in 45° steps), 16 trials
  - Hard: 7 blocks, 8 rotations, 32 trials
- Per-trial time limit prevents indefinite deliberation
- Brief correctness feedback (600ms) after each response

### Key Metrics

- **Accuracy**: overall and split by same/different trials
- **Mean RT (correct trials)**: primary speed measure
- **RT by rotation angle**: the hallmark mental rotation slope — RT should increase with angular disparity (Shepard & Metzler, 1971)

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `difficulty` | string | "medium" | Shape complexity and rotation angles |
| `time_limit_per_trial_s` | number | 15 | Time limit per trial in seconds |

## `static_data` Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | % correct (legacy compat, 0–100) |
| `correct_answers` | number | Total correct responses (legacy compat) |
| `total_questions` | number | Total trials (legacy compat) |
| `difficulty` | string | Difficulty setting |
| `time_limit_per_trial_s` | number | Time limit setting |
| `trials_total` | number | Total trials presented |
| `trials_responded` | number | Trials with a response (excludes timeouts) |
| `trials_correct` | number | Correct responses |
| `trials_timed_out` | number | Trials where time ran out |
| `accuracy` | number | Proportion correct (0–1) |
| `same_accuracy` | number | Accuracy on "same" trials (0–1) |
| `different_accuracy` | number | Accuracy on "different" trials (0–1) |
| `mean_rt_correct_ms` | number | Mean RT for correct responses (ms) |
| `rt_0deg` .. `rt_315deg` | number | Mean correct RT at each rotation angle (ms) — the mental rotation function |
| `questionnaire` | {clarity, happiness} | Post-game ratings (1–5 each) |

## `temporal_slices` Fields

Each entry represents one trial.

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Trial identifier (e.g., "trial_5") |
| `type` | string | "response", "timeout", or "exit" |
| `trial_number` | number | Trial number (1-indexed) |
| `rotation_deg` | number | Rotation angle applied to right shape (degrees) |
| `is_mirrored` | boolean | Whether the right shape was mirrored |
| `correct_answer` | string | "same" or "different" |
| `response` | string | Participant's response ("same", "different", or "none") |
| `correct` | boolean | Whether the response was correct |
| `rt_ms` | number | Reaction time (ms) |
| `duration` | number | Trial duration (ms) |

## References

- Shepard, R. N., & Metzler, J. (1971). Mental rotation of three-dimensional objects. *Science*, 171(3972), 701–703.
- Vandenberg, S. G., & Kuse, A. R. (1978). Mental rotations, a group test of three-dimensional spatial visualization. *Perceptual and Motor Skills*, 47(2), 599–604.
