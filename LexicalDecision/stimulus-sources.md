# Lexical Decision Task — Stimulus Source Research

## Summary

This document catalogs validated psycholinguistic databases and tools for sourcing
LDT stimuli (words and nonwords). The current `Board.tsx` implementation already
contains word lists; the resources below can be used to **verify frequency values**
and **replace the procedural nonword generator with validated nonwords**.

---

## 1. SUBTLEX-US (Brysbaert & New, 2009)

**What it is:** Word frequency norms for 74,286 American English words derived from
a 51-million-word corpus of film/TV subtitles. Includes Zipf-scale values.

**Zipf scale reference (Brysbaert et al.):**
- 7 — function words ("the" = 7.73)
- 6 — very common content words (≈ 1 per 1,000 words)
- 5 — common words ("word" = 5.26)
- 4 — known to most adults ("frequency" = 4.36)
- 3 — known but uncommon (≈ 1 per million)
- 2 — rare
- 1 — very rare ("zipf" = 1.49)

**High-frequency threshold:** Zipf ≥ 4.5 (well-known, fast lexical access)
**Low-frequency threshold:** Zipf 2.5–3.5 (known but uncommon)

### Downloads

| File | URL |
|------|-----|
| Excel, 60K words (freq > 1) | https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/subtlexus4.zip |
| Excel, all 74K words | https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/subtlexus3.zip |
| Text (TSV), all 74K words | https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/subtlexus2.zip |
| **With Zipf values (recommended)** | https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/subtlexus1.zip |
| With POS + Zipf (on OSF) | https://osf.io/djpqz/ |

**License:** CC-BY-SA

### How to use
1. Download the Zipf-values file (subtlexus1.zip).
2. Filter for 4–6 letter words.
3. Select high-frequency words: Zipf ≥ 4.5.
4. Select low-frequency words: Zipf 2.5–3.5.
5. Verify all words are concrete nouns or common verbs (avoid proper nouns, slang).

---

## 2. English Lexicon Project — ELP (Balota et al., 2007)

**What it is:** Standardized behavioral data (lexical decision RT + accuracy) for
40,481 words and 40,481 nonwords, collected from 816 participants across 6 universities.

