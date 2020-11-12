import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import RateAnswer from './RateAnswer'

const useStyles = makeStyles((theme) => ({
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

export default function EffortAnswer({ selectedLevel, onChange }) {
    const classes = useStyles()

    return (
        <div className={classes.container}>

            <Grid direction='row' container>
                <RateAnswer
                    checked={selectedLevel === 0}
                    onChange={onChange}
                    value={0}
                />
                <RateAnswer
                    checked={selectedLevel === 1}
                    onChange={onChange}
                    value={1}
                />
                <RateAnswer
                    checked={selectedLevel === 2}
                    onChange={onChange}
                    value={2}
                />
                <RateAnswer
                    checked={selectedLevel === 3}
                    onChange={onChange}
                    value={3}
                />
                <RateAnswer
                    checked={selectedLevel === 4}
                    onChange={onChange}
                    value={4}
                />
                <RateAnswer
                    checked={selectedLevel === 5}
                    onChange={onChange}
                    value={5}
                />
            </Grid>
        </div>
    );
}