import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      CONGRATS: "Congrats",
      JEWELS: "Jewels",
      TIMEOUT: "Timeout",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?"
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      JEWELS: "Joyas",
      TIMEOUT: "el tiempo muerto",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?"
    },
  },
  "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      JEWELS: "गहने",
      TIMEOUT: "समय समाप्त",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?"
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
