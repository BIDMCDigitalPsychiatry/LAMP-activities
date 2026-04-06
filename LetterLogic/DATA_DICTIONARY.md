# LetterLogic — Data Dictionary

## Cognitive Test Background

**LetterLogic** is a constrained word-guessing task in which the participant must identify a secret 5-letter English word within a limited number of guesses. After each guess, positional feedback is provided: green indicates a correct letter in the correct position, yellow indicates a correct letter in the wrong position, and gray indicates a letter not present in the target word. The participant must integrate this feedback across guesses to progressively narrow the solution space.

The task draws on several well-established cognitive constructs. At its core, it is a **constraint satisfaction problem** — each guess provides partial information that constrains the set of possible solutions, and the participant must maintain and update these constraints in working memory. The format is derived from the family of code-breaking games originating with **Mastermind** (Knuth, 1977) and **Jotto** (1955), adapted to the lexical domain.

### What LetterLogic Measures

| Construct | How Measured | Clinical / Research Relevance |
|-----------|-------------|-------------------------------|
| **Vocabulary breadth** | Ability to generate valid 5-letter words as guesses | Dependent on lexical knowledge; impaired in aphasia, low literacy (Nation, 2006) |
| **Hypothesis testing** | Pattern of guesses — efficient elimination vs. random guessing | Measures scientific reasoning and feedback utilization (Klahr & Dunbar, 1988) |
| **Constraint satisfaction** | Guesses used to solve (fewer = better constraint integration) | Requires maintaining multiple simultaneous constraints in working memory |
| **Working memory updating** | Integration of green/yellow/gray feedback across guesses | Each guess provides new constraints that must be integrated with prior information; taxed in aging (Bopp & Verhaeghen, 2005) |
| **Cognitive flexibility** | Shifting strategy when initial hypotheses are disconfirmed | Related to set-shifting; rigid strategies lead to wasted guesses |
| **Processing speed** | Solve time per round | Speed of lexical retrieval and constraint evaluation |
| **Frustration tolerance** | Completion rate across rounds, questionnaire happiness | Willingness to persist on a difficult word |

### Related Standardized Tests and Constructs

| Test | Publisher | Relationship to LetterLogic |
|------|-----------|----------------------------|
| **Mastermind** (Knuth, 1977) | — | Same code-breaking logic with colored pegs; LetterLogic adds lexical retrieval demand |
| **20 Questions / Deductive Reasoning** (Mosher & Hornsby, 1966) | — | Both require hypothesis testing via constrained queries |
| **Remote Associates Test (Mednick, 1962)** | — | Both require searching the lexicon under constraints; RAT uses semantic, LetterLogic uses orthographic |
| **Letter-Number Sequencing (WAIS-IV)** | Pearson | Both tax working memory updating; LNS is serial, LetterLogic is parallel constraint maintenance |
| **Wisconsin Card Sorting Test** | PAR | Both require hypothesis formation and feedback utilization; WCST uses abstract rules, LetterLogic uses positional letter constraints |
| **Anagram solving** | Various | Both require lexical search under letter constraints; anagrams provide all letters, LetterLogic provides partial positional information |

### Information-Theoretic Framework

Each guess in LetterLogic can be analyzed as an information-seeking action. An optimal guess maximizes **expected information gain** — it partitions the remaining solution space as evenly as possible across all possible feedback patterns (3⁵ = 243 distinct green/yellow/gray combinations). This connects the task to **optimal experimental design** and **active learning** in cognitive science (Markant & Gureckis, 2014).

