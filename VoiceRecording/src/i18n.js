import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later."
    },
  },
  "es-ES": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later."
    },
  },
  "hi-IN": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later."
    },
  },
};
  
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    lng: "en-US",
    keySeparator: false,
    resources,
  });

export default i18n;
