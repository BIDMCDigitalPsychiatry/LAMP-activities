import actions from './action'

const initState = {
  config: {
    livingGoal: '',
    targetEffective: [],
    targetIneffective: [],
    emotions: [],
  },
  report: {
    target: null,
    emotion: null,
    skill: null,
    notes: null,
    overview: null,
    effort: null
  }
}

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.UPDATE_LIVING_GOAL:
      return { ...state, config: { ...state.config, livingGoal: action.goal } }
    case actions.UPDATE_TARGET_EFFECTIVE:
      return { ...state, config: { ...state.config, targetEffective: action.effective } }
    case actions.UPDATE_TARGET_INEFFECTIVE:
      return { ...state, config: { ...state.config, targetIneffective: action.ineffective } }
    case actions.UPDATE_EMOTIONS:
      return { ...state, config: { ...state.config, emotions: action.emotions } }
    case actions.UPDATE_REPORT:
      let report = state.report
      report[action.key] = action.value
      return { ...state, report: report }
    default:
      return state;
  }
}