An ideal solver (e.g., Knuth's Mastermind algorithm adapted to the lexical domain) can solve any Wordle-style puzzle in at most 6 guesses from a pool of ~2,300 common words. Human performance averages 4–5 guesses, reflecting suboptimal but reasonable constraint utilization.

### References

> Knuth, D. E. (1977). The computer as Master Mind. *Journal of Recreational Mathematics, 9*(1), 1–6.

> Klahr, D., & Dunbar, K. (1988). Dual space search during scientific reasoning. *Cognitive Science, 12*(1), 1–48.

> Mednick, S. A. (1962). The associative basis of the creative process. *Psychological Review, 69*(3), 220–232.

> Nation, K. (2006). Reading and genetics: An introduction. *Journal of Research in Reading, 29*(1), 1–10.

> Bopp, K. L., & Verhaeghen, P. (2005). Aging and verbal memory span: A meta-analysis. *Journals of Gerontology: Psychological Sciences, 60*(5), P223–P233.

> Markant, D. B., & Gureckis, T. M. (2014). Is it better to select or to receive? Learning via active and passive hypothesis testing. *Journal of Experimental Psychology: General, 143*(1), 94–122.

> Mosher, F. A., & Hornsby, J. R. (1966). On asking questions. In J. S. Bruner, R. R. Olver, & P. M. Greenfield (Eds.), *Studies in Cognitive Growth* (pp. 86–102). Wiley.

---

## Word Selection

### Target Words

Target words are drawn from a pool of **2,003 common 5-letter English words** with SUBTLEX-US Zipf frequency ≥ 3.5 (Brysbaert & New, 2009). This threshold ensures that all target words are familiar to literate English-speaking adults — the task measures reasoning and constraint satisfaction, not obscure vocabulary knowledge.

**Selection criteria:**
- Exactly 5 lowercase alphabetic characters (no hyphens, apostrophes, or diacritics)
- Zipf frequency ≥ 3.5 in SUBTLEX-US (common enough to be a fair answer)
- No proper nouns (names, countries, brands)
- No offensive or emotionally charged words

Each session randomly samples N words (without replacement) from this pool, where N is the number of rounds for the selected difficulty.

### Valid Guesses

The valid guess list includes **5,567 words** total: all 2,003 target words plus an additional 3,564 words with Zipf frequency ≥ 2.0. The broader threshold for guesses ensures that participants can enter less common but real words as strategic guesses (e.g., words chosen to eliminate many letters), while the stricter target threshold ensures answers are always recognizable.

If a participant enters a 5-letter string not in the valid guess set, a toast notification ("Not in word list") appears and the guess is not submitted. This prevents random letter strings from being used as guesses.

### References

> Brysbaert, M., & New, B. (2009). Moving beyond Kučera and Francis: A critical evaluation of current word frequency norms and the introduction of a new and improved word frequency measure for American English. *Behavior Research Methods, 41*(4), 977–990.

> Speer, R., Chin, J., Lin, A., Jewett, S., & Nathan, L. (2018). LuminosoInsight/wordfreq: v2.2. Zenodo. https://doi.org/10.5281/zenodo.1443582

---

## Feedback Mechanics

### Letter Evaluation

After each guess is submitted, each letter position is evaluated against the target word using a two-pass algorithm:

**Pass 1 (Exact matches → Green):** For each position, if the guessed letter matches the target letter at the same position, mark it **correct** (green) and consume that target letter.

**Pass 2 (Wrong position → Yellow):** For each remaining position (not already green), if the guessed letter appears anywhere in the unconsumed target letters, mark it **present** (yellow) and consume that target letter.

**Remaining letters → Gray:** Any letter not marked green or yellow is **absent** (gray).

This two-pass approach correctly handles duplicate letters. For example, if the target is "APPLE" and the guess is "PAPAL":
- P at position 1: not exact match → checked in pass 2 → present (yellow)
- A at position 2: not exact match → checked in pass 2 → present (yellow)
- P at position 3: exact match → correct (green)
- A at position 4: not exact match → no remaining A → absent (gray)
- L at position 5: not exact match → checked in pass 2 → present (yellow)

### Keyboard Status

The on-screen keyboard tracks the best-known status of each letter across all guesses:
- **Green** overrides yellow or gray (letter is confirmed in a known position)
- **Yellow** overrides gray (letter is confirmed in the word)
- **Gray** indicates the letter has been fully eliminated

This provides a persistent visual summary that reduces working memory load.

---

## Trial Design

### Difficulty Levels

| Setting | Rounds | Max Guesses | Cognitive Demand |
|---------|--------|-------------|-----------------|
| **Easy** | 3 | 8 | More guesses allows trial-and-error; suitable for cognitive screening |
| **Medium** | 5 | 6 | Standard constraint satisfaction demand |
| **Hard** | 7 | 5 | Tight guess budget requires efficient hypothesis testing |

### Session Flow

```
instruction → [round₁ → result₁] → [round₂ → result₂] → ... → questionnaire → done
```

1. **Instruction modal** — explains the color feedback system
2. **Round loop** — participant guesses the target word within the guess limit
3. **Round end** — "Solved in N guesses!" (green) or "The word was: XXXXX" (gray), displayed for 2–3 seconds
4. **Questionnaire** — post-game self-report
5. **Done** — payload sent via `postMessage`

### Input Methods

- **On-screen keyboard** — QWERTY layout with color-coded keys, Enter and Delete buttons
- **Physical keyboard** — letter keys, Enter to submit, Backspace to delete

---

## Payload Schema

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `duration` | number | Total elapsed time across all rounds (ms) |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-round event log (see below) |

---

### `static_data` — Performance Metrics

| Field | Type | Description |
|-------|------|-------------|
| `rounds_solved` | number | Number of rounds where the participant found the target word |
| `rounds_failed` | number | Number of rounds where the participant exhausted all guesses |
| `rounds_total` | number | Total rounds played |
| `mean_guesses_to_solve` | number | **Mean number of guesses used across solved rounds (2 decimal places).** The primary performance metric. Lower values indicate more efficient constraint utilization. Typical range: 3.5–5.0 for 6-guess games. |
| `mean_guess_efficiency` | number | **(max_guesses − guesses_used + 1) / max_guesses, averaged across solved rounds.** Normalizes performance across difficulty levels. 1.0 = solved in 1 guess (maximum); approaches 0 as guesses_used approaches max_guesses. |
| `mean_solve_time_ms` | number | Mean time to solve across solved rounds (ms) |
| `guess_distribution` | number[] | Array of length `max_guesses` where `guess_distribution[i]` is the number of rounds solved in exactly `i+1` guesses. For example, `[0, 1, 3, 1, 0, 0]` means 0 rounds solved in 1 guess, 1 in 2, 3 in 3, 1 in 4, 0 in 5, 0 in 6. |

### `static_data` — Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `difficulty` | string | `"easy"`, `"medium"`, or `"hard"` |
| `max_guesses` | number | Maximum guesses allowed per round |

### `static_data` — Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Percentage of rounds solved (0–100). For backward compatibility. |
| `correct_answers` | number | Same as `rounds_solved` |
| `total_questions` | number | Same as `rounds_total` |

### `static_data` — Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object? | Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5). Only present when the game ends normally. |

---

### `temporal_slices` — Per-Round Event Log

Each entry represents one round (one target word):

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Round identifier (e.g., `"round_1"`) |
| `type` | string | `"solved"` (found the word) or `"failed"` (exhausted guesses) |
| `round_number` | number | 1-indexed round number |
| `target_word` | string | The secret word for this round |
| `solved` | boolean | Whether the participant found the word |
| `guesses_used` | number | Number of guesses submitted |
| `max_guesses` | number | Maximum guesses allowed |
| `guesses` | string[] | Ordered list of all guesses submitted (e.g., `["crane", "stole", "stone"]`) |
| `rt_ms` | number | Time from round start to final guess (ms) |
| `duration` | number | Same as `rt_ms` |

**Final entry:**

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | `"exit"` |
| `type` | string | `"exit"` |

All other fields are zeroed or empty in the exit entry.

---

## Scoring Methodology

### Guess Efficiency

Guess efficiency normalizes performance across difficulty levels with different guess budgets:

```
efficiency = (max_guesses − guesses_used + 1) / max_guesses
```

| Guesses Used (of 6) | Efficiency | Interpretation |
|---------------------|-----------|----------------|
| 1 | 1.000 | Perfect (lucky or brilliant first guess) |
| 2 | 0.833 | Excellent |
| 3 | 0.667 | Good |
| 4 | 0.500 | Average |
| 5 | 0.333 | Below average |
| 6 | 0.167 | Just solved |
| Failed | 0 | Not included in mean |

### Guess Distribution

The guess distribution array is the most informative summary of a participant's performance pattern. A distribution skewed toward lower numbers (e.g., many 3s and 4s) indicates efficient constraint satisfaction. A flat or right-skewed distribution suggests difficulty integrating feedback. A high number of failures suggests vocabulary limitations or poor hypothesis testing.

### Strategic Quality Indicators

While not directly computed in `static_data`, researchers can derive additional metrics from the `guesses` array in `temporal_slices`:

- **Letter coverage in first guess**: How many unique letters does the first guess contain? Optimal openers use 5 distinct common letters (e.g., "crane", "stare", "adieu").
- **Constraint violation rate**: How often does a subsequent guess reuse a letter already marked gray? Violations suggest failure to maintain constraints in working memory.
- **Information gain per guess**: How quickly does the guess sequence converge? Measurable by the rate at which the possible solution space shrinks.

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| **Constraint satisfaction ability** | `mean_guesses_to_solve` | Core metric; fewer guesses = better integration of positional feedback |
| **Performance consistency** | `guess_distribution` | Uniform distribution vs. peaked; variance across rounds |
| **Difficulty scaling** | `mean_guess_efficiency` | Comparable across easy/medium/hard settings |
| **Processing speed** | `mean_solve_time_ms` | Speed of lexical search under constraints |
| **Task engagement** | `rounds_solved / rounds_total` | Completion rate; low values may indicate frustration |
| **Strategy analysis** | Per-round `guesses` array | First-guess letter coverage, constraint violation rate, convergence speed |
| **Speed-accuracy tradeoff** | `rt_ms` vs. `guesses_used` per round | Fast + few guesses = efficient; slow + few guesses = deliberate; fast + many guesses = impulsive |

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `difficulty` | string | `"medium"` | `"easy"`, `"medium"`, `"hard"` | Controls number of rounds and guess budget |

---

## Game Logic Summary

### Phase Progression

```
instruction → [playing → roundEnd] × N → questionnaire → done
```

### Guess Validation

1. Guess must be exactly 5 letters
2. Guess must exist in the valid word set (5,567 words, Zipf ≥ 2.0)
3. If invalid, a toast notification appears and the guess is not submitted
4. Valid guesses are immediately evaluated and the grid + keyboard are updated

### Round Termination

A round ends when either:
- The participant guesses the target word correctly (solved)
- The participant exhausts all allowed guesses (failed)

After a solved round, the result is displayed for 2 seconds. After a failed round, the target word is revealed for 3 seconds. The next round begins automatically.

### Randomization

- Target words are sampled uniformly at random (Fisher-Yates shuffle) from the 2,003-word pool
- No word repeats within a session
- Word selection is independent across sessions
