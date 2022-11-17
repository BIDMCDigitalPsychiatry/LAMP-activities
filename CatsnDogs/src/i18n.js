import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
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
  },"de-DE":{
    translation: {
      CATS_AND_DOGS: "Katzen und Hunde",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tippe weiter auf die K\u00e4stchen, hinter denen sich ein Hund befindet. Tippe nicht auf die K\u00e4stchen, hinter denen sich eine Katze befindet.",
      GAME_OVER: "Spiel ist vorbei",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Tippe nun auf die K\u00e4stchen, hinter denen sich eine Katze befindet. Tippe nicht auf die K\u00e4stchen, hinter denen sich ein Hund befindet.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tippe auf die K\u00e4stchen, hinter denen sich ein Hund befindet.",     
    },
  }, "da-DK":{
    translation: {
      CATS_AND_DOGS: "Katte o hunde",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Forts\u00e6t med at trykke p\u00e5 de kasser, der har en hund bag dem. Tryk ikke p\u00e5 kasser med en kat bag dem.",
      GAME_OVER: "Spillet er slut",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Tryk nu p\u00e5 de kasser, hvor der er en kat bag dem. Tryk ikke p\u00e5 de kasser med en hund bag dem.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tryk p\u00e5 de kasser, der har en hund bag dem.",     
    },
  }, "fr-FR":{
    translation: {
      CATS_AND_DOGS: "Chats et Chiens",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continue to tap the boxes that have a dog behind them. Don't tap the boxes with a cat behind them",
      GAME_OVER: "Game Over",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Now tap the boxes that have a cat behind them. Don't tap the boxes with a dog behind them.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tap the boxes that have a dog behind them.",     
    },
  }, "ko-KR":{
    translation: {
      CATS_AND_DOGS: "\uace0\uc591\uc774\uc640 \uac1c\ub4e4",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "\ub4a4\uc5d0 \uac1c\uac00 \uc788\ub294 \ubc15\uc2a4\ub4e4\uc744 \uacc4\uc18d \ub204\ub974\uc138\uc694. \ub4a4\uc5d0 \uace0\uc591\uc774\uac00 \uc788\ub294 \ubc15\uc2a4\ub4e4\uc740 \ub204\ub974\uc9c0 \ub9c8\uc138\uc694.",
      GAME_OVER: "\uac8c\uc784 \uc885\ub8cc",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "\ub4a4\uc5d0 \uace0\uc591\uc774\uac00 \uc788\ub294 \ubc15\uc2a4\ub4e4\uc744 \uc774\uc81c \ub204\ub974\uc138\uc694. \ub4a4\uc5d0 \uac1c\uac00 \uc788\ub294 \ubc15\uc2a4\ub4e4\uc740 \ub204\ub974\uc9c0 \ub9c8\uc138\uc694",
      OK: "\uad1c\ucc2e\uc74c",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "\ub4a4\uc5d0 \uac1c\uac00 \uc788\ub294 \ubc15\uc2a4\ub4e4\uc744 \ub204\ub974\uc138\uc694.",     
    },
  }, "it-IT":{
    translation: {
      CATS_AND_DOGS: "Gatti e Cani",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continuare a toccare i riquadri dietro cui si trova un cane. Non toccare i riquadri dietro cui si trova un gatto.",
      GAME_OVER: "Game Over",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Ora toccare i riquadri dietro cui si trova un gatto. Non toccare i riquadri dietro cui si trova un cane.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Toccare i riquadri dietro cui si trova un cane.",     
    },
  }, "zh-CN":{
    translation: {
      CATS_AND_DOGS: "\u732b\u548c\u72d7",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "\u7ee7\u7eed\u70b9\u51fb\u540e\u9762\u6709\u53ea\u72d7\u7684\u76d2\u5b50. \u70b9\u51fb\u540e\u9762\u6709\u53ea\u732b\u7684\u76d2\u5b50.",
      GAME_OVER: "\u6e38\u620f\u7ed3\u675f",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "\u73b0\u5728\u70b9\u51fb\u540e\u9762\u6709\u53ea\u732b\u7684\u76d2\u5b50\u3002\u4e0d\u8981\u70b9\u51fb\u540e\u9762\u6709\u53ea\u72d7\u7684\u76d2\u5b50",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "\u70b9\u51fb\u540e\u9762\u6709\u53ea\u72d7\u7684\u76d2\u5b50",     
    },
  },
  "es-ES": {
    translation: {
      CATS_AND_DOGS: "Gatos y Perros",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
      "Continúa tocando las cajas que tienen un perro detrás de ellas/ ellos. Continúa tocando las cajas que tienen un gato detrás de ellas/ ellos",
      GAME_OVER: "Juego Terminado",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "No toque las cajas con un gato detrás de ellas. No toque las cajas con un perro detrás de ellas",
      OK: "Okay",     
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Toque las cajas que tienen un perro detrás de ellas/ellos",     
    },
  },
  "hi-IN": {
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
