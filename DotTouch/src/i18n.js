import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      GAME: "Spil",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "I dette spil skifter du mellem at trykke på tal og bogstaver i stigende rækkefølge: f.eks. 1-A-2-B osv.",
      GAME_OVER: "Spillet er slut",
      CONGRATULATIONS: "Tillykke!",
      "Time's up!": "Tiden er udløbet!",
      TAP_1_TO_START: "Tryk på '1' for at starte testen",
      TAP_1_TO_BEGIN: "Tryk på '1' for at begynde",
      TAP_CORRESPONDING_LETTER: "Tryk på det tilsvarende bogstav",
      LEVEL_NUMBER: "Niveau {{ level }}",
      TOO_MANY_MISTAKES: "For mange fejl",
      CONTINUE: "Fortsæt",
      Instructions: "Instruktioner",
      Start: "Start",
      Questionnaire: "Spørgeskema",
      Submit: "Indsend",
      "How clear were the instructions?": "Hvor klare var instruktionerne?",
      "How happy would you be to do this again?":
        "Hvor glad ville du være for at gøre dette igen?",
    },
  },
  "de-DE": {
    translation: {
      GAME: "Spiel",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "In diesem Spiel wechseln Sie zwischen dem Tippen auf Zahlen und Buchstaben in aufsteigender Reihenfolge: z.B. 1-A-2-B usw.",
      GAME_OVER: "Spiel ist vorbei",
      CONGRATULATIONS: "Glückwunsch!",
      "Time's up!": "Die Zeit ist um!",
      TAP_1_TO_START: "Tippen Sie auf '1', um den Test zu starten",
      TAP_1_TO_BEGIN: "Tippen Sie auf '1', um zu beginnen",
      TAP_CORRESPONDING_LETTER: "Tippen Sie auf den entsprechenden Buchstaben",
      LEVEL_NUMBER: "Level {{ level }}",
      TOO_MANY_MISTAKES: "Zu viele Fehler",
      CONTINUE: "Weiter",
      Instructions: "Anleitung",
      Start: "Starten",
      Questionnaire: "Fragebogen",
      Submit: "Absenden",
      "How clear were the instructions?": "Wie klar waren die Anweisungen?",
      "How happy would you be to do this again?":
        "Wie gerne würden Sie das noch einmal machen?",
    },
  },
  "en-US": {
    translation: {
      GAME: "Game",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "For this game, you will alternate between tapping on numbers and letters in increasing order: for instance, 1-A-2-B etc.",
      GAME_OVER: "Game Over",
      CONGRATULATIONS: "Congratulations!",
      "Time's up!": "Time's up!",
      TAP_1_TO_START: "Tap '1' to start the test",
      TAP_1_TO_BEGIN: "Tap '1' to begin",
      TAP_CORRESPONDING_LETTER: "Tap on the corresponding letter",
      LEVEL_NUMBER: "Level {{ level }}",
      TOO_MANY_MISTAKES: "Too many mistakes",
      CONTINUE: "Continue",
      Instructions: "Instructions",
      Start: "Start",
      Questionnaire: "Questionnaire",
      Submit: "Submit",
      "How clear were the instructions?": "How clear were the instructions?",
      "How happy would you be to do this again?":
        "How happy would you be to do this again?",
    },
  },
  "es-ES": {
    translation: {
      GAME: "Juego",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "En este juego, alternarás entre tocar números y letras en orden creciente: por ejemplo, 1-A-2-B etc.",
      GAME_OVER: "Juego Terminado",
      CONGRATULATIONS: "¡Felicidades!",
      "Time's up!": "¡Se acabó el tiempo!",
      TAP_1_TO_START: "Toca '1' para iniciar la prueba",
      TAP_1_TO_BEGIN: "Toca '1' para comenzar",
      TAP_CORRESPONDING_LETTER: "Toca la letra correspondiente",
      LEVEL_NUMBER: "Nivel {{ level }}",
      TOO_MANY_MISTAKES: "Demasiados errores",
      CONTINUE: "Continuar",
      Instructions: "Instrucciones",
      Start: "Comenzar",
      Questionnaire: "Cuestionario",
      Submit: "Enviar",
      "How clear were the instructions?":
        "¿Qué tan claras fueron las instrucciones?",
      "How happy would you be to do this again?":
        "¿Qué tan feliz estarías de hacer esto de nuevo?",
    },
  },
  "fr-FR": {
    translation: {
      GAME: "Jeu",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "Dans ce jeu, vous alternez entre toucher des chiffres et des lettres dans l'ordre croissant\u2009: par exemple, 1-A-2-B etc.",
      GAME_OVER: "Jeu terminé",
      CONGRATULATIONS: "Bravo\u2009!",
      "Time's up!": "Le temps est écoulé\u2009!",
      TAP_1_TO_START: "Touchez '1' pour commencer le test",
      TAP_1_TO_BEGIN: "Touchez '1' pour commencer",
      TAP_CORRESPONDING_LETTER: "Touchez la lettre correspondante",
      LEVEL_NUMBER: "Niveau {{ level }}",
      TOO_MANY_MISTAKES: "Trop d'erreurs",
      CONTINUE: "Continuer",
      Instructions: "Instructions",
      Start: "Commencer",
      Questionnaire: "Questionnaire",
      Submit: "Soumettre",
      "How clear were the instructions?":
        "Les instructions étaient-elles claires\u2009?",
      "How happy would you be to do this again?":
        "Seriez-vous heureux de refaire cet exercice\u2009?",
    },
  },
  "hi-IN": {
    translation: {
      GAME: "खेल",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "इस खेल में, आप बढ़ते क्रम में संख्याओं और अक्षरों को बारी-बारी से दबाएंगे: उदाहरण के लिए, 1-A-2-B आदि।",
      GAME_OVER: "खेल खत्म",
      CONGRATULATIONS: "बधाई हो!",
      "Time's up!": "समय समाप्त!",
      TAP_1_TO_START: "परीक्षण शुरू करने के लिए '1' दबाएं",
      TAP_1_TO_BEGIN: "शुरू करने के लिए '1' दबाएं",
      TAP_CORRESPONDING_LETTER: "संबंधित अक्षर पर दबाएं",
      LEVEL_NUMBER: "स्तर {{ level }}",
      TOO_MANY_MISTAKES: "बहुत अधिक गलतियाँ",
      CONTINUE: "जारी रखें",
      Instructions: "निर्देश",
      Start: "शुरू करें",
      Questionnaire: "प्रश्नावली",
      Submit: "जमा करें",
      "How clear were the instructions?": "निर्देश कितने स्पष्ट थे?",
      "How happy would you be to do this again?":
        "आप इसे दोबारा करने में कितने खुश होंगे?",
    },
  },
  "it-IT": {
    translation: {
      GAME: "Gioco",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "In questo gioco, alternerai tra toccare numeri e lettere in ordine crescente: ad esempio, 1-A-2-B ecc.",
      GAME_OVER: "Fine del gioco",
      CONGRATULATIONS: "Congratulazioni!",
      "Time's up!": "Tempo scaduto!",
      TAP_1_TO_START: "Tocca '1' per iniziare il test",
      TAP_1_TO_BEGIN: "Tocca '1' per iniziare",
      TAP_CORRESPONDING_LETTER: "Tocca la lettera corrispondente",
      LEVEL_NUMBER: "Livello {{ level }}",
      TOO_MANY_MISTAKES: "Troppi errori",
      CONTINUE: "Continua",
      Instructions: "Istruzioni",
      Start: "Inizia",
      Questionnaire: "Questionario",
      Submit: "Invia",
      "How clear were the instructions?":
        "Quanto erano chiare le istruzioni?",
      "How happy would you be to do this again?":
        "Quanto saresti felice di farlo di nuovo?",
    },
  },
  "ko-KR": {
    translation: {
      GAME: "게임",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "이 게임에서는 숫자와 문자를 오름차순으로 번갈아 누릅니다: 예를 들어, 1-A-2-B 등.",
      GAME_OVER: "게임 종료",
      CONGRATULATIONS: "축하합니다!",
      "Time's up!": "시간이 다 됐습니다!",
      TAP_1_TO_START: "'1'을 눌러 테스트를 시작하세요",
      TAP_1_TO_BEGIN: "'1'을 눌러 시작하세요",
      TAP_CORRESPONDING_LETTER: "해당 문자를 누르세요",
      LEVEL_NUMBER: "레벨 {{ level }}",
      TOO_MANY_MISTAKES: "실수가 너무 많습니다",
      CONTINUE: "계속",
      Instructions: "지침",
      Start: "시작",
      Questionnaire: "설문지",
      Submit: "제출",
      "How clear were the instructions?": "지침이 얼마나 명확했나요?",
      "How happy would you be to do this again?":
        "이것을 다시 하게 된다면 얼마나 기쁘겠습니까?",
    },
  },
  "zh-CN": {
    translation: {
      GAME: "游戏",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "在这个游戏中，您将按递增顺序交替点击数字和字母：例如，1-A-2-B 等。",
      GAME_OVER: "游戏结束",
      CONGRATULATIONS: "恭喜！",
      "Time's up!": "时间到！",
      TAP_1_TO_START: "点击 '1' 开始测试",
      TAP_1_TO_BEGIN: "点击 '1' 开始",
      TAP_CORRESPONDING_LETTER: "点击对应的字母",
      LEVEL_NUMBER: "级别 {{ level }}",
      TOO_MANY_MISTAKES: "错误太多",
      CONTINUE: "继续",
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
      GAME: "遊戲",
      TRAILS_B: "Trails B",
      INSTRUCTIONS:
        "在這個遊戲中，您將按遞增順序交替點擊數字和字母：例如，1-A-2-B 等。",
      GAME_OVER: "遊戲結束",
      CONGRATULATIONS: "恭喜！",
      "Time's up!": "時間到！",
      TAP_1_TO_START: "點擊 '1' 開始測試",
      TAP_1_TO_BEGIN: "點擊 '1' 開始",
      TAP_CORRESPONDING_LETTER: "點擊對應的字母",
      LEVEL_NUMBER: "級別 {{ level }}",
      TOO_MANY_MISTAKES: "錯誤太多",
      CONTINUE: "繼續",
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
