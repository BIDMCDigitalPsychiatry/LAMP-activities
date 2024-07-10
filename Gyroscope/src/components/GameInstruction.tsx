// Core Imports
import React, { useState } from "react"
import {
    Typography,
    makeStyles,
    Box,
    Grid,
    IconButton,
    AppBar,
    Toolbar,
    Fab,
    Icon
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import GameEnd from "./GameEnd"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& h3": {
            fontSize: 26,
            fontWeight: "bold",
            marginTop: 40
        },
        "& h4": {
            fontSize: 22,
            fontWeight: "normal",
            marginTop: 40,
            marginBottom: 40
        },
        "& p": {
            fontSize: 18,
            color: "#fff",
            fontWeight: 300
        }
    },
    btnWhite: {
        background: "#FFFFFF",
        padding: "15px 25px 15px 25px",
        borderRadius: "40px",
        minWidth: "200px",
        boxShadow: "none",
        lineHeight: "22px",
        display: "inline-block",
        cursor: "pointer",
        "& h6": {
            textTransform: "capitalize",
            fontSize: "16px",
            color: "#7599FF",
            fontWeight: "bold",
        },
        "& span": { cursor: "pointer" },
        "&:hover": {
            background: "#fff",
            boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        },
    },
    toolbardashboard: {
        minHeight: 65,
        padding: "0 10px",
        "& h5": {
            color: "rgba(0, 0, 0, 0.75)",
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            width: "calc(100% - 96px)",
        },
    },
    container: {
        height: "calc(100vh - 65px)",
        background: "#5E92F2"
    },
    innercontainer: {
        display: "flex",
        height: "100%"
    }
}))
export default function Instructions({ ...props }) {
    const classes = useStyles()
    const [noBack] = useState(false)
    const { t } = useTranslation()

    const [view, setView] = useState("start-game");

    const handleNextClick = () => {
      setView("start game");
    };
   

    return (
        <div className={classes.root}>
            {/* <AppBar position="static" style={{ background: "#fff", boxShadow: "0px 1px 1px #00000014" }}>
                <Toolbar className={classes.toolbardashboard}>
                    {!noBack && <IconButton color="default" aria-label="Menu">
                        <Icon>arrow_back</Icon>
                    </IconButton>}
                    <Typography variant="h5">{t("Cognitive Test")}</Typography>
                    <IconButton>
                        <Icon>refresh</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Box p={0} className={classes.container}>
            {view === "start-game" && (
                <Grid container justifyContent="center" alignItems="center" className={classes.innercontainer}>
                    <Grid item lg={7} sm={10} xs={12}>
                        <Box p={3}>
                            <Typography variant="body1" align="center">
                                Move the white dot to the center. The white dot will be visible during your reach. Quickly move your white dot to the target. Press SPACE BAR when you are ready to proceed.
                            </Typography>
                            <Box textAlign="center" pt={3} mt={2}>
                                <Fab className={classes.btnWhite} onClick={handleNextClick}>
                                    <Typography variant="h6">{t("Start Game")}</Typography>
                                </Fab>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
             )} 
            {view === "start game" && 
                <GameEnd />
            }
            </Box>
        </div>
    )
}
