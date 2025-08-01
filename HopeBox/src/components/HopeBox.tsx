import React, { useState, useEffect } from "react";
import HopeBoxHeader from "./HopeBoxHeader";
import Saved from "./Saved";
import i18n from "../i18n";
import {
  Typography,
  AppBar,
  Icon,
  Toolbar,
  IconButton,
  Box,
  ButtonBase,
  Link,
  Dialog,
  DialogContent,
  Button,
  Theme,
  createStyles,
  makeStyles,
  GridList,
  GridListTile,
  Fab,
  Tooltip,
} from "@material-ui/core";

import ImageUploader from "react-images-upload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    singletile: {
      padding: "0 8px 15px 8px  !important",
      "& div": { borderRadius: 10 },
    },
    gridList: {
      width: "100%",
      height: "100%",
      padding: "0 10px",
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
    hopeHEader: {
      background: "#FBF1EF",
      boxShadow: "none",
      borderBottom: "#fff solid 65px",
    },
    HopeHeadImage: {
      marginBottom: -80,
      marginLeft: "auto",
      marginRight: "auto",
    },
    hopeBoxContent: {
      textAlign: "center",
      "& h4": {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "24px",
        marginBottom: 20,
      },
    },
    btnpeach: {
      background: "#FFAC98",
      padding: "15px 25px 15px 25px",
      borderRadius: "40px",
      minWidth: "200px",
      maxWidth: 200,
      boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
      lineHeight: "22px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "16px",
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: "bold",
      "&:hover": {
        background: "#FFAC98",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      },
      "& div": {
        background: "transparent !important",
        margin: 0,
        padding: 0,
        boxShadow: "none",
      },
      "& button": {
        margin: "0 !important",
        padding: "0 !important",
        background: "transparent !important",
        fontSize: "16px !important",
        color: "rgba(0, 0, 0, 0.75) !important",
        fontWeight: "bold !important",
        lineHeight: "22px !important",
      },
    },
    linkpeach: { fontSize: 16, color: "#BC453D", fontWeight: 600 },

    closeButton: {
      color: theme.palette.grey[500],
    },
    dialogueContent: {
      padding: "0px 14px 50px 14px",
      textAlign: "center",
      position: "relative",
      "& h4": {
        fontSize: 25,
        fontWeight: 600,
        marginBottom: 15,
        marginTop: 20,
      },
      "& p": {
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.75)",
        lineHeight: "19px",
      },
      "& img": { width: "100%" },
    },

    savedMsg: {
      position: "absolute",
      top: 0,
      width: "100%",
      left: 0,
      height: "100%",
      background: "rgba(255,255,255,0.7)",
      paddingTop: "30%",
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

const tileData = [];
export default function HopeBox({ ...props }) {
  const classes = useStyles();
  const [pictures, setPictures] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imgSaved, setImgSaved] = useState(false);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );
  const [forward] = useState(props?.data?.forward ?? false);
  const [isForwardButton, setIsForwardButton] = useState(false);

  const onDrop = (picture) => {
    if (picture.length > 0) {
      setPictures([...pictures, picture]);
      setImageSrc(URL.createObjectURL(picture[0]));
      setOpenPreview(true);
    }
  };

  useEffect(() => {
    const eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window

    eventer(
      messageEvent,
      (e: any) => {
        // const settingsData = e.data.activity?.settings ?? (e.data.settings ?? {})
        const configuration = e.data.configuration;
        const langugae = configuration
          ? configuration.hasOwnProperty("language")
            ? configuration.language
            : "en-US"
          : "en-US";
        i18n.changeLanguage(langugae);
      },
      false
    );
  }, []);

  const openPreviewDialog = () => {
    setImgSaved(false);
    setOpenPreview(true);
  };
  const closePreviewDialog = () => {
    setImgSaved(false);
    setOpenPreview(false);
  };

  const saveImage = () => {
    setImgSaved(true);
  };

  const onComplete = () => {
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
        ...(forward && { forward: isForwardButton }),
        done: true,
      }),
      "*"
    );
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };
  const handleForwardClick = () => {
    setIsForwardButton(true);
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
        forward: true,
      }),
      "*"
    );
  };
  const handleBackClick = () => {
    setIsForwardButton(false);
    parent.postMessage(
      JSON.stringify({
        completed: true,
        static_data: { is_favorite: isFavoriteActive },
        forward: false,
        clickBack:true,
      }),
      "*"
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.hopeHEader}>
        <Toolbar className={classes.toolbardashboard}>
          <IconButton
            color="default"
            onClick={handleBackClick}
            aria-label="Menu"
          >
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h5">
            Hope Box{" "}
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
        <HopeBoxHeader />
      </AppBar>
      <Box className={classes.hopeBoxContent} px={5} pt={4}>
        <Typography variant="h4">
          Save images and quotes that bring joy and hope to your life.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {" "}
          Hope Box content will show up in your feed from time to time to
          inspire and uplift you.
        </Typography>

        <Box textAlign="center" mt={5} pt={2}>
          <ImageUploader
            {...props}
            className={classes.btnpeach}
            withIcon={false}
            withLabel={false}
            withPreview={false}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={9242880}
            buttonText="Add an image"
          />
        </Box>
        <Box textAlign="center" mt={3}>
          <ButtonBase className={classes.btnpeach}>Add a quote</ButtonBase>
        </Box>
        <Box textAlign="center" width={1} mt={3}>
          <Link className={classes.linkpeach}>View my Hope Box</Link>
        </Box>
      </Box>

      <GridList
        cellHeight={180}
        spacing={2}
        className={classes.gridList}
        cols={3}
      >
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={1} className={classes.singletile}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>

      <Dialog fullWidth={true} open={openPreview} onClose={closePreviewDialog}>
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={() => setOpenPreview(false)}
            >
              <Icon>close</Icon>
            </IconButton>
          </Box>
        </Box>

        <DialogContent className={classes.dialogueContent}>
          <img src={imageSrc} />
          <Box textAlign="center" mt={5}>
            <Button className={classes.btnpeach} onClick={() => saveImage()}>
              Add to Hope Box
            </Button>
          </Box>
          {imgSaved === true && (
            <Box className={classes.savedMsg}>
              <Box onClick={closePreviewDialog}>
                <Saved />
              </Box>
              <h4>Saved!</h4>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
