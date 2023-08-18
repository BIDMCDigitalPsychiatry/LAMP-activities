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
}))

export default function Box({ ...props }) {
    const classes = useStyles()
       return (
                        <Grid container className={props.className} >
                            {props?.data.map((value: any, index: number) => (
                                <Grid className={classes.box} item xs={2} sm={2} md={1} key={index}>
                                    {props?.type?  <ListItem>{value.number}</ListItem>  : <ListItem>{value}</ListItem> }
                                    {props?.type ? null : <div className={classes.divider} />  }
                                    {props?.type?  <ListItem>{"["}{value.keyvalue}{"]"}</ListItem>  :   <ListItem>{index + 1}</ListItem> }
                                </Grid>
                            ))}
                        </Grid>
                                 
    )
}
