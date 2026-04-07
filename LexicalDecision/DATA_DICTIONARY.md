# Lexical Decision Task — Data Dictionary

## Cognitive Test Background

The **Lexical Decision Task** (LDT) is one of the most widely used paradigms in psycholinguistics and cognitive psychology. The participant is presented with a string of letters and must decide as quickly as possible whether it is a real English word or a pronounceable nonword. The LDT measures **lexical access speed** — the time required to retrieve a word's representation from the mental lexicon — and is sensitive to word frequency, orthographic regularity, and vocabulary knowledge.

The task was introduced by Rubenstein, Garfield, & Millikan (1970) and has since become the standard method for studying visual word recognition. Its simplicity makes it suitable for clinical populations, while the richness of the reaction-time data supports sophisticated psycholinguistic analyses (signal detection, frequency effects, priming).

### What the LDT Measures

| Construct | How Measured | Clinical / Research Relevance |
|-----------|-------------|-------------------------------|
| **Lexical access speed** | Mean RT for correct word trials | Slowed in aphasia, Alzheimer's disease, and aging (Balota & Chumbley, 1984) |
| **Word frequency sensitivity** | Low-freq RT − high-freq RT | Indexes lexical organization; reduced in deep dyslexia (Coltheart et al., 2001) |
| **Lexicality effect** | Nonword RT − word RT | Reflects decision-stage processing; enlarged when participants are uncertain (Ratcliff et al., 2004) |
| **Discrimination ability** | d-prime (signal detection) | Separates sensitivity from response bias; impaired in semantic dementia (Rogers et al., 2004) |
| **Response bias** | Hit rate vs. false alarm rate | Liberal bias (calling nonwords "word") may indicate impulsivity or low vocabulary |
| **Processing speed** | Overall mean RT | General cognitive efficiency; correlates with IQ measures (Sheppard & Vernon, 2008) |

### Related Standardized Tests

| Test | Publisher | Relationship to LDT |
|------|-----------|---------------------|
| **PALPA Lexical Decision** (Kay et al., 1992) | Psychology Press | Clinical LDT subtest for aphasia assessment; uses imageability and frequency manipulation |
| **LEXT (Lexical Test)** (Diependaele et al., 2013) | — | Unspeeded yes/no vocabulary test based on LDT logic |
| **LexTALE** (Lemhöfer & Broersma, 2012) | — | Quick English proficiency screener using lexical decision format; 60 items, 5 minutes |
| **Peabody Picture Vocabulary Test** (Dunn & Dunn, 2007) | Pearson | Receptive vocabulary (related construct); both index vocabulary size |
| **NIH Toolbox Picture Vocabulary** (Gershon et al., 2013) | NIH | Computerized vocabulary measure; complementary to LDT |

### References

> Rubenstein, H., Garfield, L., & Millikan, J. A. (1970). Homographic entries in the internal lexicon. *Journal of Verbal Learning and Verbal Behavior, 9*(5), 487–494.

> Balota, D. A., & Chumbley, J. I. (1984). Are lexical decisions a good measure of lexical access? The role of word frequency in the neglected decision stage. *Journal of Experimental Psychology: Human Perception and Performance, 10*(3), 340–357.

> Ratcliff, R., Gomez, P., & McKoon, G. (2004). A diffusion model account of the lexical decision task. *Psychological Review, 111*(1), 159–182.

> Coltheart, M., Rastle, K., Perry, C., Langdon, R., & Ziegler, J. (2001). DRC: A dual route cascaded model of visual word recognition and reading aloud. *Psychological Review, 108*(1), 204–256.

> Brysbaert, M., & New, B. (2009). Moving beyond Kučera and Francis: A critical evaluation of current word frequency norms and the introduction of a new and improved word frequency measure for American English. *Behavior Research Methods, 41*(4), 977–990.

---

## Stimulus Construction

### Word Selection

All word stimuli were validated against SUBTLEX-US frequency norms (Brysbaert & New, 2009) using the Zipf frequency scale, which provides an intuitive log10 transformation of word frequency per million. Frequencies were verified computationally using the `wordfreq` Python library (Speer et al., 2018), which draws on the same SUBTLEX-US corpus.

**Zipf scale reference (Brysbaert et al., 2009):**

