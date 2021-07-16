import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 4 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 4 minutes has been reached.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },
  "es-ES": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 4 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 4 minutes has been reached.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },
  "hi-IN": {
    translation: {
      VOICE_RECORDING: "वॉईस रिकॉर्डिंग",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 4 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 4 minutes has been reached.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
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
    /* debugger For Development environment */
    //debug: true,
  });

export default i18n;
