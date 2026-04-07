import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      "Symbol-Digit Substitution": "Symbol-Digit Substitution",
      Instructions: "Instructions",
      Start: "Start",
      "Start Game": "Start Game",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "You will see a symbol on screen. Use the legend at the top to find which number matches it, then press that number. Try to match as many as you can before time runs out.",
      "INSTRUCTIONS_BEFORE":
        "You will see a symbol on screen. Study the legend below, then press Start. The legend will disappear and you must match symbols from memory.",
      "INSTRUCTIONS_HIDDEN":
        "You will see a symbol on screen. Press the number you think matches it. Try to match as many as you can before time runs out.",
      "Time left:": "Time left:",
      seconds: "seconds",
      Right: "Right",
      "Wrong!": "Wrong!",
      "Time's up!": "Time's up!",
      "Memorize the key below. It will disappear when you press Start!":
        "Memorize the key below. It will disappear when you press Start!",
      Questionnaire: "Questionnaire",
      Submit: "Submit",
      "How clear were the instructions?": "How clear were the instructions?",
      "How happy would you be to do this again?":
        "How happy would you be to do this again?",
    },
  },
  "es-ES": {
    translation: {
      "Symbol-Digit Substitution": "Sustitución de Símbolos y Dígitos",
      Instructions: "Instrucciones",
      Start: "Comenzar",
      "Start Game": "Iniciar Juego",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "Verás un símbolo en la pantalla. Usa la leyenda de arriba para encontrar qué número le corresponde y presiónalo. Intenta emparejar tantos como puedas antes de que se acabe el tiempo.",
      "INSTRUCTIONS_BEFORE":
        "Verás un símbolo en la pantalla. Estudia la leyenda de abajo y luego presiona Comenzar. La leyenda desaparecerá y deberás emparejar los símbolos de memoria.",
      "INSTRUCTIONS_HIDDEN":
        "Verás un símbolo en la pantalla. Presiona el número que creas que le corresponde. Intenta emparejar tantos como puedas antes de que se acabe el tiempo.",
      "Time left:": "Tiempo restante:",
      seconds: "segundos",
      Right: "Correcto",
      "Wrong!": "¡Incorrecto!",
      "Time's up!": "¡Se acabó el tiempo!",
      "Memorize the key below. It will disappear when you press Start!":
        "¡Memoriza la clave de abajo. Desaparecerá cuando presiones Comenzar!",
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
      "Symbol-Digit Substitution": "Substitution Symbole-Chiffre",
      Instructions: "Instructions",
      Start: "Commencer",
      "Start Game": "Démarrer le Jeu",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "Vous verrez un symbole à l'écran. Utilisez la légende en haut pour trouver le chiffre correspondant, puis appuyez dessus. Essayez d'en associer le plus possible avant la fin du temps.",
      "INSTRUCTIONS_BEFORE":
        "Vous verrez un symbole à l'écran. Étudiez la légende ci-dessous, puis appuyez sur Commencer. La légende disparaîtra et vous devrez associer les symboles de mémoire.",
      "INSTRUCTIONS_HIDDEN":
        "Vous verrez un symbole à l'écran. Appuyez sur le chiffre qui selon vous lui correspond. Essayez d'en associer le plus possible avant la fin du temps.",
      "Time left:": "Temps restant :",
      seconds: "secondes",
      Right: "Correct",
      "Wrong!": "Faux !",
      "Time's up!": "Temps écoulé !",
      "Memorize the key below. It will disappear when you press Start!":
        "Mémorisez la clé ci-dessous. Elle disparaîtra quand vous appuierez sur Commencer !",
      Questionnaire: "Questionnaire",
      Submit: "Soumettre",
      "How clear were the instructions?":
        "Les instructions étaient-elles claires ?",
      "How happy would you be to do this again?":
        "Seriez-vous heureux de refaire cet exercice ?",
    },
  },
  "de-DE": {
    translation: {
      "Symbol-Digit Substitution": "Symbol-Ziffern-Zuordnung",
      Instructions: "Anleitung",
      Start: "Starten",
      "Start Game": "Spiel Starten",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "Sie sehen ein Symbol auf dem Bildschirm. Verwenden Sie die Legende oben, um die passende Zahl zu finden, und drücken Sie diese. Versuchen Sie, so viele wie möglich zuzuordnen, bevor die Zeit abläuft.",
      "INSTRUCTIONS_BEFORE":
        "Sie sehen ein Symbol auf dem Bildschirm. Studieren Sie die Legende unten und drücken Sie dann Starten. Die Legende verschwindet und Sie müssen die Symbole aus dem Gedächtnis zuordnen.",
      "INSTRUCTIONS_HIDDEN":
        "Sie sehen ein Symbol auf dem Bildschirm. Drücken Sie die Zahl, die Ihrer Meinung nach passt. Versuchen Sie, so viele wie möglich zuzuordnen, bevor die Zeit abläuft.",
      "Time left:": "Verbleibende Zeit:",
      seconds: "Sekunden",
      Right: "Richtig",
      "Wrong!": "Falsch!",
      "Time's up!": "Zeit abgelaufen!",
      "Memorize the key below. It will disappear when you press Start!":
        "Merken Sie sich die Legende unten. Sie verschwindet, wenn Sie Starten drücken!",
      Questionnaire: "Fragebogen",
      Submit: "Absenden",
      "How clear were the instructions?":
        "Wie klar waren die Anweisungen?",
      "How happy would you be to do this again?":
        "Wie gerne würden Sie das noch einmal machen?",
    },
  },
  "hi-IN": {
    translation: {
      "Symbol-Digit Substitution": "प्रतीक-अंक प्रतिस्थापन",
      Instructions: "निर्देश",
      Start: "शुरू करें",
      "Start Game": "खेल शुरू करें",
      Ok: "ठीक है",
      "INSTRUCTIONS_DURING":
        "आपको स्क्रीन पर एक प्रतीक दिखाई देगा। ऊपर की कुंजी का उपयोग करके उससे मेल खाने वाली संख्या खोजें, फिर उसे दबाएं। समय समाप्त होने से पहले जितने हो सके उतने मिलान करने का प्रयास करें।",
      "INSTRUCTIONS_BEFORE":
        "आपको स्क्रीन पर एक प्रतीक दिखाई देगा। नीचे दी गई कुंजी का अध्ययन करें, फिर शुरू करें दबाएं। कुंजी गायब हो जाएगी और आपको स्मृति से प्रतीकों का मिलान करना होगा।",
      "INSTRUCTIONS_HIDDEN":
        "आपको स्क्रीन पर एक प्रतीक दिखाई देगा। जो संख्या आपको लगता है कि मेल खाती है उसे दबाएं। समय समाप्त होने से पहले जितने हो सके उतने मिलान करने का प्रयास करें।",
      "Time left:": "शेष समय:",
      seconds: "सेकंड",
      Right: "सही",
      "Wrong!": "गलत!",
      "Time's up!": "समय समाप्त!",
      "Memorize the key below. It will disappear when you press Start!":
        "नीचे दी गई कुंजी याद करें। शुरू करें दबाने पर यह गायब हो जाएगी!",
      Questionnaire: "प्रश्नावली",
      Submit: "जमा करें",
      "How clear were the instructions?": "निर्देश कितने स्पष्ट थे?",
      "How happy would you be to do this again?":
        "आप इसे दोबारा करने में कितने खुश होंगे?",
    },
  },
  "ko-KR": {
    translation: {
      "Symbol-Digit Substitution": "기호-숫자 대체",
      Instructions: "지침",
      Start: "시작",
      "Start Game": "게임 시작",
      Ok: "확인",
      "INSTRUCTIONS_DURING":
        "화면에 기호가 표시됩니다. 상단의 범례를 사용하여 해당 숫자를 찾은 다음 누르세요. 시간이 다 되기 전에 최대한 많이 맞추세요.",
      "INSTRUCTIONS_BEFORE":
        "화면에 기호가 표시됩니다. 아래의 범례를 학습한 후 시작을 누르세요. 범례가 사라지면 기억으로 기호를 맞춰야 합니다.",
      "INSTRUCTIONS_HIDDEN":
        "화면에 기호가 표시됩니다. 맞다고 생각하는 숫자를 누르세요. 시간이 다 되기 전에 최대한 많이 맞추세요.",
      "Time left:": "남은 시간:",
      seconds: "초",
      Right: "정답",
      "Wrong!": "오답!",
      "Time's up!": "시간 종료!",
      "Memorize the key below. It will disappear when you press Start!":
        "아래 범례를 외우세요. 시작을 누르면 사라집니다!",
      Questionnaire: "설문지",
      Submit: "제출",
      "How clear were the instructions?": "지침이 얼마나 명확했나요?",
      "How happy would you be to do this again?":
        "이것을 다시 하게 된다면 얼마나 기쁘겠습니까?",
    },
  },
  "da-DK": {
    translation: {
      "Symbol-Digit Substitution": "Symbol-Ciffer Substitution",
      Instructions: "Instruktioner",
      Start: "Start",
      "Start Game": "Start Spil",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "Du vil se et symbol på skærmen. Brug legenden øverst til at finde det tilsvarende tal, og tryk derefter på det. Prøv at matche så mange som muligt, inden tiden løber ud.",
      "INSTRUCTIONS_BEFORE":
        "Du vil se et symbol på skærmen. Studer legenden nedenfor, og tryk derefter på Start. Legenden forsvinder, og du skal matche symbolerne fra hukommelsen.",
      "INSTRUCTIONS_HIDDEN":
        "Du vil se et symbol på skærmen. Tryk på det tal, du mener passer. Prøv at matche så mange som muligt, inden tiden løber ud.",
      "Time left:": "Tid tilbage:",
      seconds: "sekunder",
      Right: "Rigtigt",
      "Wrong!": "Forkert!",
      "Time's up!": "Tiden er udløbet!",
      "Memorize the key below. It will disappear when you press Start!":
        "Husk nøglen nedenfor. Den forsvinder, når du trykker Start!",
      Questionnaire: "Spørgeskema",
      Submit: "Indsend",
      "How clear were the instructions?": "Hvor klare var instruktionerne?",
      "How happy would you be to do this again?":
        "Hvor glad ville du være for at gøre dette igen?",
    },
  },
  "it-IT": {
    translation: {
      "Symbol-Digit Substitution": "Sostituzione Simbolo-Cifra",
      Instructions: "Istruzioni",
      Start: "Inizia",
      "Start Game": "Inizia il Gioco",
      Ok: "Ok",
      "INSTRUCTIONS_DURING":
        "Vedrai un simbolo sullo schermo. Usa la legenda in alto per trovare il numero corrispondente, quindi premilo. Cerca di abbinarne il più possibile prima che scada il tempo.",
      "INSTRUCTIONS_BEFORE":
        "Vedrai un simbolo sullo schermo. Studia la legenda qui sotto, poi premi Inizia. La legenda scomparirà e dovrai abbinare i simboli a memoria.",
      "INSTRUCTIONS_HIDDEN":
        "Vedrai un simbolo sullo schermo. Premi il numero che pensi corrisponda. Cerca di abbinarne il più possibile prima che scada il tempo.",
      "Time left:": "Tempo rimanente:",
      seconds: "secondi",
      Right: "Corretto",
      "Wrong!": "Sbagliato!",
      "Time's up!": "Tempo scaduto!",
      "Memorize the key below. It will disappear when you press Start!":
        "Memorizza la legenda qui sotto. Scomparirà quando premi Inizia!",
      Questionnaire: "Questionario",
      Submit: "Invia",
      "How clear were the instructions?":
        "Quanto erano chiare le istruzioni?",
      "How happy would you be to do this again?":
        "Quanto saresti felice di farlo di nuovo?",
    },
  },
  "zh-CN": {
    translation: {
      "Symbol-Digit Substitution": "符号-数字替换",
      Instructions: "说明",
      Start: "开始",
      "Start Game": "开始游戏",
      Ok: "确定",
      "INSTRUCTIONS_DURING":
        "屏幕上会出现一个符号。使用顶部的图例找到对应的数字，然后按下它。在时间用完之前尽可能多地匹配。",
      "INSTRUCTIONS_BEFORE":
        "屏幕上会出现一个符号。先学习下方的图例，然后按开始。图例会消失，您需要凭记忆匹配符号。",
      "INSTRUCTIONS_HIDDEN":
        "屏幕上会出现一个符号。按下您认为匹配的数字。在时间用完之前尽可能多地匹配。",
      "Time left:": "剩余时间：",
      seconds: "秒",
      Right: "正确",
      "Wrong!": "错误！",
      "Time's up!": "时间到！",
      "Memorize the key below. It will disappear when you press Start!":
        "记住下方的图例。按开始后它会消失！",
      Questionnaire: "问卷",
      Submit: "提交",
      "How clear were the instructions?": "说明有多清楚？",
      "How happy would you be to do this again?": "您愿意再做一次吗？",
    },
  },
  "zh-HK": {
    translation: {
      "Symbol-Digit Substitution": "符號-數字替換",
      Instructions: "說明",
      Start: "開始",
      "Start Game": "開始遊戲",
      Ok: "確定",
      "INSTRUCTIONS_DURING":
        "畫面上會出現一個符號。使用頂部的圖例找到對應的數字，然後按下它。在時間用完之前盡可能多地配對。",
      "INSTRUCTIONS_BEFORE":
        "畫面上會出現一個符號。先學習下方的圖例，然後按開始。圖例會消失，您需要憑記憶配對符號。",
      "INSTRUCTIONS_HIDDEN":
        "畫面上會出現一個符號。按下您認為配對的數字。在時間用完之前盡可能多地配對。",
      "Time left:": "剩餘時間：",
      seconds: "秒",
      Right: "正確",
      "Wrong!": "錯誤！",
      "Time's up!": "時間到！",
      "Memorize the key below. It will disappear when you press Start!":
        "記住下方的圖例。按開始後它會消失！",
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
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
