// Core Imports
import React, { useEffect, useState } from "react"
import {
  Typography,
  makeStyles,
  Box,
  Grid,
  IconButton,
  TextField,
  FormControl,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  Link,
  Fab,
  Backdrop,
  CircularProgress,
  Icon
} from "@material-ui/core"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import i18n from "../i18n"
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import CloseIcon from '@material-ui/icons/Close';
import ConfirmationDialog from "./ConfirmationDialog"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  likebtn: {
    fontStyle: "italic",
    padding: 6,
    margin: "0 5px",
    "&:hover": { background: "#FFAC98" },
    "& label": {
      position: "absolute",
      bottom: -18,
      fontSize: 12,
    },
  },
  active: {
    background: "#FFAC98 !important",
  },
  linkButton: {
    padding: "15px 25px 15px 25px",
  },
  dialogueContent: {
    padding: "10px 20px 35px 20px",
    textAlign: "center",
    "& h4": { fontSize: 25, fontWeight: 600, marginBottom: 15 },
    "& p": { fontSize: 16, fontWeight: 300, color: "rgba(0, 0, 0, 0.75)", lineHeight: "19px" },
  },
  dialogueStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
  textAreaControl: {
    width: "100%",
    marginTop: 35,

    borderRadius: 10,
    "& p": { position: "absolute", bottom: 15, right: 0 },
  },
  textArea: {
    borderRadius: "10px",
    marginBottom: "10px",
    "& fieldset": { borderWidth: 0, outline: 0 },
    "& textarea": { lineHeight: "24px" },
    "& div": { paddingBottom: "30px" },
  },
  btnpeach: {
    background: "#FFAC98",
    padding: "15px 25px 15px 25px",
    borderRadius: "40px",
    minWidth: "200px",
    boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
    lineHeight: "22px",
    display: "inline-block",    
    cursor: "pointer",
    "& h6":{
      textTransform: "capitalize",
      fontSize: "16px",
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: "bold",
    },
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#FFAC98",
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
  todaydate: { paddingLeft: 13, color: "rgba(0, 0, 0, 0.4)" },
  linkpeach: { fontSize: 16, color: "#BC453D", fontWeight: 600, cursor: "pointer" },
  howFeel: { fontSize: 14, color: "rgba(0, 0, 0, 0.5)", fontStyle: "italic", textAlign: "center", marginBottom: 10 },
  btnNav: { marginBottom: 0 },
  dialogueCurve: { borderRadius: 10, maxWidth: 400 },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}))
