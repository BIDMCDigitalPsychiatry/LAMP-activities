import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK":{
    translation: {
      CONGRATS: "Tillykke",
      CONTINUE: "Fortsæt til næste niveau?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING : "Do you want to save your game results before proceeding?",
      GAME: "Labyrint",      
      GAME_OVER: "Spillet Overstået",  
      LEVEL: "Niveau",
      NO:"Nej",
      PERMISSION: "Klik for at give accelerometertilladelse",
      START_GAME : "Start Spil",
      YES: "Ja",
      YOU_WON: "Du vandt",      
    }
  },
  "de-DE":{
    translation: {
      CONGRATS: "Herzlichen Glückwunsch",
      CONTINUE: "Weiter zum nächsten Level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING : "Do you want to save your game results before proceeding?",
      GAME: "Labyrinth",      
      GAME_OVER: "Spiel ist aus", 
      LEVEL: "Ebene",     
      NO:"Nein",
      PERMISSION: "Klicken Sie hier, um die Beschleunigungsmesser-Berechtigung zu erteilen",
      START_GAME: "Spiel beginnen",
      YES:"Ja",
      YOU_WON: "Du hast gewonnen"
       
    }
  },
  "en-US": {
    translation: {
      CONGRATS: "Congrats",
      CONTINUE: "Continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING : "Do you want to save your game results before proceeding?",
      GAME: "Maze",      
      GAME_OVER: "Game Over", 
      LEVEL: "Level",
      NO:"No" , 
      PERMISSION:"Click to grant accelerometer Permission",
      START_GAME: "Start Game",
      YES: "Yes",  
      YOU_WON: "You Won",
      IN_THIS_GAME_YOU_CAN_TILT_YOUR_PHONE_TO_CONTROL_A_SMALL_BALL_SEEN_ON_YOUR_SCREEN_TRY_TO_NAVIGATE_THE_BALL_OUT_OF_THE_CENTER_OF_THE_MAZE_AND_INTO_THE_OPEN_SPACE_THE_FASTER_YOU_ESCAPE_THE_MORE_POINTS_YOU_WILL_ACCURE:
        "In this game, you can tilt your phone to control a small ball seen on your screen. Try to navigate the ball out of the center of the maze and into the open space. The faster you escape, the more points you will accrue."
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      CONTINUE: "¿Continuar al siguiente nivel?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "¿Quieres guardar los resultados de tu juego antes de continuar?",
      GAME: "Laberinto",      
      GAME_OVER: "Juego Terminado", 
      LEVEL: "Nivel",    
      NO: "No",
      PERMISSION:"Haga clic para otorgar permiso de acelerómetro",
      START_GAME: "Empezar juego",
      YES: "Sí",
      YOU_WON: "Tu Ganaste"
    },
  },
  "fr-FR":{
      translation: {
        CONGRATS: "Félicitations",
        CONTINUE: "Continuer au niveau suivant ?",
        DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
        GAME: "Labyrinthe",      
        GAME_OVER: "Jeu terminé", 
        LEVEL: "Niveau",   
        NO: "Non",
        PERMISSION: "Cliquez pour accorder l'autorisation de l'accéléromètre",
        START_GAME :"Démarrer jeu",
        YES: " Oui" ,
        YOU_WON: "Tu as gagné"      
    }
  },
  "hi-IN": {
    translation: {
      CONGRATS: "बधाई हो",
      CONTINUE: "अगले स्तर पर जारी रखें?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "क्या आप आगे बढ़ने से पहले अपने गेम के परिणाम सहेजना चाहते हैं?",
      GAME: "भूल भुलैया",      
      GAME_OVER: "खेल खत्म",   
      LEVEL: "स्तर",
      NO: "नहीं", 
      PERMISSION: "एक्सेलेरोमीटर अनुमति देने के लिए क्लिक करें",
      START_GAME: "खेल प्रारंभ करें",
      YES:"हाँ",
      YOU_WON: "आप जीते",
      ASSESS: "मूल्यांकन",
      GAMES: "खेल",
      BEGIN: "शरू करें",
      MAZE_GAME: "रास्ता खोजना, खेल",
      IN_THIS_GAME_YOU_CAN_TILT_YOUR_PHONE_TO_CONTROL_A_SMALL_BALL_SEEN_ON_YOUR_SCREEN_TRY_TO_NAVIGATE_THE_BALL_OUT_OF_THE_CENTER_OF_THE_MAZE_AND_INTO_THE_OPEN_SPACE_THE_FASTER_YOU_ESCAPE_THE_MORE_POINTS_YOU_WILL_ACCURE:
        "इस गेम में, आप अपनी स्क्रीन पर दिखाई देने वाली एक छोटी सी गेंद को नियंत्रित करने के लिए अपने फ़ोन को झुका सकते हैं। गेंद को भूलभुलैया के केंद्र से बाहर और खुली जगह में ले जाने का प्रयास करें। आप जितनी तेजी से बचेंगे, उतने अधिक अंक अर्जित करेंगे।",
      LEVEL_1: "स्तर-1",
      OK: "ठीक है",
    },
  },
  "it-IT":{
    translation: {
      CONGRATS: "Congratulazioni",
      CONTINUE: "Continua al livello successivo?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      GAME: "Labirinto",      
      GAME_OVER: "Fin de partie",  
      LEVEL: "Livello", 
      NO: "NO",
      PERMISSION: "Fare clic per concedere l'autorizzazione all'accelerometro",
      START_GAME: "Avvia gioco",
      YES: "Si",
      YOU_WON:"Hai vinto"
      
    },
  },
  "ko-KR":{
    translation: {
      CONGRATS: "\ucd95\ud558\ud574\uc694",
      CONTINUE: "\ub2e4\uc74c\u0020\ub2e8\uacc4\ub85c\u0020\uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c\u003f",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      GAME: "\ubbf8\ub85c",      
      GAME_OVER: "\uac8c\uc784\u0020\ub05d",
      LEVEL:"\uc218\uc900",
      NO: "\uc544\ub2c8\uc694",
      PERMISSION:"\uac00\uc18d\ub3c4\uacc4\u0020\uad8c\ud55c\uc744\u0020\ubd80\uc5ec\ud558\ub824\uba74\u0020\ud074\ub9ad\ud558\uc138\uc694\u002e",
      START_GAME: "\uac8c\uc784\uc744\u0020\uc2dc\uc791\ud558\ub2e4",
      YES: "\uc608",
      YOU_WON: "\ub2f9\uc2e0\uc774\u0020\uc774\uacbc\ub2e4"
      
    },
  },
  "zh-CN":{
    translation: {
      CONGRATS: "恭喜！",
      CONTINUE: "Continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      GAME: "Maze",      
      GAME_OVER: "游戏结束", 
      LEVEL: "级别",
      NO:"否",
      PERMISSION:"Click to grant accelerometer Permission",
      START_GAME: "开始",
      YES: "是",
      YOU_WON: "You Won"
    },
  },
  "zh-HK":{
    translation: {
      CONGRATS: "恭喜！",
      CONTINUE: "Continue to next level?",
      DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING: "Do you want to save your game results before proceeding?",
      GAME: "Maze",      
      GAME_OVER: "遊戲結束",
      LEVEL: "級別",
      NO:"否",
      PERMISSION:"Click to grant accelerometer Permission",
      START_GAME: "開始",
      YES: "是",
      YOU_WON: "You Won"      
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
