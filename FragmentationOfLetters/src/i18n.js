import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "de-DE": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "en-US": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "es-ES": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "fr-FR": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "hi-IN": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "it-IT": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "ko-KR": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "zh-CN": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
    },
  },
  "zh-HK": {
    translation: {     
      INSTRUCTION:
        "You will be shown a series of letters from the English alphabet, with some parts blurred out. Try your best say out loud the letter shown in each picture.",
      GAME: "Fragmentation Letters",      
      SPEECH_RECOGNITION_NOT_SUPPORTED: "Browser does not support speech recognition.",
      START_RECORDING: "Click to start recording your response",
      RECORDING: "Recording...",
      STOP: "Stop",
      CANCEL : "Cancel",
      NOT_RECORDED_MESSAGE : "Sorry, we could not catch that! Say ‘Letter’ before the actual letter you are trying to identify.",
      QUESTION : "What letter is this image?"
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
