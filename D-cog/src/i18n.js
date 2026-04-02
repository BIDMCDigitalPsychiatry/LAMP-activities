import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      "D-Cog": "Katte og Hunde",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Fortsæt med at trykke på de kasser, der har en hund bag dem. Tryk ikke på kasser med en kat bag dem.",
      GAME_OVER: "Spillet er slut",
      INSTRUCTIONS:
        "Du vil se en skærm med mange kasser. Kasserne åbner sig og afslører enten en hund, en kat eller ingenting. Tryk på de rigtige kasser baseret på instruktionerne for hvert niveau.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Tryk nu på de kasser, hvor der er en kat bag dem. Tryk ikke på de kasser med en hund bag dem.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tryk på de kasser, der har en hund bag dem.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tippe weiter auf die Kästchen, hinter denen sich ein Hund befindet. Tippe nicht auf die Kästchen, hinter denen sich eine Katze befindet.",
      GAME_OVER: "Spiel ist vorbei",
      INSTRUCTIONS:
        "Sie sehen einen Bildschirm mit vielen Kästchen. Die Kästchen öffnen sich und zeigen entweder einen Hund, eine Katze oder nichts. Tippen Sie auf die richtigen Kästchen basierend auf den Anweisungen für jedes Level.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Tippe nun auf die Kästchen, hinter denen sich eine Katze befindet. Tippe nicht auf die Kästchen, hinter denen sich ein Hund befindet.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tippe auf die Kästchen, hinter denen sich ein Hund befindet.",
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
      "D-Cog": "Cats and Dogs",
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continue to tap the boxes that have a dog behind them. Don't tap the boxes with a cat behind them.",
      GAME_OVER: "Game Over",
      INSTRUCTIONS:
        "You will see a screen with many boxes. The boxes will lift to reveal a dog, a cat, or nothing behind them. Tap the correct boxes based on the instructions for each level.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Now tap the boxes that have a cat behind them. Don't tap the boxes with a dog behind them.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Tap the boxes that have a dog behind them.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continúa tocando las cajas que tienen un perro detrás. No toques las cajas que tienen un gato detrás.",
      GAME_OVER: "Juego Terminado",
      INSTRUCTIONS:
        "Verás una pantalla con muchas cajas. Las cajas se levantarán revelando un perro, un gato o nada detrás. Toca las cajas correctas según las instrucciones de cada nivel.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Ahora toca las cajas que tienen un gato detrás. No toques las cajas que tienen un perro detrás.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Toca las cajas que tienen un perro detrás.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continuez à toucher les cases derrière lesquelles se trouve un chien. Ne touchez pas les cases derrière lesquelles se trouve un chat.",
      GAME_OVER: "Jeu terminé",
      INSTRUCTIONS:
        "Vous verrez un écran avec de nombreuses cases. Les cases se soulèveront pour révéler un chien, un chat ou rien derrière elles. Touchez les bonnes cases selon les instructions de chaque niveau.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Maintenant, touchez les cases derrière lesquelles se trouve un chat. Ne touchez pas les cases derrière lesquelles se trouve un chien.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Touchez les cases derrière lesquelles se trouve un chien.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाना जारी रखें जिनके पीछे कुत्ता है। उन बॉक्सों को ना दबाएं जिनके पीछे बिल्ली है।",
      GAME_OVER: "खेल खत्म",
      INSTRUCTIONS:
        "आपको कई बक्सों वाली एक स्क्रीन दिखाई देगी। बक्से खुलेंगे और उनके पीछे कुत्ता, बिल्ली या कुछ नहीं दिखाई देगा। प्रत्येक स्तर के निर्देशों के अनुसार सही बक्सों पर दबाएं।",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "अब उन बॉक्सों को दबाएं जिनके पीछे बिल्ली है। उन बॉक्सों को ना दबाएं जिनके पीछे कुत्ता है।",
      OK: "ठीक है",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "उन बॉक्सों को दबाएं जिनके पीछे कुत्ता है।",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Continuare a toccare i riquadri dietro cui si trova un cane. Non toccare i riquadri dietro cui si trova un gatto.",
      GAME_OVER: "Fine del gioco",
      INSTRUCTIONS:
        "Vedrai uno schermo con molti riquadri. I riquadri si solleveranno rivelando un cane, un gatto o niente dietro di essi. Tocca i riquadri corretti in base alle istruzioni di ogni livello.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "Ora toccare i riquadri dietro cui si trova un gatto. Non toccare i riquadri dietro cui si trova un cane.",
      OK: "Ok",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "Toccare i riquadri dietro cui si trova un cane.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "뒤에 개가 있는 박스들을 계속 누르세요. 뒤에 고양이가 있는 박스들은 누르지 마세요.",
      GAME_OVER: "게임 종료",
      INSTRUCTIONS:
        "많은 상자가 있는 화면이 표시됩니다. 상자가 열리면 뒤에 개, 고양이 또는 아무것도 없는 것이 나타납니다. 각 레벨의 지시에 따라 올바른 상자를 누르세요.",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "뒤에 고양이가 있는 박스들을 이제 누르세요. 뒤에 개가 있는 박스들은 누르지 마세요.",
      OK: "괜찮음",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "뒤에 개가 있는 박스들을 누르세요.",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "继续点击后面有狗的盒子。不要点击后面有猫的盒子。",
      GAME_OVER: "游戏结束",
      INSTRUCTIONS:
        "您将看到一个有许多盒子的屏幕。盒子会打开，露出后面的狗、猫或什么都没有。根据每个关卡的说明点击正确的盒子。",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "现在点击后面有猫的盒子。不要点击后面有狗的盒子。",
      OK: "好的",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "点击后面有狗的盒子。",
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
      CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "繼續點擊後面有狗的盒子。不要點擊後面有貓的盒子。",
      GAME_OVER: "遊戲結束",
      INSTRUCTIONS:
        "您將看到一個有許多盒子的屏幕。盒子會打開，露出後面的狗、貓或什麼都沒有。根據每個關卡的說明點擊正確的盒子。",
      NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM:
        "現在點擊後面有貓的盒子。不要點擊後面有狗的盒子。",
      OK: "好的",
      TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM:
        "點擊後面有狗的盒子。",
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
