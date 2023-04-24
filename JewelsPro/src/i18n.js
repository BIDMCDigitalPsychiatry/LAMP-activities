import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      CONGRATS: "Tillykke",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Smykker",
      No: "Ingen",
      TIMEOUT: "Tiden er udl\u00f8bet",
      Yes: "Ja"
    },
  },"de-DE": {
    translation: {
      CONGRATS: "Gl\u00fcckwunsch",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Juwelen",
      No: "Nein",
      TIMEOUT: "Zeit abgelaufen",
      Yes: "Ja"
    },
  },"en-US": {
    translation: {
      CONGRATS: "Congrats",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Jewels",
      No: "No",
      TIMEOUT: "Timeout",
      Yes: "Yes"
    },
  }, "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      JEWELS: "Joyas",
      No: "No",
      TIMEOUT: "el tiempo muerto",
      Yes: "SÌ"
    },
  }, "fr-FR": {
    translation: {
      CONGRATS: "Bravo\u2009!",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\u202fBijoux",
      No:"Non",
      TIMEOUT: "Timeout",
      Yes: "Oui"

    },
  }, "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      JEWELS: "गहने",
      No: "नहीं",
      TIMEOUT: "समय समाप्त",
      Yes: "हाँ"
    },
  },"it-IT": {
    translation: {
      CONGRATS: "Congratulazioni",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Gioielli",
      No : "NO",
      TIMEOUT: "Tempo scaduto",
      Yes: "SÌ"
    },
  },"ko-KR": {
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\ubcf4\uc11d\ub4e4",
      No: "\uc544\ub2c8\uc694",
      TIMEOUT: "\uc2dc\uac04 \uc885\ub8cc",
      Yes: "\uc608"

    },
  },  "zh-CN": {
    translation: {
      CONGRATS: "恭喜！",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "珠宝",
      No: "否",
      TIMEOUT:  "超时",
      Yes: "是",
    },
  },
    "zh-HK": {
      translation: {
        CONGRATS: "恭喜！",
        DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
        JEWELS: "珠寶",
        No: "否",
        TIMEOUT: "超時",
        Yes: "是",
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
