import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en_US: {
    translation: {
      BOX_GAME: "Box Game",
      GO: "Go",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
        "Now tap on the boxes in the order they were highlighted.",
      "NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED.":
        "Now tap on the boxes in the reverse order they were highlighted.",     
      PLEASE_REMEMBER_THE_SEQUENCE: "Please remember the sequence",      
      PLEASE_WAIT_AND_WATCH: "Please wait and watch",    
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "Remember the highlighted boxes in the order you see them."    
    },
  },
  hi_IN: {
    translation: {
      BOX_GAME: "Box Game",
      GO: "जाए",
      NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED:
       "अब बॉक्सों को उसी क्रम में दबाए जिस क्रम में वे हाइलाइट किए गए थे |",
      "NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED.":
        "Now tap on the boxes in the reverse order they were highlighted.",     
      PLEASE_REMEMBER_THE_SEQUENCE: "कृपया क्रम/परिणाम को याद रखें",
      PLEASE_WAIT_AND_WATCH: "कृपया प्रतीक्षा करें और देखें",
      REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM:
        "आपने हाइलाइट किए गए बॉक्सों को जिस क्रम में देखा है उन्हें याद रखे l"   
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
