import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import ExperienceAnswer from '../../../components/ExperienceAnswer'
import HeaderView from '../../../components/HeaderView'
import { useTranslation } from "react-i18next"
import { useSnackbar } from "notistack"

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
  contentContainer: {
    marginTop: 20
  },
  headerContainer: {
    backgroundColor: '#E7F8F2', width: '100%', height: 40, display: 'flex', alignItems: 'center'
  },
  headerTitle: {
    color: '#2F9D7E', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginLeft: 20, marginRight: 20
  }
}))


export default function FellingView({ settings, ...props }) {
  const classes = useStyles()
  const [result, setResult] = React.useState(props.report && !!props.report.emotion ? props.report.emotion : { felling: {} })
  const { t , i18n } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [emotionItems, setEmotionItems] = useState([])
  const [initialised, setInitialised] = useState(false)

  useEffect(() => {
    function initialise() {
      const emotionItems = settings?.emotions ?? []
      const extraItems = [t("SADNESS"), t("SHAME"), t("ANGER"), t("FEAR_WORRY"), t("JOY")]
      emotionItems.find((i) => extraItems[0])
      extraItems.forEach((item) => {
        if(emotionItems.indexOf(item) === -1) {
        emotionItems.push({emotion: i18n.t(item)})  
        }     
      })
      setEmotionItems(emotionItems)
      setInitialised(true)
    }
    initialise()    
  }, [t, i18n, settings])

  const updateRate = (key, emotion, rate) => {
    let currentFelling = result.felling
    if (currentFelling[key] && currentFelling[key].rate === rate) {
      delete currentFelling[key]
    } else {
      currentFelling[key] = { emotion, rate }
    }

    setResult({ ...result, felling: currentFelling })
  }

  useEffect(() => {
    if(!!props.activityId) { 
    setResult(typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null
    && JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['emotion']? 
    JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['emotion']  : { felling: {} })
    }
  }, [props.activityId, settings,i18n])

  useEffect(() => {
    if(!!props.activityId) {
      const data = typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined'  
      &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null?
      JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId)): {}
      data["emotion"] = result
      localStorage.setItem("activity-dbtdiarycard-"+ props.activityId, JSON.stringify(data)) 
    }
  }, [result, props.activityId])

  const onUpdateReport = () => {
    const { updateReport, onContinue } = props
    if (updateReport) {
      updateReport('emotion', result)
    }
    if (onContinue && ((emotionItems ?? []).length === 0 || ((emotionItems ?? []).length > 0 && Object.keys(result.felling).length === (emotionItems ?? []).length))) {
      onContinue()
    } else {
      enqueueSnackbar(t("Rating required for each item."), {
        variant: "error",
      })
    }
  }

  return (
    <div className={classes.root}>
      <HeaderView
        title={t("EMOTIONS")}
        description={t("ANSWER_RADIO_RATING_FORMATS")}
        currentStep={2}
        totalStep={!props.report || (props.report && props.report.skillToday) ? 9 : 7}
        question={t("WHICH_EMOTIONS_DID_YOU_EXPERIENCE_TODAY")}
      />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12}>
          {!!initialised && (emotionItems ?? []).map((item, index) => {
            const rate = result && !!result.felling && result.felling["emotion" + index]?.rate >= 0 ? result.felling["emotion" + index].rate : -1
            return (
              <ExperienceAnswer
                title={item.emotion}
                key={"emotion" + index}
                setRate={(rate) => updateRate("emotion" + index, item.emotion, rate)}
                rate={rate}
              />
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
