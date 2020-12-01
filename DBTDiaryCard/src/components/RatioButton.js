import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    uncheckContainer: {
        width: 24, height: 24, border: '3px solid #C6C6C6', borderRadius: 12,
        boxSizing: 'border-box', arginRight: 17
    },
    checkedContainer: {
        width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#2F9D7E', borderRadius: 12, marginRight: 17
    },
    titleChecked: {
        fontSize: 14, color: 'rgba(0, 0, 0, 0.75)', fontWeight: '600', flex: 1
    },
    titleUncheck: {
        fontSize: 14, color: 'rgba(0, 0, 0, 0.4)', flex: 1
    },
    unableContainer: {
        width: 24, height: 24, border: '3px solid #BFBFBF', borderRadius: 12,
        boxSizing: 'border-box', marginRight: 17, opacity: 0.4
    },
    unableCheck: {
        fontSize: 14, color: 'rgba(0, 0, 0, 0.4)', flex: 1, opacity: 0.4
    }
}))

export default function RatioButton({ checked, onChange, title, value, unable, smallSpace, color }) {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.root}>
            <div onClick={() => !unable && onChange(value)} 
                className={unable ? classes.unableContainer : (checked ? classes.checkedContainer : classes.uncheckContainer)}
                style={{marginRight: smallSpace ? 17 : 10, backgroundColor: checked ? (color ? color : '#2F9D7E') : 'transparent'}}/>
            <Typography className={unable ? classes.unableCheck : (checked ? classes.titleChecked : classes.titleUncheck)}>{t(title)}</Typography>
        </div>

    )
}