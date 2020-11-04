import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SkillExpanded from '../../../components/SkillExpanded'
import HeaderView from '../../../components/HeaderView'

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

const data = [
    { title: 'Mindfulness', data: ['Wise Mind', 'Observe: Just notice (Urge Surfing)', 'Describe: Put words on', 'Participate: Enter into the experience', 'Nonjudgmental stance', 'One-Mindfully: In-the-moment', 'Effectiveness: Focus on what works', 'Loving Kindness: Build compassion'] },
    { title: 'Interpersonal', data: ['Wise Mind', 'Observe: Just notice (Urge Surfing)', 'Describe: Put words on', 'Participate: Enter into the experience', 'Nonjudgmental stance', 'One-Mindfully: In-the-moment', 'Effectiveness: Focus on what works', 'Loving Kindness: Build compassion'] },
    { title: 'Emotion Regulation', data: ['Wise Mind', 'Observe: Just notice (Urge Surfing)', 'Describe: Put words on', 'Participate: Enter into the experience', 'Nonjudgmental stance', 'One-Mindfully: In-the-moment', 'Effectiveness: Focus on what works', 'Loving Kindness: Build compassion'] },
    { title: 'Distress Tolerance', data: ['Wise Mind', 'Observe: Just notice (Urge Surfing)', 'Describe: Put words on', 'Participate: Enter into the experience', 'Nonjudgmental stance', 'One-Mindfully: In-the-moment', 'Effectiveness: Focus on what works', 'Loving Kindness: Build compassion'] },
]

export default function SkillYesView(props) {
    const classes = useStyles()
    const [skill, setSkill] = React.useState({ skillToday: true, skills: [] })

    const onChangeList = (section, i) => {
        var list = skill.skills
        const filter = list.filter((item) => item.id === section.data[i] && item.section === section.title)
        const index = (filter && filter.length > 0) ? list.indexOf(filter[0]) : -1
        if (index > -1) {
            list.splice(index, 1)
        } else {
            list.push({ section: section.title, id: section.data[i] })
        }
        // console.log({list})
        setSkill({ ...skill, skills: list })
    }

    const onUpdateReport = () => {
        const { updateReport, onContinue } = props
        if (updateReport) {
            updateReport('skill', skill)
        }
        if (onContinue) {
            onContinue()
        }
    }

    return (
        <div className={classes.root}>
            <HeaderView
                title='Skills'
                description='Select all that apply'
                currentStep={4}
                totalStep={6}
                question='Which skills did you use?'
            />
            {data.map((item) => {
                return (
                    <SkillExpanded key={item.title} title={item.title} list={item.data} selectedList={skill.skills} onSelect={i => onChangeList(item, i)} />
                )
            })}
            <div className={classes.buttonsContainer}>
                <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                    <Typography className={classes.buttonText}>Next</Typography>

                </Button>
                <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                    <Typography className={classes.backText}>Back</Typography>
                </Button>
            </div>
        </div>
    )
}
