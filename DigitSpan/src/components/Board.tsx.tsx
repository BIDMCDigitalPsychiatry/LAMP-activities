import React, { useEffect, useState } from "react"
import {
  Icon,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  CardContent,
  Grid,
  Box,
  Fab,
  Container,
  AppBar,
  Toolbar,
} from "@material-ui/core"

import i18n from "../i18n"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: "#FBF1EF",
      padding: 20,
      [theme.breakpoints.up("sm")]: {
        textAlign: "center",
      },
      "& h2": {
        fontSize: 25,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.75)",
      },
    },
    activityDesc: {
      "& p" : {
        fontSize: "17px !important",
        fontWeight: 600,
        textAlign: "center"
      },
      "& blockquote": { borderLeft: "5px solid #ccc", margin: "1.5em 10px", padding: "0.5em 10px" },
      "& code": {
        padding: ".2rem .5rem",
        margin: "0 .2rem",
        fontSize: "90%",
        whiteSpace: "noWrap",
        background: "#F1F1F1",
        border: "1px solid #E1E1E1",
        borderRadius: "4px",
      },
    },
    tipscontentarea: {
      padding: "40px 20px 20px",
      "& h3": {
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "15px",
      },
      "& h2": {
        fontSize: "35px",
        fontWeight: 600,
        textAlign: "center"
      },
      "& p": {
        fontSize: "16px",
        lineheight: "24px",
        marginBottom: 20,
        color: "rgba(0, 0, 0, 0.75)",
      },
      "& img": {
        maxWidth: "100%",
        marginBottom: 15,
      },
      "& h6": { fontSize: 14, fontWeight: 700, fontStyle: "italic" },
      "& a": { fontSize: 14, fontStyle: "italic" },
    },
    btnpeach: {
      background: "#FFAC98",
      padding: "15px 25px 15px 25px",
      borderRadius: "40px",
      minWidth: "200px",
      boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
      lineHeight: "22px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "16px",
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: "bold",
      cursor: "pointer",
      "& span": { cursor: "pointer" },
      "&:hover": {
        background: "#FFAC98",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        textDecoration: "none",
      },
    },
    headerIcon: {
      textAlign: "center",
      marginBottom: 15,
      "& img": { maxWidth: "100%", width:"100px" },
    },
    mainContainer: { padding: 0 },
    toolbardashboard: {
      minHeight: 65,
      padding: "0 10px",
      "& h5": {
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
        width: "calc(100% - 96px)",
        [theme.breakpoints.up("sm")]: {
          textAlign: "left",
        },
      },
    },
  })
)
  
export default function Board({ ...props }) {
  const classes = useStyles()
  const [activity, setActivity] = useState<any>(null)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const { t } = useTranslation()

  useEffect(() => {
    const configuration = props.data?.configuration ?? null
    const langugae = !!configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US"
    i18n.changeLanguage(langugae)
    setStartTime(new Date().getTime())
    setActivity(props.data.activity)
  }, [])

  
  return (
    <React.Fragment>

      <Box>
    <AppBar position="static" style={{ background: "#FBF1EF", boxShadow: "none" }}>
      <Toolbar className={classes.toolbardashboard}>
        <IconButton
          onClick={() => {
            parent.postMessage(null, "*")
          }}
          color="default"
          aria-label="Menu"
        >
          <Icon>arrow_back</Icon>
        </IconButton>
        <Typography variant="h5">Digit Span</Typography>

      </Toolbar>
    </AppBar>


    <Container maxWidth={false} className={classes.mainContainer}>
      
          </Container>
          </Box>
 </React.Fragment>
         
  )
}
