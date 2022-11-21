import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  "da-DK":{
    translation: {
      "Well done!": "Godt g\u00e5et!",
      "Swipe around the": "Stryg rundt p\u00e5",
      "screen to reveal": "sk\u00e6rmen for at afsl\u00f8re", 
      "the hidden image": "det skjulte billede",
      "Good": "God",
      "Bad": "D\u00e5rlig",
      "Submit": "Send",
      "Leaving so soon?": "Rejser du s\u00e5 tidligt?",
      "If you leave without submitting, your entry will be lost.": "Hvis du rejser uden at indsende, vil din indtastning g\u00e5 tabt.",
      "No, don’t leave yet": "Nej, du m\u00e5 ikke rejse endnu",
      "Yes, leave": "Ja, g\u00e5"
    }
  },
  "de-DE":{
    translation: {
      "Well done!": "Gut gemacht!",
      "Swipe around the": "Wische \u00fcber den Bildschirm", 
      "screen to reveal": "aufzudecken", 
      "the hidden image": "um das versteckte Bild",
      "Good": "Gut",
      "Bad": "Schlecht",
      "Submit": "Absenden",
      "Leaving so soon?": "Gehst du schon?",
      "If you leave without submitting, your entry will be lost.": "Wenn du die Seite verl\u00e4sst, ohne auf Absenden zu tippen, geht dein Eintrag verloren.",
      "No, don’t leave yet": "Nein, die Seite noch nicht verlassen",
      "Yes, leave": "Ja, die Seite verlassen"
    }
  },
  
  "en-US": {
    translation: {
      "Close": "Close",
      "Do another one": "Do another one",
      "Scratch card": "Scratch card",
      "Screen to reveal": "Screen to reveal",
      "Swipe around the": "Swipe around the",
      "Swipe around the screen to reveal the hidden image": "Swipe around the screen to reveal the hidden image",
      "Swipe your finger around the screen to reveal the image hidden underneath": "Swipe your finger around the screen to reveal the image hidden underneath",
      "The hidden image": "The hidden image",
      "Well done!": "Well done!",
    },
  },
  "es-ES": {
    translation: {
      "Close": "Cerrar",
      "Do another one": "Haz otro",
      "Scratch card": "tarjeta de rascar",
      "Screen to reveal": "pantalla para revelar",
      "Swipe around the": "Desliza el dedo por",
      "Swipe around the screen to reveal the hidden image": "Desliza el dedo por la pantalla para revelar la imagen oculta",
      "Swipe your finger around the screen to reveal the image hidden underneath": "Deslice el dedo por la pantalla para revelar la imagen oculta debajo",
      "The hidden image": "la imagen oculta",
      "Well done!": "Bien hecho!",
    },
  },  "fr-FR":{
    translation: {
      "Well done!": "Well done!",
      "Swipe around the": "Swipe around the",
      "screen to reveal": "screen to reveal",
      "the hidden image": "the hidden image",
      "Good": "Bien",
      "Bad": "Mal",
      "Submit": "Submit",
      "Leaving so soon?": "Vous partez d\u00e9j\u00e0\u2009?",
      "If you leave without submitting, your entry will be lost.": "Si vous quittez sans sauvegarder, votre entr\u00e9e sera perdue.",
      "No, don’t leave yet": "Non, Ne partez pas d\u00e9j\u00e0",
      "Yes, leave": "Oui, partir"
    }
  },  "hi-IN": {
    translation: {
      "Close": "बंद करे",
      "Do another one": "दूसरा करे",
      "Scratch card": "कार्ड को स्क्रैच करें",
      "Screen to reveal": "स्क्रीन में पुनः लाने के लिए ",
      "Swipe around the": "अपनी उंगली को स्क्रीन के चारों ओर अच्छे से घुमाएँ ",
      "Swipe around the screen to reveal the hidden image": "नीचे छिपी ईमेज को उजागर करने के लिए अपनी उंगली को स्क्रीन के चारों ओर अच्छे से रगड़ते हुए घुमाएँ l",
      "Swipe your finger around the screen to reveal the image hidden underneath": "नीचे छिपी ईमेज को उजागर करने के लिए अपनी उंगली को स्क्रीन के चारों ओर अच्छे से घुमाएँ l",
      "The hidden image": " छिपी हुए चित्र ",
      "Well done!": "बहुत बढ़िया !",
    },
  }, "it-IT":{
    translation: {
      "Well done!": "Ben fatto!", "Swipe around the": "Scorrere il dito intorno a", "screen to reveal": "schermo da scoprire", "the hidden image": "immagine nascosta",
      "Good": "Bene",
      "Bad": "Male",
      "Submit": "Invia",
      "Leaving so soon?": "Gi\u00e0 finito?",
      "If you leave without submitting, your entry will be lost.": "Se si esce senza premere invio, i dati inseriti andranno persi.",
      "No, don’t leave yet": "No, aspettare ad uscire.",
      "Yes, leave": "Ora \u00e8 possibile uscire dall\u2019app"
    }
  },"ko-KR":{
    translation: {
      "Well done!": "\uc798\ud558\uc168\uc2b5\ub2c8\ub2e4!", "Swipe around the": "\u2026\uc606\uc73c\ub85c \ub118\uae30\uc2ed\uc2dc\uc624", "screen to reveal": "\ubcf4\uc774\ub294 \uc2a4\ud06c\ub9b0", "the hidden image": "\uc228\uaca8\uc9c4 \uc774\ubbf8\uc9c0",
      "Good": "\uc88b\uc74c", "Bad": "\ub098\uc068",
      "Submit": "\uc81c\ucd9c\ud558\uae30",
      "Leaving so soon?": "\ubc8c\uc368 \ub098\uac00\uc2dc\ub098\uc694?", "If you leave without submitting, your entry will be lost.": "\uc81c\ucd9c\ud558\uc9c0 \uc54a\uace0 \ub098\uac00\uc2dc\uba74, \uc785\ub825\ub41c \uc790\ub8cc\uac00 \uc720\uc2e4\ub429\ub2c8\ub2e4.", "No, don’t leave yet": "\uc544\ub2c8\uc624, \uc544\uc9c1 \ub098\uac00\uc9c0 \ub9c8\uc138\uc694", "Yes, leave": "\ub124, \ub098\uac00\uc138\uc694"
    }
  }, "zh-CN":{
    translation: {
      "Well done!": "\u975e\u5e38\u597d\uff01", "Swipe around the": "\u7528\u624b\u6307\u6ed1\u52a8", "screen to reveal": "\u5c4f\u5e55\u4ee5\u663e\u793a", "the hidden image": "\u9690\u85cf\u56fe\u50cf",
      "Good": "\u597d", "Bad": "\u4e0d\u597d",
      "Submit": "\u63d0\u4ea4",
      "Leaving so soon?": "\u8fd9\u4e48\u5feb\u5c31\u8981\u79bb\u5f00", "If you leave without submitting, your entry will be lost.": "\u5982\u679c\u4e0d\u63d0\u4ea4\u5c31\u79bb\u5f00\uff0c\u8f93\u5165\u7684\u8bb0\u5f55\u5c06\u4f1a\u4e22\u5931.", "No, don’t leave yet": "\u4e0d\uff0c\u5148\u4e0d\u79bb\u5f00", "Yes, leave": "\u662f\uff0c\u8981\u79bb\u5f00"
    }
  } 
};


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    // lng: "es-ES", 
    keySeparator: false,
    resources,
  });

export default i18n
