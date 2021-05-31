import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
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
  },
  "hi-IN": {
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
  },
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
