import React from "react";
import {
  useState,
  useRef,
  useEffect,
  Suspense,
  Component,
  ReactNode,
} from "react";
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
  Tooltip,
} from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";
import "material-icons";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: "#FFF9E5",
      padding: 20,
      // [theme.breakpoints.up("sm")]: {
      //   textAlign: "center",
      // },
      "& h2": {
        fontSize: 25,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      },
    },
    tipscontentarea: {
      padding: "40px 20px 20px",
      "& h3": {
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "15px",
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
    btnyellow: {
      background: "#FFD645",
      borderRadius: "40px",
      minWidth: "200px",
      boxShadow: "0px 10px 15px rgba(255, 214, 69, 0.25)",
      lineHeight: "38px",
      marginTop: "15%",
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
    howFeel: {
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.5)",
      fontStyle: "italic",
      textAlign: "center",
      marginBottom: 10,
    },
    colorLine: { maxWidth: 115 },
    headerIcon: {
      textAlign: "center",
      marginBottom: 15,
      "& img": { maxWidth: "100%" },
    },
    mainContainer: { padding: 0 },
    tipsdetails: {
      "& blockquote": {
        borderLeft: "5px solid #ccc",
        margin: "1.5em 10px",
        padding: "0.5em 10px",
      },
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
    iframeVideo: {
      height: 350,
      // [theme.breakpoints.down("md")]: {
      //   height: 250,
      // }
    },
    iconContainer: {
      color: "#FFD645",
      "& span": {
        fontSize: 30,
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
  })
);

function LinkRenderer(props: any) {
  // return (
  //   (props.href) ?
  //     ReactPlayer.canPlay(props.href) ? (
  //       <VideoRenderer url={props.href} />
  //     ) : (
  //       <LinkRenderer href={props.href}>{props.children}</LinkRenderer>
  //     )
  //     : <>{props.children}</>
  // );
  if (props.href) {
    return ReactPlayer.canPlay(props.href) ? (
      <VideoRenderer url={props.href} />
    ) : (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }
  return <>{props.children}</>;
}

function VideoRenderer({ url }: { url: string }) {
  const [videoUrl, setVideoUrl] = useState<string>();

  const classes = useStyles();
  useEffect(() => {
    setVideoUrl(
      url.indexOf("vimeo.com") > 0
        ? url.replace("vimeo.com", "player.vimeo.com/video")
        : url.indexOf("youtube") > 0
        ? url.replace("watch?v=", "embed/")
        : url.indexOf("www.dailymotion.com/video") > 0
        ? url.replace("video", "embed/video")
        : url
    );
  }, [url]);

  return (
    <div>
      <iframe
        src={videoUrl}
        width="100%"
        height="100%"
        allow="autoplay; encrypted-media; fullscreen;"
        allowFullScreen
        className={classes.iframeVideo}
      ></iframe>
    </div>
  );
}

export default function TipNotification({ ...props }) {
  const classes = useStyles();
  const [status, setStatus] = useState("Yes");

  const { t } = useTranslation();
  const handleClickStatus = (statusVal: string) => {
    setStatus(statusVal);
  };

  const completeMarkingTips = () => {
    props.onComplete(status, props?.isFavoriteActive);
  };
  const handleFavoriteClick = () => {
    props?.setIsFavoriteActive((prev: boolean) => !prev);
  };

  return (
    <Container maxWidth={false} className={classes.mainContainer}>
      <Box className={classes.header}>
        <Box width={1} className={classes.headerIcon}>
          {!!props.icon ? (
            <img
              src={!!props.icon ? props.icon : undefined}
              alt={props.title}
            />
          ) : (
            ""
          )}
        </Box>

        <Box justifyContent="center" display="flex">
          <Grid item lg={4} sm={10} xs={12}>
            <Grid container>
              <Grid xs={12}>
                <Typography variant="caption">{t("Tip")}</Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="h2">{t(props.title)}{props?.hideFavorite && (
                  <Box className={classes.iconContainer}>
                  <Tooltip
                    title={
                      props?.isFavoriteActive
                        ? "Tap to remove from Favorite Activities"
                        : "Tap to add to Favorite Activities"
                    }
                  >
                    <Fab
                      className={`${classes.headerTitleIcon} ${
                        props?.isFavoriteActive ? "active" : ""
                      }`}
                      onClick={handleFavoriteClick}
                    >
                      <Icon>star_rounded</Icon>
                    </Fab>
                  </Tooltip>
                  </Box>
                )}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12}>
          <CardContent className={classes.tipscontentarea}>
            {!!props.images ? <img src={props.images} alt={props.title} /> : ""}
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.tipsdetails}
            >
              {!!props.details ? (
                <ReactMarkdown
                  children={props.details}
                  allowDangerousHtml={true}
                  renderers={{
                    link: LinkRenderer,
                    span: (props) => {
                      return <sub>{props?.children}</sub>;
                    },
                    sup: (props) => {
                      return <sup>{props.children}</sup>;
                    },
                  }}
                />
              ) : (
                ""
              )}
            </Typography>
            <Box mt={4} mb={2}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid container className={classes.colorLine} spacing={0}>
                  <Grid item xs={3} lg={3} className={classes.lineyellow} />
                  <Grid item xs={3} lg={3} className={classes.linegreen} />
                  <Grid item xs={3} lg={3} className={classes.linered} />
                  <Grid item xs={3} lg={3} className={classes.lineblue} />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.howFeel}>
              {t("Was this helpful today?")}
            </Box>
            <Box textAlign="center">
              <IconButton
                onClick={() => handleClickStatus("Yes")}
                className={
                  status === "Yes"
                    ? classnames(classes.likebtn, classes.active)
                    : classes.likebtn
                }
              >
                <Icon>thumb_up_off_alt</Icon>
                <label>{t("Yes")}</label>
              </IconButton>
              <IconButton
                onClick={() => handleClickStatus("No")}
                className={
                  status === "No"
                    ? classnames(classes.likebtn, classes.active)
                    : classes.likebtn
                }
              >
                <Icon>thumb_down_off_alt</Icon>
                <label>{t("No")}</label>
              </IconButton>
            </Box>

            {!!props.onComplete ? (
              <Box textAlign="center">
                <Fab
                  variant="extended"
                  color="primary"
                  className={classes.btnyellow}
                  onClick={() => completeMarkingTips()}
                >
                  {t("Mark complete")}
                </Fab>
              </Box>
            ) : (
              ""
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}
