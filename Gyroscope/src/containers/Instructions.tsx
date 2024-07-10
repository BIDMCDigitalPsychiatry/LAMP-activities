// Core Imports
import React, { useState } from "react"
import {
  Typography,
  makeStyles,
  Box,
  Fab,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Icon
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Cognitiveimg from '../Cognitive.svg';
import VideoTutorial from "./VideoTutorial";
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
    }
  },
  btnblue: {
    background: "#7599FF",
    padding: "15px 25px 15px 25px",
    borderRadius: "40px",
    minWidth: "200px",
    boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
    lineHeight: "22px",
    display: "inline-block",
    cursor: "pointer",
    "& h6": {
      textTransform: "capitalize",
      fontSize: "16px",
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#5783ff",
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
}))
export default function Instructions({ ...props }) {
  const classes = useStyles()
  const [noBack] = useState(false)
  const { t } = useTranslation()
  const [view, setView] = useState("intro");

  const handleNextClick = () => {
    setView("next");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#fff", boxShadow: "0px 1px 1px #00000014" }}>
        <Toolbar className={classes.toolbardashboard}>
          {!noBack && <IconButton color="default" aria-label="Menu">
            <Icon>arrow_back</Icon>
          </IconButton>}
          <Typography variant="h5">{t("Cognitive Test")}</Typography>
          <IconButton>
            <Icon>refresh</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      {view === "intro" && (
              <Box px={2}>

        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item lg={6} sm={10} xs={12}>
            <Typography variant="h3" align="center" >
              Target Practice: Your Accuracy and Ability to Adapt
            </Typography>
            <Typography variant="h4" align="center">
              Please kindly turn off all computer notifications during this experiment.
            </Typography>
            <Grid container justifyContent="center">
              <Grid item lg={5} md={5} sm={10} xs={10}>
                <Box textAlign="center">
                  <img src={Cognitiveimg} width="100%" />
                </Box>
              </Grid>
            </Grid>
            <Box textAlign="center" pt={4} mt={2}>
              <Fab className={classes.btnblue} onClick={handleNextClick}>
                <Typography variant="h6">{t("Next")}</Typography>
              </Fab>
            </Box>
          </Grid>
        </Grid>
        </Box>

        )}
        
      {view === "next" && (
          <VideoTutorial />
        )}
    </div>
  )
}
