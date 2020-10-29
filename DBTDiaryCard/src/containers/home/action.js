const actions = {
    UPDATE_LIVING_GOAL: 'UPDATE_LIVING_GOAL',
    UPDATE_TARGET_EFFECTIVE: 'UPDATE_TARGET_EFFECTIVE',
    UPDATE_TARGET_INEFFECTIVE: 'UPDATE_TARGET_INEFFECTIVE',
    UPDATE_EMOTIONS: 'UPDATE_EMOTIONS',
    UPDATE_REPORT: 'UPDATE_REPORT',
    updateReport: (key, value) => {
        return {
            type: actions.UPDATE_REPORT,
            key, value
        }
    },
    updateLivingGoal: (goal) => {
        return {
            type: actions.UPDATE_LIVING_GOAL,
            goal
        }
    },
    updateTargetEffective: (effective) => {
        return {
            type: actions.UPDATE_TARGET_EFFECTIVE,
            effective
        }
    },
    updateTargetIneffective: (ineffective) => {
        return {
            type: actions.UPDATE_TARGET_INEFFECTIVE,
            ineffective
        }
    },
    updateEmotions: (emotions) => {
        return {
            type: actions.UPDATE_EMOTIONS,
            emotions
        }
    }
}

export default actions