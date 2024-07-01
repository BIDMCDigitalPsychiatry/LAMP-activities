import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      BOX_GAME: "Kassespil",
      CONGRATS: "Tillykke",
      GAME_OVER: "Spillet er slut",
      GO: "G\u00e5",
      LEVEL: "Niveau",
      NEXT: "N\u00e6ste",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Tryk nu p\u00e5 felterne i den r\u00e6kkef\u00f8lge, de blev markeret..",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Husk venligst r\u00e6kkef\u00f8lgen",
      PLEASE_WAIT_AND_WATCH: "Vent venligst og se",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Husk de markerede kasser i den r\u00e6kkef\u00f8lge, du ser dem.",
      TIME_OUT: "Tiden er udl\u00f8bet",
    },
  },
  "de-DE": {
    translation: {
      BOX_GAME: "K\u00e4stchen",
      CONGRATS: "Gl\u00fcckwunsch",
      GAME_OVER: "Spiel ist vorbei",
      GO: "Geht's",
      LEVEL: "Level",
      NEXT: "Weiter",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Tippe dann auf die K\u00e4stchen in der Reihenfolge, in der sie hervorgehoben wurden.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Merke dir die Reihenfolge",
      PLEASE_WAIT_AND_WATCH: "Bitte warten und beobachten",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Merke dir die hervorgehobenen K\u00e4stchen in der Reihenfolge, in der sie erscheinen.",
      TIME_OUT: "Zeit abgelaufen",
    },
  },
  "en-US": {
    translation: {
      BOX_GAME: "Box Game",
      CONGRATS: "Congrats",
      GAME_OVER: "Game Over",
      GO: "Go",
      LEVEL: "Level",
      NEXT: "Next",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the order they were highlighted.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Please remember the sequence",
      PLEASE_WAIT_AND_WATCH: "Please wait and watch",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Remember the highlighted boxes in the order you see them.",
      TIME_OUT: "Time Out",
      YOU_WILL_SEE_A_GRID_OF_BOXES_THE_BOXES_IN_A_GRID_WILL_LIGHT_UP_IN_A_CERTAIN_ORDER_REMEMBER_THE_ORDER_AND_THEN_TAP_THE_BOXES_IN_THE_ORDER_IN_WHICH_THEY_LIT_UP_EACH_LEVEL_WILL_HAVE_MORE_BOXES_LIGHT_UP_IN_SEQUENCE_SEE_HOW_FAR_YOU_CAN_GET:
        "YOU WILL SEE A GRID OF BOXES. THE BOXES IN A GRID WILL LIGHT UP IN A CERTAIN ORDER. REMEMBER THE ORDER, AND THEN TAP THE BOXES IN THE ORDER IN WHICH THEY LIT UP. EACH LEVEL WILL HAVE MORE BOXES LIGHT UP IN SEQUENCE. SEE HOW FAR YOU CAN GET!"
    },
  },
  "es-ES": {
    translation: {
      BOX_GAME: "Juego de caja",
      CONGRATS: "Felicidades",
      GAME_OVER: "Juego Terminado",
      GO: "Vamos",
      LEVEL: "Nivel",
      NEXT: "siguiente",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Ahora toque las cajas en el orden en que fueron resaltadas.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Por favor recuerda la secuencia",
      PLEASE_WAIT_AND_WATCH: "Por favor espera y mira",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Recuerde las cajas resaltados en el orden en que los ve.",
      TIME_OUT: "Se acabó el tiempo",
    },
  },
  "fr-FR": {
    translation: {
      BOX_GAME: "Box Game",
      CONGRATS: "Bravo\u2009!",
      GAME_OVER: "Game Over",
      GO: "Go",
      LEVEL: "Niveau",
      NEXT: "Suivant",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Maintenant, appuyez sur les cases dans l\u2019ordre o\u00f9 elles se sont \u00e9clair\u00e9es.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Please remember the sequence",
      PLEASE_WAIT_AND_WATCH: "Please wait and watch",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Souvenez-vous des cases surlign\u00e9es dans l\u2019ordre o\u00f9 elles apparaissent.",
      TIME_OUT: "Time Out",
    },
  },
  "hi-IN": {
    translation: {
      BOX_GAME: "खेल बॉक्स",
      CONGRATS: "बधाई हो ",
      GAME_OVER: "खेल खत्म",
      GO: "जाए",
      LEVEL: "स्तर",
      NEXT: "आगे",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "अब बॉक्सों को उसी क्रम में दबाए जिस क्रम में वे हाइलाइट किए गए थे |",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "अब बक्सों पर उल्टे क्रम में टैप करें, जिस क्रम में उन्हें हाइलाइट किया गया था।",
      PLEASE_REMEMBER_THE_SEQUENCE: "कृपया क्रम/परिणाम को याद रखें",
      PLEASE_WAIT_AND_WATCH: "कृपया प्रतीक्षा करें और देखें",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "आपने हाइलाइट किए गए बॉक्सों को जिस क्रम में देखा है उन्हें याद रखे l",
      TIME_OUT: "समय समाप्त",
      SPATIAL_SPAN: "स्थानिक विस्तार",
      YOU_WILL_SEE_A_GRID_OF_BOXES_THE_BOXES_IN_A_GRID_WILL_LIGHT_UP_IN_A_CERTAIN_ORDER_REMEMBER_THE_ORDER_AND_THEN_TAP_THE_BOXES_IN_THE_ORDER_IN_WHICH_THEY_LIT_UP_EACH_LEVEL_WILL_HAVE_MORE_BOXES_LIGHT_UP_IN_SEQUENCE_SEE_HOW_FAR_YOU_CAN_GET:
        "आप एक बक्सों का क्रम देखेंगे, क्रम में बक्से एक निश्चित क्रम में चमकेंगे. क्रम याद रखें, और फिर उन बक्सों को उसी क्रम में टैप करें जिस क्रम में वे चमके थे। प्रत्येक स्तर में क्रम में और बक्से चमकेंगे, देखें कि आप कितना आगे बढ़ सकते हैं!",
      BEGIN: "खेल शुरू करें।",
      GO: "खेलें",

    },
  },
  "it-IT": {
    translation: {
      BOX_GAME: "Gioco dei riquadri",
      CONGRATS: "Congratulazioni",
      GAME_OVER: "Fine partita",
      GO: "Via",
      LEVEL: "Livello",
      NEXT: "Successiva",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Ora selezionare i riquadri nell'ordine in cui sono apparsi evidenziati sullo schermo.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "Fare attenzione alla sequenza",
      PLEASE_WAIT_AND_WATCH: "Aspetta e osserva",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Fare attenzione ai riquadri evidenziati nell'ordine in cui appaiono.",
      TIME_OUT: "Tempo scaduto",
    },
  },
    "ko-KR": {
    translation: {
      BOX_GAME: "\ubc15\uc2a4 \uac8c\uc784",
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      GAME_OVER: "\uac8c\uc784 \uc885\ub8cc",
      GO: "\uac00\uae30",
      LEVEL: "\ub808\ubca8",
      NEXT: "\ub2e4\uc74c",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "\ud558\uc77c\ub77c\uc774\ud2b8\ub41c \uc21c\uc11c\ub300\ub85c \ubc15\uc2a4\ub97c \ub20c\ub7ec \uc8fc\uc138\uc694.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "\ubc30\uc5f4\uc744 \uae30\uc5b5\ud558\uc138\uc694",
      PLEASE_WAIT_AND_WATCH: "\uc7a0\uc2dc \uae30\ub2e4\ub9ac\uba74\uc11c \ubcf4\uc138\uc694",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "\ud558\uc77c\ub77c\uc774\ud2b8\ub41c \ubc15\uc2a4\ub97c \ubcf8 \uc21c\uc11c\ub300\ub85c \uae30\uc5b5\ud558\uc138\uc694.",
      TIME_OUT: "\uc2dc\uac04 \uc885\ub8cc",
    },
  },  "zh-CN": {
    translation: {
      BOX_GAME: "盒子游戏",
      CONGRATS: "恭喜！",
      GAME_OVER:  "游戏结束",
      GO: "开始",
      LEVEL: "级别",
      NEXT: "下一步",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "现在按突出显示的顺序点击这些盒子.",
      NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the reverse order they were highlighted.",
      PLEASE_REMEMBER_THE_SEQUENCE: "请记住顺序",
      PLEASE_WAIT_AND_WATCH: "请等待并观看",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "按照看到的顺序记住突出显示的盒子",
      TIME_OUT:  "超时",
    },
  },
    "zh-HK": {
      translation: {
        BOX_GAME:  "盒子遊戲",
        CONGRATS: "恭喜！",
        GAME_OVER: "遊戲結束",
        GO: "開始",
        LEVEL: "級別",
        NEXT: "下一步",
        NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
          "現在按突出顯示的順序點擊這些盒子。",
        NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED:
          "Now tap on the boxes in the reverse order they were highlighted.",
        PLEASE_REMEMBER_THE_SEQUENCE: "請記住順序",
        PLEASE_WAIT_AND_WATCH: "請等待並觀看",
        REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
          "按照看到的順序記住突出顯示的盒子",
        TIME_OUT: "超時",
      },
    }
  }

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
