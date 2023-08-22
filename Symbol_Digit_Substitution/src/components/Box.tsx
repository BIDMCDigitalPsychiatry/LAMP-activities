// Core Imports
import React from "react"
import {
    makeStyles,
    Grid,
    ListItem,
    Button,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({

    box: {
        margin: "10px",
        border: "3px solid white",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            margin: "5px",
        },
        "& li": {
            fontSize: 22,
            justifyContent: "center"
        },

    },

    divider: {
        borderTop: "2px solid white",
        margin: "3px 0",
    },
    btnstyle: {
        padding: "11px 15px",
        color: "white",
        '&:hover': {
            color: 'black',
        },
    }
}))

export default function Box({ ...props }) {
    const handleButtonClick = (data: any) => {
        props.handleClick(data)
    }
    const classes = useStyles()
    return (


        <Grid container className={props.className}>
            {!!props?.data ? props?.data.map((value: any, index: number) => (
                <Grid className={classes.box} item xs={2} sm={2} md={1} key={index}>
                    {props?.type ? <ListItem><Button disabled={props.flag !== 2} onClick={(event) => handleButtonClick(index + 1)} className={classes.btnstyle}>{index + 1}</Button></ListItem> : <ListItem>{value}</ListItem>}
                    {props?.type ? null : <div className={classes.divider} />}
                    {props?.type ? null : <ListItem>{index + 1}</ListItem>}
                </Grid>
            )) : <Grid className={classes.box} item xs={2} sm={2} md={1} > <ListItem>{props?.currentSymbol}</ListItem></Grid>}
        </Grid>

    )
}
