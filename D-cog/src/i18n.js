import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      "D-Cog": "Katte og Hunde",
      GAME_OVER: "Spillet er slut",
      INSTRUCTIONS:
        "Du vil se en skærm med mange kasser. Kasserne åbner sig og afslører enten en hund eller ingenting bag dem. Husk hvor hundene var, og tryk på de rigtige kasser.",
      OK: "Ok",
      Instructions: "Instruktioner",
      Start: "Start",
      Questionnaire: "Spørgeskema",
      Submit: "Indsend",
      "How clear were the instructions?": "Hvor klare var instruktionerne?",
      "How happy would you be to do this again?": "Hvor glad ville du være for at gøre dette igen?",
    },
  },
  "de-DE": {
    translation: {
      "D-Cog": "Katzen und Hunde",
      GAME_OVER: "Spiel ist vorbei",
      INSTRUCTIONS:
        "Sie sehen einen Bildschirm mit vielen Kästchen. Die Kästchen öffnen sich und zeigen entweder einen Hund oder nichts dahinter. Merken Sie sich, wo die Hunde waren, und tippen Sie auf die richtigen Kästchen.",
      OK: "Ok",
      Instructions: "Anleitung",
      Start: "Starten",
      Questionnaire: "Fragebogen",
      Submit: "Absenden",
      "How clear were the instructions?": "Wie klar waren die Anweisungen?",
      "How happy would you be to do this again?": "Wie gerne würden Sie das noch einmal machen?",
    },
  },
  "en-US": {
    translation: {
      "D-Cog": "D-Cog",
      GAME_OVER: "Game Over",
      INSTRUCTIONS:
        "You will see a screen with many boxes. The boxes will lift to reveal either a dog or nothing behind them. Remember where the dogs were and tap the correct boxes.",
      OK: "Ok",
      Instructions: "Instructions",
      Start: "Start",
      Questionnaire: "Questionnaire",
      Submit: "Submit",
      "How clear were the instructions?": "How clear were the instructions?",
      "How happy would you be to do this again?": "How happy would you be to do this again?",
    },
  },
  "es-ES": {
    translation: {
      "D-Cog": "Gatos y Perros",
      GAME_OVER: "Juego Terminado",
      INSTRUCTIONS:
        "Verás una pantalla con muchas cajas. Las cajas se levantarán revelando un perro o nada detrás. Recuerda dónde estaban los perros y toca las cajas correctas.",
      OK: "Ok",
      Instructions: "Instrucciones",
      Start: "Comenzar",
      Questionnaire: "Cuestionario",
      Submit: "Enviar",
      "How clear were the instructions?": "¿Qué tan claras fueron las instrucciones?",
      "How happy would you be to do this again?": "¿Qué tan feliz estarías de hacer esto de nuevo?",
    },
  },
  "fr-FR": {
    translation: {
      "D-Cog": "Chats et Chiens",
      GAME_OVER: "Jeu terminé",
      INSTRUCTIONS:
        "Vous verrez un écran avec de nombreuses cases. Les cases se soulèveront pour révéler un chien ou rien derrière elles. Retenez où se trouvaient les chiens et touchez les bonnes cases.",
      OK: "Ok",
      Instructions: "Instructions",
      Start: "Commencer",
      Questionnaire: "Questionnaire",
      Submit: "Soumettre",
      "How clear were the instructions?": "Les instructions étaient-elles claires ?",
      "How happy would you be to do this again?": "Seriez-vous heureux de refaire cet exercice ?",
    },
  },
  "hi-IN": {
    translation: {
      "D-Cog": "बिल्लियां और कुत्ते",
      GAME_OVER: "खेल खत्म",
      INSTRUCTIONS:
        "आपको कई बक्सों वाली एक स्क्रीन दिखाई देगी। बक्से खुलेंगे और उनके पीछे कुत्ता या कुछ नहीं दिखाई देगा। याद रखें कि कुत्ते कहाँ थे और सही बक्सों पर दबाएं।",
      OK: "ठीक है",
      Instructions: "निर्देश",
      Start: "शुरू करें",
      Questionnaire: "प्रश्नावली",
      Submit: "जमा करें",
      "How clear were the instructions?": "निर्देश कितने स्पष्ट थे?",
      "How happy would you be to do this again?": "आप इसे दोबारा करने में कितने खुश होंगे?",
    },
  },
  "it-IT": {
    translation: {
      "D-Cog": "Gatti e Cani",
      GAME_OVER: "Fine del gioco",
      INSTRUCTIONS:
        "Vedrai uno schermo con molti riquadri. I riquadri si solleveranno rivelando un cane o niente dietro di essi. Ricorda dove si trovavano i cani e tocca i riquadri corretti.",
      OK: "Ok",
      Instructions: "Istruzioni",
      Start: "Inizia",
      Questionnaire: "Questionario",
      Submit: "Invia",
      "How clear were the instructions?": "Quanto erano chiare le istruzioni?",
      "How happy would you be to do this again?": "Quanto saresti felice di farlo di nuovo?",
    },
  },
  "ko-KR": {
    translation: {
      "D-Cog": "고양이와 개들",
      GAME_OVER: "게임 종료",
      INSTRUCTIONS:
        "많은 상자가 있는 화면이 표시됩니다. 상자가 열리면 뒤에 개 또는 아무것도 없는 것이 나타납니다. 개가 어디에 있었는지 기억하고 올바른 상자를 누르세요.",
      OK: "괜찮음",
      Instructions: "지침",
      Start: "시작",
      Questionnaire: "설문지",
      Submit: "제출",
      "How clear were the instructions?": "지침이 얼마나 명확했나요?",
      "How happy would you be to do this again?": "이것을 다시 하게 된다면 얼마나 기쁘겠습니까?",
    },
  },
  "zh-CN": {
    translation: {
      "D-Cog": "猫和狗",
      GAME_OVER: "游戏结束",
      INSTRUCTIONS:
        "您将看到一个有许多盒子的屏幕。盒子会打开，露出后面的狗或什么都没有。记住狗在哪里，然后点击正确的盒子。",
      OK: "好的",
      Instructions: "说明",
      Start: "开始",
      Questionnaire: "问卷",
      Submit: "提交",
      "How clear were the instructions?": "说明有多清楚？",
      "How happy would you be to do this again?": "您愿意再做一次吗？",
    },
  },
  "zh-HK": {
    translation: {
      "D-Cog": "貓和狗",
      GAME_OVER: "遊戲結束",
      INSTRUCTIONS:
        "您將看到一個有許多盒子的屏幕。盒子會打開，露出後面的狗或什麼都沒有。記住狗在哪裡，然後點擊正確的盒子。",
      OK: "好的",
      Instructions: "說明",
      Start: "開始",
      Questionnaire: "問卷",
      Submit: "提交",
      "How clear were the instructions?": "說明有多清楚？",
      "How happy would you be to do this again?": "您願意再做一次嗎？",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  nsSeparator: false,
});

export default i18n;
