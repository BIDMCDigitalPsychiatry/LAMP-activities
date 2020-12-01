import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'
import { Vega } from 'react-vega'
import ButtonBase from '@material-ui/core/ButtonBase'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import NativeSelect from '@material-ui/core/NativeSelect'
import { useTranslation } from "react-i18next"
const emotions_chart = require('./charts/emotions_chart.json')
const effective_chart = require('./charts/effective_chart.json')
const ineffective_chart = require('./charts/ineffective_chart.json')
const actions_chart = require('./charts/actions_chart.json')
const selfcare_chart = require('./charts/selfcare_chart.json')

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
        fontWeight: 'bold', fontSize: 16, color: 'white', marginLeft: 5
    },
    headerButton: {
        position: 'absolute', width: 100, height: 50, right: 60, top: 40, background: '#7599FF', boxShadow: '0px 10px 15px rgba(96, 131, 231, 0.2)', borderRadius: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    },
    graphContainer: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    },
    titleContainer: {
        display: 'flex', width: 500, marginBottom: 40, justifyContent: 'space-between'
    },
    graphTitle: {
        fontSize: 25, fontWeight: '600', color: 'rgba(0, 0, 0, 0.75)'
    },
    separator: {
        border: '2px solid rgba(0, 0, 0, 0.1)',
        width: 500, marginTop: 50, marginBottom: 50, height: 0
    },
    addContainer: {
        display: 'flex', alignItems: 'center'
    },
    addButtonTitle: {
        color: '#5784EE', fontWeight: 600, fontSize: 14
    },
    addButton: {
        marginRight: 19, color: '#5784EE', width: 22, height: 22, marginLeft: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    timeTitle: {
        color: 'rgba(0, 0, 0, 0.75)', fontSize: 16, fontWeight: '500', width: 175, textAlign: 'center'
    },
    timeButton: {
        color: 'rgba(0, 0, 0, 0.4)', width: 24, height: 24
    },
    datePickerContainer: {
        display: 'flex', alignItems: 'center',
    },
    timeRangeContainer: {
        display: 'flex', alignItems: 'center', marginBottom: 15
    },
    rangeButton: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 32, borderRadius: 16, border: '1px solid #C6C6C6'
    },
    rangeTitle: {
        color: 'rgba(0, 0, 0, 0.4)', fontSize: 14, fontWeight: '500'
    },
    rangeButtonSelected: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 32, borderRadius: 16, backgroundColor: '#ECF4FF'
    },
    rangeTitleSelected: {
        color: '#4C66D6', fontSize: 14, fontWeight: '500'
    },
    selector: {
        display: 'fixed', marginBottom: -30, marginRight: -300, zIndex: 1000
    }
}))

function Screen(props) {
    const classes = useStyles()
    const { t } = useTranslation()
    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="left-arrow">
                    <ArrowBack />
                </IconButton>
                <Typography className={classes.headerTitle}>{t("DBT_DIARY")}</Typography>
                <div className={classes.headerButton}>
                    <Icon style={{ color: 'white', fontSize: 20 }}>add</Icon>
                    <Typography className={classes.buttonText}>{t("ADD")}</Typography>
                </div>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={3} />
                <Grid item xs={12} sm={6}>
                    <div className={classes.graphContainer}>
                        <NativeSelect
                            className={classes.selector}
                        >
                            <option value={10}>{t("TEN")}</option>
                            <option value={20}>{t("TWENTY")}</option>
                            <option value={30}>{t("THIRTY")}</option>
                        </NativeSelect>

                        <Vega spec={emotions_chart} />

                        <div className={classes.separator} />

                        <NativeSelect
                            className={classes.selector}
                        >
                             <option value={10}>{t("TEN")}</option>
                            <option value={20}>{t("TWENTY")}</option>
                            <option value={30}>{t("THIRTY")}</option>
                        </NativeSelect>

                        <Vega spec={effective_chart} />

                        <div className={classes.separator} />

                        <NativeSelect
                            className={classes.selector}
                        >
                             <option value={10}>{t("TEN")}</option>
                            <option value={20}>{t("TWENTY")}</option>
                            <option value={30}>{t("THIRTY")}</option>
                        </NativeSelect>

                        <Vega spec={ineffective_chart} />

                        <div className={classes.separator} />

                        <NativeSelect
                            className={classes.selector}
                        >
                             <option value={10}>{t("TEN")}</option>
                            <option value={20}>{t("TWENTY")}</option>
                            <option value={30}>{t("THIRTY")}</option>
                        </NativeSelect>

                        <Vega spec={actions_chart} />

                        <div className={classes.separator} />

                        <NativeSelect
                            className={classes.selector}
                        >
                             <option value={10}>{t("TEN")}</option>
                            <option value={20}>{t("TWENTY")}</option>
                            <option value={30}>{t("THIRTY")}</option>
                        </NativeSelect>

                        <Vega spec={selfcare_chart} />

                        <div className={classes.separator} />

                        <div className={classes.titleContainer}>
                            <ButtonBase className={classes.addContainer} style={{ marginBottom: 49, marginTop: 15 }}>
                                <div className={classes.addButton}>
                                    <AddCircleOutline />
                                </div>
                                <Typography className={classes.addButtonTitle}>{t("ADD_ITEM")}</Typography>
                            </ButtonBase>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3} />
            </Grid>
        </div>
    );
}

export default connect((state) => ({
}), {

})(Screen)
