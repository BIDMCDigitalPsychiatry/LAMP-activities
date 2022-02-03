// Core Imports
import React, { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  IconButton,
  ButtonBase,
  AppBar,
  Toolbar,
  Icon,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core"
import i18n from "../i18n"
import Exercise from "./Exercise"
import Reading from "./Reading"
import Sleeping from "./Sleeping"
import Nutrition from "./Nutrition"
import Medication from "./Medication"
import Emotions from "./Emotions"
import BreatheIcon from "./Breathe"
import Savings from "./Savings"
import Weight from "./Weight"
import Custom from "./Custom"
import ResponsiveDialog from "./ResponsiveDialog"
import NewGoals from "./NewGoal"
import classnames from "classnames"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    cardlabel: {
      fontSize: 14,

      padding: "0 18px",
      bottom: 8,
      position: "absolute",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        bottom: 30,
      },
    },
    header: {
      background: "#FFEFEC",
      padding: "25px 20px 10px",
      textAlign: "center",

      "& h2": {
        fontSize: 25,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
      },
      "& h6": {
        fontSize: "14px",
        fontWeight: "normal",
        textAlign: "left",
      },
    },
    scratch: {
      "& h2": {
        textAlign: "center !important",
      },
      "& h6": {
        textAlign: "center !important",
      },
    },

    topicon: {
      minWidth: 120,
    },
    dialogueContent: {
      padding: 20,
      "& h4": { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
    },
    dialogtitle: { padding: 0 },
    manage: {
      background: "#FFEFEC",
      padding: "10px 0",
      minHeight: 105,
      textAlign: "center",
      boxShadow: "none",
      borderRadius: 10,
      position: "relative",
      width: "100%",
      "& svg": {
        [theme.breakpoints.up("lg")]: {
          width: 150,
          height: 150,
          marginTop: 20,
        },
        [theme.breakpoints.down("md")]: {
          width: 130,
          height: 130,
          marginTop: 20,
        },
        [theme.breakpoints.down("xs")]: {
          width: 60,
          height: 60,
          marginTop: 0,
        },
      },

      [theme.breakpoints.up("sm")]: {
        minHeight: 230,
      },
      [theme.breakpoints.up("lg")]: {
        minHeight: 240,
      },
    },
    thumbMain: { maxWidth: 255 },
    thumbContainer: {
      maxWidth: 1055,
      width: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        paddingBottom: 80,
      },
    },
    fullwidthBtn: { width: "100%" },
    goalHeading: {
      textAlign: "center",
      "& h5": { fontSize: 18, fontWeight: 600, margin: "25px 0 15px", color: "rgba(0, 0, 0, 0.75)" },
      "& h6": {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.4)",
        marginBottom: 15,
      },
    },
  })
)

export default function Goals({ ...props }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [dialogueType, setDialogueType] = React.useState("")
  const [classType, setClassType] = useState("")
  const [goalType, setGoalType] = useState("")
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [goalTime, setGoalTime] = useState(null)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const [routes, setRoutes] = useState<any>([])

  useEffect(() => { 
    // const activity = props.data.activity ?? (props.data ?? {});
    const configuration = props.data?.configuration;
    i18n.changeLanguage(!!configuration ? configuration?.language : "en-US");
  }, [])

  const handleClickOpen = (type: string) => {
    setGoalType(type)
    setDialogueType(type)
    const classT = type === "Scratch card" ? classnames(classes.header, classes.scratch) : classes.header
    setClassType(classT)
    setGoalTime(new Date().getTime())
    setOpen(true)
  }

  const setSlices = (type) => {
    const route = {
      duration: new Date().getTime() -goalTime,
      item: index,
      level: type,
      type: null,
      value: null,
    };
    const troutes = []
    if(routes.length > 0) {
      const r = JSON.parse(routes)
      Object.keys(r).forEach((key) => {
        troutes.push(r[key]);
      });
    }
    troutes.push(route)
    setRoutes(JSON.stringify(troutes))
    setIndex(index+1)
  }

  const postData = () => {
    parent.postMessage(routes.length > 0 ? JSON.stringify({        
      timestamp: new Date().getTime(),
      duration: new Date().getTime() - startTime,
      temporal_slices: JSON.parse(routes),
      static_data: {},
     }) : null, "*")  
  }

  return (
    <div>
      <AppBar position="static" style={{ background: "#FBF1EF", boxShadow: "none" }}>
        <Toolbar className={classes.toolbardashboard}>
          <IconButton onClick={() => postData()} color="default" aria-label="Menu">
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h5">{t("Create goal")}</Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.goalHeading}>
        <Typography variant="h5">{t("What type of goal?")}</Typography>
        <Typography variant="subtitle1">{t("Choose a category")}</Typography>
      </Box>
      <Container className={classes.thumbContainer}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Exercise")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Exercise />
                </Box>
                <Typography className={classes.cardlabel}>{t("Exercise")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Weight")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Weight />
                </Box>
                <Typography className={classes.cardlabel}>{t("Weight")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Nutrition")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Nutrition />
                </Box>
                <Typography className={classes.cardlabel} />
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} onClick={() => handleClickOpen("Sleep")} className={classes.thumbMain}>
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Sleeping />
                </Box>
                <Typography className={classes.cardlabel}>{t("Sleep")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Meditation")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <BreatheIcon />
                </Box>
                <Typography className={classes.cardlabel}>{t("Meditation")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Reading")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Reading />
                </Box>
                <Typography className={classes.cardlabel}>{t("Reading")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Finances")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Savings />
                </Box>
                <Typography className={classes.cardlabel}>{t("Finances")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} onClick={() => handleClickOpen("Mood")} className={classes.thumbMain}>
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box mt={1}>
                  <Emotions />
                </Box>
                <Typography className={classes.cardlabel}>{t("Mood")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Medication")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Medication />
                </Box>
                <Typography className={classes.cardlabel}>{t("Medication")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            onClick={() => handleClickOpen("Custom")}
            className={classes.thumbMain}
          >
            <ButtonBase focusRipple className={classes.fullwidthBtn}>
              <Card className={classes.manage}>
                <Box>
                  <Custom />
                </Box>
                <Typography className={classes.cardlabel}>{t("Custom")}</Typography>
              </Card>
            </ButtonBase>
          </Grid>
        </Grid>
        <ResponsiveDialog
          transient={false}
          animate
          fullScreen
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <NewGoals
            // participant={participant}
            onSave={setSlices}
            goalType={goalType}
            onComplete={() => {
              setOpen(false)
            }}
          />
        </ResponsiveDialog>
      </Container>
    </div>
  )
}
