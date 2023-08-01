import React, {useEffect, useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import RateCountAnswer from '../../../components/RateCountAnswer'
import HeaderView from '../../../components/HeaderView'
import { useTranslation } from "react-i18next"
import { useSnackbar } from "notistack"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, alignItems: 'center', justifyContent: 'center'
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
  },
  containerWidth: { maxWidth: 1055 },
}))


export default function TargetView({ settings, ...props }) {
  const classes = useStyles()
  const [targets, setTargets] = React.useState(props.report && props.report.target ? props.report.target : { effective: {}, ineffective: {} })
  const { t, i18n  } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [ineffectiveItems, setIneffectiveItems] = useState([])
  const [initialised, setInitialised] = useState(false)
  
  useEffect(() => {
    if(!!props.activityId) { 
     
    setTargets(typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null
    && JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['target']? 
    JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['target']  : { effective: {}, ineffective: {} })
    }
  }, [props.activityId])
  
  useEffect(() => {
    function initialise() {
      const staticItems = [
        {target: i18n.t("DIE"), measure:i18n.t("times")},
        // {target: i18n.t("Suicide"),measure: i18n.t("Times") },
        // {target: i18n.t("Use/ Drink"),measure: i18n.t("Times") },
        {target: i18n.t("SELF_HARM"),measure: i18n.t("Times") },
        {target: i18n.t("QUIT_THERAPY"),measure: i18n.t("Times") },
        {target: i18n.t("DIE_BY_SUICIDE"),measure: i18n.t("Times") }
      ]
      const ineffectiveItems = (settings?.targetIneffective || []).concat(staticItems) ?? staticItems
      setIneffectiveItems(ineffectiveItems)
      setInitialised(true)
    }
    initialise()
  }, [i18n, settings])

  const updateUrge = (type, target, key, value) => {
    if (type === 'effective') {
      let newEffective = targets.effective
      newEffective[key] = {
        act: newEffective[key]?.act ?? '',
        urge: value,
        target
      }
      setTargets({ ...targets, effective: newEffective })
    } else {
      let newIneffective = targets.ineffective
      newIneffective[key] = {
          act:  newIneffective[key]?.act ?? '',
          urge: value,
          target
        }
      setTargets({ ...targets, ineffective: newIneffective })
    }
  }

  const updateAct = (type, target, key, value) => {
    if (type === 'effective') {
      let newEffective = targets.effective
      let object = newEffective[key]
      if (!object) {
        object = {
          act: null,
          urge: 0,
          target
        }
      }
      object.act = value
      newEffective[key] = object
      setTargets({ ...targets, effective: newEffective })
    } else {
      let newIneffective = targets.ineffective
      let object = newIneffective[key]
      if (!object) {
        object = {
          act: null,
          urge: 0,
          target
        }
      }
      object.act = value
      newIneffective[key] = object
      setTargets({ ...targets, ineffective: newIneffective })
    }
  }

  useEffect(() => {
    if(!!props.activityId) {
      const data = typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined'
      &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) != null ?
      JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId)): {}
      data["target"] = targets
      localStorage.setItem("activity-dbtdiarycard-"+ props.activityId, JSON.stringify(data)) 
    }
  }, [targets, props.activityId])

  const onUpdateReport = () => {
    const { updateReport, onContinue } = props
    if (updateReport) {
      updateReport('target', targets)
    }
    let status = true
    for (const i in targets.effective) {
      if(targets.effective[i]["act"].trim().length === 0) {
        status = false
        break
      }
    }
    for (const i in targets.ineffective) {
      if(targets.ineffective[i]["act"].trim().length === 0) {
        status = false
        break
      }
    }
    if (onContinue && !!status && (
      (ineffectiveItems ?? []).length === 0 || ( 
        (ineffectiveItems ?? []).length > 0 && Object.keys(targets.ineffective).length === (ineffectiveItems ?? []).length)) &&
      (
        (settings?.targetEffective ?? []).length === 0 || ( 
          (settings?.targetEffective ?? []).length > 0 && Object.keys(targets.effective).length === (settings?.targetEffective ?? []).length))) {
      onContinue()
    } else {
      enqueueSnackbar(t("Rating and acted values are required for each item."), {
        variant: "error",
      })
    }
  }

  return (
    <div className={classes.root}>

      <HeaderView
        title={t("TARGET_BEHAVIORS")}
        description={t("ANSWER_RADIO_RATING_FORMATS")}
        currentStep={1}
        totalStep={!props.report || (props.report && props.report.skillToday) ? 9 : 7}
        question={t("WHICH_TARGET_BEHAVIORS_DID_YOU_EXPERIENCE_TODAY")}
      />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12}>
          <div className={classes.headerContainer}>
            <Typography className={classes.headerTitle}>{t("EFFECTIVE")}</Typography>
          </div>
          {(settings?.targetEffective ?? []).map((item, index) => {
            const actValue = (targets.effective && targets.effective["effective" + index] && targets.effective["effective" + index].act) ?
              (targets.effective["effective" + index].act.trim().length === 0 ? 0 : targets.effective["effective" + index].act) : ''
            const urgeValue = !!targets.effective && targets.effective["effective" + index]?.urge >= 0 ? targets.effective["effective" + index].urge : -1

            return (
              <RateCountAnswer
                title={item.target}
                key={"effective" + index}
                unit={item.measure}
                customunit={item.customUnit}
                separator={index < ((settings?.targetEffective ?? []).length - 1)}
                actedValue={actValue}
                urgeValue={urgeValue}
                selectedActed={(value) => {
                  updateAct('effective', item.target, "effective" + index, value)
                }}
                selectedUrge={(value) => updateUrge('effective', item.target, "effective" + index, value)}
              />
            )
          })}
          <div className={classes.headerContainer}>
            <Typography className={classes.headerTitle}>{t("INEFFECTIVE")}</Typography>
          </div>
          {!!initialised && (ineffectiveItems ?? []).map((item, index) => {
            const actValue = (targets.ineffective && targets.ineffective["ineffective" + index] && targets.ineffective["ineffective" + index].act) ?
              (targets.ineffective["ineffective" + index].act.trim().length === 0 ? 0 : targets.ineffective["ineffective" + index].act) : ''
            const urgeValue = !!targets.ineffective && targets.ineffective["ineffective" + index]?.urge >= 0 ? targets.ineffective["ineffective" + index].urge : -1

            return (

              <RateCountAnswer
                title={item.target}
                key={"ineffective" + index}
                unit={item.measure}
                customunit={item.customUnit}
                separator={index < ((ineffectiveItems ?? []).length - 1)}
                actedValue={actValue}
                urgeValue={urgeValue}
                selectedActed={(value) => updateAct('ineffective', item.target, "ineffective" + index, value)}
                selectedUrge={(value) => updateUrge('ineffective', item.target, "ineffective" + index, value)}
              />
            )
          })}
          <div className={classes.buttonsContainer}>
            <Button onClick={onUpdateReport} className={classes.buttonContainer}>
              <Typography className={classes.buttonText}>
                {t("NEXT")}
              </Typography>
            </Button>
            <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
              <Typography className={classes.backText}>
                {t("BACK")}
              </Typography>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}