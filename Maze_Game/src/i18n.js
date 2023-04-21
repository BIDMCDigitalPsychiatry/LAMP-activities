import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK":{
    translation: {
      CONGRATS: "Tillykke",
      CONTINUE: "Fortsæt til næste niveau?",
      GAME: "Labyrint",      
      GAME_OVER: "Spillet Overstået",  
      LEVEL: "Niveau",
      NO:"Nej",
      PERMISSION: "Klik for at give accelerometertilladelse",
      START_GAME : "Start Spil",
      YES: "Ja",
      YOU_WON: "Du vandt"
    }
  },
  "de-DE":{
    translation: {
      CONGRATS: "Herzlichen Glückwunsch",
      CONTINUE: "Weiter zum nächsten Level?",
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
      GAME: "Maze",      
      GAME_OVER: "Game Over", 
      LEVEL: "Level",
      NO:"No" , 
      PERMISSION:"Click to grant accelerometer Permission",
      START_GAME: "Start Game",
      YES: "Yes",  
      YOU_WON: "You Won"
    },
  },
  "es-ES": {
    translation: {
      CONGRATS: "Felicidades",
      CONTINUE: "¿Continuar al siguiente nivel?",
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
      GAME: "भूल भुलैया",      
      GAME_OVER: "खेल खत्म",   
      LEVEL: "लेवल",
      NO: "नहीं", 
      PERMISSION: "एक्सेलेरोमीटर अनुमति देने के लिए क्लिक करें",
      START_GAME: "खेल प्रारंभ करें",
      YES:"हाँ",
      YOU_WON: "आप जीते"
    },
  },
  "it-IT":{
    translation: {
      CONGRATS: "Congratulazioni",
      CONTINUE: "Continua al livello successivo?",
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
      CONGRATS: "\u606d\u559c",
      CONTINUE: "\u7ee7\u7eed\u5230\u4e0b\u4e00\u4e2a\u7ea7\u522b\uff1f",
      GAME: "\u8ff7\u5bab",      
      GAME_OVER: "\u6e38\u620f\u7ed3\u675f",  
      LEVEL:"\u6c34\u5e73",
      NO: "\u4e0d",
      PERMISSION:"\u5355\u51fb\u4ee5\u6388\u4e88\u52a0\u901f\u5ea6\u8ba1\u6743\u9650",
      START_GAME:"\u542f\u52a8\u6e38\u620f",
      YES: "\u662f\u7684",
      YOU_WON: "\u60a8\u8d62\u4e86"       
    },
  },

"zh-HK":{
  translation: {
    CONGRATS: "Congrats",
    CONTINUE: "Continue to next level?",
    GAME: "Maze",      
    GAME_OVER: "Game Over", 
    LEVEL: "Level",
    NO:"No" , 
    PERMISSION:"Click to grant accelerometer Permission",
    START_GAME: "Start Game",
    YES: "Yes",  
    YOU_WON: "You Won"
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
