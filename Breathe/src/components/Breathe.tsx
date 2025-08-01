import "react-circular-progressbar/dist/styles.css";
import i18n from "../i18n";
import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Typography,
  makeStyles,
  Box,
  Slide,
  useMediaQuery,
  useTheme,
  Container,
  LinearProgress,
  createStyles,
  withStyles,
  Theme,
  AppBar,
  Icon,
  IconButton,
  Toolbar,
  Grid,
  Fab,
  CircularProgress,
  Link,
  Tooltip,
} from "@material-ui/core";
import Lotus from "./Lotus";
import { useTranslation } from "react-i18next";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#FFAC98",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#E56F61",
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  likebtn: {
    fontStyle: "italic",
    width: 36,
    height: 36,
    padding: 9,
    margin: "0 5px",
    "&:hover": { background: "#FE8470" },
    "& label": {
      position: "absolute",
      bottom: -18,
      fontSize: 12,
    },
  },
  "@keyframes InhaleText": {
    "0%": { opacity: 0 },
    "15%": { opacity: 1 },
    "40%": { opacity: 1 },
    "50%": { opacity: 0, display: "inline" },
    "75%": { opacity: 0 },
    "100%": { opacity: 0, display: "none" },
  },
  "@keyframes ExhaleText": {
    "0%": { opacity: 0 },
    "25%": { opacity: 0, display: "none" },
    "50%": { opacity: 0 },
    "65%": { opacity: 1, display: "inline" },
    "80%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  inhale_exhale: { position: "relative", height: 50 },
  InhaleContainer: {
    display: "block",
    animation: "$InhaleText 10s ease infinite",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: 30,
    textTransform: "capitalize",
  },
  ExhaleContainer: {
    display: "block",
    marginTop: "-2rem",
    animation: "$ExhaleText 10s ease infinite",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: 30,
    textTransform: "capitalize",
  },
  active: { background: "#FE8470" },
  toolbardashboard: {
    minHeight: 65,
    padding: "0 10px",
    "& h5": {
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      width: "calc(100% - 96px)",
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
    },
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

  breatheReview: {
    "& h4": { fontSize: 25, fontWeight: 600, marginBottom: 25, marginTop: -50 },
    "& p": { fontStyle: "italic", color: "rgba(0, 0, 0, 0.5)", margin: 15 },
  },
  progress: {
    color: "#E46759",
  },

  videoNav: {
    marginBottom: 30,
    "& video": {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: 400,
      },
    },
  },
  lineyellow: {
    background: "#FFD645",
    height: "3px",
  },
  linegreen: {
    background: "#65CEBF",
    height: "3px",
  },
  linered: {
    background: "#FF775B",
    height: "3px",
  },
  lineblue: {
    background: "#86B6FF",
    height: "3px",
  },
  colorLine: { maxWidth: 115 },
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

export default function Breathe({ ...props }) {
  const classes = useStyles();
  const [started, setStarted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState("Yes");
  const [progress, setProgress] = React.useState(100);
  const [progressLabel, setProgressLabel] = React.useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [inhale, setInhale] = useState(true);
  const [playMusic, setPlayMusic] = useState(true);
  const [audio, setAudio] = useState(null);
  const [time, setTime] = useState(new Date().getTime());
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite
  );
  const [forward, setForward] = useState(props?.data?.forward);
  const [isForwardButton, setIsForwardButton] = useState(false);
  const tabDirection = (currentTab: number) => {
    return supportsSidebar ? "up" : "left";
  };
  const handleNext = () => {
    setTab(tab + 1);
    setIsLoading(true);
    if (!!audio) {
      (audio || new Audio()).loop = true;
      playMusic && tab < 1
        ? (audio || new Audio()).play()
        : (audio || new Audio()).pause();
    }
  };

  const videoLoaded = () => {
    setIsLoading(false);
    setStarted(!started);
    setTime(new Date().getTime());
    setProgressUpdate();
  };

  const setProgressUpdate = () => {
    const val = progressLabel - 1;
    if (val === -1) {
      setProgressLabel(4);
      setProgress(100);
      setInhale(!inhale);
    } else {
      setProgressLabel(val);
    }
  };

  useEffect(() => {
    const settingsData =
      props.data.activity?.settings ?? props.data.settings ?? {};
    const configuration = props.data.configuration;
    const langugae = configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US";
    i18n.changeLanguage(langugae);
    setSettings(settingsData);
    if (
      (!!settingsData &&
        !!settingsData?.audio_url &&
        (settingsData?.audio_url || "").trim() !== "") ||
      !!settingsData?.audio
    ) {
      setAudio(new Audio(settingsData?.audio_url ?? settingsData?.audio ?? ""));
    }
  }, []);

  useEffect(() => {
    if (started) {
      setTimeout(setProgressUpdate, 1000);
      const val = progress - 25 >= 0 ? progress - 25 : 100;
      setProgress(val < 0 ? 0 : val);
    }
  }, [progressLabel]);

  useEffect(() => {
    if (started) {
      if (progressValue < 100) {
        const val =
          progressValue +
          (!!audio && !isNaN(audio.duration)
            ? Math.round((100 / audio.duration) * 10) / 10
            : 0.8);
        setProgressValue(val > 100 ? 100 : val);
      } else {
        setStarted(!started);
        setPlayMusic(false);
        handleNext();
      }
    }
  }, [progress]);

  const handleClickStatus = (statusVal: string) => {
    setStatus(statusVal);
  };

  const onBreatheComplete = (statusVal?: boolean) => {
    parent.postMessage(
      !!statusVal
        ? JSON.stringify({
            timestamp: time,
            duration: new Date().getTime() - time,
            static_data: {
              sentiment: status,
              is_favorite: isFavoriteActive,
            },
            temporal_slices: [],
            ...(forward && { forward: isForwardButton }),
            done: true,
          })
        : JSON.stringify({
            timestamp: time,
            duration: new Date().getTime() - time,
            temporal_slices: [],
            static_data: {
              is_favorite: isFavoriteActive,
            },
            ...(forward && { forward: isForwardButton }),
          }),
      "*"
    );
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };
  const handleForwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        duration: new Date().getTime() - time,
        temporal_slices: [],
        static_data: {
          is_favorite: isFavoriteActive,
        },
        forward: true,
      }),
      "*"
    );
  };
  const handleBackClick = () => {
    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        duration: new Date().getTime() - time,
        temporal_slices: [],
        static_data: {
          is_favorite: isFavoriteActive,
        },
        forward: false,
        clickBack: true,
      }),
      "*"
    );
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "#FBF1EF", boxShadow: "none" }}
      >
        <Toolbar className={classes.toolbardashboard}>
          <IconButton
            onClick={() => {
              setPlayMusic(false);
              if (!!audio) {
                audio.pause();
              }
              setAudio(null);
              setIsForwardButton(false);
              handleBackClick();
            }}
            color="default"
            aria-label="Menu"
          >
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h5">
            {t("Breathe")}{" "}
            <Tooltip
              title={
                isFavoriteActive
                  ? "Tap to remove from Favorite Activities"
                  : "Tap to add to Favorite Activities"
              }
            >
              <Fab
                className={`${classes.headerTitleIcon} ${
                  isFavoriteActive ? "active" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <Icon>star_rounded</Icon>
              </Fab>
            </Tooltip>{" "}
          </Typography>
          {forward && (
            <IconButton onClick={handleForwardClick}>
              <Icon>arrow_forward</Icon>
            </IconButton>
          )}
        </Toolbar>
        <BorderLinearProgress variant="determinate" value={progressValue} />
      </AppBar>
      <Container>
        <Slide
          in={tab === 0}
          direction={tabDirection(0)}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Box textAlign="center">
              {supportsSidebar && (
                <Box pt={4}>
                  <Typography variant="h6">{t("Prepare yourself")}</Typography>
                  <Box textAlign="center" px={4} pt={2}>
                    <Typography variant="body2" component="p">
                      {t(
                        "Get yourself comfortable and when you’re ready tap the start button."
                      )}
                    </Typography>
                    {/* <img src={Lotus} className={classes.flower}/> */}
                    {/* <Box className={classes.flower + " " + lotus} /> */}
                    <Lotus />
                  </Box>
                </Box>
              )}
              {!supportsSidebar && (
                <Box>
                  <Lotus />
                  <Typography variant="h6">{t("Get ready")}</Typography>
                  <Box textAlign="center" px={4} pt={2} pb={5}>
                    <Typography variant="body2" component="p">
                      {t(
                        "Get yourself comfortable and when you’re ready tap the start button."
                      )}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box textAlign="center" mt={1}>
                <Fab className={classes.btnpeach} onClick={handleNext}>
                  {t("Start")}
                </Fab>
              </Box>
            </Box>
          </Box>
        </Slide>
        <Slide
          in={tab === 1}
          direction={tabDirection(1)}
          mountOnEnter
          unmountOnExit
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            {isLoading && (
              <Box alignItems="center">
                <Box width={1}>
                  <CircularProgress />
                </Box>
              </Box>
            )}
            <Grid item className={classes.videoNav}>
              <video
                src="./videos/Lotus.mp4"
                autoPlay={true}
                onLoadedData={() => {
                  videoLoaded();
                }}
                loop
                preload={"metadata"}
              />
              {started && (
                <Box className={classes.inhale_exhale}>
                  <Typography
                    variant="overline"
                    className={classes.ExhaleContainer}
                  >
                    {t("Exhale")}
                  </Typography>
                  <Typography
                    variant="overline"
                    className={classes.InhaleContainer}
                  >
                    {t("Inhale")}
                  </Typography>
                </Box>
              )}
            </Grid>
            {started && (
              <Box style={{ width: "100px", height: "100px" }}>
                {inhale && (
                  <CircularProgressbar
                    value={progress}
                    text={`${progressLabel}`}
                    strokeWidth={8}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      pathColor: "#E46759",
                      textColor: "#BC453D",
                      trailColor: "#FFAC98",
                      textSize: "45px",
                      pathTransitionDuration: 1,
                    })}
                  />
                )}
                {!inhale && (
                  <CircularProgressbar
                    value={progress}
                    text={`${progressLabel}`}
                    strokeWidth={8}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      pathColor: "#E46759",
                      textColor: "#BC453D",
                      trailColor: "#FFAC98",
                      textSize: "45px",
                      pathTransitionDuration: 1,
                    })}
                  />
                )}
              </Box>
            )}
          </Grid>
        </Slide>
        <Slide
          in={tab === 2}
          direction={tabDirection(2)}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            <Box textAlign="center" className={classes.breatheReview}>
              <Lotus />
              <Typography variant="h4">{t("Nicely done!")}</Typography>
              <Box mt={4} mb={2}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    container
                    className={classes.colorLine}
                    spacing={0}
                    xs={4}
                    md={4}
                    lg={2}
                  >
                    <Grid item xs={3} className={classes.lineyellow} />
                    <Grid item xs={3} className={classes.linegreen} />
                    <Grid item xs={3} className={classes.linered} />
                    <Grid item xs={3} className={classes.lineblue} />
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="body2">
                {t("Was this helpful today?")}
              </Typography>
              <Box textAlign="center" mb={5}>
                <IconButton
                  onClick={() => handleClickStatus("Yes")}
                  className={
                    status === "Yes"
                      ? classes.likebtn + " " + classes.active
                      : classes.likebtn
                  }
                >
                  <ThumbUpAltOutlinedIcon />
                  <label>{t("Yes")}</label>
                </IconButton>
                <IconButton
                  onClick={() => handleClickStatus("No")}
                  className={
                    status === "No"
                      ? classes.likebtn + " " + classes.active
                      : classes.likebtn
                  }
                >
                  <ThumbDownAltOutlinedIcon />
                  <label>{t("No")}</label>
                </IconButton>
              </Box>
              <Box textAlign="center" pt={4}>
                <Link
                  className={classes.btnpeach}
                  onClick={() => onBreatheComplete(true)}
                >
                  {t("Done")}
                </Link>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Container>
    </div>
  );
}
