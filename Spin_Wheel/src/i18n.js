import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK":{
    translation: {
      CONGRATS: "Tillykke",
      GAME: "Lotteri",      
      GAME_OVER: "Spillet Overstået",
      TIME_OUT: "Tiden er gået",
      TOTAL_BALANCE: "Samlet saldo",      
      TOTAL_SPINS: "Samlede spins",
      YOU_LOSE: "Du taber",
      YOU_WON: "Du vandt",  
    }
  },
  "de-DE":{
    translation: {
      CONGRATS: "Herzlichen Glückwunsch",
      GAME: "Lotterie",      
      GAME_OVER: "Spiel ist aus",
      TIME_OUT: "Auszeit",
      TOTAL_BALANCE: "Gesamtsaldo",      
      TOTAL_SPINS: "Spins insgesamt",
      YOU_LOSE: "Du verlierst",
      YOU_WON: "Du hast gewonnen",    
    }
  },
  "en-US": {
    translation: {
      CONGRATS: "Congrats",
      GAME: "Lottery",      
      GAME_OVER: "Game Over",
      TIME_OUT: "Time Out",
      TOTAL_BALANCE: "Total Balance",
      TOTAL_SPINS: "Total Spins",
      YOU_LOSE: "You Lose",
      YOU_WON: "You Won",   
     
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      GAME: "La Lotería",      
      GAME_OVER: "Juego Terminado",
      TIME_OUT: "Se acabó el tiempo",
      TOTAL_BALANCE: "Saldo total",
      TOTAL_SPINS: "Giros totales",      
      YOU_LOSE: "Tú pierdes",
      YOU_WON: "Ganaste",
    
    },
  },
  "fr-FR":{
      translation: {
        CONGRATS: "Félicitations",
        GAME: "Loterie",      
        GAME_OVER: "Jeu terminé",
        TIME_OUT: "Temps libre",
        TOTAL_BALANCE: "Solde total",      
        TOTAL_SPINS: "Total des tours",
        YOU_LOSE: "Tu as perdu",
        YOU_WON: "Tu as gagné",        
    }
  },
  "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो ",
      GAME: "लॉटरी",      
      GAME_OVER: "खेल खत्म",
      TIME_OUT: "समय समाप्त",
      TOTAL_BALANCE: "कुल शेष",      
      TOTAL_SPINS: "कुल घुमाव",
      YOU_LOSE: "आप खोया",
      YOU_WON: "आप जीता",
      SPIN_THE_WHEEL: "पहिया घुमाएं",
      BEGIN: "खेल शुरू करें!",
      TOTAL_SPIN: "कुल घूमाव",
      LOTTERY: "लॉटरी",
      TOTAL_SPIN_20: "कुल घूमाव 20"
    },
  },
  "it-IT":{
    translation: {
      CONGRATS: "Congratulazioni",
      GAME: "Lotteria",      
      GAME_OVER: "Fin de partie",
      TIME_OUT: "Tempo scaduto",
      TOTAL_BALANCE: "Saldo totale",   
      TOTAL_SPINS: "Giri totali",
      YOU_LOSE: "Hai perso",
      YOU_WON: "Hai vinto",
      
    },
  },
  "ko-KR":{
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      GAME: "\uc6b4",      
      GAME_OVER: "\uac8c\uc784\u0020\ub05d",
      TIME_OUT: "\uc2dc\uac04\u0020\ucd08\uacfc",
      TOTAL_BALANCE: "\uc804\uccb4\u0020\uade0\ud615",
      TOTAL_SPINS: "\ucd1d\u0020\uc2a4\ud540",
      YOU_LOSE: "\ub2f9\uc2e0\uc740\u0020\ud328\ubc30",
      YOU_WON: "\ub2f9\uc2e0\uc774\u0020\uc774\uacbc\ub2e4",
      
    },
  },
  "zh-CN":{
    translation: {
      CONGRATS: "恭喜！",
      GAME: "\u5f69\u7968",      
      GAME_OVER: "游戏结束",
      TIME_OUT:  "超时",
      TOTAL_BALANCE: "\u603b\u4f59\u989d",
      TOTAL_SPINS: "\u603b\u65cb\u8f6c",
      YOU_LOSE: "\u4f60\u8f93\u4e86",
      YOU_WON: "\u4f60\u8d62\u4e86",
      
    },
  },
    "zh-HK":{
      translation: {
        CONGRATS: "恭喜！",
        GAME: "\u5f69\u7968",      
        GAME_OVER: "遊戲結束",
        TIME_OUT:"超時",
        TOTAL_BALANCE: "\u603b\u4f59\u989d",
        TOTAL_SPINS: "\u603b\u65cb\u8f6c",
        YOU_LOSE: "\u4f60\u8f93\u4e86",
        YOU_WON: "\u4f60\u8d62\u4e86",
        
      },
  }
}
  
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
