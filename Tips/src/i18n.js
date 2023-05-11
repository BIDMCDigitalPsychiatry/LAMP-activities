import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "da-DK": {
    translation: {
      "Mood Tips": "Stemningstips", 
      "Quick Tips to Improve Your": "Hurtige tips til at forbedre din",
       "Read ": "L\u00e6s ", 
       "Hope ": "H\u00e5b ", 
       "Tip": "Tip ", 
       "Was this helpful today? ": "Var det nyttigt i dag? ", 
       "Yes": "Ja", 
       "No": "Nej", 
       "Mark complete ": "M\u00e6rke komplet ", 
       "Social": "Sociale", 
       "Mental Health Resources": "Ressourcer til psykisk sundhed", 
       "Physical Wellness ": "Fysisk velv\u00e6re ",
        "Suggested Reading ": "Forslag til l\u00e6sning ", 
        "Motivation ": "Motivation ", 
        "Stress Tips ": "Stress Tips ",

     "Social Tips": "Sociale Tips",
      "Sleep Tips": "S\u00f8vn Tips",
      "Resources": "Ressourcer",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "Tips",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Tr\u00e6ning"
       },
  },  "de-DE": {
    translation: {
      "Mood Tips": "Stimmungs-Tipps", "Quick Tips to Improve Your": "Schnelle Tipps zur Verbesserung von", "Read": "Lesen", "Hope": "Hoffnung", "Tip": "Tipp", "Was this helpful today?": "War das he\tute hilfreich?", "Yes": "Ja", "No": "Nein", "Mark complete": "Als abgeschlossen markieren", "Social": "Soziales", "Mental Health Resources": "Ressourcen f\u00fcr psychische Gesundheit", "Physical Wellness": "K\u00f6rperliches Wohlbefinden", "Suggested Reading": "Empfohlene Lekt\u00fcre", "Motivation": "Motivation", "Stress Tips": "Stress-Tipps",
           "Social Tips": "Soziales Tipps",
      "Sleep Tips": "Schlaf Tipps",
      "Resources": "Resources",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "Tipps",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Sport",
    },
  }, "en-US": {
    translation: {
      "Mood Tips": "Mood Tips",
      "Quick Tips to Improve Your": "Quick Tips to Improve Your",
      "Read": "Read",
      "Hope": "Hope",
      "Tip": "Tip",
      "Was this helpful today?": "Was this helpful today?",
      "Yes": "Yes",
      "No": "No",
      "Mark complete": "Mark complete",
      "Social": "Social",
      "Mental Health Resources": "Mental Health Resources",
      "Physical Wellness": "Physical Wellness",
      "Suggested Reading": "Suggested Reading",
      "Motivation": "Motivation",
      "Stress Tips": "Stress Tips",
      "Social Tips": "Social Tips",
      "Sleep Tips": "Sleep Tips",
      "Resources": "Resources",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "Tips",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Exercise",
    },
  },
  "es-ES": {
    translation: {
      "Mood Tips": "Consejos sobre el estado de ánimo",
      "Quick Tips to Improve Your": "Consejos rápidos para mejorar tu",
      "Read": "leer",
      "Hope": "Esperanza",
      "Tip": "Consejo",
      "Was this helpful today?": "¿Fue útil esto hoy?",
      "Yes": "Si",
      "No": "No",
      "Mark complete": "Marcar como completo",
      "Social": "Social",
      "Mental Health Resources": "Recursos de salud mental",
      "Physical Wellness": "Bienestar Fisico",
      "Suggested Reading": "Lecturas Sugeridas",
      "Motivation": "Motivación",
      "Stress Tips": "Consejos para el estrés",
      "Social Tips": "Consejos Sociales",
      "Sleep Tips": "Consejos para Dormir",
      "Resources": "Recursos",
      "Definitions": "Definición",
      "Goals": "Metas",
      "Tips": "Consejos",
      "Department of Mental Health (DMH)": "Departamento de Salud Mental(DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "Alianza Nacional de Enfermedades Mentales",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Ejercicio",
    },
  },"fr-FR": {
    translation: {
      "Mood Tips": "Humeur Astuces",
      "Was this helpful today?": "Cela vous a-t-il \u00e9t\u00e9 utile aujourd\u2019hui\u2009?", 
      "Yes": "Oui", "No": "Non", "Mark Complete": "Marquer comme compl\u00e9t\u00e9", 
      "Social behavior": "Comportement social", 
      "Mental Health Resources": "Ressources en sant\u00e9 mentale", 
      "Physical Wellness": "Bien-\u00eatre physique",
      "Suggested Reading": "Lectures sugg\u00e9r\u00e9es",
       "Motivation": "Motivation", 
       
      "Quick Tips to Improve Your": "Quick Tips to Improve Your",
      "Read": "Lu",
            "Hope": "Hope",
      "Tip": "Astuce",
      
      "Social": "Social",
     
      "Stress Tips": "Stress Astuces",
      "Social Tips": "Social Astuces",
      "Sleep Tips": "Sommeil Astuces",
      "Resources": "Ressources",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "Astuces",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Exercice",
    },
  },  "hi-IN": {
    translation: {
      "Mood Tips": "मनोदशा सुधार के लिए सुझाव",
      "Quick Tips to Improve Your": "आपके सुधार के लिए त्वरित सलाह",
      "Read": "पढ़ें",
      "Hope": "आशा",
      "Tip": "सुझाव",
      "Was this helpful today?": "क्या यह आज मददगार था?",
      "Yes": "हाँ",
      "No": "नही",
      "Mark complete": "पूर्ण को चिन्हित करें ।",
      "Social": "सामाजिक व्यवहार",
      "Mental Health Resources": "मानसिक स्वास्थ्य संसाधन",
      "Physical Wellness": "शारीरिक स्वास्थ्य",
      "Suggested Reading": "पढ़ने का सुझाव",
      "Motivation": "प्रेरणा",
      "Stress Tips": "तनाव के लिए सुझाव",
      "Social Tips": "सामाजिक सुझाव",
      "Sleep Tips": "नींद सम्बन्धी सुझाव",
      "Resources": "संसाधन",
      "Definitions": "परिभाषाएं",
      "Goals": "लक्ष्य",
      "Tips": "सलाह",
      "Department of Mental Health (DMH)": "मानसिक स्वास्थ्य विभाग (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "मानसिक बीमारी पर राष्ट्रीय संगठन (NAMI)",
      "NAMI Massachussetts": "मैसाचुसेट्स",
      "Exercise": "शारीरिक व्यायाम",
    },
  },"it-IT": {
    translation: {
      "Mood Tips": "Consigli sull'Umore", "Quick Tips to Improve Your": "Suggerimenti Rapidi per Migliorare la Propria", "Read": "Leggi", "Hope": "Speranza", "Tip": "Suggerimento", "Was this helpful today?": "\u00c8 stato utile oggi?", "Yes": "S\u00ec", "No": "No", "Mark complete": "Segna come completato", "Social": "Comportamento Sociale", "Mental Health Resources": "Risorse per la Salute Mentale", "Physical Wellness": "Benessere Fisico", "Suggested Reading": "Lettura Consigliata", "Motivation": "Motivazione", "Stress Tips": "Suggerimenti per lo Stress",
      "Social Tips": "Sociale Suggerimenti",
      "Sleep Tips": "Sonno Suggerimenti",
      "Resources": "Ressources",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "Suggerimenti",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "Esercizio",
    },
  },"ko-KR": {
    translation: {
      "Mood Tips": "\ubb34\ub4dc \ud301", "Quick Tips to Improve Your": "\uc5ec\ub7ec\ubd84\uc758 \u2026. \uac1c\uc120\uc744 \uc704\ud55c \uac04\ub2e8\ud55c \ud301", "Read": "\uc77d\uae30 ", "Hope": "\ud76c\ub9dd", "Tip": "\ud301 ", "Was this helpful today?": "\uc774\uac83\uc774 \uc624\ub298 \ub3c4\uc6c0\uc774 \ub418\uc5c8\ub098\uc694? ", "Yes": "\uc608", "No": "\uc544\ub2c8\uc624", "Mark complete": "\uc644\ub8cc\ub77c\uace0 \ud45c\uc2dc\ud558\uae30 ", "Social": "\uc0ac\ud68c\uc0dd\ud65c", "Mental Health Resources": "\uc815\uc2e0 \uac74\uac15 \uc790\ub8cc\ub4e4", "Physical Wellness": "\uc2e0\uccb4\uc801 \uc6f0\ube59 ", "Suggested Reading": "\ucd94\ucc9c \uc77d\uc744\uac70\ub9ac ", "Motivation": "\ub3d9\uae30\ubd80\uc5ec ", "Stress Tips": "\uc2a4\ud2b8\ub808\uc2a4 \uad00\ub828 \ud301 ",
      "Social Tips": "\uc0ac\ud68c\uc0dd\ud65c \ud301",
      "Sleep Tips": "\uc218\uba74 \ud301",
      "Resources": "Resources",
      "Definitions": "Definitions",
      "Goals": "Goals",
      "Tips": "\ud301",
      "Department of Mental Health (DMH)": "Department of Mental Health (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "National Alliance on Mental Illness (NAMI)",
      "NAMI Massachussetts": "NAMI Massachussetts",
      "Exercise": "\uc6b4\ub3d9",
    },
  },  "zh-CN": {
    translation: {
      "Mood Tips": "\u60c5\u7eea\u8d34\u58eb", "Quick Tips to Improve Your": "\u4f7f\u7528\u5feb\u901f\u8d34\u58eb\u6539\u5584", "Read": "\u9605\u8bfb", "Hope": "\u5e0c\u671b", "Tip": "贴士", "Was this helpful today?": "今天，这些对你有帮助吗？", "Yes": "\u662f", "No": "\u5426", "Mark complete": "标记完成","Social": "\u793e\u4ea4", "Mental Health Resources": "\u5fc3\u7406\u5065\u5eb7\u8d44\u6e90", "Physical Wellness": "\u8eab\u4f53\u5065\u5eb7", "Suggested Reading": "\u63a8\u8350\u9605\u8bfb", "Motivation": "\u52a8\u673a", "Stress Tips": "\u538b\u529b\u8d34\u58eb",
      "Social Tips": "\u793e\u4ea4 \u8d34\u58eb",
      "Sleep Tips": "\u7761\u7720 \u8d34\u58eb",
      "Resources": "Resources",
      "Definitions": "Definitions",
      "Goals": "\u76ee\u6807",
      "Tips": "\u8d34\u58eb",     
      "Department of Mental Health (DMH)": "\u7cbe\u795e\u5065\u5eb7\u90e8 (DMH)",
      "National Alliance on Mental Illness (NAMI)":
        "\u5168\u56fd\u7cbe\u795e\u75be\u75c5\u8054\u76df (NAMI)",
      "NAMI Massachussetts": "\u5168\u56fd\u7cbe\u795e\u75be\u75c5\u8054\u76df\u9a6c\u8428\u8bf8\u585e\u5dde\u5206\u90e8",
      "Exercise": "\u953b\u70bc",
    },
   },
    "zh-HK": {
      translation: {
        "Mood Tips": "\u60c5\u7dd2\u8cbc\u58eb", "Quick Tips to Improve Your": "\u4f7f\u7528\u5feb\u901f\u8cbc\u58eb\u6539\u5584", "Read": "\u95b1\u8b80", "Hope": "\u5e0c\u671b", "Tip" : "貼士", "Was this helpful today?": "今天，這些對你有幫助嗎？", "Yes": "\u662f", "No": "\u5426", "Mark complete": "標記完成", "Social": "\u793e\u4ea4", "Mental Health Resources": "\u5fc3\u7406\u5065\u5eb7\u8cc7\u6e90", "Physical Wellness": "\u8eab\u9ad4\u5065\u5eb7", "Suggested Reading": "\u63a8\u85a6\u95b1\u8b80", "Motivation": "\u52d5\u6a5f", "Stress Tips": "\u58d3\u529b\u8cbc\u58eb",
        "Social Tips": "\u793e\u4ea4 \u8cbc\u58eb",
        "Sleep Tips": "\u7761\u7720 \u8cbc\u58eb",
        "Resources": "Resources",
        "Definitions": "Definitions",
        "Goals": "\u76ee\u6a19",
        "Tips": "\u8cbc\u58eb", 
        "Department of Mental Health (DMH)": "\u7cbe\u795e\u5065\u5eb7\u90e8 (DMH)",
        "National Alliance on Mental Illness (NAMI)":
          "\u5168\u570b\u7cbe\u795e\u75be\u75c5\u806f\u76df (NAMI)",
        "NAMI Massachussetts": "\u5168\u570b\u7cbe\u795e\u75be\u75c5\u806f\u76df\u99ac\u85a9\u8af8\u585e\u5dde\u5206\u90e8",
        "Exercise": "\u935b\u7149",
      },
    }  
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    // lng: "es-ES",
    keySeparator: false,
    resources,
  });

export default i18n;
