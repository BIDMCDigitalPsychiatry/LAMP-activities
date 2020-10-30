import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Close from '@material-ui/icons/Close'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Link from '@material-ui/core/Link'
import InputBase from '@material-ui/core/InputBase'
import { TargetDialog, EmotionDialog } from './dialog'
import { connect } from 'react-redux'
import actions from '../home/action'

const { updateEmotions, updateLivingGoal, updateTargetEffective, updateTargetIneffective } = actions

const CssTextField = withStyles({
    root: {
        'label + &': {
        },
    },
    input: {
        fontSize: 20, fontFamily: 'Inter', fontWeight: '500', color: 'rgba(0, 0, 0, 0.75)'
    }
})(InputBase)

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    headerContainer: {
        backgroundColor: 'white', width: '100%', paddingLeft: 20, paddingRight: 20, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 30, color: 'rgba(0, 0, 0, 0.75)', flex: 1, fontWeight: '600', textAlign: 'left'
    },
    buttonContainer: {
        width: 200, height: 50, marginTop: 91, background: '#7599FF', boxShadow: '0px 10px 15px rgba(96, 131, 231, 0.2)', borderRadius: 25
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'white'
    },
    backContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: 'transparent', marginTop: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
    },
    backText: {
        fontWeight: 'bold', fontSize: 16, color: '#4C66D6'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
    headerButton: {
        position: 'absolute', width: 168, height: 50, right: 60, top: 40, background: '#7599FF', boxShadow: '0px 10px 15px rgba(96, 131, 231, 0.2)', borderRadius: 25,
    },
    sectionTitle: {
        color: 'rgba(0, 0, 0, 0.75)', fontSize: 25, fontWeight: '600', marginTop: 50
    },
    inputContainer: {
        backgroundColor: '#F5F5F5', borderRadius: 10, marginTop: 37,
        height: 141, marginBottom: 70
    },
    inputDescription: {
        fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', fontWeight: '500', width: '100%', textAlign: 'right'
    },
    contentContainer: {
        margin: 20, marginBottom: 10, display: 'flex', flexDirection: 'column', paddingTop: 20
    },
    groupTitle: {
        fontSize: 12, color: 'rgba(0, 0, 0, 0.4)', textTransform: 'uppercase'
    },
    rowContainer: {
        display: 'flex', width: '100%', alignItems: 'center', height: 36, fontWeight: 600
    },
    contentText: {
        color: 'rgba(0, 0, 0, 0.75)', fontWeight: '500', fontSize: 14, marginLeft: 10
    },
    deleteButton: {
        width: 16, height: 16, color: 'rgba(0, 0, 0, 0.45)', marginRight: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    addContainer: {
        display: 'flex', alignItems: 'center'
    },
    addButtonTitle: {
        color: '#5784EE', fontWeight: 600, fontSize: 14
    },
    addButton: {
        marginRight: 19, color: '#5784EE', width: 22, height: 22, marginLeft: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }
}))


