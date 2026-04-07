# Wisconsin Card Sorting Test — Data Dictionary

## Cognitive Test Background

The **Wisconsin Card Sorting Test (WCST)** is one of the most widely used neuropsychological measures of **executive function**, specifically **cognitive flexibility** (set-shifting), **abstract reasoning**, and **the ability to adapt to changing contingencies**. The participant sorts response cards to one of four key cards, but the sorting rule is never stated — only feedback ("Correct" / "Incorrect") is given. After 10 consecutive correct sorts, the rule changes without warning, requiring the participant to detect the shift and adapt.

The WCST was originally developed by Berg (1948) and later standardized by Grant & Berg (1948) and Heaton (1981). It has become the gold-standard measure of dorsolateral prefrontal cortex (DLPFC) function, with perseverative errors being the most clinically informative metric — they directly index the inability to shift cognitive set in response to changing environmental feedback.

### What the WCST Measures

| Construct | How Measured | Clinical / Research Relevance |
|-----------|-------------|-------------------------------|
| **Cognitive flexibility (set-shifting)** | Categories completed, perseverative errors | Impaired in frontal lobe lesions (Milner, 1963), schizophrenia (Everett et al., 2001), ADHD |
| **Perseveration** | Perseverative responses and errors | The hallmark WCST metric; elevated in frontal damage, autism, OCD (Shin et al., 2008) |
| **Abstract reasoning** | Categories completed (max 6) | Requires inferring the sorting rule from feedback alone |
| **Concept formation** | Trials to first category, conceptual level responses | Speed of initial rule discovery; proportion of responses in sustained correct runs |
| **Response maintenance** | Failure to maintain set | Errors after 5–9 consecutive correct; dissociable from perseveration (Heaton et al., 1993) |
| **Feedback utilization** | Error patterns across trials | Inability to use "Incorrect" feedback to adjust strategy |

### Related Standardized Tests

| Test | Publisher | Relationship to WCST |
|------|-----------|---------------------|
| **WCST-64 (Kongs et al., 2000)** | PAR | Shortened 64-card version; this implementation's default mode |
| **WCST-128 (Heaton et al., 1993)** | PAR | Full 128-card version; available via `deck_size: 128` setting |
| **D-KEFS Sorting Test (Delis et al., 2001)** | Pearson | Free-sorting variant; measures similar constructs without fixed rule sequence |
| **Intra-Extra Dimensional Set Shift (IED)** (CANTAB) | Cambridge Cognition | Computerized set-shifting task with graded difficulty; decomposes attentional vs. rule shifting |
| **Trail Making Test Part B** | Various | Measures cognitive flexibility through alternating sequences (related but not equivalent) |

### Key Methodological Choices

**Fixed rule sequence (Color → Shape → Number × 2):** This follows the standard WCST administration (Heaton et al., 1993). The fixed sequence ensures that perseverative error scoring is unambiguous — after each rule shift, perseverative responses are those matching the immediately preceding rule's dimension.

**10 consecutive correct for category completion:** The standard criterion. Lower thresholds (e.g., 5) have been used in developmental studies but reduce the demand on response maintenance.

**Feedback without rule disclosure:** Participants are never told the current rule. They must infer it from binary correct/incorrect feedback. This is critical to the task's sensitivity to abstract reasoning.

### References

> Berg, E. A. (1948). A simple objective technique for measuring flexibility in thinking. *Journal of General Psychology, 39*(1), 15–22.

> Grant, D. A., & Berg, E. A. (1948). A behavioral analysis of degree of reinforcement and ease of shifting to new responses in a Weigl-type card-sorting problem. *Journal of Experimental Psychology, 38*(4), 404–411.

> Heaton, R. K. (1981). *Wisconsin Card Sorting Test Manual.* Psychological Assessment Resources.

> Heaton, R. K., Chelune, G. J., Talley, J. L., Kay, G. G., & Curtiss, G. (1993). *Wisconsin Card Sorting Test Manual: Revised and Expanded.* Psychological Assessment Resources.

> Kongs, S. K., Thompson, L. L., Iverson, G. L., & Heaton, R. K. (2000). *Wisconsin Card Sorting Test—64 Card Version (WCST-64).* Psychological Assessment Resources.

