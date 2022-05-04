import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "Learn the sequence",
      LEVEL: "Level",
      MEMORY_GAME: "Box Game",
      NEXT: "Next",
      PLACE_THE_1st_PICTURE: "Place the 1st picture",
      PLACE_THE_2nd_PICTURE: "Place the 2nd picture",
      PLACE_THE_3rd_PICTURE:"Place the 3rd picture",
      PLACE_THE_4th_PICTURE:"Place the 4th picture",

      TAP_THE_1st_PICTURE: "Tap the 1st picture",
      TAP_THE_2nd_PICTURE: "Tap the 2nd picture",
      TAP_THE_3rd_PICTURE: "Tap the 3rd picture",
      TAP_THE_4th_PICTURE: "Tap the 4th picture",
      TIME_OUT: "Time Out",
      TRIAL: "Trial"
    },
  },
  "es-ES": {
    translation: {
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "Aprende la secuencia",
      LEVEL: "Level",
      MEMORY_GAME: "JUEGO DE MEMORIA",
      NEXT: "Next",
      PLACE_THE_1st_PICTURE: "Coloca la 1ra foto",
      PLACE_THE_2nd_PICTURE: "Coloca la 2da foto",
      PLACE_THE_3rd_PICTURE:"Coloca la 3ra foto",
      PLACE_THE_4th_PICTURE: "coloca la 4ta foto",

      TAP_THE_1st_PICTURE: "Toca la primera imagen",
      TAP_THE_2nd_PICTURE: "Toca la segunda imagen",
      TAP_THE_3rd_PICTURE: "Toca la tercera imagen",
      TAP_THE_4th_PICTURE:"Toca la cuarta imagen",
      TIME_OUT: "Se acabó el tiempo",
      TRIAL: "Ensayo"
    },
  },
  "hi-IN": {
    translation: {
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "क्रम जाने",
      LEVEL: "Level",
      MEMORY_GAME: "स्मृति खेल",
      NEXT: "Next",
      PLACE_THE_1st_PICTURE: "पहली तस्वीर लगाए",
      PLACE_THE_2nd_PICTURE: "दूसरा तस्वीर लगाए",
      PLACE_THE_3rd_PICTURE: "तीसरा तस्वीर लगाए",
      PLACE_THE_4th_PICTURE: "चौथा चित्र लगाएं",
      TAP_THE_1st_PICTURE: "पहली तस्वीर पर टैप करे",
      TAP_THE_2nd_PICTURE: "दूसरी तस्वीर पर टैप करे",
      TAP_THE_3rd_PICTURE: "तीसरी तस्वीर पर टैप करे",
      TAP_THE_4th_PICTURE:"चौथी तस्वीर टैप करे",

     TIME_OUT: "समय समाप्",
      TRIAL: "परीक्षण"
    },
  },
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
