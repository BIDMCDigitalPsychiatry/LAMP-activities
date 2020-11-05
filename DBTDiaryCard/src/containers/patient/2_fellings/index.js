import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import ExperienceAnswer from '../../../components/ExperienceAnswer'
import HeaderView from '../../../components/HeaderView'
import actions from '../../home/action'
import { connect } from 'react-redux'

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
  }
}))


export default function FellingView({settings, ...props}) {
  const classes = useStyles()
  const [result, setResult] = React.useState({ felling: {} })
  const [emotions, setEmotions] = React.useState(settings?.emotions ?? [])

  const updateRate = (key, emotion, rate) => {
    let currentFelling = result.felling
    if (currentFelling[key] && currentFelling[key].rate === rate) {
      delete currentFelling[key]
    } else {
      currentFelling[key] = { emotion, rate }
    }

    setResult({ ...result, felling: currentFelling })
  }

  const onUpdateReport = () => {
    const { updateReport, onContinue } = props
    // console.log(result)
    if (updateReport) {
      updateReport('emotion', result)
    }
    if (onContinue) {
      onContinue()
    }
  }

  return (
    <div className={classes.root}>
      <HeaderView
        title='Emotions'
        description='0= not at all, 5 = extremely'
        currentStep={2}
        totalStep={6}
        question='Which emotions did you experience today?'
      />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12}>
      {emotions.map((item, index) => {
        const rate = result && result.felling && result.felling["emotion"+ index] ? result.felling["emotion"+ index].rate : 0
        return (
          <ExperienceAnswer
            title={item.emotion}
            key={"emotion"+ index}
            setRate={(rate) => updateRate("emotion"+ index, item.emotion, rate)}
            rate={rate}
          />
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
      </Grid>
      </Grid>
    </div>
  )
}
