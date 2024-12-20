
import React from "react"
import { useState, useRef } from "react"
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
} from "@material-ui/core"

import classnames from "classnames"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import ReactPlayer from "react-player"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: "#FFF9E5",
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
    howFeel: { fontSize: 14, color: "rgba(0, 0, 0, 0.5)", fontStyle: "italic", textAlign: "center", marginBottom: 10 },
    colorLine: { maxWidth: 115 },
    headerIcon: {
      textAlign: "center",
      marginBottom: 15,
      "& img": { maxWidth: "100%" },
    },
    mainContainer: { padding: 0 },
    tipsdetails: {
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
  })
)
  
function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

function VideoRenderer({ url }: { url: string }) {
  if(url.match(/dailymotion\.com\/video\/([^_]+)/)) {
    const getDailymotionEmbedURL = (url: string) => {
      const videoId = url.match(/dailymotion\.com\/video\/([^_]+)/);
      if (videoId) {
        return `https://www.dailymotion.com/embed/video/${videoId[1]}`;
      }
      return null;
    };
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    React.useEffect(() => {
      const embed = getDailymotionEmbedURL(url);
      setEmbedUrl(embed);  
    }, [url]);
  
    if (embedUrl) {
      return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src={embedUrl}
            title="Dailymotion Video"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
          </iframe>
        </div>
      );
    }
  } 
  else {
    const [isVideo, setIsVideo] = useState(false);
    const playerRef = useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      setIsVideo(ReactPlayer.canPlay(url));
    }, [url]);
    if (isVideo) {
      return (
        // <div style={{ marginBottom: "15px" }}>
        //   <ReactPlayer url={url} controls width="100%" height="100%" />
        // </div>
        <div
          ref={playerRef}
          style={{
            position: "relative",
            marginBottom: "15px",
            backgroundColor: "#000",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      );
    }  
    else {
      return (
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
          }}
        >
        <iframe
          src={url}
          title="Embedded Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture;display-capture;"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
      );
    }
  } 
}

export default function TipNotification({ ...props }) {
  const classes = useStyles()
  const [status, setStatus] = useState("Yes")
  const { t } = useTranslation()
  const handleClickStatus = (statusVal: string) => {
    setStatus(statusVal)
  }

  const completeMarkingTips = () => {
    props.onComplete(status)
  }
  
  return (
    <Container maxWidth={false} className={classes.mainContainer}>
      <Box className={classes.header}>
        <Box width={1} className={classes.headerIcon}>
          {!!props.icon ? <img src={!!props.icon ? props.icon : undefined} alt={props.title} /> : ""}
        </Box>
        <Typography variant="caption">{t("Tip")}</Typography>
        <Typography variant="h2">{t(props.title)}</Typography>
      </Box>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12}>
          <CardContent className={classes.tipscontentarea}>
            {!!props.images ? <img src={props.images} alt={props.title} /> : ""}
            <Typography variant="body2" color="textSecondary" component="p" className={classes.tipsdetails} >
            {!!props.details ?
              <ReactMarkdown 
                skipHtml={false} 
                components={{ 
                  a: ({ href, children }) =>
                    // ReactPlayer.canPlay(href) ? (
                  href ? (
                      <VideoRenderer url={href} />
                    ) : (
                      <LinkRenderer href={href}>{children}</LinkRenderer>
                    ),
                }}>
                {props.details}  
              </ReactMarkdown>
            : ""}
            </Typography>          
            <Box mt={4} mb={2}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid container className={classes.colorLine} spacing={0} >
                  <Grid item xs={3} lg={3} className={classes.lineyellow}/>
                  <Grid item xs={3} lg={3} className={classes.linegreen}/>
                  <Grid item xs={3} lg={3} className={classes.linered}/>
                  <Grid item xs={3} lg={3} className={classes.lineblue}/>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.howFeel}>{t("Was this helpful today?")}</Box>
            <Box textAlign="center">
              <IconButton
                onClick={() => handleClickStatus("Yes")}
                className={status === "Yes" ? classnames(classes.likebtn, classes.active) : classes.likebtn}
              >
                <Icon>thumb_up_off_alt</Icon>
                <label>{t("Yes")}</label>
              </IconButton>
              <IconButton
                onClick={() => handleClickStatus("No")}
                className={status === "No" ? classnames(classes.likebtn, classes.active) : classes.likebtn}
              >
                <Icon>thumb_down_off_alt</Icon>
                <label>{t("No")}</label>
              </IconButton>
            </Box>
            
            { !!props.onComplete ?
            <Box textAlign="center">
              <Fab variant="extended" color="primary" className={classes.btnyellow} onClick={() => completeMarkingTips()} > {/*  */}
                {t("Mark complete")}
              </Fab>
            </Box>
            : "" }
            
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  )
}
