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
    },
    createReport: (report, activityId) => {
        let temporal_slices = []
        localStorage.setItem("activity-dbtdiarycard-"+ activityId, JSON.stringify(report)) 

        if (report && report.target && report.target.effective) {
            const keys = Object.keys(report.target.effective)
            for (var i = 0; i < keys.length; i++) {
                const value = report.target.effective[keys[i]]
                temporal_slices.push({
                    item: value.target, // <-- report.target.{effective,ineffective}.*.target
                    value: value.urge, // <-- (INTEGER, 0-5 rating) report.target.{effective,ineffective}.*.urge
                    type: value.act, // <-- (INTEGER, ___ units) report.target.{effective,ineffective}.*.act
                    level: "target_effective", // <-- section key: oneof ["target_effective", "target_ineffective", "emotion", "skill"]
                    duration: 0 // <-- static, always zero
                })
            }
        }
        if (report && report.target && report.target.ineffective) {
            const keys = Object.keys(report.target.ineffective)
            for (i = 0; i < keys.length; i++) {
                const value = report.target.ineffective[keys[i]]
                temporal_slices.push({
                    item: value.target, // <-- report.target.{effective,ineffective}.*.target
                    value: value.urge, // <-- (INTEGER, 0-5 rating) report.target.{effective,ineffective}.*.urge
                    type: value.act, // <-- (INTEGER, ___ units) report.target.{effective,ineffective}.*.act
                    level: "target_ineffective", // <-- section key: oneof ["target_effective", "target_ineffective", "emotion", "skill"]
                    duration: 0 // <-- static, always zero
                })
            }
        }

        if (report && report.emotion && report.emotion.felling) {
            const keys = Object.keys(report.emotion.felling)
            for (i = 0; i < keys.length; i++) {
                const value = report.emotion.felling[keys[i]]
                temporal_slices.push({
                    item: value.emotion, // <-- report.emotion.felling.*.emotion
                    value: value.rate, // <-- report.emotion.felling.*.rate
                    type: null, // <-- only null for "emotion"/"skill" items
                    level: "emotion", // <-- section key: oneof ["target_effective", "target_ineffective", "emotion", "skill"]
                    duration: 0 // <-- static, always zero
                })
            }
        }

        if (report && report.skill && report.skill.skills) {
            const keys = Object.keys(report.skill.skills)
            for (i = 0; i < keys.length; i++) {
                const value = report.skill.skills[keys[i]]
                temporal_slices.push({
                    item: value.id, // <-- report.skill.skills.*.id
                    value: value.section, // <-- report.skill.skills.*.section
                    type: null, // <-- only null for "emotion"/"skill" items
                    level: "skill", // <-- section key: oneof ["target_effective", "target_ineffective", "emotion", "skill"]
                    duration: 0 // <-- static, always zero
                })
            }
        }
        let finalReport = {
            timestamp: new Date().getTime(), // <-- static, always 0
            activity: "", // <-- static, always ""
            duration: 0, // <-- static, always 0
            static_data: {
                effort: report ? report.effort : 0, // <-- report.effort
                notes: report ? report.notes : '', // <-- report.notes
                skillToday: report ? report.skillToday : 0, // <-- report.skillToday
                skillHelped: report ? report.skillHelped : 0,
                reason: report ? report.reason : '',
                urgeToQuitTheray: report? report.quitTheray : "",
                urgeForSuicide: report? report.urgeSuicide: ""
            },
            temporal_slices: temporal_slices
        }
        return finalReport
    }
}

export default actions