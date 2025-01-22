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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."

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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
      QUESTION : "What letter is this image?",
      INSTRUCTION_TEXT : "Say the word ‘Letter’ before the actual letter you are trying to identify."
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
