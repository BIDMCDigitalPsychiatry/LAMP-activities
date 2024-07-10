import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK":{
    translation: {
     
    }
  },
  "de-DE":{
    translation: {

       
    }
  },
  "en-US": {
    translation: {
    
    },
  },
  "es-ES": {
    translation: {
      
    },
  },
  "fr-FR":{
      translation: {
           
    }
  },
  "hi-IN": {
    translation: {
      
    },
  },
  "it-IT":{
    translation: {
      
      
    },
  },
  "ko-KR":{
    translation: {
      
      
    },
  },
  "zh-CN":{
    translation: {
      
    },
  },
  "zh-HK":{
    translation: {
       
    },
  }
  
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