| Zipf Value | Interpretation | Example |
|------------|---------------|---------|
| 7 | Ultra-high-frequency function words | "the" (7.73) |
| 6 | Very common content words (~1 per 1,000 words) | "time" (6.31) |
| 5 | Common words (~1 per 10,000 words) | "stone" (5.04) |
| 4 | Known to most adults (~1 per 100,000 words) | "eddy" (3.47) |
| 3 | Known but uncommon (~1 per million) | "goblet" (2.88) |
| 2 | Rare | "woad" (1.92) |

**Two frequency bins:**

| Bin | Zipf Range | Rationale | Count |
|-----|-----------|-----------|-------|
| **High-frequency** | ≥ 4.5 | Rapidly recognized; strong lexical representations; minimal reading-level dependency | 102 |
| **Low-frequency** | 2.5 – 3.5 | Known to literate adults but accessed more slowly; produces robust frequency effects | 102 |

The gap between bins (3.5 – 4.5) was intentional: it maximizes the word frequency effect by avoiding items at the boundary where classification is ambiguous (Brysbaert et al., 2011).

**Length balancing:** Each frequency bin contains exactly 34 words at each of three lengths (4, 5, and 6 letters), for 102 words per bin. This controls for the well-documented effect of word length on lexical decision RT (New et al., 2006) and ensures that frequency effects are not confounded with length.

| Length | High-Frequency | Low-Frequency | Total |
|--------|---------------|--------------|-------|
| 4 letters | 34 | 34 | 68 |
| 5 letters | 34 | 34 | 68 |
| 6 letters | 34 | 34 | 68 |
| **Total** | **102** | **102** | **204** |

**Selection criteria applied to all words:**
- Common nouns, adjectives, or verbs (no proper nouns, abbreviations, or slang)
- No offensive or emotionally charged words (to avoid valence confounds)
- No homophones of common words in the other frequency bin

### Nonword Construction

Nonwords were generated procedurally from English phonotactic patterns (legal onset + nucleus + coda combinations) and then validated against the SUBTLEX-US corpus. Each nonword was confirmed to have a Zipf frequency below 1.0 in the `wordfreq` database, indicating it does not appear in any major English corpus.

**Construction method:**
1. An onset was sampled from 40 common English onsets (e.g., "bl", "cr", "sh", "str")
2. A nucleus was sampled from 15 English vowel patterns (e.g., "a", "ea", "oo", "ie")
3. A coda was sampled from 43 English codas (e.g., "ck", "lf", "mp", "st")
4. Syllables were concatenated and trimmed to target length
5. Each candidate was checked against `wordfreq`: only items with Zipf < 1.0 were retained
6. 102 nonwords were selected, balanced across 4, 5, and 6 letters (34 each)

**Properties of the nonword set:**
- All nonwords are pronounceable (follow English phonotactic constraints)
- No nonword is a pseudohomophone (sounds like a real word) — this avoids the pseudohomophone effect (Coltheart et al., 1977), which would inflate false alarm rates
- Length distribution matches the word set (34 each at 4, 5, and 6 letters)
- Random seed was fixed (seed = 42) for reproducibility

| Length | Nonwords | Example Items |
|--------|----------|--------------|
| 4 letters | 34 | blou, coft, drit, flai, skue |
| 5 letters | 34 | beirk, craub, druld, freil, gloos |
| 6 letters | 34 | blalke, floame, gloant, plaift, strold |

### Stimulus References

> Brysbaert, M., & New, B. (2009). Moving beyond Kučera and Francis: A critical evaluation of current word frequency norms and the introduction of a new and improved word frequency measure for American English. *Behavior Research Methods, 41*(4), 977–990.

> Brysbaert, M., Buchmeier, M., Conrad, M., Jacobs, A. M., Bölte, J., & Böhl, A. (2011). The word frequency effect: A review of recent developments and implications for the choice of frequency estimates in German. *Experimental Psychology, 58*(5), 412–424.

> New, B., Ferrand, L., Pallier, C., & Brysbaert, M. (2006). Reexamining the word length effect in visual word recognition: New evidence from the English Lexicon Project. *Psychonomic Bulletin & Review, 13*(1), 45–52.

> Coltheart, M., Davelaar, E., Jonasson, J. T., & Besner, D. (1977). Access to the internal lexicon. In S. Dornic (Ed.), *Attention and Performance VI* (pp. 535–555). Erlbaum.

> Speer, R., Chin, J., Lin, A., Jewett, S., & Nathan, L. (2018). LuminosoInsight/wordfreq: v2.2. Zenodo. https://doi.org/10.5281/zenodo.1443582

