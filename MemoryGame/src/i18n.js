import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      MEMORY_GAME: "Box Game",
      CONGRATS: "Congrats",
      GAME_OVER: "Game Over",
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "Learn the sequence",
      LEVEL: "Level",
      NEXT: "Next",
      TAP_THE_1st_PICTURE: "Place the 1st picture",
      TAP_THE_2nd_PICTURE: "Place the 2nd picture",
      TAP_THE_3rd_PICTURE: "Place the 3rd picture",
      TIME_OUT: "Time Out",
      TRIAL: "Trial"
    },
  },
  "es-ES": {
    translation: {
      MEMORY_GAME: "JUEGO DE MEMORIA",
      CONGRATS: "Felicidades",
      GAME_OVER: "Game Over",
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "Aprende la secuencia",
      LEVEL: "Level",
      NEXT: "Next",
      TAP_THE_1st_PICTURE: "Coloca la 1ra foto",
      TAP_THE_2nd_PICTURE: "Coloca la 2da foto",
      TAP_THE_3rd_PICTURE: "Coloca la 3ra foto",
      TIME_OUT: "Se acabó el tiempo",
      TRIAL: "Ensayo"
    },
  },
  "hi-IN": {
    translation: {
      MEMORY_GAME: "स्मृति खेल",
      CONGRATS: "बधाई हो ",
      GAME_OVER: "Game Over",
      GO: "Go",
      LEARN_THE_SEQUENCE:
      "क्रम जाने",
      LEVEL: "Level",
      NEXT: "Next",
      TAP_THE_1st_PICTURE: "पहली तस्वीर लगाए",
      TAP_THE_2nd_PICTURE: "दूसरा चित्र लगाए",
      TAP_THE_3rd_PICTURE: "तीसरा चित्र लगाए",
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
