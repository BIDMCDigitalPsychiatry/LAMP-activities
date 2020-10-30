import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EffortAnswer from '../../components/EffortAnswer'
import InputBase from '@material-ui/core/InputBase'
import HeaderView from '../../components/HeaderView'
import RatioButton from '../../components/RatioButton'

const CssTextField = withStyles({
  root: {
    'label + &': {
    },
    marginRight: 3
  },
  input: {
    fontSize: 25, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)',
    width: 44, borderBottom: '3px solid #92E7CA',  padding: 0, borderRadius: 0,
    textAlign: 'center'
  }
})(InputBase)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, alignItems: 'center', justifyContent: 'center'
  },
  stepper: {
    left: 0, right: 0
  },
  progressContainer: {
    width: '100%', height: 5, backgroundColor: '#92E7CA', display: 'flex'
  },
  progressContent: {
    left: 0, width: '100%', top: 0, bottom: 0, backgroundColor: '#2F9D7E'
  },
  menuButton: {
    color: 'rgba(0, 0, 0, 0.5)',
    marginRight: 40
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
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  answerContainer: {
    width: 80
  },
  questionTitle: {
    fontWeight: 'bold', fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', marginTop: 20
  },
  descriptionTitle: {
    fontSize: 12, fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)', marginTop: 20, marginBottom: 30
  },
  headerContainer: {
    backgroundColor: '#E7F8F2', width: '100%', padding: 16
  },
  headerTitle: {
    color: '#2F9D7E', fontSize: 12, fontWeight: '600', textTransform: 'uppercase'
  },
  unitTitle: {
    color: 'rgba(0, 0, 0, 0.75)', fontSize: 25, fontWeight: '600'
  },
}))

export default function OverviewView(props) {
  const classes = useStyles()
  const [selectedNormative, setSelectedNormative] = React.useState('0')
  const [hospitalized, setHospitalized] = React.useState('')
  const [er, setEr] = React.useState('')
  const [urge, setUrge] = React.useState(0)

  const onUpdateReport = () => {
    const {updateReport, onContinue} = props
    if(updateReport){
      updateReport('overview', {urge: urge, er: er, hospitalized: hospitalized, selectedNormative: selectedNormative})
    }

    if(onContinue){
      onContinue()
    }
  }

  return (
    <div className={classes.root}>
          <HeaderView
            title='Weekly overview'
            description='0= not at all, 5 = extremely'
            currentStep={7}
            totalStep={7}
            question='Did you have an urge to quit therapy this week?'
          />
          <div className={classes.contentContainer}>
            <EffortAnswer selectedLevel={urge} onChange={(level) => setUrge(level)}/>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 80 }}>
            <Typography className={classes.questionTitle}>Did you go to the ER this week?</Typography>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 50 }}>
            <div style={{ width: 100 }}>
              <RatioButton title='Yes' checked={er !== ''} onChange={() => setEr('Psych')} />
            </div>
            <div style={{ width: 100 }}><RatioButton title='No' checked={er === ''} onChange={() => setEr('')} /></div>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 40 }}>
            <div style={{ width: 100 }}><RatioButton title='Psych' checked={er === 'Psych'} unable={er === ''} onChange={() => setEr('Psych')} /></div>
            <div style={{ width: 100 }}><RatioButton title='Medical' checked={er === 'Medical'} unable={er === ''} onChange={() => setEr('Medical')} /></div>
          </div>

          <div className={classes.contentContainer} style={{ marginTop: 80 }}>
            <Typography className={classes.questionTitle}>Were you hospitalized?</Typography>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 50 }}>
            <div style={{ width: 100 }}><RatioButton title='Yes' checked={hospitalized !== ''} onChange={() => setHospitalized('Psych')} /></div>
            <div style={{ width: 100 }}><RatioButton title='No' checked={hospitalized === ''} onChange={() => setHospitalized('')} /></div>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 40 }}>
            <div style={{ width: 100 }}><RatioButton title='Psych' checked={hospitalized === 'Psych'} unable={hospitalized === ''} onChange={() => setHospitalized('Psych')} /></div>
            <div style={{ width: 100 }}> <RatioButton title='Medical' checked={hospitalized === 'Medical'} unable={hospitalized === ''} onChange={() => setHospitalized('Medical')} /></div>
          </div>

          <div className={classes.contentContainer} style={{ marginTop: 80 }}>
            <Typography className={classes.questionTitle}>How many normative hours?</Typography>
          </div>
          <div className={classes.contentContainer} style={{ marginTop: 50 }}>
            <CssTextField value={selectedNormative} onChange={event => setSelectedNormative(event.target.value)} />
            <Typography className={classes.unitTitle}>Hours</Typography>
          </div>

          <div className={classes.buttonsContainer}>
            <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                <Typography className={classes.buttonText}>Submit</Typography>

            </Button>
            <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                <Typography className={classes.backText}>Back</Typography>
            </Button>
          </div>
    </div>
  )
}
