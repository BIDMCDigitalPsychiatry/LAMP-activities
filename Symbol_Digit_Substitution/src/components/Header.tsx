// Core Imports
import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Icon,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  toolbardashboard: {
    minHeight: 65,
    padding: "0",
    width: "100%",
    justifyContent: "center",
    "& h5": {
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      width: "calc(100% - 96px)",
    },
  },
  headerTitleIcon: {
    background: "none",
    boxShadow: "none",
    width: 36,
    height: 36,
    color: "#666",
    marginLeft: 8,
    "& .material-icons": {
      fontSize: "2rem",
    },
    "&:hover": {
      background: "#fff",
    },
    "&.active": {
      color: "#e3b303",
    },
  },
}));

export default function Header({ ...props }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const clickBack = (backButton, isnavigationBtn) => {
    props?.clickBackData(backButton,isnavigationBtn);
  };
    
  return (
    <AppBar
      position="static"
      style={{ background: "#FBF1EF", boxShadow: "none", position: "absolute" }}
    >
      <Toolbar className={classes.toolbardashboard}>
        {!props?.data && (
          <IconButton
            onClick={() => clickBack(true,true)}
            color="default"
            aria-label="Menu"
          >
            <Icon>arrow_back</Icon>
          </IconButton>
        )}
        <Typography variant="h5">
          {`${t("Symbol-Digit Substitution")}`}{" "}          
        </Typography>
        {props?.forward && (
          <IconButton
            onClick={() => clickBack(false,true)}
            color="default"
            aria-label="Menu"
          >
            <Icon>arrow_forward</Icon>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