> Milner, B. (1963). Effects of different brain lesions on card sorting: The role of the frontal lobes. *Archives of Neurology, 9*(1), 90–100.

> Everett, J., Lavoie, K., Bherer, L., & Bhéreur, L. (2001). Investigating cognitive planning and set shifting in schizophrenia using the modified Wisconsin Card Sorting Test. *Psychiatry Research, 93*(2), 107–114.

> Shin, N. Y., Lee, T. Y., Kim, E., & Kwon, J. S. (2008). Cognitive functioning in obsessive-compulsive disorder: A meta-analysis. *Psychological Medicine, 38*(2), 277–286.

> Delis, D. C., Kaplan, E., & Kramer, J. H. (2001). *Delis-Kaplan Executive Function System (D-KEFS).* Psychological Corporation.

---

## Card Stimuli

### Key Cards

The four key (target) cards are fixed per the standard WCST protocol (Heaton et al., 1993):

| Key Card | Color | Shape | Number |
|----------|-------|-------|--------|
| 1 | Red | Triangle | 1 |
| 2 | Green | Star | 2 |
| 3 | Yellow | Cross | 3 |
| 4 | Blue | Circle | 4 |

Each key card is unique on all three dimensions: no two key cards share a color, shape, or number. This guarantees that any response card can match exactly one key card on each dimension.

### Response Cards (Deck)

The response deck is a full factorial cross of 4 colors × 4 shapes × 4 numbers = **64 unique cards**. For the 128-card version, the deck is duplicated and reshuffled.

- **Colors:** red, blue, green, yellow
- **Shapes:** triangle, star, cross, circle
- **Numbers:** 1, 2, 3, 4

Cards are rendered as SVG vector graphics. Each card displays N copies of a colored shape, where N is the card's number value. This follows the standard WCST stimulus design.

### Deck Randomization

The deck is shuffled using the Fisher-Yates algorithm before each session. For the 128-card version, two copies of the 64-card deck are concatenated and reshuffled. This ensures uniform randomization without order bias.

---

## Rule Sequence and Category Shifting

### Rule Cycle

```
Color → Shape → Number → Color → Shape → Number
  ①        ②       ③        ④       ⑤        ⑥
```

The sorting rule follows a fixed sequence of up to 6 categories. The rule shifts after **10 consecutive correct responses**. The participant is never informed of the current rule or when it changes.

### What Happens at a Rule Shift

1. The participant has just achieved 10 consecutive correct sorts under the current rule
2. The rule advances to the next in the sequence (e.g., Color → Shape)
3. The consecutive correct counter resets to 0
4. The previous rule is stored for perseveration scoring
5. The participant's next sort under the old rule will be scored as a perseverative response

### Termination Conditions

The game ends when either:
- All 6 categories are completed (best possible outcome), or
- The deck is exhausted (64 or 128 cards used)

---

## Scoring Methodology

### Perseverative Scoring

Perseveration is the WCST's most clinically valuable metric. It measures the tendency to continue sorting by the previous rule after a rule shift, reflecting cognitive rigidity.

**Perseverative response:** After a rule shift, a response that matches the **previous** rule's dimension on the chosen key card. For example, if the rule just shifted from Color to Shape, and the participant sorts a red card to the red key card (matching on color), this is a perseverative response — they are persisting with the Color rule.

**Perseverative error:** A perseverative response that is also **incorrect**. A perseverative response can technically be correct if the card happens to match both the old rule and the new rule on the same key card. Only perseverative responses that are wrong count as perseverative errors.

**Non-perseverative error:** An incorrect response that does not match the previous rule. These reflect confusion, random responding, or incorrect hypotheses rather than perseveration.

```
                           ┌─ Matches previous rule? ──► Perseverative Response
                           │     └─ Also incorrect? ──► Perseverative Error
Response ── Incorrect? ────┤
                           │
                           └─ Does NOT match previous rule ──► Non-perseverative Error
```

**Important:** Perseverative scoring only begins after the first rule shift. During the first category (Color), there is no previous rule, so no responses are scored as perseverative.

### Conceptual Level Responses

Conceptual level responses are correct responses that occur in **runs of 3 or more consecutive correct**. This metric indexes sustained understanding of the current rule, as opposed to occasional lucky guesses. A high conceptual level relative to total correct suggests the participant grasps the rules but loses them at shifts; a low conceptual level suggests erratic or trial-and-error responding.

