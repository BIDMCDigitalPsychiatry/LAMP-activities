import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import RatioButton from '../../../components/RatioButton'
import HeaderView from '../../../components/HeaderView'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: '100%'
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        fontWeight: 'bold',
        fontSize: 40, textAlign: 'center', color: '#38C396'
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
        color: '#2F9D7E', fontSize: 14, fontWeight: 500, textAlign: 'center'
    },
    contentContainer: {
        marginTop: 20, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'
    },
    ratioContainer: {
        marginLeft: 20
    }
}))

export default function SkillsView(props) {
    const classes = useStyles();
    const [skillToday, setSkillToday] = React.useState(1)

    const onUpdateReport = () => {
        const { updateReport, onContinue } = props
        if (updateReport) {
            updateReport('skill', { skillToday: skillToday })
        }

        if(onContinue){
            onContinue(skillToday === 1 ? 41 : 42)
          }
    }

    return (
        <div className={classes.root}>
            <HeaderView
                title='Skills'
                currentStep={3}
                totalStep={6}
                question='Did you use any of the skills today?'
            />
            <div className={classes.contentContainer}>
                <div>
                    <RatioButton checked={skillToday === 1} onChange={() => setSkillToday(1)} title='Yes' />
                </div>
                <div className={classes.ratioContainer}>
                    <RatioButton checked={skillToday === 0} onChange={() => setSkillToday(0)} title='No' />
                </div>
            </div>
            <div className={classes.buttonsContainer}>
                <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                    <Typography className={classes.buttonText}>
                        Next
                            </Typography>

                </Button>
                <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                    <Typography className={classes.backText}>Back</Typography>
                </Button>
            </div>
        </div>
    )
}