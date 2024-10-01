// Core Imports
import React, { useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  Box,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Fab,
  Icon,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { GameComponent } from "./GameComponent";
import GameEnd from "./GameEnd";
import { isMobile } from "react-device-detect";
import InstructionModal from "../components/InstructionModal";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& h3": {
      fontSize: 26,
      fontWeight: "bold",
      marginTop: 40,
    },
    "& h4": {
      fontSize: 22,
      fontWeight: "normal",
      marginTop: 40,
      marginBottom: 40,
    },
    "& p": {
      fontSize: 18,
      color: "#7599FF",
      fontWeight: 300,
    },
  },
  btnBlue: {
    background: "#7599FF",
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
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#7599FF",
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
  },
  innercontainer: {
    display: "flex",
    height: "100%",
  },
}));
export default function Instructions({ ...props }) {
  const classes = useStyles();
  const [noBack] = useState(false);
  const { t } = useTranslation();
  const[showModal,setShowModal] = useState(false);
  const [view, setView] = useState("");
  const handleNextClick = () => {
    setView("start game");
  };

  useEffect(()=>{
    if(isMobile)setShowModal(true)
      else{setView("instruction")}
  },[])

  return (
    <div className={classes.root}>      
      {view === "instruction" && (
        <Box p={0} className={classes.container}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.innercontainer}
          >
            <Grid item lg={7} sm={10} xs={12}>
              <Box p={3}>
                <Typography variant="body1" align="center">
                  Move the white dot to the center. The white dot will be
                  visible during your reach. Quickly move your white dot to the
                  target. Press SPACE BAR when you are ready to proceed.
                </Typography>
                <Box textAlign="center" pt={3} mt={2}>
                  <Fab className={classes.btnBlue} onClick={handleNextClick}>
                    <Typography variant="h6">{t("Start Game")}</Typography>
                  </Fab>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}      
      <InstructionModal
      show={showModal}
      onHide={()=>{setShowModal(false); setView("instruction")}}
      message={"Please use Portrait  Orientation"}
      />     

      {view === "start game" && (
        <GameComponent adventure="Medium" setView={setView} clickBack={props.clickBack}/>
      )}
      {view === "end game" && <GameEnd />}
    </div>
  );
}
