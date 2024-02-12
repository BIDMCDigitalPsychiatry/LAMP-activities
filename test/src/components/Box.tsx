// Core Imports
import React from "react"
import {
    makeStyles,
    Grid,
    ListItem,
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
        width: 50,
        height: 50,
        border: "#fff solid 1px",
        borderRadius: 50,
        '&:hover': {
            color: 'black',
        },
    },

}))

export default function Box({ ...props }) {

    const classes = useStyles()
    return (
        <Grid container className={props.className}>
            {!!props?.data ? props?.data.map((value: any, index: number) => (
                <Grid className={props.boxClass} item xs={2} sm={2} md={1} key={index}>
                 <ListItem>{value}</ListItem>
                    <div className={classes.divider} />
                 <ListItem>{index + 1}</ListItem>
                </Grid>
            )) : <Grid className={props.boxClass} item xs={2} sm={2} md={1} > <ListItem>{props?.currentSymbol}</ListItem></Grid>}
        </Grid>

    )
}
