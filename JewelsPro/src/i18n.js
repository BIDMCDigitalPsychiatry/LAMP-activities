import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      CONGRATS: "Congrats",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Jewels",
      TIMEOUT: "Timeout",
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      JEWELS: "Joyas",
      TIMEOUT: "el tiempo muerto",
    },
  },
  "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      JEWELS: "गहने",
      TIMEOUT: "समय समाप्त",
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