### Failure to Maintain Set

Failure to maintain set counts errors that occur after **5–9 consecutive correct responses** within a single category attempt. This is distinct from perseveration: the participant has clearly learned the rule (5+ correct) but then abandons it prematurely. It is scored using the `consecutive_correct` field from trial data, which resets to 0 at category completion boundaries to avoid false positives from cross-category streaks.

This metric is clinically meaningful because it dissociates from perseveration — a patient can have low perseverative errors but high failure to maintain set, suggesting attentional lapses rather than cognitive rigidity (Heaton et al., 1993).

### Trials to First Category

The number of trials required to achieve the first category completion (10 consecutive correct). This measures the speed of initial concept formation. In healthy adults, this is typically 10–13 trials. Substantially elevated values suggest difficulty with feedback-driven rule inference.

---

## Payload Schema

### Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | number | Unix timestamp (ms) when the result was sent |
| `duration` | number | Total elapsed time across all trials (ms) |
| `static_data` | object | Summary scores and metadata (see below) |
| `temporal_slices` | array | Per-trial event log (see below) |

---

### `static_data` — Clinical Metrics

| Field | Type | Description |
|-------|------|-------------|
| `categories_completed` | number | **Number of sorting categories achieved (0–6).** The primary measure of overall WCST performance. Healthy adults typically complete 5–6 categories. Values below 3 are clinically significant. |
| `perseverative_responses` | number | **Responses matching the previous rule's dimension after a rule shift.** Includes both correct and incorrect perseverative sorts. |
| `perseverative_errors` | number | **Perseverative responses that were also incorrect.** The most clinically sensitive WCST metric. Elevated in frontal lobe dysfunction, schizophrenia, and ADHD. Typical healthy adult: 5–15 in WCST-64. |
| `non_perseverative_errors` | number | **Incorrect responses not matching the previous rule.** Reflect confusion, random responding, or hypothesis testing. |
| `conceptual_level_responses` | number | **Correct responses occurring in runs of 3 or more consecutive correct.** Indexes sustained rule understanding. |
| `failure_to_maintain_set` | number | **Errors following 5–9 consecutive correct responses within a category attempt.** Indexes premature rule abandonment. |
| `trials_to_first_category` | number | **Number of trials to achieve the first 10-consecutive-correct category.** Indexes speed of initial concept formation. |

### `static_data` — Accuracy and RT

| Field | Type | Description |
|-------|------|-------------|
| `total_trials` | number | Total trials presented (cards sorted + timeouts) |
| `total_responses` | number | Trials with a key card selection (excludes timeouts) |
| `total_correct` | number | Total correct sorts |
| `total_errors` | number | Total incorrect sorts |
| `mean_rt_correct_ms` | number | Mean reaction time for correct sorts (ms) |

### `static_data` — Settings Echo

| Field | Type | Description |
|-------|------|-------------|
| `deck_size` | number | 64 or 128 — number of cards in the deck |
| `time_limit_per_trial_s` | number \| null | Per-trial timeout (seconds), or `null` if untimed |

### `static_data` — Legacy Fields

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Accuracy as percentage (0–100). For backward compatibility with the dashboard's generic score display. |
| `correct_answers` | number | Same as `total_correct` |
| `total_questions` | number | Same as `total_trials` |

### `static_data` — Questionnaire

| Field | Type | Description |
|-------|------|-------------|
| `questionnaire` | object? | Post-game self-report. Contains `clarity` (1–5) and `happiness` (1–5). Only present when the game ends normally. |

---

### `temporal_slices` — Per-Trial Event Log

