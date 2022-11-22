import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      CONGRATS: "Tillykke",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Smykker",
      TIMEOUT: "Tiden er udl\u00f8bet",
    },
  },"de-DE": {
    translation: {
      CONGRATS: "Gl\u00fcckwunsch",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Juwelen",
      TIMEOUT: "Zeit abgelaufen",
    },
  },"en-US": {
    translation: {
      CONGRATS: "Congrats",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Jewels",
      TIMEOUT: "Timeout",
    },
  }, "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      JEWELS: "Joyas",
      TIMEOUT: "el tiempo muerto",
    },
  }, "fr-FR": {
    translation: {
      CONGRATS: "Bravo\u2009!",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\u202fBijoux",
      TIMEOUT: "Timeout",
    },
  }, "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      JEWELS: "गहने",
      TIMEOUT: "समय समाप्त",
    },
  },"it-IT": {
    translation: {
      CONGRATS: "Congratulazioni",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Gioielli",
      TIMEOUT: "Tempo scaduto",
    },
  },"ko-KR": {
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\ubcf4\uc11d\ub4e4",
      TIMEOUT: "\uc2dc\uac04 \uc885\ub8cc",
    },
  },  "zh-CN": {
    translation: {
      CONGRATS: "\u606d\u559c\uff01",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\u73e0\u5b9d",
      TIMEOUT: "\u8d85\u65f6",
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
