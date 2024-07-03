// Core Imports
import React, { useEffect, useState } from "react"
import {
    Button,
    makeStyles,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Dialog,
    DialogContent,
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import i18n from "../i18n";

const useStyles = makeStyles((theme) => ({

    popupstartBtn: {
        background: "#359ffe",
        color: "#ffffff",
        fontWeight: "bold",
        borderRadius: "10px",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)",
        cursor: "pointer",
        minWidth: "100px",
        "&:hover": { background: "#359ffe" },

    },
    startbtnDiv: {
        width: "59%",
        marginBottom: "10px"
    },
    comment: {
        color: "#000",
        textAlign: "justify"
    },
}))


export default function DialogMessage({ ...props }) {

    const classes = useStyles()
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    return (
        <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{`${t("")}`}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.comment} id="alert-dialog-description">
                   {i18n.t("IN_THIS_GAME_YOU_CAN_TILT_YOUR_PHONE_TO_CONTROL_A_SMALL_BALL_SEEN_ON_YOUR_SCREEN_TRY_TO_NAVIGATE_THE_BALL_OUT_OF_THE_CENTER_OF_THE_MAZE_AND_INTO_THE_OPEN_SPACE_THE_FASTER_YOU_ESCAPE_THE_MORE_POINTS_YOU_WILL_ACCURE")}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.startbtnDiv}>
                <Button className={classes.popupstartBtn} onClick={() => {
                    props.setOpen(false)
                    props.setStartGame(true) 
                }
                } color="primary">
                    {i18n.t("OK")}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

