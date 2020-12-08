import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, width: '100%'
    },
    progressContainer: {
        height: 5, display: 'flex', width: '100%', padding: 0, flexDirection: 'row'
    },
    progressContent: {
        left: 0, top: 0, bottom: 0, backgroundColor: '#2F9D7E'
    },
    remainProgressContent: {
        flex: 1, backgroundColor: '#92E7CA'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)', marginLeft: 20
    },
    title: {
        flexGrow: 1,
        fontWeight: '600',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    buttonsContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', marginTop: 55, marginBottom: 55, alignItems: 'center', justifyContent: 'center'
    },
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA'
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 19, color: 'rgba(0, 0, 0, 0.75)'
    },
    backContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: 'transparent', marginTop: 10, alignItems: 'center', justifyContent: 'center', display: 'flex'
    },
    backText: {
        fontWeight: 'bold', fontSize: 19, color: '#2F9D7E'
    },
    progressText: {
        color: '#2F9D7E', fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 20,
    },
    questionContainer: {
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },
    questionTitle: {
        fontWeight: 'bold', fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', marginTop: 33, marginLeft: 40, marginRight: 40
    },
    descriptionTitle: {
        fontSize: 12, fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)', marginTop: 20, marginBottom: 30, marginLeft: 40, marginRight: 40
    },
    headerContainer: {
        backgroundColor: '#E7F8F2', width: '100%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', flex: 1, fontWeight: '600', textAlign: 'center', marginRight: 54
    },
    viewWidth: {
        width: '100vw'
    }
}))

export default function HeaderView({title, question, currentStep, totalStep, description}) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>                        
                <Typography className={classes.headerTitle}>{t(title)}</Typography>
            </div>
            <div className={classes.progressContainer}>
                <div className={classes.progressContent} style={{width: (currentStep / totalStep * 100) + '%'}}/>
                <div className={classes.remainProgressContent}/>
            </div>
            <Typography className={classes.progressText}>{t("QUESTION_NUMBER_OF_TOTAL", { number: currentStep, total: totalStep })}</Typography>
            <div className={classes.questionContainer}>
                <Typography className={classes.questionTitle}>{t(question)}</Typography>
                {!!description && <Typography className={classes.descriptionTitle}>{t(description)}</Typography>}
            </div>
            <div className={classes.viewWidth} />
        </div>
    )
}

