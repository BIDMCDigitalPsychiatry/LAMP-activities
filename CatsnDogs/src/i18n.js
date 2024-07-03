import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK":{
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
  },
  "de-DE":{
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
  },
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
      IN_THIS_GAME_YOU_WILL_SEE_A_SCREEN_WITH_MANY_BOXES_THESE_BOXES_WILL_LIFT_REVEALING_EITHER_A_DOG_CAT_OR_NOTHING_BEHIND_THEM_A_TASK_IS_TO_TAP_THE_CORRECT_BOXES_BASED_ON_WHAT_IS_BEHIND_EACH_BOX_THE_INSTRUCTIONS_FOR_WHICH_BOXES_ARE_CORRECT_WILL_CHANGE_DEPENDING_ON_THE_LEVEL_SO_PAY_ATTENTION_TO_THE_ANIMALS:
        "In this game, you will see a screen with many boxes. These boxes will ‘lift’ revealing either a dog, cat or nothing behind them. A task is to tap the correct boxes based on what is behind each box. The instructions for which boxes are correct will change depending on the level, so pay attention to the animals!"
    },
  },"es-ES": {
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
  },  "fr-FR":{
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
  }, "hi-IN": {
    translation: {
      CATS_AND_DOGS: "बिल्लियां और कुत्ते",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाना जारी रखें जिनके पीछे एक पीछे कुत्ता है। उन बॉक्सों को ना दबाए जिनके पीछे एक बिल्ली है",
      GAME_OVER: "खेल खत्म",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "अब उन बॉक्सों को दबाए जिनके पीछे एक बिल्ली है। उन बॉक्सों को ना दबाए जिनके पीछे एक कुत्ता है",
      OK: "ठीक है",     
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाए जिनके पीछे एक कुत्ता है।।",
      IN_THIS_GAME_YOU_WILL_SEE_A_SCREEN_WITH_MANY_BOXES_THESE_BOXES_WILL_LIFT_REVEALING_EITHER_A_DOG_CAT_OR_NOTHING_BEHIND_THEM_A_TASK_IS_TO_TAP_THE_CORRECT_BOXES_BASED_ON_WHAT_IS_BEHIND_EACH_BOX_THE_INSTRUCTIONS_FOR_WHICH_BOXES_ARE_CORRECT_WILL_CHANGE_DEPENDING_ON_THE_LEVEL_SO_PAY_ATTENTION_TO_THE_ANIMALS:
        "इस खेल में, आपको एक स्क्रीन दिखाई देगी जिसमें कई बक्से होंगे। ये बक्से 'सरक जाएंगे ' और उनके पीछे कुत्ता, बिल्ली या कुछ भी नहीं दिखाई देगा। किस बक्से के पीछे क्या है यह दिए जाने वाले निर्देशों को देख कर सही बक्सों का चयन करना है। स्तर के आधार पर कौन-कौन से बक्से सही हैंं, उसके लिए निर्देश बदल जाएंगे, इसलिए जानवरों पर ध्यान दें!",
      DONT_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "उन बक्सों को ना दबाए जिनके पीछे बिल्ली है।",
      DONT_TAP_THE_BOXES_WITH_A_DOG_BEHIND_THEM:
        "उन बक्सो को ना दबाएं जिनके पीछे कुत्ता है।",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM_OK:
        "उन बॉक्सों को दबाए जिनके पीछे एक कुत्ता है।।ठीक है"
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
  },"ko-KR":{
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
  }, "zh-CN":{
    translation: {
      CATS_AND_DOGS: "猫和狗",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "继续点击后面有只狗的盒子。点击后面有只猫的盒子.",
      GAME_OVER:"游戏结束",  
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "现在点击后面有只猫的盒子。不要点击后面有只狗的盒子.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
      "点击后面有只狗的盒子",     
    },
  },
    "zh-HK":{
      translation: {
        CATS_AND_DOGS:  "貓和狗",
        CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "繼續點擊後面有隻狗的盒子。點擊後面有隻貓的盒子",
        GAME_OVER:"遊戲結束",  
        NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "現在點擊後面有隻貓的盒子。不要點擊後面有隻狗的盒子",
        OK: "Ok",
        TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "點擊後面有隻狗的盒子",     
      },
    }
  
  
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
