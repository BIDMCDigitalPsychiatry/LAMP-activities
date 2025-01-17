import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import HeaderView from '../../../components/HeaderView'
import { Grid } from '@material-ui/core'
import { useTranslation } from "react-i18next"

const CssTextField = withStyles({
    root: {
        'label + &': {
        },
        marginTop: 20
    },
    input: {
        fontSize: 16, fontWeight: '500', color: 'rgba(0, 0, 0, 0.75)', borderRadius: 0, fontFamily: 'Inter'
    }
})(InputBase)

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
        margin: 20, marginBottom: 10, display: 'flex', flexDirection: 'column'
    },
    headerContainer: {
        backgroundColor: '#E7F8F2', width: '100%', padding: 16
    },
    inputContainer: {
        backgroundColor: '#F5F5F5', borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 24,
        height: 223
    },
    description: {
        fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', fontWeight: '500', width: '100%', textAlign: 'right'
    }
}))

export default function NotesView(props) {
    const classes = useStyles()
    const [notes, setNotes] = React.useState(props.report && !!props.report.notes ? props.report.notes : '')
    const { t } = useTranslation()

    const onUpdateReport = () => {
        const { updateReport, onContinue } = props
        if (updateReport) {
            updateReport('notes', notes)
        }
        if (onContinue) {
            onContinue()
        }
    }
    
    useEffect(() => {
        if(!!props.activityId) { 
        setNotes(typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null
        && JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['notes']? 
        JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId))['notes']  : '')
        }
      }, [props.activityId])

    useEffect(() => {
        if(!!props.activityId) { 
            const data = typeof localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== 'undefined' 
            &&  localStorage.getItem("activity-dbtdiarycard-"+ props.activityId) !== null?
            JSON.parse(localStorage.getItem("activity-dbtdiarycard-"+ props.activityId)) : {}
            data["notes"] = notes
            localStorage.setItem("activity-dbtdiarycard-"+ props.activityId, JSON.stringify(data)) 
        }
      }, [notes, props.activityId])

    return (
        <div className={classes.root}>
            <HeaderView
                title={t("ADDITIONAL_NOTES")}
                description={t("SHORT_ANSWER_SENETENCES")}
                currentStep={props.report && props.report.skillToday ? 9 : 7}
                totalStep={props.report && props.report.skillToday ? 9 : 7}
                question={t("OPTIONAL_ARE_THERE_ANY_OTHER_DETAILS_YOU_WANT_TO_SHARE_ABOUT_YOUR_DAY")}
            />
            <Grid container direction="row" justify="center" alignItems="flex-start">
                <Grid item lg={4} sm={10} xs={12}>
                    <div className={classes.inputContainer}>
                        <div className={classes.contentContainer}>
                            <CssTextField value={notes} onChange={(event) => setNotes(event.target.value)} inputProps={{ disableunderline: 'true', maxlength: 300 }} multiline rows={8} />
                            <Typography className={classes.description}>{`${notes.length} / ` + t("MAX_300_CHARACTERS")}</Typography>
                        </div>

                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button onClick={onUpdateReport} className={classes.buttonContainer}>
                            <Typography className={classes.buttonText}>{t("SUBMIT")}</Typography>

                        </Button>
                        <Button onClick={() => props.onBack && props.onBack()} className={classes.backContainer}>
                            <Typography className={classes.backText}>{t("BACK")}</Typography>

                        </Button>
                    </div>
                </Grid></Grid>
        </div>
    )
}
