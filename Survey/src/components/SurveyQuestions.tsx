// Core Imports
import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Box,
  Slide,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  TextField,
  LinearProgress,
  createStyles,
  withStyles,
  Theme,
  AppBar,
  Grid,
  Drawer,
  Toolbar,
  Slider,
  Menu,
  MenuItem,
  ListItemText,
  ListItem,
  List,
  Fab,
  Table,
  Icon,
  FormGroup,
  Backdrop,
  CircularProgress,
  InputBase,
  Checkbox,
  CheckboxProps,
  IconButton,
  TableRow,
  TableCell,
  TableHead,
  Tooltip,
} from "@material-ui/core";
import classnames from "classnames";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import emoji from "remark-emoji";
import gfm from "remark-gfm";
import { useSnackbar } from "notistack";
import ConfirmationDialog from "./ConfirmationDialog";
import { Button } from "react-bootstrap";
import Image from "./Image";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const GreenCheckbox = withStyles({
  root: {
    color: "#2F9D7E",
    "&$checked": {
      color: "#2F9D7E",
    },
    "& svg": { fontSize: "28px !important" },
  },
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 5,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#92E7CA",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#2F9D7E",
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },
  root: {
    width: "100%",
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "300px",
    margin: "auto",
  },

  scrollBox: {
    maxHeight: "calc(100vh - 400px)",
    overflowY: "auto",
    padding: "10px",
    [theme.breakpoints.up("lg")]: {
      maxHeight: "calc(100vh - 300px)",
    },
  },

  scrollArrow: {
    textAlign: "center",
    cursor: "pointer",
    fontSize: "24px",
    userSelect: "none",
    color: "#555",
    margin: 0,
    background: "transparent",
    border: 0,
    "& svg": {
      width: "1.5em",
      height: "1.5em",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  uncheckContainer: {
    width: 24,
    height: 24,
    border: "3px solid #C6C6C6",
    borderRadius: 12,
    display: "block",
    boxSizing: "border-box",
    margin: "0 auto",
  },
  checkedContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    display: "block",
    backgroundColor: "#2F9D7E",
    borderRadius: 14,
    margin: "0 auto",
  },
  checkText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    "& p": {
      margin: "0",
    },
  },
  marginBottom40: {
    marginBottom: "40px !important",
  },
  sliderActionsContainer: {
    textAlign: "center",
    width: "100%",
    left: 0,
    marginBottom: 15,
    [theme.breakpoints.down("xs")]: {
      bottom: "5%",
    },
  },
  radioroot: {
    padding: "20px",
  },
  mradioroot: {
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 5px",
    },
    "& span.MuiIconButton-label span": {
      width: 24,
      height: 24,
    },
  },
  icon: {
    borderRadius: "50%",
    width: 32,
    height: 32,
    border: "#C6C6C6 solid 2px",
    backgroundColor: "#fff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    [theme.breakpoints.down("sm")]: {
      width: 20,
      height: 20,
    },
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkedIcon: {
    backgroundColor: "#2F9D7E",
    borderColor: "#2F9D7E",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 32,
      height: 32,
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#2F9D7E",
    },
  },
  btngreen: {
    background: "#92E7CA",
    borderRadius: "40px",
    fontWeight: 600,
    minWidth: "160px",
    boxShadow: "0px 10px 15px rgba(146, 231, 202, 0.25)",
    lineHeight: "38px",
    margin: "5% 5px 0 5px",
    textTransform: "capitalize",
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.75)",
    cursor: "pointer !important",
    [theme.breakpoints.up("md")]: {
      marginTop: 30,
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "40%",
    },
    "& span": { cursor: "pointer" },
    "&:hover": {
      background: "#92E7CA",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
  },
  formLabelMatrix: { alignItems: "center", margin: "0 auto" },
  timeMatrix: {
    "& div": {
      marginTop: "0px",
    },
  },
  firstTr: {
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    "& td": {
      padding: 0,
      verticalAlign: "top",
      border: 0,
    },
  },
  secondTr: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    background: "#fff",
    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
    "& td": {
      padding: "5px 0",
      zIndex: 2,
    },
  },
  matrix: {
    "& td": {
      paddingLeft: "3px !important",
      paddingRight: "3px !important",
      width: "3%",
    },
    "& tr": {
      padding: "25px 0",
    },
    "& p": { marginTop: "0px !important", marginBottom: "3px !important" },
    "& tr td:first-child": {
      position: "sticky",
      left: 0,
      background: "#fff",
      zIndex: 1,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  toolbardashboard: {
    minHeight: 65,
    padding: "0 10px",
    "& h5": {
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      width: "100%",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
        margin: "0 55px",
        justifyContent: "center",
      },
    },
  },
  slider: {
    width: "95%",
    color: "#2F9D7E",
    [theme.breakpoints.down("xs")]: {
      width: "82%",
    },
  },
  btnBack: {
    borderRadius: "40px",
    minWidth: "160px",
    fontWeight: 600,
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.05)",
    lineHeight: "38px",
    textTransform: "capitalize",
    fontSize: "16px",
    cursor: "pointer",
    margin: "5% 5px 0 5px",
    [theme.breakpoints.up("md")]: {
      marginTop: 30,
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "40%",
    },
  },
  ampm: {
    padding: "10px",
  },
  questionTrack: {
    fontSize: "14px",
    color: "#2F9D7E",
    fontWeight: "normal",
    margin: "-10px 0 20px 0",
  },
  radioGroup: {
    // marginLeft: -15,
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
  textAreaControl: {
    width: "100%",
    marginTop: 25,
    background: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 45,
    "& p": { position: "absolute", bottom: 15, right: 0 },
  },
  textArea: {
    borderRadius: "10px",
    "& fieldset": { borderWidth: 0 },
  },
  required: {
    "& span": { color: "red" },
    "& sup": { color: "red" },
  },
  sliderResponse: {
    marginTop: "60px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
    },
    "& h4": {
      color: "#22977B",
      fontSize: 25,
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
  },
  questionhead: {
    textAlign: "center",
    padding: "0 8px",
    "& h5": { fontSize: 18, fontWeight: 600 },
    "& span": {
      marginTop: 15,
      fontSize: 12,
      // color: "rgba(0, 0, 0, 0.5)",
      lineHeight: "16px !important",
    },
  },
  checkP: {
    maxWidth: 65,
    display: "block",
  },
  timeHours: {
    padding: 0,
    borderBottom: "#BCEFDD solid 2px",
    minWidth: 57,
    "& div": { padding: 0, margin: 0 },
    "& p": {
      fontSize: 40,
      fontWeight: 600,
      color: "rgba(0, 0, 0, 0.75)",
      textAlign: "center",
    },
  },
  textCaption: { color: "rgba(0, 0, 0, 0.5)", fontSize: 10 },
  centerBar: { height: 4, background: "#BCEFDD" },
  customTrack: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#65DEB4",
  },
  customThumb: { width: 24, height: 24, marginTop: -10, marginLeft: -10 },
  noInitialVal: { display: "none" },
  menuPaper: {
    background: "#F5F5F5",
    boxShadow: "none",
    marginTop: 54,
    maxHeight: 200,
    minWidth: 57,
    borderRadius: 0,
    "& ul": { padding: 0 },
    "& li": {
      fontSize: 25,
      maxWidth: 57,
      padding: "0 12px",
    },
  },
  timeWrapper: {
    fontSize: 25,
    marginTop: 50,
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      overflow: "hidden !important",
    },
  },
  textfieldwrapper: { marginLeft: 0, marginRight: 0 },
  listSelected: {
    background: "#E7F8F2 !important",
  },
  surveyQuestionNav: {
    textAlign: "center",
    position: "fixed",
    width: "100%",
    bottom: 50,
    [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
      position: "relative",
      bottom: 30,
    },
  },
  surveyQuestionAlign: {
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
    "& ol": {
      display: "inline-block",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      padding: "0 40px",
      maxHeight: "55%",
      // position: "absolute",
      overflow: "auto",
      width: "100%",
    },
  },
  surveyQuestionMatrixAlign: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 20px !important",
    },
  },
  radioLabel: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    alignItems: "center !important",
    textAlign: "left",
  },

  chatDrawerCustom: { minWidth: 411 },
  questionScroll: {
    textAlign: "center",
    // maxHeight: "calc(100vh - 400px)",
    overflow: "auto",
    // "&::-webkit-scrollbar, &::scrollbar": {
    //   appearance: "none",
    // },
    // "&::-webkit-scrollbar:vertical, &::scrollbar:vertical": {
    //   width: 8,
    // },
    // "&::-webkit-scrollbar:horizontal, &::scrollbar:horizontal": {
    //   height: 8,
    // },
    // "&::-webkit-scrollbar-thumb, &::scrollbar-thumb": {
    //   backgroundColor: "rgba(0, 0, 0, .5)",
    //   borderRadius: 10,
    //   border: "2px solid #ffffff",
    // },
    // "&::-webkit-scrollbar-track, &::scrollbar-track": {
    //   borderRadius: 10,
    //   backgroundColor: "#ffffff",
    // },
    [theme.breakpoints.down("xs")]: {
      overflow: "auto",
    },
  },
  fieldGroup: {
    display: "inline-flex",
    textAlign: "left",
    "& span.MuiCheckbox-root": { color: "#C6C6C6 !important" },
    "& span.Mui-checked": { color: "#2F9D7E !important" },
  },
  sliderValueLabel: {
    width: "100%",
    "& div": {
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100px",
        width: "30%",
      },
    },
  },
  lightGray: { color: "#999", fontSize: "0.75rem" },
  mxSmall: { margin: "0 6px" },
  radioLabelText: { lineHeight: "16px" },

  mrgBtm: { marginBottom: 15 },
  countlabel: { left: "calc(-50% - -8px)" },
  thStick: {
    position: "sticky",
    left: 0,
    background: "#fff",
    zIndex: 2,
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
  survayImage: {
    maxHeight: 200,
    borderRadius: 16,
  },
}));
function range(start, stop, step = 1) {
  return [...Array(stop - start).keys()].map((v, i) =>
    start + i * step < 10 ? "0" + (start + i * step) : start + i * step
  );
}
const CHARACTER_LIMIT = 800;

