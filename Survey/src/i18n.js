import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      "question": "sp\u00f8rgsm\u00e5l",
      "Question number of total": "Sp\u00f8rgsm\u00e5l {{ number }} of {{ total }}",
      "Question": "Sp\u00f8rgsm\u00e5l",
      "of":"af",
      "Next" : "N\u00e6ste",
      "Submit": "Send",
      "Mood": "Stemnings",
      "Yes": "Ja", 
      "No": "Nej", 
      "Sleep and Social": "S\u00f8vn og sociale",
      "Anxiety": "Angst", "Psychosis and Social": "Psykose og socialt ", "App Usability": "App-brugervenlighed", "Water and Nutrition": "Vand og ern\u00e6ring",
      "Please enter your response" : "Indtast venligst dit svar",
      "Back":"Tilbage",
      "Your response": "Dit svar", "Nearly All the Time": "N\u00e6sten hele tiden", "More than Half the Time": "Mere end halvdelen af tiden", "Several Times": "Flere gange", "Not at all": "slet ikke", "(Select one)": "(V\u00e6lg en)", "(0 being terrible, 10 being excellent)": "(0 er forf\u00e6rdeligt 10 er fremragende)"
    },
  },
  "de-DE": {
    translation: {
      "question": "frage",
      "Question number of total": "Frage {{ number }} of {{ total }}",
      "Question": "Frage",
      "of":"von",
      "Next" : "Weiter",
      "Back": "Zur\u00fcck",
      "Submit": "Absenden",
      "Mood": "Stimmungs",
      "Yes": "Ja", "No": "Nein",
      "Sleep and Social": "Schlaf und Soziales", "Anxiety": "Angst", "Psychosis and Social": "Psychose und Soziales", "App Usability": "App-Nutzbarkeit", "Water and Nutrition": "Wasser und Ern\u00e4hrung",
      "Please enter your response" : "Bitte Antwort eingeben",
      "Your response": "Deine Antwort", "Nearly All the Time": "Fast die ganze Zeit", "More than Half the Time": "Mehr als die H\u00e4lfte der Zeit", "Several Times": "Mehrmals", "Not at all": "\u00dcberhaupt nicht", "(Select one)": "(Eine Option ausw\u00e4hlen)", "(0 being terrible, 10 being excellent)": "(0 ist schrecklich, 10 ist ausgezeichnet)"	
    },
  },
  "en-US": {
    translation: {
      "question": "question",
      "Question number of total": "Question {{ number }} of {{ total }}",
      "Next" : "Next",
      "Submit": "Submit",
      "Mood": "Mood",
      "Sleep and Social": "Sleep and Social",
      "Anxiety": "Anxiety",
      "Psychosis and Social": "Psychosis and Social",
      "App Usability": "App Usability",
      "Water and Nutrition": "Water and Nutrition",
      "Please enter your response" : "Please enter your response"	,
      "Your response":"Your response",
    },
  },
  "es-ES": {
    translation: {
      "question": "Pregunta",
      "Question number of total": "Pregunta {{ number }} de {{ total }}",
      "Question": "Pregunta",
      "of":"de",
      "Next" : "Siguiente",
      "Submit": "Enviar",
      "Mood": "Humor",
      "Sleep and Social": "Sueño y Social",
      "Anxiety": "Ansiedad",
      "Psychosis and Social": "Psicosis y Social",
      "App Usability": "Usabilidad de la aplicación",
      "Water and Nutrition": "Agua y Nutrición",
      "Back": "Previa",
      "Yes": "Si",
          "No": "No",
      "Your response": "Tu respuesta",
      "Nearly All the Time": "Casi todo el tiempo",
      "More than Half the Time": "Más de la mitad del tiempo",
      "Several Times": "Varias veces",
      "Not at all": "De ningún modo",
      "(Select one)": "(Seleccione uno)",
      "(0 being terrible, 10 being excellent)": "(0 es terrible, 10 es excelente)",
      "Please enter your response" : "Por favor ingrese su respuesta"	
    },
  },
  "fr-FR": {
    translation: {
      "question": "question",
      "Question number of total": "Question {{number}} de {{total}}",
      "Question": "Question",
      "of":"de",
      "Next" : "Suivant",
      "Submit": "Envoyer",
      "Mood": "Humeur",
      "Back": "Retour",
      "Sleep and Social": "Sleep and Social",
      "Anxiety": "Anxi\u00e9t\u00e9",
      "Psychosis and Social": "Psychosis and Social",
      "App Usability": "App Usability",
      "Yes": "Oui", "No": "Non",
      "Water and Nutrition": "Eau et nutrition",
      "Please enter your response" : "Veuillez entrer votre r\u00e9ponse"	,
      "Your response": "Votre r\u00e9ponse",
      "Nearly All the Time": "Presque tout le temps", 
      "More than Half the Time": "Plus de la moiti\u00e9 du temps", 
      "Several Times": "Plusieurs fois", 
      "Not at all": "Pas du tout",
      "(Select an answer)": "(S\u00e9lectionnez une r\u00e9ponse)", 
      "(0 being terrible, 10 being excellent)": "(0 \u00e9tant tr\u00e8s mauvais, 10 \u00e9tant excellent)"
    },
  },
  "hi-IN": {
    translation: {
      "question": "प्रश्न",
      "Question number of total": "प्रश्न {{ number }} की {{ total }}",
      "Question": "प्रश्न",
      "of":"की",
      "Next" : "आगे",
      "Submit": "जमा करें",
      "Mood": "मूड",
      "Sleep and Social": "नींद और सामाजिक व्यवहार",
      "Anxiety": "चिंता",
      "Psychosis and Social": "मनोविक्षिप्ता और सामाजिक व्यवहार",
      "App Usability": "ऐप की उपयोगिता",
      "Water and Nutrition": "पानी और पोषण/भोजन",
      "Back": "पहले का",
      "Yes": "हाँ",
          "No": "नही",
      "Please enter your response": "कृपया अपनी प्रतिक्रिया दर्ज करें",
      "Your response": "आपका जवाब",
      "Nearly All the Time": "लगभग सारा समय",
      "More than Half the Time": "आधे से ज्यादा समय",
      "Several Times": "बहुत बार",
      "Not at all": "बिल्कुल नहीं",
      "(Select one)": "(किसी एक को चुने)",
      "(0 being terrible, 10 being excellent)": "(0 ख़राब होना, 10 उत्तम होना)"
    },
  },
  "it-IT": {
    translation: {
      "of": "di",
      "question": "domanda",
      "Question number of total": "Domanda {{ number }} di {{ total }}",
      "Question": "Domanda",
      "Next": "Successiva", "Submit": "Invia",
      "Mood": "Umore",
      "Back" :"Indietro",
      "Yes": "S\u00ec", "No": "No", 
      "Sleep and Social": "Sonno e Comportamento Sociale", "Anxiety": "Ansia", "Psychosis and Social": "Psicosi e Comportamento Sociale", "App Usability": "Fruibilit\u00e0 dell'App", "Water and Nutrition": "Acqua e Alimentazione",
      "Please enter your response" : "Please enter your response"	,
      "Your response": "La tua risposta", "Nearly All the Time": "Quasi Sempre", "More than Half the Time": "Pi\u00f9 della Met\u00e0 del Tempo", "Several Times": "Diverse Volte", "Not at all": "Mai", "(Select one)": "(Seleziona una)", "(0 being terrible, 10 being excellent)": "(0 equivalente a terribile, 10 equivalente a  eccellente)"
    },
  },
    "ko-KR": {
    translation: {
      "question": "\ubb38\ud56d\ub4e4",
      "Question number of total": "\ubb38\ud56d\ub4e4 {{ number }} of {{ total }}",
      "Question": "\ubb38\ud56d\ub4e4",
      "of":"의",
      "Next ": "\ub2e4\uc74c ", 
      "Submit": "\uc81c\ucd9c\ud558\uae30",
      "Mood": "\uae30\ubd84",
      "Yes": "\uc608", "No": "\uc544\ub2c8\uc624",
      "Back":"\uc774\uc804\uc73c\ub85c \ub3cc\uc544\uac00\uc138\uc694",
      "Sleep and Social": "\uc218\uba74\uacfc \uc0ac\ud68c\uc0dd\ud65c", "Anxiety": "\ubd88\uc548\uc99d", "Psychosis and Social": "\uc815\uc2e0\ubcd1\uacfc \uc0ac\ud68c\uc0dd\ud65c", "App Usability": "\uc571 \uc774\uc6a9\uc131", "Water and Nutrition": "\ubb3c\uacfc \uc601\uc591",
      "Please enter your response" : "\uc751\ub2f5\uc744 \uc785\ub825\ud558\uc138\uc694",
      "Your response": "\uc5ec\ub7ec\ubd84\uc758 \uc751\ub2f5\uc740", "Nearly All the Time": "\uac70\uc758 \ud56d\uc0c1", "More than Half the Time": "\uc808\ubc18 \uc774\uc0c1", "Several Times": "\uba87\ubc88", "Not at all": "\uc804\ud600", "(Select one)": "(\ud558\ub098\ub97c \uc120\ud0dd\ud558\uc138\uc694)", "(0 being terrible, 10 being excellent)": "(0\uc740 \ud615\ud3b8\uc5c6\uc74c, 10\uc740 \uc815\ub9d0 \uc88b\uc74c)"	
    },
  },  "zh-CN": {
    translation: {
      "question": "\u95ee\u9898",
      "Question number of total": "\u95ee\u9898 {{ number }} of {{ total }}",
      "Question": "\u95ee\u9898",
      "of":"的",
      "Next": "\u4e0b\u4e00\u6b65", 
      "Submit": "\u63d0\u4ea4",
      "Mood": "\u60c5\u7eea",
      "Back":"\u8fd4\u56de",
      "Yes": "\u6709\u7684", "No": "\u6ca1\u6709",
      "Sleep and Social": "\u7761\u7720\u4e0e\u793e\u4ea4", "Anxiety": "\u7126\u8651", "Psychosis and Social": "\u7cbe\u795e\u75c5\u4e0e\u793e\u4ea4", "App Usability": "APP\u7684\u53ef\u7528\u6027", "Water and Nutrition": "\u6c34\u5206\u4e0e\u8425\u517b",
      "Please enter your response" : "\u8bf7\u8f93\u5165\u60a8\u7684\u56de\u590d"	,
      "Your response": "\u60a8\u7684\u56de\u5e94\uff1a", "Nearly All the Time": "\u51e0\u4e4e\u6240\u6709\u65f6\u95f4", "More than Half the Time": "\u4e00\u534a\u4ee5\u4e0a\u7684\u65f6\u95f4", "Several Times": "\u591a\u6b21", "Not at all": "\u4e00\u70b9\u90fd\u6ca1\u6709", "(Select one)": "(\u9009\u62e9\u4e00\u4e2a)", "(0 being terrible, 10 being excellent)": "(0\u5206\u7cdf\u7cd5\uff0c10\u5206\u4f18\u79c0)"
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