export default function JournalEntries({ ...props }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [journalValue, setJounalValue] = useState("")
  const [status, setStatus] = useState("good")
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState(new Date().getTime())
  const [noBack, setNoBack] = useState(false)
  const [id, setId] = useState(null)
  const [confirm, setConfirm] = useState(false)
  const { t } = useTranslation()
  const CHARACTER_LIMIT = 800
  const handleClickStatus = (statusVal: string) => {
    setStatus(statusVal)
  }
  
  useEffect(() => {
        if(typeof localStorage.getItem('activity-journal-'+(props.data?.activity?.id ?? "")) !== 'undefined' &&
        (localStorage.getItem('activity-journal-'+(props.data?.activity?.id ?? ""))?.trim()?.length ?? 0) > 0) {
          setLoading(true)
          setConfirm(true)
        } else { 
          setId(props.data?.activity?.id)
        }
        const configuration = props.data?.configuration ?? null
        const langugae = !!configuration
          ? configuration.hasOwnProperty("language")
            ? configuration.language
            : "en-US"
          : "en-US"
        i18n.changeLanguage(langugae)
        setNoBack(props?.data?.noBack)
        setTime(new Date().getTime())
  }, [])

  const saveJournal = (completed?: boolean) => {
    setLoading(true)
    !!completed ? 
    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        duration: new Date().getTime() - time,
        static_data: {
          text: journalValue,
          sentiment: status,
        },
        temporal_slices: [],
      }),
      "*"
    )
    : parent.postMessage(null, "*")
    setLoading(false)
  }

  const getDateString = (date: Date) => {
    const weekday = [t("Sunday"), t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday")]
    const monthname = [t("Jan"), t("Feb"), t("Mar"), t("Apr"), t("May"), t("Jun"), t("Jul"), 
    t("Aug"), t("Sep"), t("Oct"), t("Nov"), t("Dec")]
    return weekday[date.getDay()] + " " + monthname[date.getMonth()] + ", " + date.getDate()
  }

  useEffect(() => {
    if(!!id) { 
      localStorage.setItem('activity-journal-'+(id ?? ""), journalValue)
    }
  }, [journalValue])

  const loadData = (statusVal: boolean) => {
    if(!!statusVal) { 
      setId(props.data?.activity?.id)
      const val = localStorage.getItem('activity-journal-'+(props.data?.activity?.id ?? "")) ?? ""
      setJounalValue(val)
    } else {
      localStorage.setItem('activity-journal-'+(id ?? ""), "")
    }
    setLoading(false)
    setConfirm(false)
  }

  return (
    <div className={classes.root}>
      <ConfirmationDialog            
        onClose={() => setConfirm(false)}
        open={confirm}
        confirmAction={loadData} 
        confirmationMsg={t("Would you like to resume this activity where you left off?")}/>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar position="static" style={{ background: "#FBF1EF", boxShadow: "none" }}>
        <Toolbar className={classes.toolbardashboard}>
          {!noBack && <IconButton onClick={() => setOpen(true)} color="default" aria-label="Menu">
            <Icon>arrow_back</Icon>
          </IconButton>}
          <Typography variant="h5">{t("New journal entry")}</Typography>
        </Toolbar>
      </AppBar>
      <Box px={2}>
        <Grid container direction="row" justify="center" alignItems="flex-start">
          <Grid item lg={4} sm={10} xs={12}>
            <Box px={2}>
              <FormControl
                component="fieldset"
                classes={{
                  root: classes.textAreaControl,
                }}
              >
                <Typography variant="caption" className={classes.todaydate}>
                  {getDateString(new Date())}
                </Typography>
                <TextField
                  id="standard-multiline-flexible"
                  multiline
                  rows={10}
                  autoFocus={true}
                  value={journalValue}
                  onChange={(event) => setJounalValue(event.target.value)}
                  classes={{ root: classes.textArea }}
                  helperText={
                    journalValue
                      ? ` ${t("max")} ${journalValue.length}/${CHARACTER_LIMIT} ${t("characters")}`
                      : ` ${t("max")} ${CHARACTER_LIMIT} ${t("characters")}`
                  }
                  inputProps={{
                    maxLength: CHARACTER_LIMIT,
                  }}
                />
                <Box className={classes.howFeel}>{t("How do you feel today?")}</Box>
                <Grid className={classes.btnNav}>
                  <Box textAlign="center">
                    <IconButton
                      onClick={() => handleClickStatus("good")}
                      className={status === "good" ? classnames(classes.likebtn, classes.active) : classes.likebtn}
                    >
                      <ThumbUpAltOutlinedIcon />
                      <label>{t("Good")}</label>
                    </IconButton>
                    <IconButton
                      onClick={() => handleClickStatus("bad")}
                      className={status === "bad" ? classnames(classes.likebtn, classes.active) : classes.likebtn}
                    >
                      <ThumbDownAltOutlinedIcon />                      
                      <label>{t("Bad")}</label>
                    </IconButton>
                  </Box>
                </Grid>
                <Box textAlign="center" pt={4} mt={2}>
                  <Fab className={classes.btnpeach} onClick={() => saveJournal(true)}>
                    <Typography variant="h6">{t("Submit")}</Typography>
                  </Fab>
                </Box>
              </FormControl>
            </Box>

            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              scroll="paper"
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              classes={{
                root: classes.dialogueStyle,
                paper: classes.dialogueCurve,
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              <DialogContent className={classes.dialogueContent}>
                <Typography variant="h4">{t("Leaving so soon?")}</Typography>
                <Typography variant="body1">
                  {t("If you leave without submitting, your entry will be lost.")}
                </Typography>
              </DialogContent>
              <Grid>
                <Box textAlign="center" width={1} mt={1} mb={3}>
                  <Link
                    underline="none"
                    onClick={() => setOpen(false)}
                    className={classnames(classes.btnpeach, classes.linkButton)}
                  >
                    {t("No, don’t leave yet")}
                  </Link>
                </Box>
                <Box textAlign="center" width={1} mb={4}>
                  <Link underline="none" onClick={() => {
                    setOpen(false)
                    saveJournal(false)
                    localStorage.removeItem('activity-journal-'+(props?.activity?.id ?? ""))
                  }} className={classes.linkpeach}>
                    {t("Yes, leave")}
                  </Link>
                </Box>
              </Grid>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
