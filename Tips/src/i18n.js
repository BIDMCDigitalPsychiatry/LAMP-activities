import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
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
  },
  "hi-IN": {
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
  },
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
