import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EffortAnswer from '../../../components/EffortAnswer'
import HeaderView from '../../../components/HeaderView'
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, alignItems: 'center', justifyContent: 'center'
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
    display: 'flex', padding: 40
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
    display: 'flex', justifyContent: 'center'
  },
  headerContainer: {
    backgroundColor: '#E7F8F2', width: '100%', padding: 16
  },
  headerTitle: {
    color: '#2F9D7E', fontSize: 12, fontWeight: '600', textTransform: 'uppercase'
  }
}))

export default function SkillEffortView(props) {
  const classes = useStyles()
  const [effortLevel, setEffortLevel] = React.useState(props.report && props.report.effort >= 0 ? props.report.effort : -1)
  const { t } = useTranslation()

  const onUpdateReport = () => {
    const { updateReport, onContinue } = props
    if (updateReport) {
      updateReport('effort', effortLevel)
    }
    if (onContinue && effortLevel >= 0) {
      onContinue()
    }
  }

  useEffect(() => {
    if(!!props.activityId) { 
    setEffortLevel(typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null
    && JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['effort']? 
    JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['effort']  : -1)
    }
  }, [props.activityId])

  useEffect(() => {
    if(!!props.activityId) { 
      const data = typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' 
      &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null?
      JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId)) : {}
      data["effort"] = effortLevel
      localStorage.setItem("activity-dbtdiarycard-"+ props.activityId, JSON.stringify(data)) 
    }
  }, [effortLevel, props.activityId])

  return (
    <div className={classes.root}>
      <HeaderView
        title={t("SKILLS")}
        description={t("ANSWER_RADIO_RATING_FORMATS")}
        currentStep={5}
        totalStep={9}
        question={t("HOW_MUCH_EFFORT_DID_YOU_PUT_INTO_THE_SKILLS")}
      />
      <div className={classes.contentContainer}>
        <EffortAnswer selectedLevel={effortLevel} onChange={(level) => setEffortLevel(level)} />
      </div>
      <div className={classes.buttonsContainer}>
        <Button onClick={onUpdateReport} className={classes.buttonContainer}>
          <Typography className={classes.buttonText}>{t("NEXT")}</Typography>

        </Button>
        <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
          <Typography className={classes.backText}>{t("BACK")}</Typography>

        </Button>
      </div>
    </div>
  )
}
