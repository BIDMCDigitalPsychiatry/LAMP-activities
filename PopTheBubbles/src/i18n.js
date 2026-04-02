import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      GAME: "Spil",
      COMPLETED: "Afsluttet",
      CONGRATULATIONS: "Tillykke",
      GAME_OVER: "Spillet er slut",
      GO: "Gå",
      INSTRUCTIONS:
        "Du vil se farvede bobler én ad gangen. Tryk for at sprænge de rigtige farver og ignorer resten. Følg instruktionerne for hvert niveau.",
      LEVEL_NUMBER: "Niveau {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Niveau {{ levelNumber }} afsluttet",
      MINUTES_TO_COMPLETE: "sekunder til at gennemføre niveauet",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} korrekt besvaret (sprængt) Go-forsøg og {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} korrekt besvaret (ikke sprængt) No-Go-forsøg og {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} falske træf (trykkede på skærmen andre steder end en boble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} missede (ikke sprængt) Go-forsøg og {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} forkert besvaret (sprængt) No-Go-forsøg og {{ percentage }}",
      POP_THE_BUBBLES: "Spræng boblerne!",
      TAP_TO_CONTINUE: "Tryk for at fortsætte",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "HVIS DU RAMMER DE RIGTIGE BALLONER, FÅR DU PUNKTER.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "TRYK KUN PÅ FOR AT FÅ ALLE LYSERØDE, BLÅ OG GULE BOBLER TIL AT SPRINGE.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "SPRÆNG IKKE TO BOBLER AF SAMME FARVE I TRÆK.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "SPRÆNG KUN GULE OG BLÅ BOBLER.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "SPRÆNG KUN LYSERØDE, GULE OG BLÅ BOBLER.",
      YOU_GOT_PERCENT: "Du fik {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "I dette spil vil du se mange forskellige farvede bobler, én ad gangen. Din opgave er at 'sprænge' de korrekt farvede bobler, mens du ignorerer de forkerte. Vær opmærksom på instruktionerne for hvert niveau for at vide, hvilke farvede bobler du skal trykke på, og hvilke du skal ignorere.",
      Instructions: "Instruktioner",
      Start: "Start",
      Questionnaire: "Spørgeskema",
      Submit: "Indsend",
      "How clear were the instructions?": "Hvor klare var instruktionerne?",
      "How happy would you be to do this again?":
        "Hvor glad ville du være for at gøre dette igen?",
      "Time's up!": "Tiden er udløbet!",
      POP_THESE_COLORS: "Tryk på bobler i disse farver:",
      NO_REPEAT_RULE: "Tryk ikke på to bobler af samme farve i træk.",
      NEXT_LEVEL: "Næste niveau",
      COLOR_PINK: "Lyserød",
      COLOR_BLUE: "Blå",
      COLOR_YELLOW: "Gul",
    },
  },
  "de-DE": {
    translation: {
      GAME: "Spiel",
      COMPLETED: "Abgeschlossen",
      CONGRATULATIONS: "Glückwunsch",
      GAME_OVER: "Spiel ist vorbei",
      GO: "Los",
      INSTRUCTIONS:
        "Sie sehen farbige Blasen, eine nach der anderen. Tippen Sie, um die richtigen Farben platzen zu lassen und ignorieren Sie den Rest. Achten Sie auf die Anweisungen für jede Stufe.",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} abgeschlossen",
      MINUTES_TO_COMPLETE: "Sekunden zum Abschließen des Levels",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} korrekt beantwortete (geplatzte) Go-Versuche und {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} korrekt beantwortete (nicht geplatzte) No-Go-Versuche und {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} Fehlklicks (Bildschirm außerhalb einer Blase berührt)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} verpasste (nicht geplatzte) Go-Versuche und {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} falsch beantwortete (geplatzte) No-Go-Versuche und {{ percentage }}",
      POP_THE_BUBBLES: "Lass die Blasen platzen!",
      TAP_TO_CONTINUE: "Zum Fortfahren tippen",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "WENN DU DIE RICHTIGEN LUFTBALLONS ZERPLATZT, ERHÄLTST DU PUNKTE.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "TIPPE NUR AUF ALLE ROSA, BLAUEN UND GELBEN BLASEN, UM SIE ZUM PLATZEN ZU BRINGEN.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "LASSEN SIE NICHT ZWEI BLASEN DER GLEICHEN FARBE HINTEREINANDER PLATZEN.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "NUR GELBE UND BLAUE BLASEN PLATZEN LASSEN.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "NUR ROSA, GELBE UND BLAUE BLASEN PLATZEN LASSEN.",
      YOU_GOT_PERCENT: "Du hast {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "In diesem Spiel sehen Sie viele verschiedenfarbige Blasen, eine nach der anderen. Ihre Aufgabe ist es, die richtig gefärbten Blasen zu 'zerplatzen' und die falschen zu ignorieren. Achten Sie auf die Anweisungen für jede Stufe, um zu wissen, auf welche Blasen Sie tippen und welche Sie ignorieren sollen.",
      Instructions: "Anleitung",
      Start: "Starten",
      Questionnaire: "Fragebogen",
      Submit: "Absenden",
      "How clear were the instructions?": "Wie klar waren die Anweisungen?",
      "How happy would you be to do this again?":
        "Wie gerne würden Sie das noch einmal machen?",
      "Time's up!": "Die Zeit ist um!",
      POP_THESE_COLORS: "Tippen Sie auf Blasen in diesen Farben:",
      NO_REPEAT_RULE: "Tippen Sie nicht zweimal hintereinander auf die gleiche Farbe.",
      NEXT_LEVEL: "Nächstes Level",
      COLOR_PINK: "Rosa",
      COLOR_BLUE: "Blau",
      COLOR_YELLOW: "Gelb",
    },
  },
  "en-US": {
    translation: {
      GAME: "Game",
      COMPLETED: "Completed",
      CONGRATULATIONS: "Congratulations",
      GAME_OVER: "Game Over",
      GO: "GO",
      INSTRUCTIONS:
        "You will see colored bubbles appear one at a time. Tap to pop the correct colors and ignore the rest. Pay attention to each level's instructions.",
      LEVEL_NUMBER: "Level {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Level {{ levelNumber }} Completed",
      MINUTES_TO_COMPLETE: "seconds taken to complete level",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} number of correctly answered (popped) Go trials and {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} number of correctly answered (unpopped) No-Go trials and {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} number of false hits (hitting screen anywhere other than a bubble)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} number of missed (unpopped) Go trials and {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} number of incorrectly answered (popped) No-Go trials and {{ percentage }}",
      POP_THE_BUBBLES: "Pop the Bubbles",
      TAP_TO_CONTINUE: "Tap to continue",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "POPPING CORRECT BALLOONS WILL EARN YOU POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "TAP TO POP ALL PINK, BLUE AND YELLOW BUBBLES ONLY.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "DON'T POP TWO BUBBLES OF THE SAME COLOR IN A ROW.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM: "ONLY POP YELLOW AND BLUE BUBBLES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "ONLY POP PINK YELLOW AND BLUE BUBBLES.",
      YOU_GOT_PERCENT: "You got {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "In this game, you will see lots of different colored bubbles, one at a time. Your task is to 'pop' the correctly colored bubbles, while ignoring the incorrect ones. Pay attention to the instructions for each level to know which colored bubbles you should tap, and which ones you should ignore.",
      Instructions: "Instructions",
      Start: "Start",
      Questionnaire: "Questionnaire",
      Submit: "Submit",
      "How clear were the instructions?": "How clear were the instructions?",
      "How happy would you be to do this again?":
        "How happy would you be to do this again?",
      "Time's up!": "Time's up!",
      POP_THESE_COLORS: "Pop bubbles in these colors:",
      NO_REPEAT_RULE: "Don't pop two of the same color in a row.",
      NEXT_LEVEL: "Next Level",
      COLOR_PINK: "Pink",
      COLOR_BLUE: "Blue",
      COLOR_YELLOW: "Yellow",
    },
  },
  "es-ES": {
    translation: {
      GAME: "Juego",
      COMPLETED: "Terminada",
      CONGRATULATIONS: "Felicidades",
      GAME_OVER: "Juego Terminado",
      GO: "Vamos",
      INSTRUCTIONS:
        "Verás burbujas de colores que aparecen una a la vez. Toca para reventar los colores correctos e ignora el resto. Presta atención a las instrucciones de cada nivel.",
      LEVEL_NUMBER: "Nivel {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Nivel {{ levelNumber }} Completado",
      MINUTES_TO_COMPLETE: "segundos para completar el nivel",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} número de ensayos respondidos correctamente (reventados) Go ensayos y {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctGoCount }} número de ensayos respondidos correctamente (no reventados) No-Go ensayos y {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} número de aciertos falsos (tocar la pantalla fuera de una burbuja)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} número de ensayos respondidos incorrectamente (no reventados) Go ensayos y {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} número de ensayos respondidos incorrectamente (reventados) No-Go ensayos y {{ percentage }}",
      POP_THE_BUBBLES: "¡Revienta las burbujas!",
      TAP_TO_CONTINUE: "Toque para continuar",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "REVENTAR LOS GLOBOS CORRECTOS TE DARÁ PUNTOS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "Toca para hacer estallar todas las burbujas rosadas, azules y amarillas solamente.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "No reviente dos burbujas del mismo color seguidas.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "Solo estallan burbujas amarillas y azules.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "Solo estallan burbujas rosadas, amarillas y azules.",
      YOU_GOT_PERCENT: "Tienes el {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "En este juego, verás muchas burbujas de diferentes colores, una a la vez. Tu tarea es 'reventar' las burbujas del color correcto, mientras ignoras las incorrectas. Presta atención a las instrucciones de cada nivel para saber qué burbujas de colores debes tocar y cuáles debes ignorar.",
      Instructions: "Instrucciones",
      Start: "Comenzar",
      Questionnaire: "Cuestionario",
      Submit: "Enviar",
      "How clear were the instructions?":
        "¿Qué tan claras fueron las instrucciones?",
      "How happy would you be to do this again?":
        "¿Qué tan feliz estarías de hacer esto de nuevo?",
      "Time's up!": "¡Se acabó el tiempo!",
      POP_THESE_COLORS: "Toca las burbujas de estos colores:",
      NO_REPEAT_RULE: "No revientes dos burbujas del mismo color seguidas.",
      NEXT_LEVEL: "Siguiente nivel",
      COLOR_PINK: "Rosa",
      COLOR_BLUE: "Azul",
      COLOR_YELLOW: "Amarillo",
    },
  },
  "fr-FR": {
    translation: {
      GAME: "Jeu",
      COMPLETED: "Terminé",
      CONGRATULATIONS: "Bravo\u2009!",
      GAME_OVER: "Jeu terminé",
      GO: "GO",
      INSTRUCTIONS:
        "Vous verrez des bulles colorées apparaître une à la fois. Touchez pour faire éclater les bonnes couleurs et ignorez les autres. Suivez les instructions de chaque niveau.",
      LEVEL_NUMBER: "Niveau {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Niveau {{ levelNumber }} Complété",
      MINUTES_TO_COMPLETE: "secondes pour terminer le niveau",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} essais Go répondus correctement (éclatés) et {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} essais No-Go répondus correctement (non éclatés) et {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} faux clics (toucher l'écran ailleurs que sur une bulle)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} essais Go manqués (non éclatés) et {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} essais No-Go répondus incorrectement (éclatés) et {{ percentage }}",
      POP_THE_BUBBLES: "Faites éclater les bulles\u2009!",
      TAP_TO_CONTINUE: "Touchez pour continuer",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "ÉCLATER LES BONS BALLONS VOUS RAPPORTERA DES POINTS.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "TOUCHEZ POUR ÉCLATER UNIQUEMENT LES BULLES ROSES, BLEUES ET JAUNES.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "NE FAITES PAS ÉCLATER DEUX BULLES DE LA MÊME COULEUR À LA SUITE.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "N'ÉCLATEZ QUE LES BULLES JAUNES ET BLEUES.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "N'ÉCLATEZ QUE LES BULLES ROSES, JAUNES ET BLEUES.",
      YOU_GOT_PERCENT: "Vous avez obtenu {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "Dans ce jeu, vous verrez de nombreuses bulles de différentes couleurs, une à la fois. Votre tâche est de « faire éclater » les bulles de la bonne couleur, tout en ignorant les mauvaises. Faites attention aux instructions de chaque niveau pour savoir sur quelles bulles vous devez appuyer et lesquelles vous devez ignorer.",
      Instructions: "Instructions",
      Start: "Commencer",
      Questionnaire: "Questionnaire",
      Submit: "Soumettre",
      "How clear were the instructions?":
        "Les instructions étaient-elles claires\u2009?",
      "How happy would you be to do this again?":
        "Seriez-vous heureux de refaire cet exercice\u2009?",
      "Time's up!": "Le temps est écoulé\u2009!",
      POP_THESE_COLORS: "Touchez les bulles de ces couleurs\u2009:",
      NO_REPEAT_RULE: "Ne faites pas éclater deux bulles de la même couleur à la suite.",
      NEXT_LEVEL: "Niveau suivant",
      COLOR_PINK: "Rose",
      COLOR_BLUE: "Bleu",
      COLOR_YELLOW: "Jaune",
    },
  },
  "hi-IN": {
    translation: {
      GAME: "खेल",
      COMPLETED: "पूरा किया हुआ",
      CONGRATULATIONS: "बधाई हो",
      GAME_OVER: "खेल खत्म",
      GO: "जाओ",
      INSTRUCTIONS:
        "आपको एक-एक करके रंगीन बुलबुले दिखाई देंगे। सही रंगों को फोड़ने के लिए दबाएं और बाकी को नज़रअंदाज़ करें। प्रत्येक स्तर के निर्देशों पर ध्यान दें।",
      LEVEL_NUMBER: "स्तर {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "स्तर {{ levelNumber }} पूरा हुआ",
      MINUTES_TO_COMPLETE: "स्तर पूरा करने में लगे सेकंड",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} दिए गए सही जवाब (पॉपअप) परीक्षण में जाएं और {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctGoCount }} दिए गए सही जवाब (पॉपअप नही) परीक्षण में नही जाएं और {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} गलत हिट की संख्या (बुलबुले के छोड़कर अलावा कहीं भी स्क्रीन पर हिट करें)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} मिस्ड्स क्लिक्स की संख्या (पॉपअप नही) परीक्षण पर जाएं और {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} गलत उत्तर की संख्या (पॉपअप) परीक्षण पर नही जाए और {{ percentage }}",
      POP_THE_BUBBLES: "बुलबुलों को फोड़ें!",
      TAP_TO_CONTINUE: "जारी रखने के लिए दबाएं",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "सही गुब्बारे पॉपिंग होने पर आप अंक प्राप्त करेंगे.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "सभी पिंक को पॉप करने के लिए दबाएँ, केवल नीले और पीले रंग के बुलबुले।",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "एक ही पंक्ति में समान रंग के दो बुलबुलों को पॉप नही करें।",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "केवल पीला और नीले रंग के बुलबुलों को पॉप करें।",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "केवल गुलाबी, पीला और नीला बुलबुले पॉप करें।",
      YOU_GOT_PERCENT: "आपको मिला {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "इस खेल में, आप बहुत से विभिन्न रंगों के बुलबुल देखेंगे, एक बार में एक। आपका कार्य है सही रंग के बुलबुलों को 'फोड़ना' है एवं गलत रंगों को बुलबुले को नजरअंदाज करना। प्रत्येक स्तर के लिए निर्देशों पर ध्यान दें ताकि आप जान सकें कौन सी रंग के बुलबुलों को आपको दबाना चाहिए, और किसको आपको नजरअंदाज करना चाहिए।",
      Ok: "ठीक है",
      Instructions: "निर्देश",
      Start: "शुरू करें",
      Questionnaire: "प्रश्नावली",
      Submit: "जमा करें",
      "How clear were the instructions?": "निर्देश कितने स्पष्ट थे?",
      "How happy would you be to do this again?":
        "आप इसे दोबारा करने में कितने खुश होंगे?",
      "Time's up!": "समय समाप्त!",
      POP_THESE_COLORS: "इन रंगों के बुलबुलों को दबाएं:",
      NO_REPEAT_RULE: "एक ही रंग के दो बुलबुलों को लगातार न फोड़ें।",
      NEXT_LEVEL: "अगला स्तर",
      COLOR_PINK: "गुलाबी",
      COLOR_BLUE: "नीला",
      COLOR_YELLOW: "पीला",
    },
  },
  "it-IT": {
    translation: {
      GAME: "Gioco",
      COMPLETED: "Completato",
      CONGRATULATIONS: "Congratulazioni",
      GAME_OVER: "Fine del gioco",
      GO: "Via",
      INSTRUCTIONS:
        "Vedrai bolle colorate apparire una alla volta. Tocca per far scoppiare i colori corretti e ignora il resto. Segui le istruzioni di ogni livello.",
      LEVEL_NUMBER: "Livello {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "Livello {{ levelNumber }} Completato",
      MINUTES_TO_COMPLETE: "impiegati per completare il livello",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} il numero di bolle corrette (scoppiate) per un totale del {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} il numero di bolle No-Go correttamente non scoppiate e {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} il numero di colpi mancati (colpito dove non c'erano bolle)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} il numero di bolle mancate (non scoppiate) per un totale del {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} il numero di bolle No-Go erroneamente scoppiate e {{ percentage }}",
      POP_THE_BUBBLES: "Scoppia le bolle!",
      TAP_TO_CONTINUE: "Cliccare per continuare",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "FACENDO SCOPPIARE I PALLONCINI CORRETTI SI GUADAGNERANNO PUNTI.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "TOCCARE PER FAR SCOPPIARE SOLO LE BOLLE ROSA, BLU E GIALLE.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "Non scoppiare due bolle di seguito con lo stesso colore.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "Scoppia solo le bolle di colore giallo e di colore blu.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "Scoppia solo le bolle di colore rosa, giallo e di colore blu.",
      YOU_GOT_PERCENT: "Hai ottenuto un punteggio del {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "In questo gioco vedrai tante bolle di diversi colori, una alla volta. Il tuo compito è 'scoppiare' le bolle del colore corretto, ignorando quelle sbagliate. Presta attenzione alle istruzioni di ogni livello per sapere quali bolle toccare e quali ignorare.",
      Instructions: "Istruzioni",
      Start: "Inizia",
      Questionnaire: "Questionario",
      Submit: "Invia",
      "How clear were the instructions?":
        "Quanto erano chiare le istruzioni?",
      "How happy would you be to do this again?":
        "Quanto saresti felice di farlo di nuovo?",
      "Time's up!": "Tempo scaduto!",
      POP_THESE_COLORS: "Tocca le bolle di questi colori:",
      NO_REPEAT_RULE: "Non scoppiare due bolle dello stesso colore di fila.",
      NEXT_LEVEL: "Livello successivo",
      COLOR_PINK: "Rosa",
      COLOR_BLUE: "Blu",
      COLOR_YELLOW: "Giallo",
    },
  },
  "ko-KR": {
    translation: {
      GAME: "게임",
      COMPLETED: "완료",
      CONGRATULATIONS: "축하해요",
      GAME_OVER: "게임 종료",
      GO: "가기",
      INSTRUCTIONS:
        "색색의 거품이 하나씩 나타납니다. 올바른 색상을 눌러 터뜨리고 나머지는 무시하세요. 각 레벨의 지침에 주의하세요.",
      LEVEL_NUMBER: "레벨 {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "레벨 {{ levelNumber }} 완료",
      MINUTES_TO_COMPLETE: "레벨을 완료하는 데 걸린 초",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} 정답(터진) Go 시행 수 및 {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} 정답(터지지 않은) No-Go 시행 수 및 {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} 오답 터치 수 (거품 외 화면 터치)",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} 놓친(터지지 않은) Go 시행 수 및 {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} 오답(터진) No-Go 시행 수 및 {{ percentage }}",
      POP_THE_BUBBLES: "거품을 터뜨리기!",
      TAP_TO_CONTINUE: "계속하려면 누르기",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM:
        "맞는 풍선을 터뜨리면 점수를 얻게 됩니다.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP:
        "분홍, 파랑 및 노랑 거품만 눌러서 터뜨리기.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP:
        "같은 색의 거품을 연속으로 두 번 터뜨리지 마세요.",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM:
        "노랑과 파랑 거품만 터뜨리세요.",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM:
        "분홍, 노랑, 파랑 거품만 터뜨리세요.",
      YOU_GOT_PERCENT: "얻음 {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "이 게임에서는 다양한 색상의 거품이 하나씩 나타납니다. 올바른 색상의 거품을 '터뜨리고' 틀린 것은 무시하는 것이 과제입니다. 각 레벨의 지침에 주의하여 어떤 색상의 거품을 터뜨리고 어떤 것을 무시해야 하는지 알아보세요.",
      Instructions: "지침",
      Start: "시작",
      Questionnaire: "설문지",
      Submit: "제출",
      "How clear were the instructions?": "지침이 얼마나 명확했나요?",
      "How happy would you be to do this again?":
        "이것을 다시 하게 된다면 얼마나 기쁘겠습니까?",
      "Time's up!": "시간이 다 됐습니다!",
      POP_THESE_COLORS: "이 색상의 거품을 터뜨리세요:",
      NO_REPEAT_RULE: "같은 색상을 연속으로 두 번 터뜨리지 마세요.",
      NEXT_LEVEL: "다음 레벨",
      COLOR_PINK: "분홍",
      COLOR_BLUE: "파랑",
      COLOR_YELLOW: "노랑",
    },
  },
  "zh-CN": {
    translation: {
      GAME: "游戏",
      COMPLETED: "已完成",
      CONGRATULATIONS: "恭喜！",
      GAME_OVER: "游戏结束",
      GO: "开始",
      INSTRUCTIONS:
        "您将看到彩色气泡逐一出现。点击正确颜色的气泡并忽略其余的。注意每个关卡的说明。",
      LEVEL_NUMBER: "级别 {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "级别 {{ levelNumber }} 已完成",
      MINUTES_TO_COMPLETE: "完成关卡所用的秒数",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} 正确回答（点爆）的Go试验次数和 {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} 正确回答（未点爆）的No-Go试验次数和 {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} 误触次数（在气泡以外的屏幕区域点击）",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} 错过的（未点爆）Go试验次数和 {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} 错误回答（点爆）的No-Go试验次数和 {{ percentage }}",
      POP_THE_BUBBLES: "弹出气泡!",
      TAP_TO_CONTINUE: "点击继续",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM: "弹出正确的气球将赢得积分.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP: "点击以仅弹出所有粉色、蓝色和黄色气泡.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP: "不要连续弹出两个相同颜色的气泡。",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM: "只弹出黄色和蓝色气泡。",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM: "只弹出粉色、黄色和蓝色气泡。",
      YOU_GOT_PERCENT: "得分 {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "在这个游戏中，您将看到许多不同颜色的气泡，每次一个。您的任务是'弹出'正确颜色的气泡，同时忽略错误的气泡。注意每个级别的说明，以了解应该点击哪些颜色的气泡，以及应该忽略哪些。",
      Instructions: "说明",
      Start: "开始",
      Questionnaire: "问卷",
      Submit: "提交",
      "How clear were the instructions?": "说明有多清楚？",
      "How happy would you be to do this again?": "您愿意再做一次吗？",
      "Time's up!": "时间到！",
      POP_THESE_COLORS: "点击这些颜色的气泡：",
      NO_REPEAT_RULE: "不要连续点击两个相同颜色的气泡。",
      NEXT_LEVEL: "下一关",
      COLOR_PINK: "粉色",
      COLOR_BLUE: "蓝色",
      COLOR_YELLOW: "黄色",
    },
  },
  "zh-HK": {
    translation: {
      GAME: "遊戲",
      COMPLETED: "已完成",
      CONGRATULATIONS: "恭喜！",
      GAME_OVER: "遊戲結束",
      GO: "開始",
      INSTRUCTIONS:
        "您將看到彩色氣泡逐一出現。點擊正確顏色的氣泡並忽略其餘的。注意每個關卡的說明。",
      LEVEL_NUMBER: "級別 {{ gameLevel }}",
      LEVEL_NUM_COMPLETED: "級別 {{ levelNumber }} 已完成",
      MINUTES_TO_COMPLETE: "完成關卡所用的秒數",
      NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS:
        "{{ correctGoCount }} 正確回答（點爆）的Go試驗次數和 {{ percentage }}",
      NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ correctNoGo }} 正確回答（未點爆）的No-Go試驗次數和 {{ percentage }}",
      NUMBER_OF_FALSE_HITS:
        "{{ falseHitsCount }} 誤觸次數（在氣泡以外的螢幕區域點擊）",
      NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS:
        "{{ missedClicks }} 錯過的（未點爆）Go試驗次數和 {{ percentage }}",
      NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS:
        "{{ wrongNoGoCount }} 錯誤回答（點爆）的No-Go試驗次數和 {{ percentage }}",
      POP_THE_BUBBLES: "彈出氣泡!",
      TAP_TO_CONTINUE: "點擊繼續",
      TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM: "彈出正確的氣球將贏得積分.",
      TAP_TO_POP_LEVEL_1_BUBBLES_TOP: "點擊以僅彈出所有粉色、藍色和黃色氣泡.",
      TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP: "不要連續彈出兩個相同顏色的氣泡。",
      TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM: "只彈出黃色和藍色氣泡。",
      TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM: "只彈出粉色、黃色和藍色氣泡。",
      YOU_GOT_PERCENT: "得分 {{ percentage }}",
      IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE:
        "在這個遊戲中，您將看到許多不同顏色的氣泡，每次一個。您的任務是'彈出'正確顏色的氣泡，同時忽略錯誤的氣泡。注意每個級別的說明，以了解應該點擊哪些顏色的氣泡，以及應該忽略哪些。",
      Instructions: "說明",
      Start: "開始",
      Questionnaire: "問卷",
      Submit: "提交",
      "How clear were the instructions?": "說明有多清楚？",
      "How happy would you be to do this again?": "您願意再做一次嗎？",
      "Time's up!": "時間到！",
      POP_THESE_COLORS: "點擊這些顏色的氣泡：",
      NO_REPEAT_RULE: "不要連續點擊兩個相同顏色的氣泡。",
      NEXT_LEVEL: "下一關",
      COLOR_PINK: "粉色",
      COLOR_BLUE: "藍色",
      COLOR_YELLOW: "黃色",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
  keySeparator: false,
  nsSeparator: false,
});

export default i18n;
