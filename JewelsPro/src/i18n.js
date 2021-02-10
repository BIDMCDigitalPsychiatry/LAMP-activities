import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      CONGRATS: "Congrats",
      JEWELS: "Jewels",
      TIMEOUT: "Timeout",
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      JEWELS: "Joyas",
      TIMEOUT: "el tiempo muerto",
    },
  },
  "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
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