> Balota, D. A., Yap, M. J., Cortese, M. J., Hutchison, K. A., Kessler, B., Loftis, B., Neely, J. H., Nelson, D. L., Simpson, G. B., & Treiman, R. (2007). The English Lexicon Project. *Behavior Research Methods, 39*(3), 445–459.

---

## Trial Design

### Trial Flow

```
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │  Fixation    │────▶│  Stimulus    │────▶│  Response    │────▶│  Feedback    │
  │  Cross (+)   │     │  (letters)   │     │  Word / Not  │     │  ✓ or ✗     │
  │  500 ms      │     │  until resp  │     │  or timeout  │     │  500 ms     │
  └─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                      │
                                                                      ▼
                                                                 Next trial
```

1. **Fixation cross** — centered "+" displayed for a configurable duration (default 500 ms). Serves as an alerting cue and recenters gaze.
2. **Stimulus** — the letter string appears in uppercase monospace font (42px, letter-spacing 4px). Remains on screen until the participant responds or the trial times out (default 5 seconds).
3. **Response** — two buttons: green "WORD" and red "NOT A WORD". Tapping either records the response and reaction time.
4. **Feedback** — "Correct!" (green) or "Incorrect" (red) displayed for 500 ms.
5. **Inter-trial interval** — the next fixation cross appears immediately after feedback.

### Difficulty Levels

The task supports three difficulty presets that vary trial count and the proportion of high- vs. low-frequency words:

| Setting | Trials | Words | Nonwords | High-Freq Ratio | Stimulus Limit | Expected Duration |
|---------|--------|-------|----------|-----------------|----------------|-------------------|
| **Easy** | 40 | 20 | 20 | 75% high-freq | Untimed | ~3 min |
| **Medium** | 60 | 30 | 30 | 50/50 | Untimed | ~5 min |
| **Hard** | 80 | 40 | 40 | 25% high-freq | 2000 ms | ~7 min |

**Easy mode** is designed for clinical populations (aphasia, dementia screening, low literacy) where high accuracy and engagement are priorities. **Hard mode** introduces a stimulus time limit and a preponderance of low-frequency words, increasing cognitive demand and producing more variable RT distributions suitable for diffusion model analysis (Ratcliff et al., 2004).

### Trial Composition

