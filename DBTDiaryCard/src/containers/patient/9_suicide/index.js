import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import RateAnswer from '../../../components/RateAnswer'
import HeaderView from '../../../components/HeaderView'
import actions from '../../home/action'
import { connect } from 'react-redux'
import { useTranslation } from "react-i18next"
// import { useSnackbar } from "notistack"

const { updateReport } = actions

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
  },
  rateContainer: {
    display: 'flex', justifyContent: 'center', flex: 1
  }
}))


export default function UrgeSuicide({ ...props }) {
  const classes = useStyles()
  const [result, setResult] = React.useState(props.report && !!props.report.urgeSuicide ? props.report.urgeSuicide : null)
  const { t } = useTranslation()
  // const { enqueueSnackbar } = useSnackbar()
  const intensities = [...Array(6).keys()];


  const onUpdateReport = () => {
    const { updateReport, onContinue } = props
    if (updateReport) {
      updateReport('urgeSuicide', result)
    }
    if (onContinue && result !== -1) {
      onContinue()
    } else {
      // enqueueSnackbar(t("Rating required for each item."), {
      //   variant: "error",
      // })
    }
  }

  return (
    <div className={classes.root}>
      <HeaderView
        title={t("EMOTIONS")}
        description={t("ANSWER_RADIO_RATING_FORMATS")}
        currentStep={!props.report || (props.report && props.report.skillToday) ? 8: 6}
        totalStep={!props.report || (props.report && props.report.skillToday) ? 9 :7}
        question={t("Urge to die by suicide")}
      />
      <Grid container direction="row" justify="center" alignItems="flex-start">
      <div className={classes.rateContainer}>
             {
               intensities.map((i => (
                <RateAnswer
                  checked={result === i}
                  onChange={(rate) => setResult(rate)}
                  value={i}
              />
               )))
                
             }
           </div>
          <div className={classes.buttonsContainer}>
            <Button onClick={onUpdateReport} className={classes.buttonContainer}>
              <Typography className={classes.buttonText}>{t("NEXT")}</Typography>
            </Button>
            <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
              <Typography className={classes.backText}>{t("BACK")}</Typography>
            </Button>
          </div>
        
      </Grid>
    </div>
  )
}
