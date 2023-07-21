import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SkillExpanded from '../../../components/SkillExpanded'
import HeaderView from '../../../components/HeaderView'
import { Grid } from '@material-ui/core'
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    progressContainer: {
        height: 5, display: 'flex', width: '100%', padding: 0, flexDirection: 'row'
    },
    progressContent: {
        left: 0, width: '50%', top: 0, bottom: 0, backgroundColor: '#2F9D7E'
    },
    remainProgressContent: {
        flex: 1, backgroundColor: '#92E7CA'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA'
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'rgba(0, 0, 0, 0.75)'
    },
    backContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: 'transparent', marginTop: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
    },
    backText: {
        fontWeight: 'bold', fontSize: 16, color: '#2F9D7E'
    },
    progressText: {
        color: '#2F9D7E', fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 20
    },
    questionContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 40, paddingRight: 40
    },
    questionTitle: {
        fontWeight: 'bold', fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', marginTop: 33, width: '100%', height: 33
    },
    descriptionTitle: {
        fontSize: 12, fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)', marginTop: 20, marginBottom: 30, width: '100%', height: 26
    },
    headerContainer: {
        backgroundColor: '#E7F8F2', width: '100%', paddingLeft: 20, paddingRight: 20, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', flex: 1, fontWeight: '600', textAlign: 'center', marginRight: 34
    },
    contentBox: {
        height: 538,
        top: 70, background: '#E7F8F2', alignItems: 'center', justifyContent: 'center',
        display: 'flex', padding: 40
    },
    content: {
        fontWeight: 'bold',
        fontSize: 40, textAlign: 'center', color: '#38C396'
    }
}))

export default function SkillYesView(props) {
    const classes = useStyles()
    const [skill, setSkill] = React.useState(props.report && !!props.report.skill ? props.report.skill : { skillToday: true, skills: [] })
    const { t } = useTranslation()
    const data = [
        { title: t("MINDFULNESS"), data: [t("WISE_MIND"), t("OBSERVE_JUST_NOTICE_URGE_SURFING"), t("DESCRIBE_PUT_WORDS_ON"), t("PARTICIPATE_ENTER_INTO_THE_EXPERIENCE"), t("NONJUDGMENTAL_STANCE"), t("ONE_MINDFULLY_IN_THE_MOMENT"), t("EFFECTIVENESS_FOCUS_ON_WHAT_WORKS"), t("LOVING_KINDNESS_BUILD_COMPASSION")] },
        { title: t("INTERPERSONAL"), data: [t("OBJECTIVE_EFFECTIVENESS_DEAR_MAN"), t("RELATIONSHIP_EFFECTIVENESS_GIVE"), t("SELF_RESPECT_EFFECTIVENESS_FAST"), t("VALIDATING_OTHERS"), t("SELF_VALIDATION"), t("BEHAVIOR_CHANGE_REINFORCE_EXTINGUISH"), t("MINDFULNESS_OF_OTHERS"), t("FIND_OTHERS_AND_GET_THEM_TO_LIKE_YOU"), t("END_RELATIONSHIPS")] },
        { title: t("EMOTION_REGULATION"), data: [t("CHECK_THE_FACTS_TO_CHANGE_EMOTIONS"), t("OPPOSITE_ACTION_TO_CHANGE_EMOTIONS"), t("PROBLEM_SOLVING_TO_CHANGE_EMOTIONS"), t("ACCUMULATE_POSITIVE_EMOTIONS"), t("BUILD_MASTERY"), t("COPE_AHEAD"), t("PLEASE_TAKE_CARE_OF_YOUR_BODY")] },
        { title: t("DISTRESS_TOLERANCE"), data: [t("STOP_SKILL"), t("PROS_AND_CONS_OF_ACTING_ON_URGES"), t("TIP_CHANGE_BODY_CHEMISTRY"), t("PAIRED_MUSCLE_RELAXATION"), t("EFFECTIVE_RETHINKING_PAIRED_RELAX"), t("DISTRACTING_WISE_MIND_ACCEPTS"), t("SELF_SOOTHING"), t("BODY_SCAN_MEDITATION"), t("IMPROVE_THE_MOMENT"), t("SENSORY_AWARENESS"), t("RADICAL_ACCEPTANCE"), t("TURNING_THE_MIND"), t("REPLACE_WILLFULNESS_WITH_WILLINGNESS"), t("HALF_SMILING_AND_WILLING_HANDS"), t("DIALECTICAL_ABSTINENCE"), t("ALTERNATE_REBELLION_ADAPTIVE_DENIAL")] },
    ]

    const onChangeList = (section, i) => {
        var list = skill.skills ?? []
        const filter = list.filter((item) => item.id === section.data[i] && item.section === section.title)
        const index = (filter && filter.length > 0) ? list.indexOf(filter[0]) : -1
        if (index > -1) {
            list.splice(index, 1)
        } else {
            list.push({ section: section.title, id: section.data[i] })
        }
        setSkill({ ...skill, skills: list })
    }

    useEffect(() => {
        if(!!props.activityId) { 
        setSkill(typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null
        && JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['skill']? 
        JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['skill']  : { skillToday: true, skills: [] })
        }
      }, [props.activityId])

    useEffect(() => {
        if(!!props.activityId) { 
            const data = typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' 
            &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null?
            JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId)) : {}
            data["skill"] = skill
            localStorage.setItem("activity-dbtdiarycard-"+ props.activityId, JSON.stringify(data)) 
        }
      }, [skill, props.activityId])

    const onUpdateReport = () => {
        const { updateReport, onContinue } = props
        if (updateReport) {
            updateReport('skill', skill)
        }
        if (onContinue && skill.skills.length > 0) {
            onContinue()
        }
    }

    return (
        <div className={classes.root}>
            <HeaderView
                title={t("SKILLS")}
                description={t("SELECT_ALL_THAT_APPLY")}
                currentStep={4}
                totalStep={9}
                question={t("WHICH_SKILLS_DID_YOU_USE")}
            />
            <Grid container direction="row" justify="center" alignItems="flex-start">
                <Grid item lg={4} sm={10} xs={12}>
                    {data.map((item) => {
                        return (
                            <SkillExpanded key={item.title} title={item.title} list={item.data} selectedList={skill.skills ?? []} onSelect={i => onChangeList(item, i)} />
                        )
                    })}
                    <div className={classes.buttonsContainer}>
                        <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                            <Typography className={classes.buttonText}>{t("NEXT")}</Typography>

                        </Button>
                        <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                            <Typography className={classes.backText}>{t("BACK")}</Typography>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