**Website:** https://elexicon.wustl.edu/
(Note: SSL certificate was expired as of April 2026; try http:// if needed)

**Trial-level data (OSF):** https://osf.io/n63s2/

### Key features
- 40,481 validated nonwords with lexical decision norms
- Nonword query interface at https://elexicon.wustl.edu/nonwordstart.html
- Word query interface at https://elexicon.wustl.edu/query13/query13.html
- Can filter by length, orthographic neighborhood, etc.

### How to use for nonwords
1. Visit the nonword query page.
2. Filter for length = 4, 5, 6.
3. Download nonwords with their RT norms (slower nonword RT → more wordlike).
4. Select nonwords with moderate RT (not too easy, not too hard).

**Citation:** Balota, D. A., Yap, M. J., Cortese, M. J., Hutchison, K. A., Kessler,
B., Loftis, B., Neely, J. H., Nelson, D. L., Simpson, G. B., & Treiman, R. (2007).
The English Lexicon Project. *Behavior Research Methods, 39*(3), 445–459.

---

## 3. British Lexicon Project — BLP (Keuleers et al., 2012)

**What it is:** Lexical decision data for 28,730 monosyllabic and disyllabic English
words and matched nonwords. Two groups of British participants each responded to
14,365 words + 14,365 nonwords.

**Data repository:** http://crr.ugent.be/blp
**OSF mirror:** https://osf.io/b5sdk/

### Downloads (from PMC supplementary materials)
- ESM 1: Excel files with item-level data + stimulus characteristics (7.9 MB)
- ESM 2: R data objects (61.3 MB)
- ESM 3: Text files (UTF-8) with all data (68.7 MB)

Available from: https://pmc.ncbi.nlm.nih.gov/articles/PMC3278621/

**License:** CC-BY-NC

### How to use for nonwords
The BLP nonwords are length-matched to real words and were generated to be
pronounceable. Download ESM 1 or ESM 3, filter the nonword items by length (4–6
letters), and select items.

**Citation:** Keuleers, E., Lacey, P., Rastle, K., & Brysbaert, M. (2012). The
British Lexicon Project: Lexical decision data for 28,730 monosyllabic and disyllabic
English words. *Behavior Research Methods, 44*(1), 287–304.

---

## 4. ARC Nonword Database (Rastle, Harrington, & Coltheart, 2002)

**What it is:** 358,534 monosyllabic nonwords (48,534 pseudohomophones + 310,000
non-pseudohomophonic nonwords) based on English phonotactic/orthographic constraints.

**Limitation:** Monosyllabic only — will produce 3–5 letter nonwords but not
6-letter multisyllabic ones.

**Online search:** http://www.cogsci.mq.edu.au/~nwdb/
**Figshare mirror:** https://figshare.com/articles/dataset/ARC_nonword_database_Rastle_et_al_2002_/7491818

### How to use
1. Access the online database search at Macquarie University.
2. Filter by length (4–5 letters for monosyllables).
3. Exclude pseudohomophones (sound like real words) to avoid confounds.
4. Supplement with multisyllabic nonwords from Wuggy or BLP/ELP for 6-letter items.

**Citation:** Rastle, K., Harrington, J., & Coltheart, M. (2002). 358,534 nonwords:
The ARC Nonword Database. *Quarterly Journal of Experimental Psychology, 55A*(4),
1339–1362.

---

## 5. Nonword Generation Tools

### Wuggy (Keuleers & Brysbaert, 2010)
Generates pronounceable pseudowords that match real words in subsyllabic structure
and bigram transition frequencies.

- **GitHub:** https://github.com/WuggyCode/wuggy
- **GUI version:** https://github.com/torressantiago/wuggy-gui
- **Install:** `pip install wuggy` (Python ≥ 3.8)
- Supports English, Dutch, German, French, Spanish, + more
- **Best practice:** Feed your actual word stimuli as templates → Wuggy generates
  matched nonwords (same length, similar orthographic structure)

### Pseudo (van Heuven)
Creates nonwords via letter substitution/transposition with bigram frequency
constraints. Available at: https://waltervanheuven.net/pseudo/

### UniPseudo (New et al., 2023)
Universal pseudoword generator. PDF at:
https://www.unicog.org/publications/New%20et%20al.%20-%202023%20-%20UniPseudo%20A%20universal%20pseudoword%20generator.pdf

---

## 6. LexTALE (Lemhöfer & Broersma, 2012)

A quick lexical test for advanced English learners. Contains validated word/nonword
items. Useful as a secondary reference.

### Words (40 items)
denial, generic, scornful, stoutly, ablaze, moonlit, lofty, hurricane, flaw,
unkempt, breeding, festivity, screech, savoury, shin, fluid, allied, slain,
recipient, eloquence, cleanliness, dispatch, ingenious, bewitch, plaintively,
hasty, lengthy, fray, upkeep, majestic, nourishment, carbohydrate, scholar,
turtle, cylinder, censorship, celestial, rascal, muddy, listless, wrought

### Nonwords (20 items)
mensible, kermshaw, alberation, plaudate, spaunch, exprate, rebondicate, skave,
kilp, interfate, crumper, magrity, abergy, proom, fellick, destription, purrage,
pulsh, quirty, pudour

**PMC article:** https://pmc.ncbi.nlm.nih.gov/articles/PMC3356522/

---

## 7. Other Published LDT Implementations

### PsyToolkit LDT
- URL: https://www.psytoolkit.org/experiment-library/ldt.html
- Uses ELP-derived stimuli
- Source code downloadable as .zip

### PsychoPy LDT tutorial
- URL: https://psychopy.org/tutorials/experiments/lexical_decision.html
- Template with CSV stimulus files

### GitHub repositories with stimulus files
- https://github.com/BarbaraMath/Lexical_Decision_Task
- https://github.com/jdirani/psychopy-lexdec (lexdec_stim.csv)
- https://github.com/lbialik/Lexical-Decision-Task
- https://github.com/FPupillo/Lexical-Decision-Task
- https://github.com/LazerLab/Lexical_Decision_Task_Template

---

## 8. Recommended Workflow for Stimulus Validation

### For words (already in Board.tsx)
1. Download SUBTLEX-US with Zipf values (subtlexus1.zip from ugent.be).
2. Look up each word in `HIGH_FREQ_WORDS` → confirm Zipf ≥ 4.5.
3. Look up each word in `LOW_FREQ_WORDS` → confirm Zipf 2.5–3.5.
4. Remove any words that fall outside their target range.
5. Alternatively, use the `wordfreq` Python library: `zipf_frequency(word, 'en')`.

### For nonwords (replace procedural generator)
1. **Best option:** Install Wuggy, feed each real word as a template, generate matched
   nonwords. This ensures length-matching and orthographic similarity.
2. **Alternative:** Download ELP nonwords (40,481 available) or BLP nonwords (28,730
   available), filter by length 4–6 letters.
3. **Quick option:** Use ARC Nonword Database online search for 4–5 letter monosyllabic
   nonwords, supplement with BLP for 6-letter items.

### Validation checklist
- [ ] Every nonword is pronounceable (follows English phonotactics)
- [ ] No nonword is a pseudohomophone (sounds like a real word)
- [ ] No nonword is an actual word in any major dictionary
- [ ] Nonwords are length-matched to real words
- [ ] Nonword orthographic neighborhood size (N) is comparable to matched words

---

## 9. Python Script for SUBTLEX-US Lookup

```python
# Requires: pip install wordfreq
from wordfreq import zipf_frequency

# Verify high-frequency words (should be >= 4.5)
high_freq = ["table", "water", "house", "money", "place", "world", "woman",
             "child", "story", "night", "point", "heart", "music", "power"]
for w in high_freq:
    z = zipf_frequency(w, 'en')
    status = "OK" if z >= 4.5 else "BELOW THRESHOLD"
    print(f"{w:12s}  Zipf={z:.2f}  {status}")

# Verify low-frequency words (should be 2.5–3.5)
low_freq = ["abyss", "brink", "caulk", "dwelt", "fjord", "glyph", "knack",
            "lymph", "nymph", "plumb", "qualm", "sleek", "tryst", "usurp"]
for w in low_freq:
    z = zipf_frequency(w, 'en')
    status = "OK" if 2.5 <= z <= 3.5 else "OUTSIDE RANGE"
    print(f"{w:12s}  Zipf={z:.2f}  {status}")
```

```python
# Generate matched nonwords with Wuggy
# Requires: pip install wuggy (see github.com/WuggyCode/wuggy)
from wuggy import WuggyGenerator

g = WuggyGenerator()
g.load("orthographic_english")

for word in ["table", "water", "house"]:
    g.generate(word)
    candidates = g.get_pseudowords()
    print(f"{word} → {[c['pseudoword'] for c in candidates[:3]]}")
```

---

## Key References

1. Brysbaert, M., & New, B. (2009). Moving beyond Kucera and Francis: A critical
   evaluation of current word frequency norms and the introduction of a new and
   improved word frequency measure for American English. *Behavior Research Methods,
   41*(4), 977–990.

2. Balota, D. A., et al. (2007). The English Lexicon Project. *Behavior Research
   Methods, 39*(3), 445–459.

3. Keuleers, E., Lacey, P., Rastle, K., & Brysbaert, M. (2012). The British Lexicon
   Project. *Behavior Research Methods, 44*(1), 287–304.

4. Rastle, K., Harrington, J., & Coltheart, M. (2002). 358,534 nonwords: The ARC
   Nonword Database. *QJEP, 55A*(4), 1339–1362.

5. Keuleers, E., & Brysbaert, M. (2010). Wuggy: A multilingual pseudoword generator.
   *Behavior Research Methods, 42*(3), 627–633.

6. Yap, M. J., Balota, D. A., Sibley, D. E., & Ratcliff, R. (2012). Responding to
   nonwords in the lexical decision task: Insights from the English Lexicon Project.
   *Journal of Experimental Psychology: Learning, Memory, and Cognition, 41*(3), 597–613.
