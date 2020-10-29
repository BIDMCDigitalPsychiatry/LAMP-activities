import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import RatioButton from '../../components/RatioButton'
import Button from '@material-ui/core/Button'

const CssTextField = withStyles({
    root: {
        'label + &': {
        },
      },
    input: {
        fontSize: 16, fontFamily: 'Inter', fontWeight: '500', color: 'rgba(0, 0, 0, 0.75)'
    }
  })(InputBase)

const useStyles = makeStyles({
    root: {
        width: 500,
        backgroundColor: 'white', borderRadius: 10, paddingLeft: 40, paddingRight: 40
    },
    dialogTitle: {
        fontSize: 18, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)', marginTop: 30
    },
    inputContainer: {
        backgroundColor: '#F5F5F5', borderRadius: 10, marginTop: 17, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: 60, paddingRight: 20, paddingLeft: 20
    },
    contentContainer: {
        width: '100%', display: 'flex', flexDirection: 'column'
    },
    measureTitle: {
        fontWeight: '500', fontSize: 14, color: 'rgba(0, 0, 0, 0.4)', marginTop: 40
    },
    measureContainer: {
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'white'
    },
    headerButton: {
        marginTop: 50, width: 168, height: 50, background: '#7599FF',
        boxShadow: '0px 10px 15px rgba(96, 131, 231, 0.2)', borderRadius: 25,
        marginLeft: 166, marginBottom: 40
    },
});

export function TargetDialog(props) {
    const classes = useStyles();
    const { onClose, dialogOpen} = props
    const [measure, setMeasure] = React.useState('Times')
    const [target, setTarget] = React.useState('')

    const handleClose = () => {
        onClose({type: dialogOpen, target, measure})
        setTarget('')
        setMeasure('Times')
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogOpen != ''}>
            <div className={classes.root}>
                <Typography className={classes.dialogTitle}>Add a target behavior</Typography>
                <div className={classes.inputContainer}>
                    <div className={classes.contentContainer}>
                        <CssTextField value={target} onChange={event => setTarget(event.target.value)} inputProps={{ disableunderline: 'true'}} placeholder='Behavior name' />
                    </div>
                </div>
                <Typography className={classes.measureTitle}>Measure of action:</Typography>
                <div className={classes.measureContainer} style={{ width: 420, marginTop: 20 }}>
                    <div className={classes.measureContainer} style={{ flex: 1 }}>
                        <RatioButton 
                            smallSpace={true} title='Times'
                            color='#618EF7'
                            checked={measure == 'Times'} onChange={() => setMeasure('Times')} />
                    </div>
                    <div className={classes.measureContainer} style={{ flex: 1 }}>
                        <RatioButton smallSpace={true}
                            title='Hours'
                            color='#618EF7'
                            checked={measure == 'Hours'} onChange={() => setMeasure('Hours')} />
                    </div>
                    <div className={classes.measureContainer} style={{ flex: 1 }}>
                        <RatioButton smallSpace={true}
                            title='Yes'
                            color='#618EF7'
                            checked={measure == 'Yes'}
                            onChange={() => setMeasure('Yes')} />
                    </div>
                </div>

                <Button onClick={handleClose} className={classes.headerButton}>
                    <Typography className={classes.buttonText}>Add</Typography>
                </Button>
            </div>
        </Dialog>
    );
}

export function EmotionDialog(props) {
    const classes = useStyles()
    const [emotion, setEmotion] = React.useState('')
    const { onClose, dialogOpen } = props

    const handleClose = () => {
        onClose(emotion)
        setEmotion('')
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={dialogOpen}>
            <div className={classes.root}>
                <Typography className={classes.dialogTitle}>Add a emotion</Typography>
                <div className={classes.inputContainer}>
                    <div className={classes.contentContainer}>
                        <CssTextField value={emotion} onChange={event => setEmotion(event.target.value)} inputProps={{ disableunderline: 'true'}} placeholder='Emotion name' />
                    </div>
                </div>
                <Button onClick={handleClose} className={classes.headerButton}>
                        <Typography className={classes.buttonText}>Add</Typography>
                </Button>
            </div>
        </Dialog>
    );
}