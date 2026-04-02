import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      "Digit Span": "Digit Span",
      Instructions: "Instructions",
      Start: "Start",
      "INSTRUCTIONS":
        "You will hear a series of numbers. Listen carefully. When the numbers stop, tap them in the same order you heard them.",
      "Listen...": "Listen...",
      "Your turn!": "Your turn!",
      "Level:": "Level:",
      Forward: "Forward",
      Backward: "Backward",
      "Reverse Order": "Reverse Order",
      "MODE_TRANSITION":
        "Now you will hear digits and enter them in <strong>reverse</strong> order. For example, if you hear 3-7-2, enter 2-7-3.",
      Ready: "Ready",
      Questionnaire: "Questionnaire",
      Submit: "Submit",
      "How clear were the instructions?": "How clear were the instructions?",
      "How happy would you be to do this again?":
        "How happy would you be to do this again?",
    },
  },
  "es-ES": {
    translation: {
      "Digit Span": "Amplitud de Dígitos",
      Instructions: "Instrucciones",
      Start: "Comenzar",
      "INSTRUCTIONS":
        "Escucharás una serie de números. Escucha con atención. Cuando los números se detengan, tócalos en el mismo orden en que los escuchaste.",
      "Listen...": "Escucha...",
      "Your turn!": "¡Tu turno!",
      "Level:": "Nivel:",
      Forward: "Adelante",
      Backward: "Atrás",
      "Reverse Order": "Orden inverso",
      "MODE_TRANSITION":
        "Ahora escucharás dígitos y los ingresarás en orden <strong>inverso</strong>. Por ejemplo, si escuchas 3-7-2, ingresa 2-7-3.",
      Ready: "Listo",
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
      "Digit Span": "Empan de Chiffres",
      Instructions: "Instructions",
      Start: "Commencer",
      "INSTRUCTIONS":
        "Vous allez entendre une série de chiffres. Écoutez attentivement. Quand les chiffres s'arrêtent, tapez-les dans le même ordre que vous les avez entendus.",
      "Listen...": "Écoutez...",
      "Your turn!": "À vous !",
      "Level:": "Niveau :",
      Forward: "En avant",
      Backward: "En arrière",
      "Reverse Order": "Ordre inverse",
      "MODE_TRANSITION":
        "Maintenant vous entendrez des chiffres et les saisirez dans l'ordre <strong>inverse</strong>. Par exemple, si vous entendez 3-7-2, saisissez 2-7-3.",
      Ready: "Prêt",
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
      "Digit Span": "Zahlenspanne",
      Instructions: "Anleitung",
      Start: "Starten",
      "INSTRUCTIONS":
        "Sie werden eine Reihe von Zahlen hören. Hören Sie aufmerksam zu. Wenn die Zahlen aufhören, tippen Sie sie in der gleichen Reihenfolge ein, in der Sie sie gehört haben.",
      "Listen...": "Zuhören...",
      "Your turn!": "Sie sind dran!",
      "Level:": "Stufe:",
      Forward: "Vorwärts",
      Backward: "Rückwärts",
      "Reverse Order": "Umgekehrte Reihenfolge",
      "MODE_TRANSITION":
        "Jetzt hören Sie Ziffern und geben sie in <strong>umgekehrter</strong> Reihenfolge ein. Wenn Sie z.B. 3-7-2 hören, geben Sie 2-7-3 ein.",
      Ready: "Bereit",
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
      "Digit Span": "अंक विस्तार",
      Instructions: "निर्देश",
      Start: "शुरू करें",
      "INSTRUCTIONS":
        "आप संख्याओं की एक श्रृंखला सुनेंगे। ध्यान से सुनें। जब संख्याएँ रुक जाएँ, उन्हें उसी क्रम में टैप करें जिसमें आपने उन्हें सुना।",
      "Listen...": "सुनिए...",
      "Your turn!": "आपकी बारी!",
      "Level:": "स्तर:",
      Forward: "आगे",
      Backward: "पीछे",
      "Reverse Order": "उल्टा क्रम",
      "MODE_TRANSITION":
        "अब आप अंक सुनेंगे और उन्हें <strong>उल्टे</strong> क्रम में दर्ज करेंगे। उदाहरण के लिए, यदि आप 3-7-2 सुनते हैं, तो 2-7-3 दर्ज करें।",
      Ready: "तैयार",
      Questionnaire: "प्रश्नावली",
      Submit: "जमा करें",
      "How clear were the instructions?": "निर्देश कितने स्पष्ट थे?",
      "How happy would you be to do this again?":
        "आप इसे दोबारा करने में कितने खुश होंगे?",
    },
  },
  "ko-KR": {
    translation: {
      "Digit Span": "숫자 폭",
      Instructions: "지침",
      Start: "시작",
      "INSTRUCTIONS":
        "일련의 숫자를 듣게 됩니다. 주의 깊게 들으세요. 숫자가 멈추면 들은 순서대로 탭하세요.",
      "Listen...": "듣기...",
      "Your turn!": "당신 차례!",
      "Level:": "레벨:",
      Forward: "순방향",
      Backward: "역방향",
      "Reverse Order": "역순",
      "MODE_TRANSITION":
        "이제 숫자를 듣고 <strong>역순</strong>으로 입력합니다. 예를 들어 3-7-2를 들으면 2-7-3을 입력하세요.",
      Ready: "준비",
      Questionnaire: "설문지",
      Submit: "제출",
      "How clear were the instructions?": "지침이 얼마나 명확했나요?",
      "How happy would you be to do this again?":
        "이것을 다시 하게 된다면 얼마나 기쁘겠습니까?",
    },
  },
  "da-DK": {
    translation: {
      "Digit Span": "Cifferspænd",
      Instructions: "Instruktioner",
      Start: "Start",
      "INSTRUCTIONS":
        "Du vil høre en række tal. Lyt omhyggeligt. Når tallene stopper, tryk dem i samme rækkefølge, som du hørte dem.",
      "Listen...": "Lyt...",
      "Your turn!": "Din tur!",
      "Level:": "Niveau:",
      Forward: "Fremad",
      Backward: "Baglæns",
      "Reverse Order": "Omvendt rækkefølge",
      "MODE_TRANSITION":
        "Nu vil du høre cifre og indtaste dem i <strong>omvendt</strong> rækkefølge. For eksempel, hvis du hører 3-7-2, indtast 2-7-3.",
      Ready: "Klar",
      Questionnaire: "Spørgeskema",
      Submit: "Indsend",
      "How clear were the instructions?": "Hvor klare var instruktionerne?",
      "How happy would you be to do this again?":
        "Hvor glad ville du være for at gøre dette igen?",
    },
  },
  "it-IT": {
    translation: {
      "Digit Span": "Span di Cifre",
      Instructions: "Istruzioni",
      Start: "Inizia",
      "INSTRUCTIONS":
        "Ascolterai una serie di numeri. Ascolta attentamente. Quando i numeri si fermano, toccali nello stesso ordine in cui li hai sentiti.",
      "Listen...": "Ascolta...",
      "Your turn!": "Tocca a te!",
      "Level:": "Livello:",
      Forward: "Avanti",
      Backward: "Indietro",
      "Reverse Order": "Ordine inverso",
      "MODE_TRANSITION":
        "Ora ascolterai delle cifre e le inserirai in ordine <strong>inverso</strong>. Ad esempio, se senti 3-7-2, inserisci 2-7-3.",
      Ready: "Pronto",
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
      "Digit Span": "数字广度",
      Instructions: "说明",
      Start: "开始",
      "INSTRUCTIONS":
        "您将听到一系列数字。请仔细听。当数字停止时，按照您听到的顺序点击它们。",
      "Listen...": "请听...",
      "Your turn!": "轮到你了！",
      "Level:": "级别：",
      Forward: "正序",
      Backward: "倒序",
      "Reverse Order": "倒序",
      "MODE_TRANSITION":
        "现在您将听到数字并以<strong>相反</strong>的顺序输入它们。例如，如果您听到3-7-2，请输入2-7-3。",
      Ready: "准备好了",
      Questionnaire: "问卷",
      Submit: "提交",
      "How clear were the instructions?": "说明有多清楚？",
      "How happy would you be to do this again?": "您愿意再做一次吗？",
    },
  },
  "zh-HK": {
    translation: {
      "Digit Span": "數字廣度",
      Instructions: "說明",
      Start: "開始",
      "INSTRUCTIONS":
        "您將聽到一系列數字。請仔細聽。當數字停止時，按照您聽到的順序點擊它們。",
      "Listen...": "請聽...",
      "Your turn!": "輪到你了！",
      "Level:": "級別：",
      Forward: "正序",
      Backward: "倒序",
      "Reverse Order": "倒序",
      "MODE_TRANSITION":
        "現在您將聽到數字並以<strong>相反</strong>的順序輸入它們。例如，如果您聽到3-7-2，請輸入2-7-3。",
      Ready: "準備好了",
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
