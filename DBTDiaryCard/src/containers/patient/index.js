import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { connect } from 'react-redux'
import TargetView from './1_target'
import EmotionView from './2_fellings'
import SkillsView from './3_skills'
import SkillNoView from './3_skills/skill_no'
import SkillYesView from './3_skills/skill_yes'
import EffortView from './5_effort'
import NoteView from './7_notes'
import SkillHelpView from './6_skillhelp'
import { useTranslation } from "react-i18next"
import ConfirmationDialog from '../../components/ConfirmationDialog'
import actions from '../home/action'

const { updateReport, createReport } = actions

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)', marginLeft: 20
    },
    headerContainer: {
        backgroundColor: 'white', width: '100%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    headerIcon: {
        marginLeft: 20
    },
    headerTitle: {
        fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', flex: 1, fontWeight: '600', textAlign: 'center', marginRight: 54
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    contentBox: {
        height: 538,
        top: 70, background: '#E7F8F2', alignItems: 'center', justifyContent: 'center',
        display: 'flex', width: '100%'
    },
    content: {
        fontWeight: 'bold',
        fontSize: 40, textAlign: 'center', color: '#38C396', marginLeft: 45, marginRight: 45,
        [theme.breakpoints.down("sm")]: {
          fontSize: 25,
        },
    },
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA', marginTop: 55
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'rgba(0, 0, 0, 0.75)'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
}))

function HomeView(props) {
    const classes = useStyles()
    const [active, setActive] = useState(-1)
    const [settings, setSettings] = useState(null)
    const [time, setTime] = useState(null)
    const { t, i18n } = useTranslation();
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        const initalSettings = () => {
            const configuration = props?.data?.configuration;
            if(typeof localStorage.getItem("activity-dbtdiarycard-"+ props?.data?.activity?.id) !== 'undefined' &&
            localStorage.getItem("activity-dbtdiarycard-"+ props?.data?.activity?.id) != null ) {
                setConfirm(true)
            } else {
                const settings = props?.data?.activity?.settings;
                setSettings(settings);
            }
           i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
            setTime(new Date().getTime());
        }
        initalSettings()        
    }, [props, i18n])

    useEffect(() => {
      if(!!settings){ 
         setActive(0)
      }
    }, [settings])

    useEffect(() => {
        if (active === 8) {
            let finalReport = createReport(props.report, props?.data?.activity?.id)
            finalReport.duration = new Date().getTime() - time           
            window.parent.postMessage(JSON.stringify(finalReport), "*");            
        }
    }, [active, time, props.report, props?.data])

    const loadData = (statusVal) => {
        if(!!statusVal) {
            createReport(typeof localStorage.getItem("activity-dbtdiarycard-"+ props?.data?.activity?.id) !== 'undefined' &&
            localStorage.getItem("activity-dbtdiarycard-"+ props?.data?.activity?.id) != null ? 
            JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props?.data?.activity?.id)): {}, props?.data?.activity?.id)         
        } else {
          createReport({}, props.data?.activity?.id )
          localStorage.setItem('activity-dbtdiarycard-'+(props.data?.activity?.id ?? ""), '{}')
        }
        const settings = props?.data?.activity?.settings;
            setSettings(settings);
        setConfirm(false)
      }
      
    if(active === -1) {
        return  (<ConfirmationDialog            
        onClose={() => setConfirm(false)}
        open={confirm}
        confirmAction={loadData} 
        confirmationMsg={t("Would you like to resume this activity where you left off?")}/>)
    
    }
    if (active === 0) {
        return ( 
             <div className={classes.root}>
                <div className={classes.headerContainer}>
                    {!props.data?.noBack && <IconButton onClick={() => window.parent.postMessage(JSON.stringify({completed: true}), "*") }>
                            <ArrowBack />
                    </IconButton>}
                    <Typography className={classes.headerTitle}>{t("LIFE_WORTH_LIVING_GOAL")}</Typography>
                </div>
                <div className={classes.contentBox}>
                    <Typography className={classes.content}>{settings?.livingGoal ?? ""}</Typography>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button onClick={() => setActive(1)} className={classes.buttonContainer}>
                        <Typography className={classes.buttonText}>{t("CONTINUE")}</Typography>
                    </Button>
                </div>
            </div>
        )
    } else if (active === 1) {
        return (<TargetView activityId={props?.data?.activity?.id ?? null}settings={settings} {...props} onContinue={() => setActive(2)} onBack={() => setActive(0)} />)
    } else if (active === 2) {
        return (<EmotionView activityId={props?.data?.activity?.id ?? null} settings={settings} {...props} onContinue={() => setActive(3)} onBack={() => setActive(1)} />)
    } else if (active === 3) {
        return (<SkillsView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={(mode) => setActive(mode)} onBack={() => setActive(2)} />)
    } else if (active === 4) {
        return (<SkillYesView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(5)} onBack={() => setActive(3)} />)
    } else if (active === 41) {
        return (<SkillYesView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(5)} onBack={() => setActive(3)} />)
    } else if (active === 42) {
        return (<SkillNoView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(7)} onBack={() => setActive(3)} />)
    } else if (active === 5) {
        return (<EffortView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(6)} onBack={() => setActive(41)} />)
    } else if (active === 6) {
        return (<SkillHelpView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(7)} onBack={() => setActive(5)} />)
    } else if(active === 7) {
        return (<NoteView {...props} activityId={props?.data?.activity?.id ?? null} onContinue={() => setActive(8)} onBack={() => setActive(!props.report || (props.report && props.report.skillToday) ? 6 : 42)} />)
    } else {
        return null
    }
}

export default connect((state) => ({
    report: state.appReducer.report,
    config: state.appReducer.config
}), {
    updateReport
})(HomeView)