const scrollBox = (offset) => {
  const box = document.getElementById("scrollBox");
  box.scrollBy({ top: offset, behavior: "smooth" });
};

function RateAnswer({ checked, onChange, value }) {
  const classes = useStyles();

  return (
    <div
      onClick={() => onChange(value)}
      className={checked ? classes.checkedContainer : classes.uncheckContainer}
    >
      {checked && (
        <Typography className={classes.checkText}>
          <ReactMarkdown
            children={value?.toString()}
            skipHtml={false}
            plugins={[gfm, emoji]}
            renderers={{
              link: LinkRenderer,
              sub: (props) => {
                return <sub>{props?.children}</sub>;
              },
              sup: (props) => {
                return <sup>{props.children}</sup>;
              },
            }}
          />
        </Typography>
      )}
    </div>
  );
}

function LinkRenderer(data: any) {
  return (
    <a href={data.href} target="_blank">
      {data.children}
    </a>
  );
}

function RadioOption({ onChange, options, value, optionFeedback, ...props }) {
  const [selectedValue, setSelectedValue] = useState(value);
  const classes = useStyles();
  const { t } = useTranslation();
  console.log("value inside radio component", value);

  return (
    <FormControl component="fieldset" className={classes.radioGroup}>
      <RadioGroup
        {...props}
        name="option"
        value={`${selectedValue}`}
        onChange={(event) => {
          setSelectedValue(event.target.value);
          onChange(event.target.value);
        }}
      >
        {options?.map((x) => (
          <FormControlLabel
            key={x.label}
            value={`${x.value}`}
            style={{
              alignItems:
                x.value.length > 25 && !!x.description
                  ? "flex-start"
                  : undefined,
            }}
            control={
              <Radio
                className={classes.radioroot}
                disableRipple
                color="default"
                size="medium"
                onClick={() => {
                  if (selectedValue === `${x.value}`) {
                    setSelectedValue("");
                    onChange(undefined);
                  }
                }}
                checkedIcon={
                  <span
                    className={classnames(classes.icon, classes.checkedIcon)}
                  />
                }
                icon={<span className={classes.icon} />}
              />
            }
            label={
              <Box className={classes.radioLabelText}>
                <Typography
                  variant="body2"
                  style={{
                    color:
                      selectedValue === `${x.value}`
                        ? "black"
                        : "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  <ReactMarkdown
                    children={t(x.label?.toString())}
                    skipHtml={false}
                    plugins={[gfm, emoji]}
                    renderers={{
                      link: LinkRenderer,
                      sub: (props) => {
                        return <sub>{props?.children}</sub>;
                      },
                      sup: (props) => {
                        return <sup>{props.children}</sup>;
                      },
                    }}
                  />
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.lightGray}
                >
                  <ReactMarkdown
                    children={
                      !!x.description && ` ${x.description?.toString()}`
                    }
                    skipHtml={false}
                    plugins={[gfm, emoji]}
                    renderers={{
                      link: LinkRenderer,
                      sub: (props) => {
                        return <sub>{props?.children}</sub>;
                      },
                      sup: (props) => {
                        return <sup>{props.children}</sup>;
                      },
                    }}
                  />
                  {optionFeedback === x.feedback_text &&
                    x.value === selectedValue && (
                      <ReactMarkdown
                        children={
                          !!x.feedback_text && ` ${x.feedback_text?.toString()}`
                        }
                        skipHtml={false}
                        plugins={[gfm, emoji]}
                        renderers={{
                          link: LinkRenderer,
                          sub: (props) => {
                            return <sub>{props?.children}</sub>;
                          },
                          sup: (props) => {
                            return <sup>{props.children}</sup>;
                          },
                        }}
                      />
                    )}
                </Typography>
              </Box>
            }
            labelPlacement="end"
            className={classes.radioLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function TimeSelection({ onChange, options, value, ...props }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [anchorE3, setAnchorE3] = React.useState<null | HTMLElement>(null);
  const currentValue = !!value ? value?.split(":") : "";
  const [hourSelectedIndex, setHourSelectedIndex] = React.useState(
    !!value ? currentValue[0] : "01"
  );
  const [minuteSelectedIndex, setMinuteSelectedIndex] = React.useState(
    !!value ? currentValue[1].substr(0, 2) : "00"
  );
  const [ampmSelectedIndex, setAmPmSelectedIndex] = React.useState(
    !!value ? currentValue[1].substr(2, 3) ?? "" : "AM"
  );
  const { t } = useTranslation();

  useEffect(() => {
    onChange(
      (hourSelectedIndex.length === 1
        ? "0" + hourSelectedIndex
        : hourSelectedIndex) +
        ":" +
        (minuteSelectedIndex.length === 1
          ? "0" + minuteSelectedIndex
          : minuteSelectedIndex) +
        ((!!options?.timePattern && options?.timePattern === "standard") ||
        (Array.isArray(options) &&
          !!options[0] &&
          !!options[0]?.value &&
          options[0]?.value === "standard")
          ? ampmSelectedIndex
          : "")
    );
  }, [hourSelectedIndex, minuteSelectedIndex, ampmSelectedIndex]);

  const handleClickHours = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickMinutes = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClickAmPm = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE3(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: any,
    type: number
  ) => {
    switch (type) {
      case 0:
        setHourSelectedIndex(index);
        setAnchorEl(null);
        break;
      case 1:
        setMinuteSelectedIndex(index);
        setAnchorE2(null);
        break;
      case 2:
        setAmPmSelectedIndex(index);
        setAnchorE3(null);
        break;
    }
    onChange(
      (hourSelectedIndex.length === 1
        ? "0" + hourSelectedIndex
        : hourSelectedIndex) +
        ":" +
        (minuteSelectedIndex.length === 1
          ? "0" + minuteSelectedIndex
          : minuteSelectedIndex) +
        ((!!options?.timePattern && options?.timePattern === "standard") ||
        (Array.isArray(options) &&
          !!options[0] &&
          !!options[0]?.value &&
          options[0]?.value === "standard")
          ? ampmSelectedIndex
          : "")
    );
  };
  const handleHoursClose = () => {
    setAnchorEl(null);
  };
  const handleMinutesClose = () => {
    setAnchorE2(null);
  };
  const handleAmPmClose = () => {
    setAnchorE3(null);
  };
  const ampm = [];

  const hourvalues =
    (!!options?.timePattern && options?.timePattern === "standard") ||
    (Array.isArray(options) &&
      !!options[0] &&
      !!options[0]?.value &&
      options[0]?.value === "standard")
      ? range(1, 13)
      : range(0, 24);
  const minutevalues = ["00", "15", "30", "45"];
  if (
    (!!options?.timePattern && options?.timePattern === "standard") ||
    (Array.isArray(options) &&
      !!options[0] &&
      !!options[0]?.value &&
      options[0]?.value === "standard")
  ) {
    ampm.push(
      <MenuItem
        key="AM"
        selected={"AM" === ampmSelectedIndex}
        onClick={(event) => handleMenuItemClick(event, "AM", 2)}
        classes={{ selected: classes.listSelected }}
      >
        {t("AM")}
      </MenuItem>
    );
    ampm.push(
      <MenuItem
        key="PM"
        selected={"PM" === ampmSelectedIndex}
        onClick={(event) => handleMenuItemClick(event, "PM", 2)}
        classes={{ selected: classes.listSelected }}
      >
        {t("PM")}
      </MenuItem>
    );
  }

  return (
    <Box textAlign="center">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.timeWrapper}
      >
        <Grid item>
          <List component="nav" className={classes.timeHours}>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={handleClickHours}
            >
              <ListItemText secondary={hourSelectedIndex} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleHoursClose}
            classes={{ paper: classes.menuPaper }}
          >
            {hourvalues.map((option, index) => (
              <MenuItem
                key={option.length === 1 ? "0" + option : option}
                selected={option === hourSelectedIndex}
                onClick={(event) => handleMenuItemClick(event, option, 0)}
                classes={{ selected: classes.listSelected }}
              >
                {option.length === 1 ? "0" + option : option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        :
        <Grid item>
          <List
            component="nav"
            className={classes.timeHours}
            aria-label="Device settings"
          >
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={handleClickMinutes}
            >
              <ListItemText secondary={minuteSelectedIndex} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorE2}
            keepMounted
            open={Boolean(anchorE2)}
            onClose={handleMinutesClose}
            classes={{ paper: classes.menuPaper }}
          >
            {minutevalues.map((option, index) => (
              <MenuItem
                key={option.length === 1 ? "0" + option : option}
                selected={option === minuteSelectedIndex}
                onClick={(event) => handleMenuItemClick(event, option, 1)}
                classes={{ selected: classes.listSelected }}
              >
                {option.length === 1 ? "0" + option : option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        {((!!options?.timePattern && options?.timePattern === "standard") ||
          (Array.isArray(options) &&
            !!options[0] &&
            !!options[0]?.value &&
            options[0]?.value === "standard")) && (
          <Grid item>
            <List
              component="nav"
              className={classes.timeHours}
              aria-label="Device settings"
            >
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                onClick={handleClickAmPm}
              >
                <ListItemText secondary={ampmSelectedIndex} />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              classes={{ paper: classes.menuPaper }}
              anchorEl={anchorE3}
              keepMounted
              open={Boolean(anchorE3)}
              onClose={handleAmPmClose}
            >
              {ampm}
            </Menu>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

function TextSection({
  onChange,
  charLimit,
  value,
  feedback,
  question,
  ...props
}) {
  const classes = useStyles();
  const [text, setText] = useState(value);
  const { t } = useTranslation();

  return (
    <>
      <Box className={classes.textfieldwrapper}>
        <FormControl
          component="fieldset"
          classes={{
            root: classes.textAreaControl,
          }}
        >
          <TextField
            id="standard-multiline-flexible"
            multiline
            rows={10}
            variant="outlined"
            onChange={(e) => {
              setText(e.target.value);
              onChange(e.target.value);
            }}
            defaultValue={text}
            helperText={
              text
                ? `${text.length}/${charLimit} max characters`
                : `${charLimit} max characters`
            }
            inputProps={{
              maxLength: charLimit,
            }}
            classes={{ root: classes.textArea }}
          />
        </FormControl>
      </Box>
      {text?.trim() && question && feedback && (
        <Box className={classes.questionhead}>
          <Typography variant="caption">
            <ReactMarkdown children={t(`${feedback}`)} />
          </Typography>
        </Box>
      )}
    </>
  );
}
const CssTextField = withStyles({
  root: {
    "label + &": {},
    marginRight: 3,
  },
  input: {
    fontSize: 25,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.75)",
    width: 44,
    borderBottom: "3px solid #92E7CA",
    padding: 0,
    borderRadius: 0,
    textAlign: "center",
  },
})(InputBase);

function ShortTextSection({ onChange, value, ...props }) {
  const classes = useStyles();
  const [text, setText] = useState(value);

  return (
    <Box className={classes.textfieldwrapper}>
      <FormControl component="fieldset">
        <CssTextField
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onChange(e.target.value);
          }}
        />
      </FormControl>
    </Box>
  );
}

function RadioRating({ onChange, options, value, mtValue, type, ...props }) {
  const [val, setValue] = useState(value);
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <Box textAlign="center" mt={mtValue}>
      <Grid
        direction="row"
        container
        justify="center"
        style={{ alignItems: "top" }}
      >
        {options.map((option) => (
          <Box mr={1}>
            <RateAnswer
              checked={val === option.value}
              onChange={() => {
                setValue(option.value);
                onChange(option.value);
              }}
              value={option.value}
            />
            {type !== "matrix" && (
              <>
                <Box>
                  <Typography variant="caption" className={classes.checkP}>
                    <ReactMarkdown
                      children={t(option.description?.toString())}
                      skipHtml={false}
                      plugins={[gfm, emoji]}
                      renderers={{
                        link: LinkRenderer,
                        sub: (props) => {
                          return <sub>{props?.children}</sub>;
                        },
                        sup: (props) => {
                          return <sup>{props.children}</sup>;
                        },
                      }}
                    />
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" className={classes.checkP}>
                    <ReactMarkdown
                      children={t(option.feedback_text?.toString())}
                      skipHtml={false}
                      plugins={[gfm, emoji]}
                      renderers={{
                        link: LinkRenderer,
                        sub: (props) => {
                          return <sub>{props?.children}</sub>;
                        },
                        sup: (props) => {
                          return <sup>{props.children}</sup>;
                        },
                      }}
                    />
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

function Rating({ onChange, options, value, ...props }) {
  const classes = useStyles();
  const getText = (val) => {
    let sliderValue = null;
    // !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
    options.map((mark) => {
      if (mark.value === val) {
        sliderValue =
          !!mark.description && mark.description.trim().length > 0
            ? mark.description
            : mark.value;
      }
    });
    return sliderValue;
  };

  const { t } = useTranslation();

  const [valueText, setValueText] = useState(
    !!value ? getText(value) : null
    // : !!options[0].description && options[0].description.trim().length > 0
    // ? options[0].description
    // : options[0].value
  );
  const [sliderValue, setSliderValue] = useState(!!value ? value : null);

  useEffect(() => {
    onChange(sliderValue);
  }, []);

  const valuetext = (value: number) => {
    return `${options[value]}`;
  };
  const getSliderValue = (val) => {
    let sliderValue = null;
    // !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
    const slValue = val;
    options.map((mark) => {
      if (parseInt(mark.value, 10) === slValue) {
        sliderValue =
          !!mark.description && mark.description.trim().length > 0
            ? mark.description
            : mark.value;
      }
    });
    setSliderValue(val);
    setValueText(sliderValue);
    onChange(val);
    return sliderValue;
  };
  return (
    <Box textAlign="center" mt={5}>
      <Slider
        defaultValue={sliderValue}
        value={sliderValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={
          parseInt(options[0].value, 10) < 0 &&
          parseInt(options[1].value ?? 10, 0) < 0
            ? Math.abs(parseInt(options[0].value, 10)) +
              parseInt(options[1]?.value ?? 0, 10)
            : parseInt(options[0].value, 10) < 0 &&
              parseInt(options[1].value ?? 10, 0) > 0
            ? Math.abs(parseInt(options[0].value, 10)) -
              parseInt(options[1]?.value ?? 0, 10)
            : parseInt(options[1]?.value ?? 0, 10) -
              parseInt(options[0].value, 10)
        }
        marks={options}
        min={parseInt(options[0].value, 10)}
        max={parseInt(options[options.length - 1].value, 10)}
        track={false}
        classes={{
          root: classes.slider,
          rail: classes.centerBar,
          mark: classes.customTrack,
          thumb:
            classes.customThumb +
            (sliderValue !== null ? "" : " " + classes.noInitialVal),
          valueLabel: classes.countlabel,
        }}
        onChange={(evt, val) => {
          getSliderValue(val);
        }}
      />
      <Grid
        container
        className={classes.sliderValueLabel}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="caption"
            className={classes.textCaption}
            display="block"
            gutterBottom
          >
            <ReactMarkdown
              children={
                !!options[0].description &&
                options[0].description.trim().length === 0
                  ? options[0].value
                  : options[0].description
              }
              skipHtml={false}
              plugins={[gfm, emoji]}
              renderers={{
                link: LinkRenderer,
                sub: (props) => {
                  return <sub>{props?.children}</sub>;
                },
                sup: (props) => {
                  return <sup>{props?.children}</sup>;
                },
              }}
            />
          </Typography>
        </Grid>
        <Grid item>
          {options.length > 2 && (
            <Typography
              variant="caption"
              className={classes.textCaption}
              display="block"
              gutterBottom
            >
              <ReactMarkdown
                children={
                  !!options[Math.ceil(options.length / 2) - 1].description &&
                  options[Math.ceil(options.length / 2) - 1].description.trim()
                    .length === 0
                    ? options[Math.ceil(options.length / 2) - 1].value
                    : options[Math.ceil(options.length / 2) - 1].description
                }
                skipHtml={false}
                plugins={[gfm, emoji]}
                renderers={{
                  link: LinkRenderer,
                  sub: (props) => {
                    return <sub>{props?.children}</sub>;
                  },
                  sup: (props) => {
                    return <sup>{props.children}</sup>;
                  },
                }}
              />
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            className={classes.textCaption}
            display="block"
            gutterBottom
          >
            <ReactMarkdown
              children={
                !!options[options.length - 1].description &&
                options[options.length - 1].description.trim().length === 0
                  ? options[options.length - 1].value
                  : options[options.length - 1].description
              }
              skipHtml={false}
              plugins={[gfm, emoji]}
              renderers={{
                link: LinkRenderer,
                sub: (props) => {
                  return <sub>{props?.children}</sub>;
                },
                sup: (props) => {
                  return <sup>{props.children}</sup>;
                },
              }}
            />
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.sliderResponse}>
        <Typography variant="caption" display="block" gutterBottom>
          {t("Your response")}
          <span>:</span>
        </Typography>
        <Typography variant="h4">
          <ReactMarkdown
            children={t(valueText?.toString())}
            skipHtml={false}
            plugins={[gfm, emoji]}
            renderers={{
              link: LinkRenderer,
              sub: (props) => {
                return <sub>{props?.children}</sub>;
              },
              sup: (props) => {
                return <sup>{props.children}</sup>;
              },
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}

// // eslint-disable-next-line
// function CheckboxResponse({ onChange, value, ...props }) {
//   return <Checkbox {...props} value={value || false} onChange={(event) => onChange(event.target.value)} />
// }

// // eslint-disable-next-line
// function SwitchResponse({ onChange, value, ...props }) {
//   return <Switch {...props} value={value || false} onChange={(event) => onChange(event.target.value)} />
// }
// const csvParse = (x) => (Array?.isArray(JSON.parse(`[${x}]`)) ? JSON.parse(`[${x}]`) : [])
// const csvParse = (x) => {
//   try {
//     if (Array.isArray(x)) return x; // already an array
//     if (typeof x === 'string') {
//       const trimmed = x.trim();

//       // If it looks like a JSON array
//       if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
//         return JSON.parse(trimmed);
//       }

//       // Else, treat as comma-separated
//       return trimmed ? trimmed.split(',').map(s => s.trim()) : [];
//     }
//     return [];
//   } catch (e) {
//     console.error('csvParse error:', e);
//     return [];
//   }
// };
const csvParse = (x) => {
  try {
    if (Array.isArray(x)) return x;
    if (typeof x !== "string") return [];
    const unescaped = x.replace(/\\"/g, '"');
    const wrapped = unescaped.trim().startsWith("[")
      ? unescaped
      : `[${unescaped}]`;
    let parsed = JSON.parse(wrapped);
    parsed = parsed.map((item) =>
      typeof item === "string" ? item.replace(/^"+|"+$/g, "") : item
    );

    return parsed;
  } catch (e) {
    console.error("csvParse error:", e);
    return [];
  }
};
const csvStringify = (x) =>
  Array?.isArray(x) ? JSON.stringify(x).slice(1, -1) : "";

function Matrix({
  x,
  responses,
  onResponse,
  activityId,
  total,
  index,
  idx,
  startTime,
  setActiveStep,
  settingsQuestions,
  handleBack,
  handleNext,
  onComplete,
  ...props
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));
  const [selectedValue, setSelectedValue] = useState(
    responses?.current ?? null
  );
  const getSorted = (options) => {
    return options.sort((a, b) =>
      parseInt(a.value, 10) > parseInt(b.value, 10)
        ? 1
        : parseInt(a.value, 10) < parseInt(b.value, 10)
        ? -1
        : 0
    );
  };

  return (
    <Grid>
      <Box style={{ marginTop: "100px" }}>
        <Box textAlign="center">
          <Typography
            gutterBottom
            align="center"
            classes={{ root: classes.questionTrack }}
          >
            {`${t("Question")}`} {index + 1} <span>{`${t("of")}`}</span>{" "}
            {settingsQuestions}
          </Typography>
        </Box>
        <Box className="carouselContainer">
          <Button
            className={classes.scrollArrow}
            onClick={() => scrollBox(-100)}
          >
            <KeyboardArrowUpIcon />
          </Button>
          <div className={classes.scrollBox} id="scrollBox">
            <Box className={classes.questionScroll}>
              <Box className={classes.questionhead}>
                <Typography variant="caption" className={classes.required}>
                  <ReactMarkdown
                    children={`${t(x.description?.toString() ?? "")}`}
                    skipHtml={false}
                    plugins={[gfm, emoji]}
                    renderers={{
                      link: LinkRenderer,
                      sub: (props) => {
                        return <sub>{props?.children}</sub>;
                      },
                      sup: (props) => {
                        return <sup>{props.children}</sup>;
                      },
                    }}
                  />
                </Typography>
              </Box>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid
                  item
                  lg={4}
                  sm={10}
                  xs={12}
                  className={
                    classes.surveyQuestionAlign +
                    " " +
                    classes.surveyQuestionMatrixAlign
                  }
                >
                  <Box className={classes.questionScroll}>
                    <Table className={classes.matrix}>
                      {Array.isArray(x.options) &&
                        x.options.length > 0 &&
                        (x.type === "likert" ||
                          x.type === "rating" ||
                          x.type === "list" ||
                          x.type === "boolean" ||
                          x.type === "multiselect") && (
                          <TableRow className={classes.firstTr}>
                            <TableCell style={{ minWidth: "30%" }}>
                              {null}
                            </TableCell>
                            {(x.options || []).map((x) => (
                              <TableCell className={classes.textCenter}>
                                {(x.description || "").length > 0 && (
                                  <ReactMarkdown
                                    children={` ${t(
                                      x.description?.toString()
                                    )}`}
                                    skipHtml={false}
                                    plugins={[gfm, emoji]}
                                    renderers={{
                                      link: LinkRenderer,
                                      sub: (props) => {
                                        return <sub>{props?.children}</sub>;
                                      },
                                      sup: (props) => {
                                        return <sup>{props.children}</sup>;
                                      },
                                    }}
                                  />
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      <TableHead>
                        {Array.isArray(x.options) &&
                          x.options.length > 0 &&
                          (x.type === "likert" ||
                            x.type === "rating" ||
                            x.type === "list" ||
                            x.type === "boolean" ||
                            x.type === "multiselect") && (
                            <TableRow className={classes.secondTr}>
                              <TableCell
                                style={{ minWidth: "30%" }}
                                className={classes.thStick}
                              >
                                {null}
                              </TableCell>
                              {(x.options || []).map((x) => (
                                <TableCell className={classes.textCenter}>
                                  <ReactMarkdown
                                    children={
                                      (x.description || "").length > 0 &&
                                      (x.value || "").length > 0
                                        ? `(${t(x.value?.toString())})`
                                        : `${t(x.value?.toString())}`
                                    }
                                    skipHtml={false}
                                    plugins={[gfm, emoji]}
                                    renderers={{
                                      link: LinkRenderer,
                                      sub: (props) => {
                                        return <sub>{props?.children}</sub>;
                                      },
                                      sup: (props) => {
                                        return <sup>{props.children}</sup>;
                                      },
                                    }}
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                      </TableHead>
                      {(x?.questions || []).map((question, qindex) => (
                        <TableRow
                          style={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <TableCell
                            className={classes.required}
                            style={{ minWidth: "30%", maxWidth: "150px" }}
                          >
                            <ReactMarkdown
                              children={
                                question.required
                                  ? `${t(question?.text) + "<span> *</span>"}`
                                  : `${t(question?.text)}`
                              }
                              allowDangerousHtml={true}
                              plugins={[gfm, emoji]}
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
                          </TableCell>
                          {Array.isArray(x.options) &&
                          (x.options || []).length > 0 ? (
                            x.type === "list" ||
                            x.type === "boolean" ||
                            x.type === "likert" ? (
                              (x.options || []).map((op, k) => (
                                <TableCell className={classes.textCenter}>
                                  <FormControlLabel
                                    key={`${op.value}`}
                                    value={`${op.value}`}
                                    className={classes.formLabelMatrix}
                                    control={
                                      <Radio
                                        className={classes.mradioroot}
                                        disableRipple
                                        checked={csvParse(
                                          selectedValue[idx + qindex]?.value ||
                                            []
                                        ).includes(op.value)}
                                        color="default"
                                        size="medium"
                                        checkedIcon={
                                          <span
                                            className={classnames(
                                              classes.icon,
                                              classes.checkedIcon
                                            )}
                                          />
                                        }
                                        icon={<span className={classes.icon} />}
                                        onClick={() => {
                                          setSelectedValue({
                                            ...selectedValue,
                                            [idx + qindex]: {
                                              item: question.text,
                                              value: csvStringify([op.value]),
                                            },
                                          });
                                          const response = {
                                            item: question.text,
                                            value: csvStringify([op.value]),
                                          };
                                          const data = updateResponses(
                                            x,
                                            response,
                                            activityId,
                                            responses,
                                            idx + qindex,
                                            startTime,
                                            setActiveStep,
                                            total
                                          );
                                          onResponse(data);
                                        }}
                                      />
                                    }
                                    label={null}
                                  />
                                </TableCell>
                              ))
                            ) : x.type === "multiselect" ? (
                              (x.options || []).map((op, j) => (
                                <TableCell className={classes.textCenter}>
                                  <FormControlLabel
                                    key={op.value}
                                    value={`${qindex}-${op.value}`}
                                    className={classes.formLabelMatrix}
                                    control={
                                      <GreenCheckbox
                                        className={classes.mradioroot}
                                        checked={csvParse(
                                          selectedValue[idx + qindex]?.value ||
                                            []
                                        ).includes(op.value)}
                                        onClick={() => {
                                          let values = csvParse(
                                            selectedValue[idx + qindex]
                                              ?.value || []
                                          );

                                          if (
                                            !csvParse(
                                              selectedValue[idx + qindex]
                                                ?.value || []
                                            ).includes(op.value)
                                          ) {
                                            values.push(op.value);
                                            values = (values || []).filter(
                                              (elem, i, self) => {
                                                return i === self.indexOf(elem);
                                              }
                                            );
                                          } else {
                                            const key = values.indexOf(
                                              op.value
                                            );
                                            if (key !== -1) {
                                              values.splice(key, 1);
                                            }
                                          }
                                          setSelectedValue({
                                            ...selectedValue,
                                            [idx + qindex]: {
                                              item: question.text,
                                              value: csvStringify(values),
                                            },
                                          });
                                          const response = {
                                            item: question.text,
                                            value: csvStringify(values),
                                          };
                                          const data = updateResponses(
                                            x,
                                            response,
                                            activityId,
                                            responses,
                                            idx + qindex,
                                            startTime,
                                            setActiveStep,
                                            total
                                          );
                                          onResponse(data);
                                        }}
                                      />
                                    }
                                    label={null}
                                  />
                                </TableCell>
                              ))
                            ) : x.type === "slider" ? (
                              <TableCell className={classes.textCenter}>
                                <Rating
                                  options={getSorted(x.options)}
                                  onChange={(val) => {
                                    setSelectedValue({
                                      ...selectedValue,
                                      [idx + qindex]: {
                                        item: question.text,
                                        value: csvStringify([val]),
                                      },
                                    });
                                    const response = {
                                      item: question.text,
                                      value:
                                        val !== null
                                          ? csvStringify([val])
                                          : null,
                                    };
                                    const data = updateResponses(
                                      x,
                                      response,
                                      activityId,
                                      responses,
                                      idx + qindex,
                                      startTime,
                                      setActiveStep,
                                      total
                                    );
                                    onResponse(data);
                                  }}
                                  value={
                                    csvParse(
                                      selectedValue[idx + qindex]?.value || []
                                    )[0] ?? null
                                  }
                                />
                              </TableCell>
                            ) : x.type === "rating" ? (
                              (x.options || []).map((op, j) => (
                                <TableCell className={classes.textCenter}>
                                  <RateAnswer
                                    checked={csvParse(
                                      selectedValue[idx + qindex]?.value || []
                                    ).includes(op.value)}
                                    onChange={(val) => {
                                      setSelectedValue({
                                        ...selectedValue,
                                        [idx + qindex]: {
                                          item: question.text,
                                          value: csvStringify([val]),
                                        },
                                      });
                                      const response = {
                                        item: question.text,
                                        value:
                                          val !== null
                                            ? csvStringify([val])
                                            : null,
                                      };
                                      const data = updateResponses(
                                        x,
                                        response,
                                        activityId,
                                        responses,
                                        idx + qindex,
                                        startTime,
                                        setActiveStep,
                                        total
                                      );
                                      onResponse(data);
                                    }}
                                    value={op.value}
                                  />
                                </TableCell>
                              ))
                            ) : x.type === "time" ? (
                              <Box className={classes.timeMatrix}>
                                <TimeSelection
                                  onChange={(val) => {
                                    const response = {
                                      item: question.text,
                                      value: val,
                                    };
                                    const data = updateResponses(
                                      x,
                                      response,
                                      activityId,
                                      responses,
                                      idx + qindex,
                                      startTime,
                                      setActiveStep,
                                      total
                                    );
                                    onResponse(data);
                                  }}
                                  options={x.options}
                                  value={
                                    !!responses?.current[idx + qindex]?.value
                                      ? responses?.current[idx + qindex]?.value
                                      : undefined
                                  }
                                  feedback={
                                    !!responses?.current[idx + qindex]?.feedback
                                      ? responses?.current[idx + qindex]
                                          ?.feedback
                                      : undefined
                                  }
                                />
                              </Box>
                            ) : null
                          ) : (
                            <TableCell className={classes.textCenter}>
                              {x?.type === "short" ? (
                                <ShortTextSection
                                  onChange={(val) => {
                                    const response = {
                                      item: question.text,
                                      value: val,
                                    };
                                    const data = updateResponses(
                                      x,
                                      response,
                                      activityId,
                                      responses,
                                      idx + qindex,
                                      startTime,
                                      setActiveStep,
                                      total
                                    );
                                    onResponse(data);
                                  }}
                                  value={
                                    !!responses?.current[idx + qindex]?.value
                                      ? responses?.current[idx + qindex]?.value
                                      : undefined
                                  }
                                />
                              ) : x.type === "text" ? (
                                <TextSection
                                  onChange={(val) => {
                                    const response = {
                                      item: question.text,
                                      value: val,
                                    };
                                    const data = updateResponses(
                                      x,
                                      response,
                                      activityId,
                                      responses,
                                      idx + qindex,
                                      startTime,
                                      setActiveStep,
                                      total
                                    );
                                    onResponse(data);
                                  }}
                                  charLimit={CHARACTER_LIMIT}
                                  value={
                                    !!responses?.current[idx + qindex]?.value
                                      ? responses?.current[idx + qindex]?.value
                                      : undefined
                                  }
                                  question={question.text}
                                  feedback={
                                    !!responses?.current[idx + qindex]?.feedback
                                      ? responses?.current[idx + qindex]
                                          ?.feedback
                                      : undefined
                                  }
                                />
                              ) : x.type === "time" ? (
                                <Box className={classes.timeMatrix}>
                                  <TimeSelection
                                    onChange={(val) => {
                                      const response = {
                                        item: question.text,
                                        value: val,
                                      };
                                      const data = updateResponses(
                                        x,
                                        response,
                                        activityId,
                                        responses,
                                        idx + qindex,
                                        startTime,
                                        setActiveStep,
                                        total
                                      );
                                      onResponse(data);
                                    }}
                                    options={x.options}
                                    value={
                                      !!responses?.current[idx + qindex]?.value
                                        ? responses?.current[idx + qindex]
                                            ?.value
                                        : undefined
                                    }
                                  />
                                </Box>
                              ) : null}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </Table>
                  </Box>
                </Grid>
                {/* <div className={classes.sliderActionsContainer}>
            {supportsSidebar && index === settingsQuestions - 1 && (
              <Fab onClick={index === settingsQuestions - 1 ? onComplete : handleNext} className={classes.btngreen + " " + classes.marginBottom40} >
                {t("Submit")}
              </Fab>
            )}
          </div> */}
              </Grid>
            </Box>
          </div>
          <Button
            className={classes.scrollArrow}
            onClick={() => scrollBox(100)}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

function normalizeMultiSelectValue(value) {
  if (Array.isArray(value)) {
    return value.map(String); // make sure all values are strings
  }

  if (typeof value === "string") {
    return value.split(",").map((v) => v.replace(/["']/g, "").trim()); // remove quotes and trim
  }

  return [];
}

function MultiSelectResponse({ onChange, options, value, ...props }) {
  const normalizedValue = normalizeMultiSelectValue(value);
  const [selectedValue, setSelectedValue] = useState(normalizedValue || "");
  const selection = csvParse(selectedValue);
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <FormGroup
      {...props}
      classes={{
        root: classes.fieldGroup,
      }}
    >
      {options.map((x) => (
        <FormControlLabel
          className={classes.mrgBtm}
          key={x.label}
          value={`${x.value}`}
          style={{
            alignItems:
              x.value.length > 20 && !!x.description ? "flex-start" : undefined,
          }}
          control={
            <GreenCheckbox
              checked={selection.includes(`${x.value}`)}
              onClick={() => {
                const targetValue = !selection.includes(`${x.value}`)
                  ? [...selection, `${x.value}`]
                  : selection.filter((y) => y !== `${x.value}`);
                const target = csvStringify(targetValue);
                setSelectedValue(target);
                console.log("target", target);
                onChange(target);
              }}
            />
          }
          label={
            <Box className={classes.radioLabelText}>
              <Typography
                variant="body2"
                style={{
                  color: selection.includes(`${x.value}`)
                    ? "black"
                    : "rgba(0, 0, 0, 0.7)",
                }}
              >
                <ReactMarkdown
                  children={t(x.label?.toString())}
                  skipHtml={false}
                  plugins={[gfm, emoji]}
                  renderers={{
                    link: LinkRenderer,
                    sub: (props) => {
                      return <sub>{props?.children}</sub>;
                    },
                    sup: (props) => {
                      return <sup>{props.children}</sup>;
                    },
                  }}
                />
              </Typography>
              <Box className={classes.lightGray}>
                <ReactMarkdown
                  children={!!x.description && ` ${x.description?.toString()}`}
                  skipHtml={false}
                  plugins={[gfm, emoji]}
                  renderers={{
                    link: LinkRenderer,
                    sub: (props) => {
                      return <sub>{props?.children}</sub>;
                    },
                    sup: (props) => {
                      return <sup>{props.children}</sup>;
                    },
                  }}
                />
              </Box>
              {selection.includes(`${x.value}`) && !!x.feedback_text && (
                <Box className={classes.lightGray}>
                  <ReactMarkdown
                    children={` ${x.feedback_text?.toString()}`}
                    skipHtml={false}
                    plugins={[gfm, emoji]}
                    renderers={{
                      link: LinkRenderer,
                      sub: (props) => <sub>{props?.children}</sub>,
                      sup: (props) => <sup>{props.children}</sup>,
                    }}
                  />
                </Box>
              )}
            </Box>
          }
          labelPlacement="end"
        />
      ))}
    </FormGroup>
  );
}

function Question({
  onResponse,
  text,
  desc,
  feedback,
  required,
  type,
  options,
  value,
  startTime,
  currentIndex,
  settings,
  setSettings,
  image,
  ...props
}) {
  const { t } = useTranslation();
  const [optionFeedback, setOptionFeedback] = useState("");
  useEffect(() => {
    const cleanedValue = String(value).replace(/^"(.*)"$/, "$1");
    if (cleanedValue) {
      const selectedOption = options?.find((opt) => opt.value === value.value);
      if (selectedOption?.feedback_text) {
        setOptionFeedback(selectedOption.feedback_text);
      } else {
        setOptionFeedback(""); // clear previous feedback if not applicable
      }
    }
  }, []);
  const onChange = (value) => {
    const cleanedValue = String(value).replace(/^"(.*)"$/, "$1");
    if (cleanedValue) {
      const selectedOption = options?.find((opt) => opt.value === cleanedValue);
      if (selectedOption?.feedback_text) {
        setOptionFeedback(selectedOption.feedback_text);
      } else {
        setOptionFeedback(""); // clear previous feedback if not applicable
      }
    }
    if (currentIndex === settings.length - 1) {
      const selectedOption = options?.find((opt) => opt.value === cleanedValue);
      if (selectedOption?.contigencySettings?.enable_contigency) {
        if (selectedOption.contigencySettings.contigency_type === "activity") {
          let enabledActivities: { question: string; value: string }[] = [];
          const enabledActivitiesStr =
            localStorage.getItem("enabledActivities");

          if (enabledActivitiesStr !== null) {
            enabledActivities = JSON.parse(enabledActivitiesStr);
          }

          const alreadyEnabled = enabledActivities.some(
            (activity) => activity.question === text && activity.value === value
          );

          if (!alreadyEnabled) {
            enabledActivities.push({
              question: text,
              value: value,
            });
            localStorage.setItem(
              "enabledActivities",
              JSON.stringify(enabledActivities)
            );
          }
          if (typeof window !== "undefined" && window.parent) {
            // const lastIndex = cleanedValue ? currentIndex : 0;
            localStorage.setItem("lastAnsweredIndex", currentIndex);
            window.parent.postMessage(
              {
                type: "OPEN_ACTIVITY",
                activityId: selectedOption.contigencySettings.activity,
              },
              "*"
            );
          }
        }
      }
    }
    onResponse({ item: text, value: cleanedValue });
  };
  const classes = useStyles();
  // FIXME: CheckboxResponse, SwitchResponse
  let component = <Box />;

  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));

  switch (type) {
    case "slider":
      options = options.sort((a, b) =>
        parseInt(a.value, 10) > parseInt(b.value, 10)
          ? 1
          : parseInt(a.value, 10) < parseInt(b.value, 10)
          ? -1
          : 0
      );
      component = (
        <Rating
          options={options}
          onChange={onChange}
          value={!!value ? value.value : undefined}
        />
      );
      break;
    case "rating":
      component = (
        <RadioRating
          options={options}
          type="normal"
          mtValue={!supportsSidebar ? 0 : 5}
          onChange={onChange}
          value={!!value ? value.value : undefined}
        />
      );
      break;
    case "likert":
    case "boolean":
    case "select":
    case "list":
      const selectOptions = options;
      component = (
        <RadioOption
          options={selectOptions}
          onChange={onChange}
          value={!!value ? value.value : undefined}
          optionFeedback={optionFeedback}
        />
      );
      break;
    case "short":
      component = (
        <ShortTextSection
          onChange={onChange}
          value={!!value ? value.value : undefined}
        />
      );
      break;
    case "text":
      component = (
        <TextSection
          onChange={onChange}
          charLimit={CHARACTER_LIMIT}
          value={!!value ? value.value : undefined}
          feedback={feedback}
          question={text}
        />
      );
      break;
    case "time":
      component = (
        <TimeSelection
          onChange={onChange}
          options={options}
          value={!!value ? value.value : undefined}
        />
      );
      break;
    case "multiselect":
      console.log("value inside case", value);
      component = (
        <MultiSelectResponse
          options={options}
          onChange={onChange}
          value={!!value ? value.value : undefined}
          // optionFeedback={optionFeedback}
        />
      );
      break;
  }

  return (
    <Grid>
      <Box className={classes.questionhead}>
        <Typography variant="caption" className={classes.required}>
          <ReactMarkdown
            children={t(`${text}`) + (!!required ? "<span>*</span>" : "")}
            allowDangerousHtml={true}
            plugins={[gfm, emoji]}
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
        </Typography>
      </Box>
      <Box className={classes.questionhead}>
        <Typography
          variant="caption"
          display="block"
          style={{ lineHeight: "0.66" }}
        >
          {image && (
            <Image
              src={image}
              alt="Survey image"
              className={classes.survayImage}
            />
          )}
          <ReactMarkdown
            children={
              type === "slider"
                ? t(
                    `${options[0].value} being ${
                      !!options[0].description &&
                      options[0].description.trim().length > 0
                        ? options[0].description
                        : options[0].value
                    }, 
                  ${options[options.length - 1].value} being ${
                      !!options[options.length - 1].description &&
                      options[options.length - 1].description.trim().length > 0
                        ? options[options.length - 1].description
                        : options[options.length - 1].value
                    }`
                  )
                : !!desc && t(`${desc}`)
            }
            skipHtml={false}
            plugins={[gfm, emoji]}
            renderers={{
              link: LinkRenderer,
              sub: (props) => {
                return <sub>{props?.children}</sub>;
              },
              sup: (props) => {
                return <sup>{props.children}</sup>;
              },
            }}
          />
        </Typography>
      </Box>

      <Box className={classes.questionScroll}>{component}</Box>
    </Grid>
  );
}
function Questions({
  idx,
  settings,
  responses,
  x,
  activityId,
  totalQuestions,
  setActiveStep,
  onResponse,
  handleBack,
  handleNext,
  onComplete,
  startTime,
  index,
  setSettings,
  ...props
}) {
  const classes = useStyles();
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));
  const { t } = useTranslation();
  return (
    <Box style={{ marginTop: "100px" }}>
      <Box textAlign="center">
        <Typography
          gutterBottom
          align="center"
          classes={{ root: classes.questionTrack }}
        >
          {`${t("Question")}`} {index + 1} <span>{`${t("of")}`}</span>{" "}
          {settings.length}
        </Typography>
      </Box>

      <Box className={classes.questionScroll}>
        <Box className="carouselContainer">
          <Button
            className={classes.scrollArrow}
            onClick={() => scrollBox(-100)}
          >
            <KeyboardArrowUpIcon />
          </Button>
          <div className={classes.scrollBox} id="scrollBox">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid
                item
                lg={4}
                sm={10}
                xs={12}
                className={classes.surveyQuestionAlign}
              >
                {x && (
                  <Question
                    text={x?.text}
                    type={x?.type}
                    image={x?.image}
                    required={x?.required}
                    desc={x?.description ?? null}
                    feedback={x?.feedback_text ?? null}
                    options={
                      Array.isArray(x?.options)
                        ? x?.options?.map((y) => ({ ...y, label: y.value }))
                        : x.options
                    }
                    value={responses.current[idx] ?? null}
                    onResponse={(response) => {
                      const data = updateResponses(
                        x,
                        response,
                        activityId,
                        responses,
                        idx,
                        startTime,
                        setActiveStep,
                        totalQuestions
                      );
                      onResponse(data);
                    }}
                    startTime={new Date().getTime()}
                    currentIndex={index}
                    settings={settings}
                    setSettings={setSettings}
                  />
                )}
                {/* <div className={classes.sliderActionsContainer}>
            {supportsSidebar && index === settings.length - 1 && (
              <Fab onClick={index === settings.length - 1 ? onComplete : handleNext} className={classes.btngreen}>
                {t("Submit")}
              </Fab>
            )}
          </div> */}
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.scrollArrow}
            onClick={() => scrollBox(100)}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const updateResponses = (
  x,
  response,
  activityId,
  responses,
  idx,
  startTime,
  setActiveStep,
  total
) => {
  responses.current[idx] = response;
  if (x.type !== "multiselect") {
    setActiveStep((prev) => prev + 1);
  }
  response.duration = new Date().getTime() - startTime;

  response.endTime = new Date().getTime();
  response.type = null;
  response.level = null;

  localStorage.setItem(
    "activity-survey-" + activityId,
    JSON.stringify(
      Array.from({
        ...responses.current,
        length: total,
      })
    )
  );
  return Array.from({
    ...responses.current,
    length: total,
  });
};

function Section({
  onResponse,
  value,
  activityVal,
  settings,
  onComplete,
  totalQuestions,
  noBack,
  setSettings,
  orginalSettings,
  isSubmit,
  isFavoriteActive,
  setIsFavoriteActive,
  forward,
  ...props
}) {
  const activityId = value?.id;
  const base = value.settings.map((x, index) =>
    !!activityVal && activityVal[index]
      ? activityVal[index]
      : { item: x.text, value: null, duration: 0 }
  );
  const responses = useRef(base);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [progressValue, setProgressValue] = useState(100 / settings.length);
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"));
  const [index, setIndex] = useState(0);
  const [slideElements, setSlideElements] = useState(null);
  const [elementIn, setElementIn] = useState(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  let settingsCopy = [...settings];
  let contingencyArray = [];

  const calcIndex = (idx) => {
    let index = 0;
    (settings || []).map((x, i) => {
      if (i < idx) {
        if (!!x?.questions && x?.questions.length > 0) {
          index = index + x.questions.length;
        } else {
          index++;
        }
      }
    });
    return index;
  };
  useEffect(() => {
    let index = 0;
    const slideElements = (settings || []).map((x, idx) => {
      setElementIn(true);
      index = calcIndex(idx);
      return (
        <Box key={idx}>
          {!!x?.questions && x?.questions.length > 0 ? (
            <Matrix
              x={x}
              idx={index}
              index={idx}
              activityId={activityId}
              total={totalQuestions}
              onResponse={onResponse}
              setActiveStep={setActiveStep}
              startTime={new Date().getTime()}
              responses={responses}
              settingsQuestions={settings.length}
              handleBack={handleBack}
              handleNext={handleNext}
              onComplete={onComplete}
            />
          ) : (
            <Questions
              idx={index}
              x={x}
              index={idx}
              activityId={activityId}
              settings={settings}
              responses={responses}
              setActiveStep={setActiveStep}
              onResponse={onResponse}
              handleBack={handleBack}
              handleNext={handleNext}
              onComplete={onComplete}
              startTime={new Date().getTime()}
              totalQuestions={totalQuestions}
              setSettings={setSettings}
            />
          )}
        </Box>
      );
    });

    const lastIndexStr = localStorage.getItem("lastAnsweredIndex");
    if (lastIndexStr !== null) {
      const lastIndex = parseInt(lastIndexStr);
      if (
        !isNaN(lastIndex) &&
        lastIndex < slideElements.length &&
        lastIndex != slideElements.length
      ) {
        setIndex(lastIndex);
        setTab(lastIndex);
        const val = (100 / settings.length) * (lastIndex + 1);
        setProgressValue(val > 100 ? 100 : val);
      }
    }

    setSlideElements(slideElements);

    // setSlideElements(slideElements);
  }, [settings]);

  const isComplete = (idx) => !!responses.current[idx]?.value;
  const isError = (idx) => !isComplete(idx) && idx < activeStep;

  const handleBack = () => {
    slideElementChange(0);
  };

  const slideElementChange = (type: number) => {
    // if (!supportsSidebar) {
    setElementIn(false);
    setTimeout(() => {
      type === 0
        ? setIndex((index - 1) % slideElements.length)
        : setIndex((index + 1) % slideElements.length);
      setElementIn(true);
    }, 100);
    // }
    type === 0 ? setTab(tab - 1) : setTab(tab + 1);
    const val =
      type === 0
        ? progressValue - 100 / settings.length
        : progressValue + 100 / settings.length;
    type === 0
      ? setProgressValue(val > 0 ? val : 100 / settings.length)
      : setProgressValue(val > 100 ? 100 : val);
  };

  const handleContingencyQuestion = (selectedOption, actualIndex) => {
    let settingsCopyy = value.settings;
    const currentQuestion = settingsCopyy[actualIndex];
    if (currentQuestion?.visited == undefined) {
      settingsCopyy = settingsCopyy.map((question, index) => ({
        ...question,
        visited: false,
      }));
    }
    if (selectedOption.contigencySettings.contigency_type === "question") {
      const targetIndex = selectedOption.contigencySettings.question_index - 1;
      if (targetIndex >= settingsCopyy.length) {
        return settingsCopyy;
      }
      if (targetIndex === index + 1) return settingsCopyy;
      const questionToMove = settingsCopyy[targetIndex];
      if (targetIndex < actualIndex) {
        questionToMove.revisited = true;
      }
      settingsCopyy.splice(index + 1, 0, questionToMove);
      return settingsCopyy;
    }
    if (selectedOption.contigencySettings.contigency_type === "activity") {
      let enabledActivities: { question: string; value: string }[] = [];
      const enabledActivitiesStr = localStorage.getItem("enabledActivities");

      if (enabledActivitiesStr !== null) {
        enabledActivities = JSON.parse(enabledActivitiesStr);
      }

      const alreadyEnabled = enabledActivities.some(
        (activity) =>
          activity.question === currentQuestion.text &&
          activity.value === selectedOption.value
      );

      if (alreadyEnabled) {
        return settingsCopyy;
      } else {
        enabledActivities.push({
          question: currentQuestion.text,
          value: selectedOption.value,
        });
        localStorage.setItem(
          "enabledActivities",
          JSON.stringify(enabledActivities)
        );

        if (typeof window !== "undefined" && window.parent) {
          const lastIndex = actualIndex ? actualIndex : 0;
          localStorage.setItem("lastAnsweredIndex", lastIndex + 1);
          window.parent.postMessage(
            {
              type: "OPEN_ACTIVITY",
              activityId: selectedOption.contigencySettings.activity,
            },
            "*"
          );
        }

        return settingsCopyy;
      }
    }
  };

  const handleQuestionFlow = (actualIndex, selectedOption) => {
    const currentQuestion = settingsCopy[actualIndex];
    if (currentQuestion?.visited == undefined) {
      settingsCopy = settingsCopy.map((question, index) => ({
        ...question,
        visited: false,
      }));
    }

    if (selectedOption?.contigencySettings?.enable_contigency) {
      if (currentQuestion?.revisited == undefined) {
        contingencyArray = handleContingencyQuestion(
          selectedOption,
          actualIndex
        );
        if (contingencyArray[actualIndex]?.visited == false) {
          contingencyArray[actualIndex].visited = true;
        }
        setSettings(contingencyArray);
      }
    } else {
      if (currentQuestion?.visited == true) {
        setSettings(value.settings);
      } else {
        const updatedQuestion = { ...currentQuestion, visited: true };
        settingsCopy[actualIndex] = updatedQuestion;
        setSettings(settingsCopy);
      }
    }
  };

  const handleNext = () => {
    const actualIndex = calcIndex(index);
    const currentQuestion = settings[index];

    const selectedOption = currentQuestion?.options?.find(
      (opt) => opt.value === responses?.current[actualIndex]?.value
    );
    if (settings[index].subType === "matrix") {
      let i = 0;
      let status = true;
      for (const element of settings[index].questions) {
        if (
          !(
            !element.required ||
            (element.required &&
              responses?.current[actualIndex + i]?.value !== null &&
              typeof responses?.current[actualIndex + i]?.value !==
                "undefined" &&
              (typeof responses?.current[actualIndex + i]?.value !== "string" ||
                (typeof responses?.current[actualIndex + i]?.value ===
                  "string" &&
                  responses?.current[actualIndex + i]?.value?.trim().length !==
                    0)))
          )
        ) {
          enqueueSnackbar(t("Please enter your response."), {
            variant: "error",
          });
          status = false;
          break;
        }
        i++;
      }
      if (!!status) {
        handleQuestionFlow(actualIndex, selectedOption);
        slideElementChange(1);
      }
    } else {
      if (
        !value.settings[actualIndex].required ||
        (value.settings[actualIndex].required &&
          responses?.current[actualIndex]?.value !== null &&
          typeof responses.current[actualIndex].value !== "undefined" &&
          (typeof responses?.current[actualIndex]?.value !== "string" ||
            (typeof responses?.current[actualIndex]?.value === "string" &&
              responses?.current[actualIndex]?.value?.trim().length !== 0)))
      ) {
        handleQuestionFlow(actualIndex, selectedOption);
        slideElementChange(1);
      } else {
        enqueueSnackbar(t("Please enter your response."), {
          variant: "error",
        });
      }
    }
  };
  const tabDirection = (currentTab) => {
    return supportsSidebar ? "up" : "left";
  };

  const handleChange = (event) => {
    const target = event.target;
    // if (target.getAttribute("role") === "dialog") {
    //   const progressVal = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100
    //   setProgressValue(progressVal + 10 > 100 ? progressVal : progressVal + 10)
    // }
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };
  const handleForwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        static_data: {
          is_favorite: isFavoriteActive,
        },
        forward: true,
      }),
      "*"
    );
  };
  const handleBackwardClick = () => {
    parent.postMessage(
      JSON.stringify({
        static_data: {
          is_favorite: isFavoriteActive,
        },
        ...(forward && { forward: false }),
      }),
      "*"
    );
  };
  return (
    <Box>
      <AppBar
        position="fixed"
        style={{ background: "#E7F8F2", boxShadow: "none" }}
      >
        <Toolbar className={classes.toolbardashboard}>
          {!noBack && (
            <IconButton onClick={handleBackwardClick}>
              <Icon>arrow_back</Icon>
            </IconButton>
          )}
          <Typography variant="h5">
            <ReactMarkdown
              children={t(value?.name?.toString().replace(/_/g, " "))}
              skipHtml={false}
              plugins={[gfm, emoji]}
              renderers={{
                link: LinkRenderer,
                sub: (props) => {
                  return <sub>{props?.children}</sub>;
                },
                sup: (props) => {
                  return <sup>{props.children}</sup>;
                },
              }}
            />
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
      <Box>
        <Slide
          in={elementIn}
          direction={tabDirection(index)}
          mountOnEnter
          unmountOnExit
        >
          <Box>
            {!!slideElements && !!slideElements[index]
              ? slideElements[index]
              : null}
          </Box>
        </Slide>
        <Box className={classes.surveyQuestionNav}>
          {index > 0 && (
            <Fab onClick={handleBack} className={classes.btnBack}>
              {t("Back")}
            </Fab>
          )}
          <Fab
            onClick={
              elementIn &&
              (index === settings.length - 1 ? onComplete : handleNext)
            }
            className={classes.btngreen}
            disabled={isSubmit}
          >
            {index === settings.length - 1 ? t("Submit") : t("Next")}
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}

export default function SurveyQuestions({ ...props }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [responses, setResponses] = useState(null);
  const [activity, setActivity] = useState(null);
  const [activityVal, setActivityVal] = useState(null);

  const [settings, setSettings] = useState(null);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const { enqueueSnackbar } = useSnackbar();
  const [confirm, setConfirm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const lastIndexStr = localStorage.getItem("lastAnsweredIndex");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    lastIndexStr != null ? lastIndexStr : 0
  );
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );
  const [isForward, setIsForward] = useState(props?.data?.forward ?? false);
  const validator = (response) => {
    let status = true;
    const questions = activity.settings;
    let i = 0;
    if (response === null) {
      return false;
    }
    for (const question of questions) {
      if (
        !question.required ||
        (!!question.required &&
          !!response &&
          !!response[i] &&
          response[i]?.value !== null &&
          typeof response[i]?.value !== "undefined" &&
          (typeof response[i]?.value !== "string" ||
            (typeof response[i]?.value === "string" &&
              response[i]?.value?.trim().length !== 0)))
      ) {
        status = true;
      } else {
        status = false;
        break;
      }
      i++;
    }
    return status;
  };

  const calculateTotalScore = (response) => {
    let totalScore = 0;
    (response || []).forEach((question) => {
      let questionValue = question?.value;
      const numericValue = parseFloat(questionValue);
      if (!isNaN(numericValue)) {
        totalScore += numericValue;
      }
    });
    return totalScore;
  };

  const postSubmit = (response) => {
    if (validator(response)) {
      response.map((r) => {
        delete r.endTime;
      });
      const totalScore = calculateTotalScore(response);
      const result = {
        temporal_slices: response,
        duration: new Date().getTime() - startTime,
        static_data: { totalScore: totalScore, is_favorite: isFavoriteActive },
        timestamp: startTime,
        ...(isForward && { forward: true }),
      };
      onResponse(result);
      setIsSubmit(!isSubmit);
      localStorage.removeItem("enabledActivities");
      localStorage.removeItem("lastAnsweredIndex");
    } else {
      enqueueSnackbar(
        t(
          "Some responses are missing. Please complete all required questions before submitting."
        ),
        {
          variant: "error",
        }
      );
    }
  };
  const onResponse = (response) => {
    parent.postMessage(
      response === null
        ? JSON.stringify({
            static_data: {
              is_favorite: isFavoriteActive,
            },
            ...(isForward && { forward: true }),
          })
        : JSON.stringify(response),
      "*"
    );
  };

  const loadData = (statusVal: boolean) => {
    if (!!statusVal) {
      const val = localStorage.getItem(
        "activity-survey-" + (props.data?.activity?.id ?? "")
      );
      setActivityVal(JSON.parse(val));
      setResponses(JSON.parse(val));
    } else {
      localStorage.setItem(
        "activity-survey-" + (props.data?.activity?.id ?? ""),
        ""
      );
    }
    const activity = props.data.activity ?? props.data ?? {};
    setActivity(activity);
    setConfirm(false);
  };

  useEffect(() => {
    const lastIndexStr = localStorage.getItem("lastAnsweredIndex");
    setCurrentQuestionIndex(lastIndexStr);

    if (
      typeof localStorage.getItem(
        "activity-survey-" + (props.data?.activity?.id ?? "")
      ) !== "undefined" &&
      (localStorage
        .getItem("activity-survey-" + (props.data?.activity?.id ?? ""))
        ?.trim()?.length ?? 0) > 0
    ) {
      setConfirm(true);
    } else {
      const activity = props.data.activity ?? props.data ?? {};
      setActivity(activity);
    }
    const activity = props.data.activity ?? props.data ?? {};
    setActivity(activity);

    const configuration = props.data.configuration;
    i18n.changeLanguage(!!configuration ? configuration?.language : "en-US");
  }, []);

  useEffect(() => {
    if (!!activity) {
      setQuestions();
    }
  }, [activity]);

  const setQuestions = () => {
    const settings = [];
    const processed = [];
    (activity.settings || []).map((question, index) => {
      if (!processed.includes(index)) {
        if (
          activity.settings[index + 1]?.type === "matrix" ||
          (index === 0 && question?.type === "matrix")
        ) {
          const desc = question?.description ?? "";
          const options = question?.options ?? [];
          const questions = [];

          for (let k = index; k < activity.settings.length; k++) {
            if (k === index || activity.settings[k]?.type === "matrix") {
              questions.push({
                text: activity.settings[k].text,
                required: activity.settings[k].required,
              });
              processed.push(k);
            } else {
              break;
            }
          }
          const type =
            index === 0 && question?.type === "matrix" ? "text" : question.type;
          settings.push({
            type,
            subType: "matrix",
            description: desc,
            options,
            questions,
          });
        } else {
          settings.push(question);
        }
      }
    });
    const updatedArray = activity.settings.map((question, index) => ({
      ...question,
      visited: false,
    }));
    setSettings(updatedArray);
  };

  return (
    <Box className={classes.root}>
      {/* {currentQuestionIndex < activity?.settings?.length &&  */}
      <ConfirmationDialog
        onClose={() => setConfirm(false)}
        open={confirm}
        confirmAction={loadData}
        confirmationMsg={t(
          "Would you like to resume this activity where you left off?"
        )}
      />
      {/* }  */}

      {activity !== null && settings !== null ? (
        <Section
          onResponse={(response) =>
            response === null ? onResponse(null) : setResponses(response)
          }
          value={activity}
          activityVal={activityVal}
          settings={settings}
          totalQuestions={(activity?.settings || []).length}
          noBack={props.data.noBack}
          onComplete={() => {
            postSubmit(responses);
          }}
          setSettings={setSettings}
          orginalSettings={activity?.settings}
          isSubmit={isSubmit}
          isFavoriteActive={isFavoriteActive}
          setIsFavoriteActive={setIsFavoriteActive}
          forward={isForward}
        />
      ) : null}
    </Box>
  );
}
