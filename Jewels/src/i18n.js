import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en_US: {
    translation: {
      JEWELS: "Jewels",
      CONGRATS: "Congrats",
      TIMEOUT: "Timeout",
    },
  },
  hi_IN: {
    translation: {
      JEWELS: "गहने",
      CONGRATS: "बधाई हो",
      TIMEOUT: "समय समाप्त",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
