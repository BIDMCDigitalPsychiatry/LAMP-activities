import React, {useEffect, useRef} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { Grid } from '@material-ui/core'
import RateAnswer from './RateAnswer'
import { useTranslation } from "react-i18next"

const CssTextField = withStyles({
    root: {
        'label + &': {
        },
        marginRight: 3
    },
    input: {
        fontSize: 16, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)',
        width: 25, borderBottom: '3px solid #92E7CA', padding: 0, borderRadius: 0,
        textAlign: 'center', fontFamily: 'Inter'
    }
})(InputBase)

const useStyles = makeStyles((theme) => ({
    rateContainer: {
        display: 'flex',
    },
    typeTitle: {
        marginBottom: 10, fontSize: 12, color: 'rgba(0, 0, 0, 0.75)', marginTop: -10, fontWeight: '600'
    },
    unitTitle: {
        color: 'rgba(0, 0, 0, 0.7)', fontSize: 16, fontWeight: '600'
    },
    container: {
    },
    questionTitle: {
        fontSize: 16, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)', marginBottom: 10
    },
    separator: {
        border: '2px solid rgba(0, 0, 0, 0.1)',
        width: '100%', marginTop: 20
    },
    contentContainer: {
        margin: 16
    }
}))

export default function RateCountAnswer({ title, unit, customunit, separator, urgeValue, selectedUrge, selectedActed, actedValue }) {
    const classes = useStyles()
    const { t } = useTranslation()
    const hasFetchedData = useRef(false);

    const handleChange = (value) => {
        selectedUrge && selectedUrge(value);
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
        if(urgeValue >= 0) selectedUrge && selectedUrge(urgeValue)
        hasFetchedData.current = true;

        }

    },[urgeValue, selectedUrge])

    return (
        <div className={classes.container}>
            <Grid container spacing={0} className={classes.contentContainer}>
                <Grid item xs={12}>
                    <Typography className={classes.questionTitle}>{t(title)}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography className={classes.typeTitle} >{t("URGE")}</Typography>
                    <Grid direction='row' container>
                        <RateAnswer
                            checked={urgeValue === 0}
                            onChange={handleChange}
                            value={0}
                        />
                        <RateAnswer
                            checked={urgeValue === 1}
                            onChange={handleChange}
                            value={1}
                        />
                        <RateAnswer
                            checked={urgeValue === 2}
                            onChange={handleChange}
                            value={2}
                        />
                        <RateAnswer
                            checked={urgeValue === 3}
                            onChange={handleChange}
                            value={3}
                        />
                        <RateAnswer
                            checked={urgeValue === 4}
                            onChange={handleChange}
                            value={4}
                        />
                        <RateAnswer
                            checked={urgeValue === 5}
                            onChange={handleChange}
                            value={5}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.typeTitle} >{t("ACTED")}</Typography>
                    <Grid direction='row' container>
                        <CssTextField disabled={urgeValue < 0}
                           value={t(actedValue)} onChange={event => selectedActed && selectedActed(event.target.value)} />
                        <Typography className={classes.unitTitle} style={{color:'rgba(0, 0, 0, 0.7)'}}>{t(unit?.toUpperCase())}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            {separator &&
                <div className={classes.separator} />
            }
        </div>
    );
}