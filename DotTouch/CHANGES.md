# DotTouch (Trails B) — Planned Changes

Reference document for the style-guide modernization of the DotTouch activity. This file is not committed — it exists as a working checklist.

---

## 1. Entry Point (index.tsx)

- [x] Remove `react-hot-loader` / `AppContainer` wrapper
- [x] Add postMessage config filtering (reject CRA HMR/webpack messages)
- [x] Use singleton `createRoot` with `configVersion` key for clean remount
- [x] Remove obfuscated `eventer`/`eventMethod`/`messageEvent` indirection

## 2. Dependency Cleanup (package.json)

Remove unused packages:

| Package | Reason |
|---------|--------|
| `@material-ui/core` | Not imported (only `@material-ui/icons` used) |
| `@material-ui/icons` | Replace with FontAwesome (already a dep) |
| `material-icons` | Imported but no material-icons CSS classes used |
| `react-hot-loader` | Removed from index.tsx |
| `@hot-loader/react-dom` | Hot-loader companion |
| `@types/react-hot-loader` | Types for above |
| `i18next-http-backend` | Not imported anywhere |
| `webpack` | Already bundled by react-scripts |
| `util` | Not imported anywhere |
| `web-vitals` | Not imported anywhere |

Delete legacy build files no longer used with react-scripts 5:
- `gulpfile.js`
- `webpack.config.js`
- `tslint.json`

## 3. i18n (new file: src/i18n.js)

Currently no i18n exists — all strings are hardcoded English.

### Strings to extract

| Current hardcoded string | Proposed i18n key |
|--------------------------|-------------------|
| `"Trails B"` | `TRAILS_B` |
| `"Congrats !!"` | `CONGRATULATIONS` |
| `"Timeout !"` | `"Time's up!"` (style guide standard) |
| `"Tap '1' to start the test"` | `TAP_1_TO_START` |
| `"Tap '1' to begin"` | `TAP_1_TO_BEGIN` |
| `"Tap on the corresponding letter"` | `TAP_CORRESPONDING_LETTER` |
| `"For this game, you will alternate..."` | `INSTRUCTION_TEXT` |
| `"Ok"` | `Start` (style guide: instruction modal uses "Start") |
| `"Level "` + n | `LEVEL_NUMBER` (with interpolation) |

### Required keys (style guide)

```
GAME, INSTRUCTIONS, GAME_OVER,
Instructions, Start, Questionnaire, Submit,
"How clear were the instructions?",
"How happy would you be to do this again?",
"Time's up!"
```

### Languages

All 10: da-DK, de-DE, en-US, es-ES, fr-FR, hi-IN, it-IT, ko-KR, zh-CN, zh-HK

Config: `fallbackLng: "en-US"`, `nsSeparator: false`, `keySeparator: false`, inline translations (no HTTP backend).

## 4. UI/UX Overhaul

### Header
- Replace MUI icons (`ArrowBackIcon`, `RefreshRounded`, `ArrowForwardIcon`) with FontAwesome (`faArrowLeft`, `faRedo`, `faArrowRight`)
- Restyle to 52px blue bar with centered title, white icons (style guide pattern)
- Respect `noBack` prop — hide back arrow when `noBack` is true
- Remove `body { margin: 30px }` so header is full-width

### Instruction Modal
- Rewrite `GeneralInstruction.tsx` as `InstructionModal.tsx` with blue header, "Instructions" title, "Start" button (D-cog pattern)
- Use i18n for all text

### Game Over / Timeout
- Replace `"Congrats !!"` with clean phase-card or brief overlay
- Replace `"Timeout !"` with `"Time's up!"` (style guide standard) as brief overlay before questionnaire
- Show game summary (accuracy, levels completed) before questionnaire

### Questionnaire
- Add post-game questionnaire component (D-cog pattern) with emoji star ratings
- Questionnaire appears after game completion (normal end, timeout, or 5-mistake end)
- Response included in `static_data.questionnaire`

### Footer alerts
- Replace raw string footer (`"Tap '1' to start the test"`, etc.) with styled, translated prompts
- Consider moving prompt text closer to the game board rather than fixed footer

## 5. Game Logic Issues

### 5-mistake silent end
- Currently: game silently ends after 5 wrong taps with a 500ms delay and no user feedback
- Fix: show brief "Game Over" overlay or transition message before questionnaire

### Timer (commented out)
- `passTimerUpdate` is fully commented out — timer display and timeout logic are disabled
- Decide: either re-enable timeout with style-guide standard "Time's up!" message, or remove timer code entirely
- Settings `level1_timeout` and `level2_timeout` are parsed but never used

### Level progression
- Game has 3 levels but `resetState()` only handles level 2 dot count
- Level 3 uses the same dot count and layout as level 2
- Check if level 3 should have different settings (e.g., `level3_dot_count`)

### Score formula
- Current: `correctTaps / 30 * 100` when totalTaps < 30 (hardcoded denominator)
- This means a player who gets 8/8 correct on level 1 scores 27%, not 100%
- Should use actual total presented or actual taps as denominator

## 6. postMessage Payload

### Current static_data
```json
{
  "correct_answers": 12,
  "point": 1,
  "total_questions": 15,
  "wrong_answers": 3,
  "score": 40,
  "percentageCorrectOverall": 80,
  "total_levels": 2,
  "is_favorite": false
}
```

### Changes needed
- Add `questionnaire` field (from new questionnaire component)
- Fix `score` formula (remove hardcoded /30 denominator)
- Add `levels` array with per-level breakdown (correct, wrong, total dots, completion time)
- Ensure `is_favorite` is included on all exit paths (currently only on `sendGameResult`)
- Add legacy field consistency: ensure `point`, `score`, `correct_answers`, `wrong_answers`, `total_questions` are always present

### temporal_slices format (no change needed)
```json
{
  "duration": 1234,
  "item": "A",
  "level": 1,
  "type": true,
  "value": null
}
```

## 7. DATA_DICTIONARY.md

Create after payload changes are finalized. Document:
1. Top-level fields
2. static_data fields (standard + legacy)
3. temporal_slices event format
4. Game logic summary (level progression, dot layout, scoring)
5. Configurable settings
6. Scoring guidance

## 8. Test Harness

- [x] Created `test-harness.html` with configurable L1/L2 dot counts, timeouts, language selector
- [x] Scores tab shows per-level accuracy and avg response time
- [x] Temporal slices table with color-coded correct/wrong

## Commit Sequence (proposed)

1. Modernize index.tsx + clean up dependencies + delete legacy build files
2. Add i18n.js with all 10 languages
3. UI overhaul: header, instruction modal, questionnaire, CSS
4. Fix game logic: score formula, 5-mistake feedback, level progression
5. Update postMessage payload with per-level stats
6. Add test harness and data dictionary
