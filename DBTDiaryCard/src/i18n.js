import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      LIFE_WORTH_LIVING_GOAL: "Life worth living goal",
      CONTINUE: "Continue",
      TARGET_BEHAVIORS: "Target behaviors",
      ANSWER_RADIO_RATING_FORMATS: "0= not at all, 5 = extremely",
      WHICH_TARGET_BEHAVIORS_DID_YOU_EXPERIENCE_TODAY:
        "Which target behaviors did you experience today?",
      EFFECTIVE: "Effective",
      INEFFECTIVE: "Ineffective",
      NEXT: "Next",
      BACK: "Back",
      EMOTIONS: "Emotions",
      WHICH_EMOTIONS_DID_YOU_EXPERIENCE_TODAY:
        "Which emotions did you experience today?",
      SKILLS: "Skills",
      DID_YOU_USE_ANY_OF_THE_SKILLS_TODAY:
        "Did you use any of the skills today?",
      WHY_DIDNT_YOU_USE_ANY_SKILLS: "Why didn’t you use any skills?",
      MAX_300_CHARACTERS: "300 max characters",
      SELECT_ALL_THAT_APPLY: "Select all that apply",
      WHICH_SKILLS_DID_YOU_USE: "Which skills did you use?",
      YES: "Yes",
      NO: "No",
      HOW_MUCH_EFFORT_DID_YOU_PUT_INTO_THE_SKILLS:
        "How much effort did you put into the skills?",
      ADDITIONAL_NOTES: "Additional Notes",
      SHORT_ANSWER_SENETENCES: "Short answer (1-2 sentences)",
      OPTIONAL_ARE_THERE_ANY_OTHER_DETAILS_YOU_WANT_TO_SHARE_ABOUT_YOUR_DAY:
        "Optional: Are there any other details you want to share about your day?",
      SUBMIT: "Submit",
      WEEKLY_OVERVIEW: "Weekly overview",
      DID_YOU_HAVE_AN_URGE_TO_QUIT_THERAPY_THIS_WEEK:
        "Did you have an urge to quit therapy this week?",
      DID_THE_SKILLS_HELP: "Did the skills help?",
      DID_YOU_HAVE_AN_URGE_TO_COMMIT_SUICIDE_THIS_WEEK:
        "Did you have an urge to commit suicide this week?",
      DID_YOU_HAVE_THE_URGE_TO_DIE: "Did you have the urge to die?",
      DID_YOU_GO_TO_THE_ER_THIS_WEEK: "Did you go to the ER this week?",
      PSYCH: "Psych",
      MEDICAL: "Medical",
      WERE_YOU_HOSPITALIZED: "Were you hospitalized?",
      HOW_MANY_NORMATIVE_HOURS: "How many normative hours?",
      HOURS: "Hours",
      DBT_DIARY: "DBT Diary",
      ADD: "Add",
      TEN: "Ten",
      TWENTY: "Twenty",
      THIRTY: "Thirty",
      ADD_ITEM: "Add item",
      ADD_A_TARGET_BEHAVIOR: "Add a target behavior",
      MEASURE_OF_ACTION: "Measure of action:",
      TIMES: "Times",
      ADD_A_EMOTION: "Add a emotion",
      EMOTION_NAME: "Emotion name",
      DBT_DIARY_CARD: "DBT Diary Card",
      SAVE: "Save",
      CANCEL: "Cancel",
      ACTED: "Acted",
      URGE: "Urge",
      MINDFULNESS: "Mindfulness",
      WISE_MIND: "Wise Mind",
      OBSERVE_JUST_NOTICE_URGE_SURFING: "Observe: Just notice (Urge Surfing)",
      DESCRIBE_PUT_WORDS_ON: "Describe: Put words on",
      PARTICIPATE_ENTER_INTO_THE_EXPERIENCE:
        "Participate: Enter into the experience",
      NONJUDGMENTAL_STANCE: "Nonjudgmental stance",
      ONE_MINDFULLY_IN_THE_MOMENT: "One-Mindfully: In-the-moment",
      EFFECTIVENESS_FOCUS_ON_WHAT_WORKS: "Effectiveness: Focus on what works",
      LOVING_KINDNESS_BUILD_COMPASSION: "Loving Kindness: Build compassion",
      INTERPERSONAL: "Interpersonal",
      OBJECTIVE_EFFECTIVENESS_DEAR_MAN: "Objective effectiveness: DEAR MAN",
      RELATIONSHIP_EFFECTIVENESS_GIVE: "Relationship effectiveness: GIVE",
      SELF_RESPECT_EFFECTIVENESS_FAST: "Self-respect effectiveness: FAST",
      VALIDATING_OTHERS: "Validating Others",
      SELF_VALIDATION: "Self-Validation",
      BEHAVIOR_CHANGE_REINFORCE_EXTINGUISH:
        "Behavior change: reinforce/extinguish",
      MINDFULNESS_OF_OTHERS: "Mindfulness of others",
      FIND_OTHERS_AND_GET_THEM_TO_LIKE_YOU:
        "Find others and get them to like you",
      END_RELATIONSHIPS: "End relationships",
      EMOTION_REGULATION: "Emotion Regulation",
      CHECK_THE_FACTS_TO_CHANGE_EMOTIONS: "Check the Facts to change emotions",
      OPPOSITE_ACTION_TO_CHANGE_EMOTIONS: "Opposite Action to change emotions",
      PROBLEM_SOLVING_TO_CHANGE_EMOTIONS: "Problem Solving to change emotions",
      ACCUMULATE_POSITIVE_EMOTIONS: "Accumulate positive emotions",
      BUILD_MASTERY: "Build Mastery",
      COPE_AHEAD: "Cope Ahead",
      PLEASE_TAKE_CARE_OF_YOUR_BODY: "PLEASE: Take care of your body",
      DISTRESS_TOLERANCE: "Distress Tolerance",
      STOP_SKILL: "STOP Skill",
      PROS_AND_CONS_OF_ACTING_ON_URGES: "Pros and Cons of acting on urges",
      TIP_CHANGE_BODY_CHEMISTRY: "TIP: Change body chemistry",
      PAIRED_MUSCLE_RELAXATION: "Paired Muscle Relaxation",
      EFFECTIVE_RETHINKING_PAIRED_RELAX: "Effective Rethinking/Paired Relax",
      DISTRACTING_WISE_MIND_ACCEPTS: "Distracting: Wise Mind ACCEPTS",
      SELF_SOOTHING: "Self-Soothing",
      BODY_SCAN_MEDITATION: "Body Scan Meditation",
      IMPROVE_THE_MOMENT: "IMPROVE the Moment",
      SENSORY_AWARENESS: "Sensory Awareness",
      RADICAL_ACCEPTANCE: "Radical Acceptance",
      TURNING_THE_MIND: "Turning the Mind",
      REPLACE_WILLFULNESS_WITH_WILLINGNESS:
        "Replace Willfulness with Willingness",
      HALF_SMILING_AND_WILLING_HANDS: "Half-Smiling and Willing Hands",
      DIALECTICAL_ABSTINENCE: "Dialectical Abstinence",
      ALTERNATE_REBELLION_ADAPTIVE_DENIAL:
        "Alternate Rebellion / Adaptive Denial",
      CUSTOM: "Custom",
      BEHAVIOR_NAME: "Behavior name",
      SURVEY: "Survey",
      DAILY_LOG_OF_EVENTS_AND_RELATED_FEELINGS:
        "Daily log of events and related feelings",
      TRACK_TARGET_BEHAVIORS_AND_USE_OF_SKILLS:
        "Track target behaviors and use of skills",
      START_SURVEY: "Start survey",
      INTERPERSONAL_EFFECRIVENESS: "Interpersonal Effecriveness",
      QUESTION_NUMBER_OF_TOTAL: " {{ number }} of {{ total }}"
    },
  },
  "hi-IN": {
    translation: {
      LIFE_WORTH_LIVING_GOAL: "Life worth living goal",
      CONTINUE: "Continue",
      TARGET_BEHAVIORS: "लक्षित व्यवहार",
      ANSWER_RADIO_RATING_FORMATS: "0= बिल्कुल नहीं, 5 = extremely",
      WHICH_TARGET_BEHAVIORS_DID_YOU_EXPERIENCE_TODAY:
        "Which target behaviors did you experience today?",
      EFFECTIVE: "प्रभावी",
      INEFFECTIVE: "अप्रभावी",
      NEXT: "आगे",
      BACK: "Back",
      EMOTIONS: "भावनाएँ",
      WHICH_EMOTIONS_DID_YOU_EXPERIENCE_TODAY:
        "Which emotions did you experience today?",
      SKILLS: "Skills",
      DID_YOU_USE_ANY_OF_THE_SKILLS_TODAY:
        "Did you use any of the skills today?",
      WHY_DIDNT_YOU_USE_ANY_SKILLS: "Why didn’t you use any skills?",
      MAX_300_CHARACTERS: "300 max characters",
      SELECT_ALL_THAT_APPLY: "Select all that apply",
      WHICH_SKILLS_DID_YOU_USE: "Which skills did you use?",
      YES: "हाँ",
      NO: "नही",
      HOW_MUCH_EFFORT_DID_YOU_PUT_INTO_THE_SKILLS:
        "How much effort did you put into the skills?",
      ADDITIONAL_NOTES: "Additional Notes",
      SHORT_ANSWER_SENETENCES: "Short answer (1-2 sentences)",
      OPTIONAL_ARE_THERE_ANY_OTHER_DETAILS_YOU_WANT_TO_SHARE_ABOUT_YOUR_DAY:
        "Optional: Are there any other details you want to share about your day?",
      SUBMIT: "जमा करें",
      WEEKLY_OVERVIEW: "Weekly overview",
      DID_YOU_HAVE_AN_URGE_TO_QUIT_THERAPY_THIS_WEEK:
        "Did you have an urge to quit therapy this week?",
      DID_THE_SKILLS_HELP: "Did the skills help?",
      DID_YOU_HAVE_AN_URGE_TO_COMMIT_SUICIDE_THIS_WEEK:
        "Did you have an urge to commit suicide this week?",
      DID_YOU_HAVE_THE_URGE_TO_DIE: "Did you have the urge to die?",
      DID_YOU_GO_TO_THE_ER_THIS_WEEK: "Did you go to the ER this week?",
      PSYCH: "Psych",
      MEDICAL: "Medical",
      WERE_YOU_HOSPITALIZED: "Were you hospitalized?",
      HOW_MANY_NORMATIVE_HOURS: "How many normative hours?",
      HOURS: "घंटा",
      DBT_DIARY: "डीबीटी डायरी",
      ADD: "जोड़ना",
      TEN: "Ten",
      TWENTY: "Twenty",
      THIRTY: "Thirty",
      ADD_ITEM: "सामान जोडें",
      ADD_A_TARGET_BEHAVIOR: "लक्षित व्यवहार को जोड़ें",
      MEASURE_OF_ACTION: "क्रियाविधि का मापन:",
      TIMES: "समय",
      ADD_A_EMOTION: "एक भावना जोड़ें",
      EMOTION_NAME: "भावना का नाम",
      DBT_DIARY_CARD: "डीबीटी डायरी कार्ड",
      SAVE: "सुरक्षित करे",
      CANCEL: "रद्द करें",
      ACTED: "Acted",
      URGE: "Urge",
      MINDFULNESS: "Mindfulness",
      WISE_MIND: "Wise Mind",
      OBSERVE_JUST_NOTICE_URGE_SURFING: "Observe: Just notice (Urge Surfing)",
      DESCRIBE_PUT_WORDS_ON: "Describe: Put words on",
      PARTICIPATE_ENTER_INTO_THE_EXPERIENCE:
        "Participate: Enter into the experience",
      NONJUDGMENTAL_STANCE: "Nonjudgmental stance",
      ONE_MINDFULLY_IN_THE_MOMENT: "One-Mindfully: In-the-moment",
      EFFECTIVENESS_FOCUS_ON_WHAT_WORKS: "Effectiveness: Focus on what works",
      LOVING_KINDNESS_BUILD_COMPASSION: "Loving Kindness: Build compassion",
      INTERPERSONAL: "Interpersonal",
      OBJECTIVE_EFFECTIVENESS_DEAR_MAN: "Objective effectiveness: DEAR MAN",
      RELATIONSHIP_EFFECTIVENESS_GIVE: "Relationship effectiveness: GIVE",
      SELF_RESPECT_EFFECTIVENESS_FAST: "Self-respect effectiveness: FAST",
      VALIDATING_OTHERS: "Validating Others",
      SELF_VALIDATION: "Self-Validation",
      BEHAVIOR_CHANGE_REINFORCE_EXTINGUISH:
        "Behavior change: reinforce/extinguish",
      MINDFULNESS_OF_OTHERS: "Mindfulness of others",
      FIND_OTHERS_AND_GET_THEM_TO_LIKE_YOU:
        "Find others and get them to like you",
      END_RELATIONSHIPS: "End relationships",
      EMOTION_REGULATION: "Emotion Regulation",
      CHECK_THE_FACTS_TO_CHANGE_EMOTIONS: "Check the Facts to change emotions",
      OPPOSITE_ACTION_TO_CHANGE_EMOTIONS: "Opposite Action to change emotions",
      PROBLEM_SOLVING_TO_CHANGE_EMOTIONS: "Problem Solving to change emotions",
      ACCUMULATE_POSITIVE_EMOTIONS: "Accumulate positive emotions",
      BUILD_MASTERY: "Build Mastery",
      COPE_AHEAD: "Cope Ahead",
      PLEASE_TAKE_CARE_OF_YOUR_BODY: "PLEASE: Take care of your body",
      DISTRESS_TOLERANCE: "Distress Tolerance",
      STOP_SKILL: "STOP Skill",
      PROS_AND_CONS_OF_ACTING_ON_URGES: "Pros and Cons of acting on urges",
      TIP_CHANGE_BODY_CHEMISTRY: "TIP: Change body chemistry",
      PAIRED_MUSCLE_RELAXATION: "Paired Muscle Relaxation",
      EFFECTIVE_RETHINKING_PAIRED_RELAX: "Effective Rethinking/Paired Relax",
      DISTRACTING_WISE_MIND_ACCEPTS: "Distracting: Wise Mind ACCEPTS",
      SELF_SOOTHING: "Self-Soothing",
      BODY_SCAN_MEDITATION: "Body Scan Meditation",
      IMPROVE_THE_MOMENT: "IMPROVE the Moment",
      SENSORY_AWARENESS: "Sensory Awareness",
      RADICAL_ACCEPTANCE: "Radical Acceptance",
      TURNING_THE_MIND: "Turning the Mind",
      REPLACE_WILLFULNESS_WITH_WILLINGNESS:
        "Replace Willfulness with Willingness",
      HALF_SMILING_AND_WILLING_HANDS: "Half-Smiling and Willing Hands",
      DIALECTICAL_ABSTINENCE: "Dialectical Abstinence",
      ALTERNATE_REBELLION_ADAPTIVE_DENIAL:
        "Alternate Rebellion / Adaptive Denial",
      CUSTOM: "रीती रिवाज",
      BEHAVIOR_NAME: "Behavior name",
      SURVEY: "सर्वे",
      DAILY_LOG_OF_EVENTS_AND_RELATED_FEELINGS:
        "Daily log of events and related feelings",
      TRACK_TARGET_BEHAVIORS_AND_USE_OF_SKILLS:
        "Track target behaviors and use of skills",
      START_SURVEY: "सर्वे शुरू करें",
      INTERPERSONAL_EFFECRIVENESS: "Interpersonal Effecriveness",
      QUESTION_NUMBER_OF_TOTAL: " {{ number }} की {{ total }}"
    },
  },
  "es-ES": {
    translation: {
      LIFE_WORTH_LIVING_GOAL: "Vida digna de Ser Vivida. (Metas)",
      CONTINUE: "continuar",
      TARGET_BEHAVIORS: "Conductas objetivo",
      ANSWER_RADIO_RATING_FORMATS: "0= nada, 5= extremadamente",
      WHICH_TARGET_BEHAVIORS_DID_YOU_EXPERIENCE_TODAY:
        "¿Qué conducta problema experimentaste hoy?",
      EFFECTIVE: "efectivo",
      INEFFECTIVE: "ineficaz",
      NEXT: "siguiente",
      BACK: "espalda",
      EMOTIONS: "emociones",
      WHICH_EMOTIONS_DID_YOU_EXPERIENCE_TODAY:
        "¿Qué emociones experimentaste hoy?",
      SKILLS: "Skills",
      DID_YOU_USE_ANY_OF_THE_SKILLS_TODAY:
        "¿Usaste alguna de las habilidades hoy?",
      WHY_DIDNT_YOU_USE_ANY_SKILLS: "¿Por qué no usaste ninguna habilidad?",
      MAX_300_CHARACTERS: "300 caracteres máximos",
      SELECT_ALL_THAT_APPLY: "seleccione todas las que correspondan",
      WHICH_SKILLS_DID_YOU_USE: "¿Qué habilidades usaste?",
      YES: "Si",
      NO: "No",
      HOW_MUCH_EFFORT_DID_YOU_PUT_INTO_THE_SKILLS:
        "¿Cuánto esfuerzo pusiste en las habilidades?",
      ADDITIONAL_NOTES: "Additional Notes",
      SHORT_ANSWER_SENETENCES: "respuestas cortas  (1-2 frases)",
      OPTIONAL_ARE_THERE_ANY_OTHER_DETAILS_YOU_WANT_TO_SHARE_ABOUT_YOUR_DAY:
        "Opcional- ¿Hay algún otro detalle que quieras compartir sobre tu día?",
      SUBMIT: "Enviar",
      WEEKLY_OVERVIEW: "Weekly overview",
      DID_YOU_HAVE_AN_URGE_TO_QUIT_THERAPY_THIS_WEEK:
        "Did you have an urge to quit therapy this week?",
      DID_THE_SKILLS_HELP: "Did the skills help?",
      DID_YOU_HAVE_AN_URGE_TO_COMMIT_SUICIDE_THIS_WEEK:
        "Did you have an urge to commit suicide this week?",
      DID_YOU_HAVE_THE_URGE_TO_DIE: "Did you have the urge to die?",
      DID_YOU_GO_TO_THE_ER_THIS_WEEK: "Did you go to the ER this week?",
      PSYCH: "Psych",
      MEDICAL: "Medical",
      WERE_YOU_HOSPITALIZED: "Were you hospitalized?",
      HOW_MANY_NORMATIVE_HOURS: "How many normative hours?",
      HOURS: "horas",
      DBT_DIARY: "DBT Diary",
      ADD: "Añadir",
      TEN: "Ten",
      TWENTY: "Twenty",
      THIRTY: "Thirty",
      ADD_ITEM: "añadir artículo",
      ADD_A_TARGET_BEHAVIOR: "Agregar un comportamiento objetivo",
      MEASURE_OF_ACTION: "Medida de acción:",
      TIMES: "Veces",
      ADD_A_EMOTION: "Agrega una emoción",
      EMOTION_NAME: "Nombre de la emoción",
      DBT_DIARY_CARD: "Tarjeta de registro diario",
      SAVE: "Guardar",
      CANCEL: "Cancelor",
      ACTED: "actuó",
      URGE: "Impulso",
      MINDFULNESS: "Habilidades de conciencia plena",
      WISE_MIND: "Mente Sabia",
      OBSERVE_JUST_NOTICE_URGE_SURFING:
        "Observar: Simplemente notar (surfear la urgencia)",
      DESCRIBE_PUT_WORDS_ON: "Describir; Describa con palabras",
      PARTICIPATE_ENTER_INTO_THE_EXPERIENCE:
        "Participar; Entre/Dispóngase a la experiencia",
      NONJUDGMENTAL_STANCE:
        "No Emitir Juicios; No Juzgue (Describa los hechos sin juzgar)",
      ONE_MINDFULLY_IN_THE_MOMENT:
        "En el momenta; Enfóquese en el presente; En este momento",
      EFFECTIVENESS_FOCUS_ON_WHAT_WORKS:
        "Efectividad; Enfóquese en lo que funciona",
      LOVING_KINDNESS_BUILD_COMPASSION: "Loving Kindness: Build compassion",
      INTERPERSONAL: "Interpersonal",
      OBJECTIVE_EFFECTIVENESS_DEAR_MAN:
        "efectividad en los objetivos; Decida obtener sus metas (DEAR) ",
      RELATIONSHIP_EFFECTIVENESS_GIVE: "efectividad en las relaciones (GIVE)",
      SELF_RESPECT_EFFECTIVENESS_FAST: "efectividad u autorespeto (FAST)",
      VALIDATING_OTHERS: "validar a otras personas",
      SELF_VALIDATION: "validarse a sí mismo y autorespeto",
      BEHAVIOR_CHANGE_REINFORCE_EXTINGUISH:
        "cambio la conducta; reforzarse/ extinción",
      MINDFULNESS_OF_OTHERS: "Atención plena de las demás/ los demás",
      FIND_OTHERS_AND_GET_THEM_TO_LIKE_YOU:
        "Encuentra a otros y haz que les gustes",
      END_RELATIONSHIPS: "terminar relaciones",
      EMOTION_REGULATION: "Habilidades de regulación emocional",
      CHECK_THE_FACTS_TO_CHANGE_EMOTIONS: "Verificar los hechos",
      OPPOSITE_ACTION_TO_CHANGE_EMOTIONS: "Acción opuesta a la emoción",
      PROBLEM_SOLVING_TO_CHANGE_EMOTIONS: "Resolución de problemas",
      ACCUMULATE_POSITIVE_EMOTIONS: "Aumento de eventos y emociónes positivos",
      BUILD_MASTERY: "construye dominio",
      COPE_AHEAD: "anticipate con las situaciones emocionales",
      PLEASE_TAKE_CARE_OF_YOUR_BODY:
        "Reducir Vulnerabilidad: Salud física, Comer Saludable, Evitar drogas, Dormir, Ejercici (PLEASE)",
      DISTRESS_TOLERANCE: "Habilidades de aceptación radical",
      STOP_SKILL: "STOP Skill",
      PROS_AND_CONS_OF_ACTING_ON_URGES:
        "Pros y Contras: Mientras tolera el Malestar",
      TIP_CHANGE_BODY_CHEMISTRY: "cambia la fisiología de tu cuerpo",
      PAIRED_MUSCLE_RELAXATION: "Paired Muscle Relaxation",
      EFFECTIVE_RETHINKING_PAIRED_RELAX: "Effective Rethinking/Paired Relax",
      DISTRACTING_WISE_MIND_ACCEPTS:
        "DISTRÁETE de los acontecimientos que activen tus emociones",
      SELF_SOOTHING: "CÁLMATE mediante tus cinco sentidos",
      BODY_SCAN_MEDITATION: "Body Scan Meditation",
      IMPROVE_THE_MOMENT: "MEJORA el momento en el que estás",
      SENSORY_AWARENESS: "Sensory Awareness",
      RADICAL_ACCEPTANCE: "Aceptación Radical",
      TURNING_THE_MIND: "Cambiando la MENTE",
      REPLACE_WILLFULNESS_WITH_WILLINGNESS:
        "Replace Willfulness with Willingness",
      HALF_SMILING_AND_WILLING_HANDS: "Half-Smiling and Willing Hands",
      DIALECTICAL_ABSTINENCE: "Dialectical Abstinence",
      ALTERNATE_REBELLION_ADAPTIVE_DENIAL: "rebellión alternativa",
      CUSTOM: "Personalizado/Personalizada",
      BEHAVIOR_NAME: "Behavior name",
      SURVEY: "Encuesta",
      DAILY_LOG_OF_EVENTS_AND_RELATED_FEELINGS:
        "Registro diario de eventos y sentimientos relacionados",
      TRACK_TARGET_BEHAVIORS_AND_USE_OF_SKILLS:
        "rastrear comportamientos/ conducta problema y uso de habilidades",
      START_SURVEY: "empezar la encuesta",
      INTERPERSONAL_EFFECRIVENESS: "Habilidades de efectividad interpersonal",
      QUESTION_NUMBER_OF_TOTAL: " {{ number }} of {{ total }}"
      },
    },
};
	
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    keySeparator: false,
	nsSeparator: false,
    /*interpolation: {
      escapeValue: false,
    },*/
  });

export default i18n;