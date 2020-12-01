import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    uncheckContainer: {
        width: 24, height: 24, border: '3px solid #C6C6C6', borderRadius: 12, display: 'flex',
        boxSizing: 'border-box', marginRight: 12
    },
    checkedContainer: {
        width: 24, height: 24, alignItems: 'center', justifyContent: 'center', display: 'flex',
        backgroundColor: '#2F9D7E', borderRadius: 14, marginRight: 12
    },
    checkText: {
        fontSize: 14, fontWeight: 'bold', color: 'white', textAlign: 'center'
    },
    rateContainer: {
        display: 'flex',
    },
    typeTitle: {
        marginBottom: 10, fontSize: 12, color: 'rgba(0, 0, 0, 0.5)', marginTop: -10
    },
    unitTitle: {
        color: 'rgba(0, 0, 0, 0.7)', fontSize: 16, fontWeight: '600'
    },
    container: {
    },
    questionTitle: {
        fontSize: 16, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)'
    },
    separator: {
        border: '2px solid rgba(0, 0, 0, 0.1)',
        width: '100%', marginTop: 20
    },
    contentContainer: {
        padding: 16
    }
}))

export default function RateAnswer({ checked, onChange, value }) {
    const classes = useStyles()
    const { t } = useTranslation();

    return (
        <div onClick={() => onChange(value)} className={checked ? classes.checkedContainer : classes.uncheckContainer}>
            {checked &&
                <Typography className={classes.checkText}>{t(value)}</Typography>
            }
        </div>
    )
}