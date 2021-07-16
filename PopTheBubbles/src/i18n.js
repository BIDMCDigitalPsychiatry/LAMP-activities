import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      COMPLETED: "Completed",
      CONGRATULATIONS: "Congratulations",
      GO: "GO",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} Completed",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} number of correctly answered (popped) Go trials and {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctNoGo }} number of correctly answered (unpopped) No-Go trials and {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} number of false hits (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} number of missed (unpopped) Go trials and {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} number of incorrectly answered (popped) No-Go trials and {{ percentage }}",
      POP_THE_BUBBLES: "POP THE BUBBLES!",
      TAP_TO_CONTINUE: "Tap to continue",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"POPPING CORRECT BALOONS WILL EARN YOU POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"TAP TO POP ALL PINK, BLUE AND YELLOW BUBBLES ONLY.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"DON’T POP TWO BUBBLES OF THE SAME COLOR IN A ROW.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"ONLY POP YELLOW AND BLUE BUBBLES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"ONLY POP PINK YELLOW AND BLUE BUBBLES.",
      YOU_GOT_PERCENT: "You got {{ percentage }}",
    },
  },
  "es-ES": {
    translation: {
      COMPLETED: "Terminada",
      CONGRATULATIONS: "Felicidades",
      GO: "Vamos",
      LEVEL_NUMBER: "Nivel {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Nivel {{ levelNumber }} Completado",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} número de ensayos respondidos correctamente(popped) Go ensayos y  {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctGoCount }} número de ensayos respondidos correctamente (unpopped) No-Go ensayos and {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} número de aciertos falsos (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} número de ensayos respondidos incorrectamente(popped) Go ensayos y {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} número de ensayos respondidos incorrectamente(popped) Go ensayos y {{ percentage }}",
      POP_THE_BUBBLES: "Estallar las burbujas!",
      TAP_TO_CONTINUE: "Toque para continuar",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"toque para hacer estallar las burbujas fondo del nivel 1",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"Toca para hacer estallar todas las burbujas rosadas, azules y amarillas solamnte",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"No reviente dos burbujas del mismo color seguidas",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"solo estallan burbujas amarillas y azules",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"solo estallan burbujas roasas, amarillas y azules",
      YOU_GOT_PERCENT: "Tienes el {{ percentage }}"      
    },
  },
  "hi-IN": {
    translation: {
      COMPLETED: "पूरा किया हुआ",
      CONGRATULATIONS: "बधाई हो",
      GO: "जाओ",
      LEVEL_NUMBER: "स्तर {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "स्तर {{ levelNumber }} पूरा हुआ",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS: "{{ correctGoCount }} दिए गए सही जवाब (पॉपअप) परीक्षण में जाएं और {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ correctGoCount }} दिए गए सही जवाब (पॉपअप नही) परीक्षण में नही जाएं और {{ percentage }}",
      NUMBER_OF_FALSE_HITS: "{{ falseHitsCount }} गलत हिट की संख्या (बुलबुले के छोड़कर अलावा कहीं भी स्क्रीन पर हिट करें)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS: "{{ missedClicks }} मिस्ड्स क्लिक्स की संख्या (पॉपअप नही) परीक्षण पर जाएं और {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS: "{{ wrongNoGoCount }} गलत उत्तर की संख्या (पॉपअप) परीक्षण पर नही जाए और {{ percentage }}",
      POP_THE_BUBBLES: "बुलबुलो दिखाएँ!",
      TAP_TO_CONTINUE: "जारी रखने के लिए दबाएं",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:"सही गुब्बारे पॉपिंग होने पर आप अंक प्राप्त करेंगे.  ",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:"सभी पिंक को पॉप करने के लिए दबाएँ, केवल नीले और पीले रंग के बुलबुले l",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:"एक ही पंक्ति में समान रंग के दो बुलबुलों को पॉप नही करें",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:"केवल पीला और नीले रंग के बुलबुलों को पॉप करें l",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:"केवल गुलाबी, पीला और नीला बुलबुले पॉप करें l",
      YOU_GOT_PERCENT: "आपको मिला {{ percentage }}"      
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
