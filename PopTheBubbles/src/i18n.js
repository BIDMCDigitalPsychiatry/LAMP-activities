import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      CONGRATULATIONS: "Congratulations",
      GO: "GO",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} Completed",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (popped) Go trials and {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctNoGo }} number of correctly answered (unpopped) No-Go trials and {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} number of false hits (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} number of missed (unpopped) Go trials and {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} number of incorrectly answered (popped) No-Go trials and {{ percentage }}",
      POP_THE_BUBBLES: "POP THE BUBBLES!",
      TAP_TO_CONTINUE: "Tap to continue",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"POPPING CORRECT BALOONS WILL EARN YOU POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"TAP TO POP ALL PINK, BLUE AND YELLOW BUBBLES ONLY.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"DON’T POP TWO BUBBLES OF THE SAME COLOR IN A ROW.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"ONLY POP YELLOW AND BLUE BUBBLES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"ONLY POP PINK YELLOW AND BLUE BUBBLES.",
      YOU_GOT_PERCENT: "You got {{ percentage }}",
    },
  },
  "es-ES": {
    translation: {
      CONGRATULATIONS: "Congratulations",
      GO: "GO",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} Completed",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (popped) Go trials and {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (unpopped) No-Go trials and {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} number of false hits (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} number of missed (unpopped) Go trials and {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} number of incorrectly answered (popped) No-Go trials and {{ percentage }}",
      POP_THE_BUBBLES: "POP THE BUBBLES!",
      TAP_TO_CONTINUE: "Tap to continue",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"POPPING CORRECT BALOONS WILL EARN YOU POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"TAP TO POP ALL PINK, BLUE AND YELLOW BUBBLES ONLY.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"DON’T POP TWO BUBBLES OF THE SAME COLOR IN A ROW.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"ONLY POP YELLOW AND BLUE BUBBLES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"ONLY POP PINK YELLOW AND BLUE BUBBLES.",
      YOU_GOT_PERCENT: "You got {{ percentage }}",
    },
  },
  "hi-IN": {
    translation: {
      CONGRATULATIONS: "Congratulations",
      GO: "GO",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} Completed",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (popped) Go trials and {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (unpopped) No-Go trials and {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} number of false hits (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} number of missed (unpopped) Go trials and {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} number of incorrectly answered (popped) No-Go trials and {{ percentage }}",
      POP_THE_BUBBLES: "POP THE BUBBLES!",
      TAP_TO_CONTINUE: "Tap to continue",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"POPPING CORRECT BALOONS WILL EARN YOU POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"TAP TO POP ALL PINK, BLUE AND YELLOW BUBBLES ONLY.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"DON’T POP TWO BUBBLES OF THE SAME COLOR IN A ROW.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"ONLY POP YELLOW AND BLUE BUBBLES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"ONLY POP PINK YELLOW AND BLUE BUBBLES.",
      YOU_GOT_PERCENT: "You got {{ percentage }}",
    },
  },
};
  
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    resources,
  });

export default i18n;
