import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      CONGRATS: "Tillykke",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Smykker",
      No: "Ingen",
      TIMEOUT: "Tiden er udl\u00f8bet",
      Yes: "Ja",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  },"de-DE": {
    translation: {
      CONGRATS: "Gl\u00fcckwunsch",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Juwelen",
      No: "Nein",
      TIMEOUT: "Zeit abgelaufen",
      Yes: "Ja",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  },"en-US": {
    translation: {
      CONGRATS: "Congrats",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Jewels",
      No: "No",
      TIMEOUT: "Timeout",
      Yes: "Yes",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  }, "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      CONTINUE: "¿Quieres continuar al siguiente nivel?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      JEWELS: "Joyas",
      No: "No",
      TIMEOUT: "el tiempo muerto",
      Yes: "SÌ",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  }, "fr-FR": {
    translation: {
      CONGRATS: "Bravo\u2009!",
      CONTINUE: "Voulez-vous continuer au niveau suivant ?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\u202fBijoux",
      No:"Non",
      TIMEOUT: "Timeout",
      Yes: "Oui",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"

    },
  }, "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      CONTINUE: "क्या आप अगले स्तर तक जारी रखना चाहते हैं?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      JEWELS: "गहने",
      No: "नहीं",
      TIMEOUT: "समय समाप्त",
      Yes: "हाँ",
      Jewels_A: "जवाहरात-A",
      BEGIN: "शरू करें",
      LEVEL_1: "स्तर 1",
      LEVEL_2: "स्तर 2",
      DO_YOU_WANT_TO_CONTINUE_TO_NEXT_LEVEL: "क्या आप अगले स्तर तक जारी रखना चाहते हैं?",
      Jewels_B: "जवाहरात B",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED: 
        "स्क्रीन के नीचे देखें कि सबसे पहले कौन सा जवाहरात जमा करना है। उस आकार के नंबर 1 को दबाए  और फिर  दूसरे आकार  के नंबर 1 को दबाए । इसी क्रम में जवाहरात पैटर्न को संख्या  एक से जमा करना शुरू करें और तब तक जमा करें जब तक उस संख्या के सारे जावाहरात जमा न हो ।",
      DO_YOU_WANT_TO_MOVE_TO_THE_NEXT_LEVEL: "क्या आप अगले स्तर पर जाना चाहते हैं?",
      LEVEL: "स्तर",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "संख्या 1 से शुरू करके, संख्यात्मक क्रम में गहनों पर टैप करें" 
    },
  },"it-IT": {
    translation: {
      CONGRATS: "Congratulazioni",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Gioielli",
      No : "NO",
      TIMEOUT: "Tempo scaduto",
      Yes: "SÌ",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  },"ko-KR": {
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\ubcf4\uc11d\ub4e4",
      No: "\uc544\ub2c8\uc694",
      TIMEOUT: "\uc2dc\uac04 \uc885\ub8cc",
      Yes: "\uc608",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  },  "zh-CN": {
    translation: {
      CONGRATS: "恭喜！",
      CONTINUE: "Do you want to continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "珠宝",
      No: "否",
      TIMEOUT:  "超时",
      Yes: "是",
      TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
      LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
    },
  },
    "zh-HK": {
      translation: {
        CONGRATS: "恭喜！",
        CONTINUE: "Do you want to continue to next level?",
        DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
        JEWELS: "珠寶",
        No: "否",
        TIMEOUT: "超時",
        Yes: "是",
        TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1: "Tap the jewels in numeric order starting with number 1",
        LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED:
        "Look at the bottom of the screen to see which jewel to collect first. Tap number 1 of that shape and then number 1 of the second shape. Continue alternating the jewel pattern in chronological order until all of the jewels have been collected"
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
