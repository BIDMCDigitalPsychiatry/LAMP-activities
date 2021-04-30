import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      BALLOON_RISK: "Balloon Risk",
      GAME_OVER: "Game Over",
      OK: "Ok",
      PUMP_UP_BALLOON: "PUMP UP BALLOON",
      TOTAL_POINTS: "Total Points",
      CURRENT_POINTS: "Current Points",
      COLLECT_POINTS: "COLLECT POINTS",
      BALLOON_BURSTED: "Balloon Burst",
    },
  },
  "es-ES": {
    translation: {
      BALLOON_RISK: "Riesgo de globo",
      GAME_OVER: "Juego Terminado",
      OK: "Okay",
      PUMP_UP_BALLOON: "Inflar globo",
      TOTAL_POINTS: "Puntos Totales",
      CURRENT_POINTS: "Puntos actuales",
      COLLECT_POINTS: "Acumular puntos",
      BALLOON_BURSTED: "explosión de globo",
    },
  },
  "hi-IN": {
    translation: {
      BALLOON_RISK: "गुब्बारा जोखिम",
      GAME_OVER: "खेल खत्म",
      OK: "ठीक है",
      PUMP_UP_BALLOON: "गुब्बारे में हवा भरो",
      TOTAL_POINTS: "कुल_अंक",
      CURRENT_POINTS: "वर्तमान_अंक",
      COLLECT_POINTS: "इकट्ठा_अंक",
      BALLOON_BURSTED: "गुब्बारा_फट गए",
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
