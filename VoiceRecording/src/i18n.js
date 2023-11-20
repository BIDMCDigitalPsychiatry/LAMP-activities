import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      VOICE_RECORDING: "Stemmeoptagelse",
      UPLOAD: "Upload",
      CLEAR: "Ryd",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "Der opstod en fejl under upload. Pr\u00f8v venligst igen.",
      INFO_MAX_RECORD_TIME_REACHED: "Maksimal optagelsestid er 2 minutter",
      ERROR_MAX_RECORD_TIME_REACHED: "Maksimal optagelsestid er 2 minutter.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Ryd",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },"de-DE": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Hochladen",
      CLEAR: "L\u00f6schen",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximale Aufzeichnungsdauer ist 2 Minuten",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Hochladen",
      CLEAR_BTN: "L\u00f6schen",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  }, 
  "en-US": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Upload",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 2 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  }, "es-ES": {
    translation: {
      VOICE_RECORDING: "Voice Recording",
      UPLOAD: "Subir",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 2 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Subir",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },
  "fr-FR": {
    translation: {
      VOICE_RECORDING: "\u202fEnregistrement vocal\u202f",
      UPLOAD: "Importation",
      CLEAR: "Clair",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "La dur\u00e9e maximale d'enregistrement est de 2 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Importation",
      CLEAR_BTN: "Clair",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },"hi-IN": {
    translation: {
      VOICE_RECORDING: "वॉईस रिकॉर्डिंग",
      UPLOAD: "अपलोड",
      CLEAR: "Clear",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 2 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Upload",
      CLEAR_BTN: "Clear",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },"it-IT": {
    translation: {
      VOICE_RECORDING: "Registrazione Vocale",
      UPLOAD: "Fai clic su \"Carica\"",
      CLEAR: "Cancella",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "Errore durante il registrare. Riprova.",
      INFO_MAX_RECORD_TIME_REACHED: "Maximum recording time is 2 minutes",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "Fai clic su \"Carica\"",
      CLEAR_BTN: "Cancella",
      CLICK_TO_CLEAR_MSG: "Fai clic su 'Carica' (Upload), oppure 'Cancella' (Clear) per registrare di nuovo"
    },
  },
 "ko-KR": {
    translation: {
      VOICE_RECORDING: "\uc74c\uc131\ub179\uc74c",
      UPLOAD: "\uc5c5\ub85c\ub4dc",
      CLEAR: "\ubd84\uba85\ud55c",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: "\ucd5c\ub300 \ub179\uc74c \uc2dc\uac04\uc740 2\ubd84\uc785\ub2c8\ub2e4.",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "\uc5c5\ub85c\ub4dc",
      CLEAR_BTN: "\ubd84\uba85\ud55c",
      CLICK_TO_CLEAR_MSG: "Click upload or clear to record again"
    },
  },  "zh-CN": {
    translation: {
      VOICE_RECORDING: "\u8bed\u97f3\u5f55\u97f3",
      UPLOAD: "\u4e0a\u4f20",
      CLEAR: " \u6e05\u9664",
      PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
      AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
      INFO_MAX_RECORD_TIME_REACHED: " 最长录制时间为2分钟",
      ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
      UPLOAD_BTN: "\u4e0a\u4f20",
      CLEAR_BTN: " \u6e05\u9664",
      CLICK_TO_CLEAR_MSG: "\u70b9\u51fb\u4e0a\u4f20\u6216\u6e05\u9664\u91cd\u65b0\u5f55\u5236"
    },
  },
    "zh-HK": {
      translation: {
        VOICE_RECORDING: "\u8a9e\u97f3\u9304\u97f3",
        UPLOAD: "\u4e0a\u50b3",
        CLEAR: " \u6e05\u9664",
        PRESS_MICROPHONE_TO_RECORD: "Press the microphone to record",
        AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING: "An error has been occurred while recording. Please try again later.",
        INFO_MAX_RECORD_TIME_REACHED: " 最長錄製時間為2分鐘",
        ERROR_MAX_RECORD_TIME_REACHED: "Maximum recording limit of 2 minutes has been reached.",
        UPLOAD_BTN: "\u4e0a\u50b3",
        CLEAR_BTN: " \u6e05\u9664",
        CLICK_TO_CLEAR_MSG: "\u9ede\u64ca\u4e0a\u50b3\u6216\u6e05\u9664\u91cd\u65b0\u9304\u88fd"
      },
    },
  }

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