Each entry represents one card sort:

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | Trial identifier (e.g., `"card_1"`) |
| `type` | string | `"response"` (participant sorted) or `"timeout"` (no response within time limit) |
| `trial_number` | number | 1-indexed trial number |
| `card_color` | string | Color of the response card (`"red"`, `"blue"`, `"green"`, `"yellow"`) |
| `card_shape` | string | Shape of the response card (`"triangle"`, `"star"`, `"cross"`, `"circle"`) |
| `card_number` | number | Number on the response card (1–4) |
| `chosen_key` | number | Index (0–3) of the key card selected, or `-1` for timeout |
| `current_rule` | string | The active sorting rule (`"color"`, `"shape"`, or `"number"`) |
| `match_dimension` | string | Comma-separated list of dimensions on which the response card matched the chosen key card (e.g., `"color,shape"`, `"number"`, `"none"`) |
| `correct` | boolean | Whether the sort matched the current rule |
| `perseverative` | boolean | Whether the response matched the previous rule's dimension (after a rule shift) |
| `perseverative_error` | boolean | Whether the response was both perseverative and incorrect |
| `rt_ms` | number | Reaction time from card presentation to key card selection (ms) |
| `duration` | number | Same as `rt_ms` for response trials; equals time limit for timeouts |
| `consecutive_correct` | number | Running count of consecutive correct responses in the current category attempt. Resets to 0 on error or category completion. |
| `categories_completed` | number | Cumulative categories completed as of this trial |

**Final entry:**

| Field | Type | Description |
|-------|------|-------------|
| `item` | string | `"exit"` |
| `type` | string | `"exit"` |

All other fields are zeroed or empty in the exit entry.

---

## Key Analysis Variables

| Research Question | Primary Variable | Notes |
|---|---|---|
| **Cognitive flexibility** | `categories_completed` | Overall WCST performance; 6 = ceiling. Healthy adults: 5–6. Below 3 is clinically significant |
| **Perseveration severity** | `perseverative_errors` | Gold-standard index of cognitive rigidity; most sensitive to frontal dysfunction |
| **Perseverative tendency** | `perseverative_responses` | Includes both correct and incorrect perseveration; broader measure |
| **Error type dissociation** | `perseverative_errors` vs. `non_perseverative_errors` | Distinguishes rigidity (perseverative) from confusion/guessing (non-perseverative) |
| **Concept formation speed** | `trials_to_first_category` | How quickly the participant infers the first rule from feedback |
| **Sustained rule application** | `conceptual_level_responses` | Proportion of correct responses in 3+ runs; low values suggest trial-and-error |
| **Attentional maintenance** | `failure_to_maintain_set` | Errors after achieving 5–9 consecutive correct; dissociable from perseveration |
| **Processing speed** | `mean_rt_correct_ms` | Speed of correct card sorts |
| **Response pattern over time** | Per-trial `correct` and `perseverative` in `temporal_slices` | Reveals learning trajectory and adaptation to rule shifts |
| **Performance efficiency** | `total_errors / total_trials` | Overall error rate; complements categories completed |

---

## Settings

| Setting | Type | Default | Range | Description |
|---------|------|---------|-------|-------------|
| `deck_size` | number | 64 | 64 or 128 | Number of cards in the deck. WCST-64 (Kongs et al., 2000) uses 64; original WCST (Heaton, 1981) uses 128. |
| `time_limit_per_trial_s` | number | 0 | 0–120 | Maximum response time per card sort (seconds). 0 = untimed (standard WCST is self-paced). |

---

## Game Logic Summary

### Phase Progression

```
instruction → [card presentation → key card selection → feedback] × N → questionnaire → done
```

1. **Instruction modal** — explains the task (match the card without being told the rule)
2. **Trial loop** — repeats until 6 categories completed or deck exhausted
3. **Questionnaire** — post-game self-report (clarity, happiness)
4. **Done** — payload sent via `postMessage`

### Trial Flow

1. Four key cards are always visible at the top of the screen
2. A response card appears in the center
3. The participant taps one of the four key cards to sort the response card
4. Feedback ("Correct!" in green or "Incorrect" in red) is shown; the selected key card is highlighted
5. The next card appears after 600 ms

### Scoring Walkthrough Example

```
Rule: COLOR                          Rule shift → SHAPE
Trial:  1   2   3   4   5   6   7   8   9  10  │ 11  12  13  ...
Sort:   C   C   C   ✗   C   C   C   C   C   C  │  C*  ✗   S
Result: ✓   ✓   ✓   ✗   ✓   ✓   ✓   ✓   ✓   ✓  │  ✓   ✗   ✓
                                    category 1  │  P   PE
                                    completed   │

C = sorted by color, S = sorted by shape
✗ = non-perseverative error
P = perseverative (matched old rule) but happened to be correct
PE = perseverative error (matched old rule AND was incorrect)
```
