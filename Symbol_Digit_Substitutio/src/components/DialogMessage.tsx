// Core Imports
import React, {useEffect, useState} from "react"
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
                {<span> {!!props.showMapping && props.showMapping === "not_at_all" ? `${t("In this game, you will be shown a symbol in the middle of your screen, represented by a greek letter. This symbol will correspond to a numerical digit.")}` :
                    !!props.showMapping ? `${t("In this game, you will be shown a symbol in the middle of your screen, represented by a greek letter. This symbol will correspond to a numerical digit. There is a symbol-mapping legend in the top row of your screen. Use the legend to identify the digit which corresponds to your symbol. Then, press the button at the bottom of the screen which contains this digit. After you select the correct button, you will move on to a new symbol. Try to get as many symbols as you can.")}` : ""}</span>}


            </DialogContentText>
        </DialogContent>
        <DialogActions className={props.showMapping !== "before" ? classes.startbtnDiv : ""}>
            <Button className={props.showMapping !== "before" ? classes.popupstartBtn : ""} onClick={() => {
                props.setOpen(false)
                if (props.showMapping !== "before") { props.setStartGame(true) }
            }
            } color="primary">
                {props.showMapping !== "before" ? `${t("Start Game")}` : `${t("Ok")}`}
            </Button>

        </DialogActions>
    </Dialog>
        
    )
}