function Screen(props) {
    const classes = useStyles()
    const [targetDialog, setTargetDialog] = React.useState('')
    const [emotionDialog, setEmotionDialog] = React.useState(false)

    const openTargetDialog = (type) => {
        setTargetDialog(type);
    }

    const openEmotionDialog = () => {
        setEmotionDialog(true);
    }

    const onAddTarget = ({ type, target, measure }) => {
        setTargetDialog(false)
        if(target.length === 0){
            return
        }

        if (type === 'effective') {
            let targets = props.config.targetEffective
            if (!targets) {
                targets = []
            }
            targets.push({ id: target.replace(/ /g, '_') + '_' + targets.length.toString(), target, measure })
            props.updateTargetEffective(targets)
        } else {
            let targets = props.config.targetIneffective
            if (!targets) {
                targets = []
            }
            targets.push({ id: target.replace(/ /g, '_') + '_' + targets.length.toString(), target, measure })
            props.updateTargetIneffective(targets)
        }
    }

    const onAddEmotion = (emotion) => {
        setEmotionDialog(false)

        if(emotion.length === 0){
            return
        }

        let emotions = props.config.emotions
        if (!emotions) {
            emotions = []
        }
        emotions.push({ id: emotion.replace(/ /g, '_') + '_' + emotion.length.toString(), emotion })
        props.updateEmotions(emotions)
    }

    const removeEmotion = (index) => {
        let emotions = props.config.emotions
        emotions.splice(index, 1)
        props.updateEmotions(emotions)
    }

    const removeTarget = (type, index) => {
        if (type === 'effective') {
            let targets = props.config.targetEffective
            targets.splice(index, 1)
            props.updateTargetEffective(targets)
        } else {
            let targets = props.config.targetIneffective
            targets.splice(index, 1)
            props.updateTargetIneffective(targets)
        }
    }

    const effectiveData = props && props.config && props.config.targetEffective ? props.config.targetEffective : []
    const ineffectiveData = props && props.config && props.config.targetIneffective ? props.config.targetIneffective : []
    const emotions = props && props.config && props.config.emotions ? props.config.emotions : []
    const livingGoal = props && props.config && props.config.livingGoal ? props.config.livingGoal : ''

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="left-arrow">
                    <ArrowBack />
                </IconButton>
                <Typography className={classes.headerTitle}>DBT Diary Card (U122346478)</Typography>
                <Button className={classes.headerButton}>
                    <Link href='/clinician'>
                        <Typography className={classes.buttonText}>Save</Typography>
                    </Link>
                </Button>
            </div>
            <div style={{ border: '1px solid #C7C7C7', height: 0, width: '100%' }} />
            <Grid container spacing={0}>
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={10}>
                    <Typography className={classes.sectionTitle}>Life worth living goal</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={10} sm={8}>
                            <div className={classes.inputContainer}>
                                <div className={classes.contentContainer}>
                                    <CssTextField value={livingGoal} onChange={event => props.updateLivingGoal(event.target.value)} inputProps={{ disableunderline: 'true' }} multiline rows={3} />
                                    <Typography className={classes.inputDescription}>{`${livingGoal.length} / 300 max characters`}</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={10} sm={2} />
                    </Grid>
                    <div style={{ border: '1px solid #C7C7C7', height: 0, width: '100%' }} />

                    <Typography className={classes.sectionTitle}>Target behaviors</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={10} sm={8}>
                            <div className={classes.rowContainer} style={{ marginTop: 55, height: 40 }}>
                                <Typography className={classes.groupTitle}>effective</Typography>
                            </div>
                            {effectiveData.map((item, index) => {
                                return (
                                    <div key={item.id} className={classes.rowContainer} style={{ backgroundColor: (index % 2 === 0) ? '#ECF4FF' : 'transparent' }}>
                                        <Typography className={classes.contentText} style={{ flex: 1 }}>{item.target}</Typography>
                                        <Typography className={classes.contentText} style={{ width: 150 }}>{item.measure}</Typography>
                                        <ButtonBase onClick={() => removeTarget('effective', index)} className={classes.deleteButton}>
                                            <Close />
                                        </ButtonBase>
                                    </div>
                                )
                            })}
                            <ButtonBase className={classes.addContainer} style={{ marginBottom: 52, marginTop: 15}}>
                                <div onClick={() => openTargetDialog('effective')} className={classes.addButton}>
                                    <AddCircleOutline />
                                </div>
                                <Typography onClick={() => openTargetDialog('effective')} className={classes.addButtonTitle}>Add item</Typography>
                            </ButtonBase>

                            <div className={classes.rowContainer} style={{ marginTop: 55, height: 40 }}>
                                <Typography className={classes.groupTitle}>ineffective</Typography>
                            </div>
                            {ineffectiveData.map((item, index) => {
                                return (
                                    <div key={item.id} className={classes.rowContainer} style={{ backgroundColor: (index % 2 === 0) ? '#ECF4FF' : 'transparent' }}>
                                        <Typography className={classes.contentText} style={{ flex: 1 }}>{item.target}</Typography>
                                        <Typography className={classes.contentText} style={{ width: 150 }}>{item.measure}</Typography>
                                        <ButtonBase onClick={() => removeTarget('ineffective', index)} className={classes.deleteButton}>
                                            <Close />
                                        </ButtonBase>
                                    </div>
                                )
                            })}
                            <ButtonBase className={classes.addContainer} style={{marginBottom: 49, marginTop: 15}}>
                                <div onClick={() => openTargetDialog('ineffective')} className={classes.addButton}>
                                    <AddCircleOutline />
                                </div>
                                <Typography onClick={() => openTargetDialog('ineffective')} className={classes.addButtonTitle}>Add item</Typography>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={10} sm={2} />
                    </Grid>

                    <div style={{ border: '1px solid #C7C7C7', height: 0, width: '100%' }} />

                    <Typography className={classes.sectionTitle} style={{ marginBottom: 34 }}>Emotions</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={10} sm={8}>
                            {emotions.map((item, index) => {
                                return (
                                    <div key={item.id} className={classes.rowContainer} style={{ backgroundColor: (index % 2 === 0) ? '#ECF4FF' : 'transparent' }}>
                                        <Typography className={classes.contentText} style={{ flex: 1 }}>{item.emotion}</Typography>
                                        <ButtonBase onClick={() => removeEmotion(index)} className={classes.deleteButton}>
                                            <Close />
                                        </ButtonBase>
                                    </div>
                                )
                            })}
                            <ButtonBase className={classes.addContainer} style={{ marginBottom: 52, marginTop: 15}}>
                                <div onClick={openEmotionDialog} className={classes.addButton}>
                                    <AddCircleOutline />
                                </div>
                                <Typography onClick={openEmotionDialog} className={classes.addButtonTitle}>Add item</Typography>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={10} sm={2} />
                    </Grid>

                    <div style={{ border: '1px solid #C7C7C7', height: 0, width: '100%' }} />
                    <div className={classes.buttonsContainer}>
                        <Button className={classes.buttonContainer}>
                            <Typography className={classes.buttonText}>Continue</Typography>
                        </Button>
                        <Button className={classes.backContainer}>
                            <Typography className={classes.backText}>Cancel</Typography>
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={1} />
            </Grid>
            <TargetDialog dialogOpen={targetDialog} onClose={onAddTarget} />
            <EmotionDialog dialogOpen={emotionDialog} onClose={onAddEmotion} />
        </div>
    );
}

export default connect((state) => ({
    config: state.appReducer.config,
}), {
    updateEmotions, updateLivingGoal, updateTargetEffective, updateTargetIneffective
})(Screen)
