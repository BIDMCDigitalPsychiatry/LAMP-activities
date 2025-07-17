// Core Imports
import React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Box,
  Grid,
  IconButton,
  Container,
  AppBar,
  Toolbar,
  Icon,
  Tooltip,
  Fab,
} from "@material-ui/core";
import ResponsiveDialog from "./ResponsiveDialog";
import TipNotification from "./TipNotification";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const useStyles = makeStyles((theme) => ({
  topicon: {
    minWidth: 180,
    minHeight: 180,
    [theme.breakpoints.down("xs")]: {
      minWidth: 180,
      minHeight: 180,
    },
  },
  root2: {
    maxWidth: 345,
    margin: "16px",
    maxLength: 500,
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
  media: {
    height: 200,
  },
  header: {
    background: "#FFF9E5",
    padding: "0 20px 20px 20px",
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
    "& h2": {
      fontSize: 25,
      fontWeight: 600,
      color: "rgba(0, 0, 0, 0.75)",
    },
  },
  headerIcon: { textAlign: "center" },
  tipscontentarea: {
    padding: 20,
    "& h3": {
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "15px",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "20px",
      color: "rgba(0, 0, 0, 0.75)",
    },
  },
  tipStyle: {
    background: "#FFF9E5",
    borderRadius: "10px",
    padding: "20px 20px 20px 20px",
    textAlign: "justify",
    margin: "20px auto 0px",
    "& h6": { fontSize: 16, fontWeight: 600, color: "rgba(0, 0, 0, 0.75)" },
  },
  toolbardashboard: {
    minHeight: 65,
    // padding: "0 10px",
    display: "flex",
    justifyContent: "space-between",    
    "& h5": {
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      width: "calc(100% - 96px)",
    },
  },

   toolbardashboardfwd: {
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
  rightArrow: {
    maxWidth: 50,
    // padding: "15px 12px 11px 12px !important",
    "& svg": { color: "rgba(0, 0, 0, 0.5)" },
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
  likebtn: {
    fontStyle: "italic",
    padding: 6,
    margin: "0 5px",
    "&:hover": { background: "#FFD645" },
    "& label": {
      position: "absolute",
      bottom: -18,
      fontSize: 12,
    },
  },
  active: {
    background: "#FFD645",
  },
  howFeel: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
  btnyellow: {
    background: "#FFD645",
    borderRadius: "40px",
    minWidth: "200px",
    boxShadow: "0px 10px 15px rgba(255, 214, 69, 0.25)",
    lineHeight: "38px",
    marginTop: "12%",
    cursor: "pointer",
    textTransform: "capitalize",
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.75)",
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#FFD645",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
  },
  colorLine: { maxWidth: 115 },
  // titleText: { marginTop: "8px" },
}));

export default function LearnTips({ ...props }) {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState(null);
  const [details, setDetails] = useState(null);
  const [images, setImages] = useState(null);
  const [settings, setSettings] = useState([]);
  const [activityData, setActivityData] = useState<any>(null);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );
  const [isForward, setIsForward] = useState(props?.data?.forward ?? false)
  const { t } = useTranslation();

  useEffect(() => {
    const propsData = props.data;
    const settingsData =
      propsData.activity?.settings ?? propsData.settings ?? {};
    const configuration = propsData.configuration;
    const langugae = configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US";
    i18n.changeLanguage(langugae);
    setSettings(settingsData);
    setActivityData(propsData.activity ?? {});
    if (settingsData?.length === 1) {
      setOpenDialog(true);
      setTitle(settingsData[0]?.title);
      setDetails(settingsData[0]?.text);
      setImages(settings[0]?.image);
    }
  }, []);

  // useEffect(() => {
  //   if (settings?.length === 1) {
  //     setOpenDialog(true);
  //     setTitle(settings[0].title);
  //     setDetails(settings[0].text);
  //     setImages(settings[0].image);
  //   }
  // }, [settings]);

  const completeMarkingTips = (status: string, isFavoriteActive: boolean) => {
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        static_data: {
          sentiment: status,
          is_favorite: isFavoriteActive,
        },
        ...(isForward && { forward: isForward }),
        done:true,
        temporal_slices: [],
      }),
      "*"
    );
  };

  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };

  const backToParentTips = () => {
    // eslint-disable-next-line no-restricted-globals
    /*eslint no-restricted-globals: ["error", "event"]*/
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
      }),
      "*"
    );
  };

  const handleForwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
        forward: true,
      }),
      "*"
    );
  };
  const handleBackwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
        ...(isForward && { forward: false }),
      }),
      "*"
    );
  };


  const handleSubTipBack = () => {
    if (settings?.length === 1) {
      backToParentTips();
    } else {
      setOpenDialog(false);
    }
  };
  return (
    <Container>
      <Box pb={4}>
        {settings?.length !== 1 && (
          <>
            <Grid container alignItems="center" className={classes.toolbardashboard}>
              <Grid item xs className={classes.rightArrow}>
                <IconButton
                  aria-label="Back"
                  onClick={handleBackwardClick}
                >
                  <Icon>arrow_back</Icon>
                </IconButton>
              </Grid>
              <Grid item xs>
                <Typography variant="h6">
                  {activityData ? t(activityData.name) : ""}
                  <Tooltip
                    title={
                      isFavoriteActive
                        ? "Tap to remove from Favorite Activities"
                        : "Tap to add to Favorite Activities"
                    }
                  >
                    <Fab
                      className={`${classes.headerTitleIcon} ${isFavoriteActive ? "active" : ""
                        }`}
                      onClick={handleFavoriteClick}
                    >
                      <Icon>star_rounded</Icon>
                    </Fab>
                  </Tooltip>
                </Typography>
              </Grid>
              {isForward &&
                <Grid item xs className={classes.rightArrow}>
                  <IconButton
                    aria-label="Back"
                    onClick={handleForwardClick}
                  >
                    <Icon>arrow_forward</Icon>
                  </IconButton>
                </Grid>
              }
            </Grid>
            <Grid container direction="row" alignItems="stretch">
              {settings?.length > 0
                ? settings.map((detail: any, index: any) => (
                  <Grid
                    key={index}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item lg={6} sm={12} xs={12}>
                      <Box
                        className={classes.tipStyle}
                        onClick={() => {
                          setOpenDialog(true);
                          setTitle(detail.title);
                          setDetails(detail.text);
                          setImages(detail.image);
                          // setIsFavoriteActive(detail.is_favorite);
                        }}
                      >
                        <div>
                          <Grid container spacing={3}>
                            <Grid item xs lg>
                              <Typography variant="h6">
                                {t(detail.title)}
                              </Typography>
                            </Grid>
                            <Grid item xs lg className={classes.rightArrow}>
                              <Icon>chevron_right</Icon>
                            </Grid>
                          </Grid>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                ))
                : ""}
            </Grid>
          </>
        )}
      </Box>
      <ResponsiveDialog
        transient={false}
        animate
        fullScreen
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <AppBar
          position="static"
          style={{ background: "#FFF9E5", boxShadow: "none" }}
        >
          <Toolbar className={classes.toolbardashboard}>
            <IconButton
              onClick={() => handleSubTipBack()}
              color="default"
              aria-label="Menu"
            >
              <Icon>arrow_back</Icon>
            </IconButton>
            {isForward &&
              <IconButton
                onClick={() => handleForwardClick()}
                color="default"
                aria-label="Menu"
              >
                <Icon>arrow_forward</Icon>
              </IconButton>
          } 
          </Toolbar>
                
        </AppBar>
        <TipNotification
          title={title}
          details={details}
          icon={!!activityData ? activityData.icon : null}
          images={images}
          isFavoriteActive={isFavoriteActive}
          onComplete={(status: string, isFavoriteActive: boolean) => {
            setOpenDialog(false);
            completeMarkingTips(status, isFavoriteActive);
          }}
          setIsFavoriteActive={setIsFavoriteActive}
          hideFavorite={settings.length === 1 ? true : false}
        />
      </ResponsiveDialog>
    </Container>
  );
}
