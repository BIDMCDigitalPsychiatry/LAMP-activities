import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import RatioButton from './RatioButton';
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 2
    },
    stepper: {
        left: 0, right: 0
    },
    progressContainer: {
        width: '100%', height: 5, backgroundColor: '#92E7CA', display: 'flex'
    },
    progressContent: {
        left: 0, width: '40%', top: 0, bottom: 0, backgroundColor: '#2F9D7E'
    },
    menuButton: {
        color: 'rgba(0, 0, 0, 0.5)',
        marginRight: 40
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
    buttonContainer: {
        width: 200, height: 50, borderRadius: 25,
        backgroundColor: '#92E7CA', marginTop: 55
    },
    buttonText: {
        fontWeight: 'bold', fontSize: 16, color: 'rgba(0, 0, 0, 0.75)'
    },
    progressText: {
        color: '#2F9D7E', fontSize: 14, fontWeight: 500, textAlign: 'center'
    },
    contentContainer: {
        marginTop: 20
    },
    questionTitle: {
        fontWeight: 'bold', fontSize: 18, color: 'rgba(0, 0, 0, 0.75)', marginTop: 20
    },
    descriptionTitle: {
        fontSize: 12, fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)', marginTop: 20, marginBottom: 30
    },
    headerContainer: {
        backgroundColor: '#E7F8F2', width: '100%', display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center'
    },
    headerTitle: {
        color: '#2F9D7E', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', flex: 1, marginLeft: 20, 
    },
    arrow: {
        color: 'rgba(0, 0, 0, 0.4)', marginRight: 20
    },
    listContainer: {
        marginLeft: 20, marginRight: 20, marginBottom: 20
    },
    itemContainer: {
        marginTop: 10
    }
}))

export default function SkillExpanded({ title, list, selectedList, onSelect }) {
    const classes = useStyles()
    const [expaned, setExpaned] = React.useState(false)
    const { t } = useTranslation()

    return (
        <div className={classes.root} key={title}>
            <div onClick={() => setExpaned(!expaned)} className={classes.headerContainer}>
                <Typography className={classes.headerTitle}>{t(title)}</Typography>
                {expaned ? <ExpandLess className={classes.arrow}/> : <ExpandMore className={classes.arrow}/>}
            </div>
            {expaned && list &&
                <div className={classes.listContainer}>
                    {
                        list.map((item, index) => {
                            const filter = selectedList ? selectedList.filter(i => i.id === item && i.section === title) : []
                            const checked = (filter && filter.length > 0)

                            return (
                                <div key={item} className={classes.itemContainer}>
                                    <RatioButton title={t(item)} checked={checked} onChange={onSelect} value={index} />
                                </div>
                            )
                        })
                    }
                </div>

            }
        </div>
    )
}