Within each difficulty level, trial composition is:
- **50% words** (split between high-frequency and low-frequency per the difficulty's `highFreqRatio`)
- **50% nonwords** (drawn from the validated pool, length-matched)
- All trials are presented in a fully randomized order (Fisher-Yates shuffle)

---

## Payload Schema

This section describes the JSON payload sent via `postMessage` when the game ends.

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `duration` | number | Total elapsed time across all trials (ms) |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-trial event log (see below) |

---

### `static_data` — Signal Detection Metrics

| Field | Type | Description |
|-------|------|-------------|
| `d_prime` | number | **d' (d-prime)** — signal detection sensitivity. Measures the participant's ability to discriminate words from nonwords, independent of response bias. Computed as `Φ⁻¹(hit rate) − Φ⁻¹(false alarm rate)`, where Φ⁻¹ is the inverse normal CDF. Hit rate and false alarm rate are bounded to [0.01, 0.99] to avoid infinite values. **Typical range: 2.0–4.0 in healthy adults.** Values below 1.0 suggest near-chance performance. |
| `accuracy` | number | Proportion correct across all responded trials (0–1, 3 decimal places) |
| `word_accuracy` | number | Proportion of word trials correctly identified as words (hit rate) |
| `nonword_accuracy` | number | Proportion of nonword trials correctly rejected (correct rejection rate) |

### `static_data` — Reaction Time Metrics

All RT metrics are computed on **correct trials only**, as is standard in lexical decision research (Balota et al., 2007). Incorrect trials are excluded because they reflect guessing, misperception, or motor errors rather than lexical access time.

| Field | Type | Description |
|-------|------|-------------|
| `mean_rt_ms` | number | Mean RT across all correct trials (ms) |
| `mean_rt_word_ms` | number | Mean RT for correct word trials (ms). Indexes lexical access speed. |
| `mean_rt_nonword_ms` | number | Mean RT for correct nonword rejections (ms). Nonword RTs are typically slower because the participant must exhaustively search the lexicon before concluding the item is not a word (Forster, 1976). |
| `mean_rt_high_freq_ms` | number | Mean RT for correct high-frequency word trials (ms) |
| `mean_rt_low_freq_ms` | number | Mean RT for correct low-frequency word trials (ms) |

### `static_data` — Derived Cognitive Metrics

| Field | Type | Description |
|-------|------|-------------|
| `word_frequency_effect_ms` | number | **Low-freq mean RT − high-freq mean RT (ms).** The word frequency effect is one of the most robust findings in psycholinguistics: low-frequency words are recognized more slowly because their lexical representations are weaker (Murray & Forster, 2004). **Typical range: 30–80 ms in healthy adults.** Reduced or absent frequency effects may indicate surface-level (non-lexical) processing or ceiling effects. |
| `lexicality_effect_ms` | number | **Nonword mean RT − word mean RT (ms).** Reflects the additional processing time needed to reject a nonword after failing to find a lexical match. **Typical range: 50–150 ms.** An unusually large lexicality effect may indicate slow or exhaustive search processes. A near-zero effect may indicate the participant is not engaging in lexical access (e.g., responding randomly). |

### `static_data` — Trial Counts

| Field | Type | Description |
|-------|------|-------------|
| `trials_total` | number | Total trials presented |
| `trials_responded` | number | Trials with a button response (excludes timeouts) |
| `trials_correct` | number | Total correct responses |
| `trials_timed_out` | number | Trials where no response was given within the time limit |

### `static_data` — Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `difficulty` | string | `"easy"`, `"medium"`, or `"hard"` |
| `fixation_ms` | number | Fixation cross duration (ms) |
| `time_limit_per_trial_s` | number | Per-trial timeout (seconds) |

### `static_data` — Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Accuracy as percentage (0–100). Provided for backward compatibility with the dashboard's generic score display. |
| `correct_answers` | number | Same as `trials_correct` |
| `total_questions` | number | Same as `trials_total` |

### `static_data` — Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object? | Post-game self-report. Contains `clarity` (1–5, instruction clarity rating) and `happiness` (1–5, willingness to repeat). Only present when the game ends normally. |

---

### `temporal_slices` — Per-Trial Event Log

Each entry represents one trial:

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Trial identifier (e.g., `"trial_1"`) |
| `type` | string | `"response"` (participant responded) or `"timeout"` (no response within time limit) |
| `trial_number` | number | 1-indexed trial number |
| `stimulus` | string | The letter string displayed (e.g., `"table"`, `"blalke"`) |
| `is_word` | boolean | `true` if the stimulus was a real word, `false` if nonword |
| `word_frequency` | string | `"high"` or `"low"` for words; `"n/a"` for nonwords |
| `stimulus_length` | number | Number of letters in the stimulus |
| `response` | string | `"word"`, `"nonword"`, or `"none"` (timeout) |
| `correct` | boolean | Whether the response was correct |
| `rt_ms` | number | Reaction time in milliseconds from stimulus onset to button press. For timeouts, equals the time limit. |
| `duration` | number | Total trial duration including fixation (ms) |

**Final entry:**

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | `"exit"` |
| `type` | string | `"exit"` |

All other fields are zeroed or empty in the exit entry.

---

## Scoring Methodology

### Signal Detection Theory (SDT)

The LDT is fundamentally a detection task: the participant must detect the "signal" (a real word) embedded in "noise" (nonwords). **d-prime (d')** from signal detection theory (Green & Swets, 1966) is the optimal summary measure because it separates the participant's **sensitivity** (ability to discriminate words from nonwords) from **response bias** (tendency to respond "word" regardless of stimulus).

**Signal detection classification:**

| | Stimulus is a Word | Stimulus is a Nonword |
|---|---|---|
| **Responded "Word"** | Hit ✓ | False Alarm ✗ |
| **Responded "Not a Word"** | Miss ✗ | Correct Rejection ✓ |

**d-prime computation:**

```
hit_rate = hits / word_trials           (bounded to [0.01, 0.99])
fa_rate  = false_alarms / nonword_trials (bounded to [0.01, 0.99])

d' = Φ⁻¹(hit_rate) − Φ⁻¹(fa_rate)
```

where Φ⁻¹ is the inverse of the standard normal cumulative distribution function (probit function). The implementation uses the rational approximation algorithm (Abramowitz & Stegun, 1964; Acklam, 2003) which is accurate to ~10⁻⁸.

**Bounding** the rates to [0.01, 0.99] prevents infinite d' values when accuracy is perfect, following the standard correction of Macmillan & Creelman (2005).

**Interpreting d':**

| d' Value | Interpretation |
|----------|---------------|
| 0.0 | Chance performance (cannot discriminate) |
| 1.0 | Poor discrimination |
| 2.0 | Moderate discrimination |
| 3.0–4.0 | Good discrimination (typical healthy adult) |
| > 4.0 | Excellent discrimination |

### Word Frequency Effect

The word frequency effect — faster recognition of high-frequency words — is the cornerstone finding of visual word recognition research (Forster & Chambers, 1973; Murray & Forster, 2004). It arises because high-frequency words have stronger, more accessible lexical representations.

The frequency effect is computed as:

```
frequency_effect = mean_RT(low-frequency correct) − mean_RT(high-frequency correct)
```

A positive value (typically 30–80 ms) indicates normal lexical organization. The magnitude of the effect is modulated by:
- **Reading experience**: avid readers show smaller effects (Chateau & Jared, 2000)
- **Age**: older adults show larger effects, especially for low-frequency words (Balota et al., 2004)
- **Clinical status**: reduced in surface dyslexia; exaggerated in semantic dementia

### Lexicality Effect

The lexicality effect — slower rejection of nonwords than recognition of words — reflects the cost of exhaustive lexical search. When a real word is presented, the search terminates as soon as a match is found. When a nonword is presented, the participant must search without finding a match and then make a "not a word" decision.

```
lexicality_effect = mean_RT(nonword correct) − mean_RT(word correct)
```

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| **Lexical discrimination ability** | `d_prime` | Gold-standard SDT measure; separates sensitivity from bias |
| **Lexical access speed** | `mean_rt_word_ms` | Speed of word recognition; slowed in aging, aphasia |
| **Word frequency sensitivity** | `word_frequency_effect_ms` | Indexes lexical organization; 30–80 ms is normal |
| **Lexicality effect** | `lexicality_effect_ms` | Indexes decision-stage processing; 50–150 ms is normal |
| **Nonword rejection speed** | `mean_rt_nonword_ms` | Slower = more careful/exhaustive search |
| **Response bias** | `word_accuracy` vs. `nonword_accuracy` | If word accuracy >> nonword accuracy, participant has liberal bias (tends to say "word") |
| **Speed-accuracy tradeoff** | `mean_rt_ms` vs. `accuracy` | Fast RT + low accuracy = impulsive; slow RT + high accuracy = cautious |
| **Sustained attention** | `trials_timed_out` | High timeout rate suggests attention lapses or disengagement |
| **Task engagement** | `questionnaire.happiness` | Self-reported willingness to repeat; proxy for motivation |
| **RT trend over time** | Per-trial `rt_ms` in `temporal_slices` | Increasing RT may indicate fatigue; decreasing may indicate practice |

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `difficulty` | string | `"medium"` | `"easy"`, `"medium"`, `"hard"` | Controls trial count and frequency mix |
| `fixation_ms` | number | 500 | 200–2000 | Duration of fixation cross before each stimulus (ms) |
| `time_limit_per_trial_s` | number | 5 | 1–30 | Maximum response time per trial (seconds) |

---

## Game Logic Summary

### Phase Progression

```
instruction → [fixation → stimulus → feedback] × N → questionnaire → done
```

1. **Instruction modal** — explains the task; participant taps "Start" to begin
2. **Trial loop** — repeats for all trials (40/60/80 depending on difficulty)
3. **Questionnaire** — "Game Over" banner + post-game self-report (clarity, happiness)
4. **Done** — payload sent via `postMessage`; activity terminates

### Stimulus Presentation

- Stimuli are displayed in uppercase monospace font to minimize letter-shape cues
- Letter-spacing (4px) reduces crowding effects that could confound RT measurement
- The fixation cross recenters the participant's gaze before each stimulus
- In hard mode, stimuli disappear after 2000 ms (stimulus-limited presentation), forcing faster decisions

### Randomization

- All trials are fully randomized using Fisher-Yates shuffle
- Words are sampled without replacement from the pools (each word appears at most once per session)
- Nonwords are drawn from the validated pool; if the pool is exhausted (only possible at 80 trials in hard mode), items are recycled

### Timeout Handling

- If no response is given within the time limit, the trial is recorded as a timeout with `type: "timeout"`, `response: "none"`, `correct: false`
- Timed-out trials are excluded from RT analysis but included in accuracy calculations (counted as errors)
- After timeout, feedback shows "Incorrect" and the next trial begins automatically
