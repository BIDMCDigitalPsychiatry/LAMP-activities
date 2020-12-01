import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import RateAnswer from './RateAnswer'
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    rateContainer: {
         marginRight: 20, display: 'flex', justifyContent: 'flex-end', flex: 1
    },
    titleContainer: {
        marginLeft: 20, display: 'flex', justifyContent: 'flex-start', flex: 1
    },
    typeTitle: {
        fontSize: 14, color: 'rgba(0, 0, 0, 0.75);', fontWeight: '500'
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
        height: 48, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection : 'row'
    }
}))

export default function ExperienceAnswer({ title, rate, setRate }) {
    const classes = useStyles()
    const { t } = useTranslation();
    const handleChange = (value) => {
        setRate && setRate(value);
    }

    return (
        <div className={classes.container}>

            <div className={classes.contentContainer}>
                    <div className={classes.titleContainer}>
                    <Typography className={classes.typeTitle}>{t(title)}</Typography>
                    </div>
                    <div className={classes.rateContainer}>
                        <RateAnswer
                            checked={rate === 0}
                            onChange={handleChange}
                            value={0}
                        />
                        <RateAnswer
                            checked={rate === 1}
                            onChange={handleChange}
                            value={1}
                        />
                        <RateAnswer
                            checked={rate === 2}
                            onChange={handleChange}
                            value={2}
                        />
                        <RateAnswer
                            checked={rate === 3}
                            onChange={handleChange}
                            value={3}
                        />
                        <RateAnswer
                            checked={rate === 4}
                            onChange={handleChange}
                            value={4}
                        />
                        <RateAnswer
                            checked={rate === 5}
                            onChange={handleChange}
                            value={5}
                        />
                    </div>
            </div>
        </div>
    );
}