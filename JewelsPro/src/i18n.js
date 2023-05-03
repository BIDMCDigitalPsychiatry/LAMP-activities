import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      CONGRATS: "Tillykke",
      CONTINUE: "Fortsæt til næste niveau?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Smykker",
      No: "Ingen",
      TIMEOUT: "Tiden er udl\u00f8bet",
      Yes: "Ja",
    },
  },"de-DE": {
    translation: {
      CONGRATS: "Gl\u00fcckwunsch",
      CONTINUE: "Weiter zum nächsten Level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Juwelen",
      No: "Nein",
      TIMEOUT: "Zeit abgelaufen",
      Yes: "Ja"
    },
  },"en-US": {
    translation: {
      CONGRATS: "Congrats",
      CONTINUE: "Continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Jewels",
      No: "No",
      TIMEOUT: "Timeout",
      Yes: "Yes"
    },
  }, "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      CONTINUE: "¿Continuar al siguiente nivel?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      JEWELS: "Joyas",
      No: "No",
      TIMEOUT: "el tiempo muerto",
      Yes: "SÌ"
    },
  }, "fr-FR": {
    translation: {
      CONGRATS: "Bravo\u2009!",
      CONTINUE: "Continuer au niveau suivant ?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\u202fBijoux",
      No:"Non",
      TIMEOUT: "Timeout",
      Yes: "Oui"

    },
  }, "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      CONTINUE: "अगले स्तर पर जारी रखें?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      JEWELS: "गहने",
      No: "नहीं",
      TIMEOUT: "समय समाप्त",
      Yes: "हाँ"
    },
  },"it-IT": {
    translation: {
      CONGRATS: "Congratulazioni",
      CONTINUE: "Continua al livello successivo?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "Gioielli",
      No : "NO",
      TIMEOUT: "Tempo scaduto",
      Yes: "SÌ"
    },
  },"ko-KR": {
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      CONTINUE: "\ub2e4\uc74c\u0020\ub2e8\uacc4\ub85c\u0020\uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c\u003f",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      JEWELS: "\ubcf4\uc11d\ub4e4",
      No: "\uc544\ub2c8\uc694",
      TIMEOUT: "\uc2dc\uac04 \uc885\ub8cc",
      Yes: "\uc608"

    },
  },  "zh-CN": {
    translation: {
      CONGRATS: "恭喜！",
      CONTINUE: "Continue to next level?",
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
        CONTINUE: "Continue to next level?",
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
