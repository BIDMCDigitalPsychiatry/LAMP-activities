import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en_US: {
    translation: {
      CATS_AND_DOGS: "Cats and Dogs",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continue to tap the boxes that have a dog behind them. Don't tap the boxes with a cat behind them",
      GAME_OVER: "Game Over",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Now tap the boxes that have a cat behind them. Don't tap the boxes with a dog behind them.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tap the boxes that have a dog behind them.",     
    },
  },
  es_ES: {
    translation: {
      CATS_AND_DOGS: "Gatos y Perros",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continúa tocando las cajas que tienen un perro detrás de ellas/ ellos. Don't tap the boxes with a cat behind them",
      GAME_OVER: "Juego Terminado",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "No toque las cajas con un gato detrás de ellas. No toque las cajas con un perro detrás de ellas",
      OK: "Okay",     
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Toque las cajas que tienen un perro detrás de ellas/ellos",     
    },
  },
  hi_IN: {
    translation: {
      CATS_AND_DOGS: "बिल्लियां और कुत्ते",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाना जारी रखें जिनके पीछे एक पीछे कुत्ता है। उन बॉक्सों को ना दबाए जिनके पीछे एक बिल्ली है",
      GAME_OVER: "खेल खत्म",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "अब उन बॉक्सों को दबाए जिनके पीछे एक बिल्ली है। उन बॉक्सों को ना दबाए जिनके पीछे एक कुत्ता है",
      OK: "ठीक है",     
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाए जिनके पीछे एक कुत्ता है।",
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
