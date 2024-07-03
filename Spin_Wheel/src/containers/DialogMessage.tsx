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
                   {i18n.t("THE_GAME_PRESENTS_YOU_WITH_TWO_WHEELS_THAT_CAN_BE_SPUN_BY_SELECTING_ONE_OF_FOUR_BUTTONS_AT_THE_BOTTOM_OF_THE_SCREEN_THE_COLORS_OF_THE_BUTTONS_DO_NOT_CORRESPOND_TO_THE_COLORS_ON_THE_WHEEL_EACH_SPIN_CAN_RESULT_IN_A_WIN_OR_LOSS_OF_MONEY_WITH_THE_WHEEL_AT_THE_TOP_DISPLAYING_THE_MONEY_YOU_WON_AND_THE_BOTTOM_DISPLAYING_THE_MONEY_YOU_LOST_THE_TOTAL_AMOUNT_REMAINING_IS_DISPLAYED_AT_THE_TOP_OF_THE_SCREEN_YOU_START_WITH_$2000_AND_HAVE_20_SPINS_PER_GAME_BY_DEFAULT_POINTS_AT_THE_END_OF_A_SESSION_ARE_REPRESENTED_IN_THE_AMOUNT_OF_MONEY_YOU_HAVE")}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.startbtnDiv}>
                <Button className={classes.popupstartBtn} onClick={() => {
                    props.setOpen(false)
                }
                } color="primary">
                    {i18n.t("OK")}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

