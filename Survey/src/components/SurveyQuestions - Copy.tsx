// Core Imports
import React, { useState, useRef, useEffect } from "react"
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
} from "@material-ui/core"
import classnames from "classnames"
import i18n from "../i18n"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import emoji from "remark-emoji"
import gfm from "remark-gfm"
import { useSnackbar } from "notistack"

const GreenCheckbox = withStyles({
  root: {
    color: "#2F9D7E",
    "&$checked": {
      color: "#2F9D7E",
    },
    "& svg": { fontSize: "32px !important" },
  },
})((props: CheckboxProps) => <Checkbox color="default" {...props} />)

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
)(LinearProgress)

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
      margin : "0",
    }
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
  icon: {
    borderRadius: "50%",
    width: 32,
    height: 32,
    border: "#C6C6C6 solid 2px",
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
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
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
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
  matrix : {
    "& td" :{
      padding : "0px !important"
    },
    // "& span.MuiFormControlLabel-label ": { marginTop: "18px !important",
    // "& p" : {marginTop : "0px !important"}
  // },
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
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
        margin: "0 55px",
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
    boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.05)",
    lineHeight: "38px",
    fontFamily: "inter",
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
    margin: "-10px 0 50px 0",
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
  required : {
    "& sup" : { color: "red"}
  },
  sliderResponse: {
    marginTop: "60px",
    "& h4": {
      color: "#22977B",
      fontSize: 25,
      fontWeight: 600,
    },
  },

  questionhead: {
    "& h5": { fontSize: 18, fontWeight: 600 },
    "& span": {
      marginTop: 15,
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.5)",
      lineHeight: "16px !important",
    },
  },
  timeHours: {
    padding: 0,
    borderBottom: "#BCEFDD solid 2px",
    minWidth: 57,
    "& div": { padding: 0, margin: 0 },
    "& p": { fontSize: 40, fontWeight: 600, color: "rgba(0, 0, 0, 0.75)", textAlign: "center" },
  },
  textCaption: { color: "rgba(0, 0, 0, 0.5)", fontSize: 10 },
  centerBar: { height: 4, background: "#BCEFDD" },
  customTrack: { width: 4, height: 4, borderRadius: "50%", background: "#65DEB4" },
  customThumb: { width: 24, height: 24, marginTop: -10, marginLeft: -10 },
  noInitialVal: {left: "-600% !important"},
  menuPaper: {
    background: "#F5F5F5",
    boxShadow: "none",
    marginTop: 54,
    maxHeight: 300,
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
  surveyQuestionNav: { textAlign: "center", position: "fixed", width: "100%", bottom: 70 },
  surveyQuestionAlign: {
    textAlign: "center",
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
    "& ol":{
      display: "inline-block",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      padding: "0 40px",
      maxHeight: "55%",
      position: "absolute",
      overflow: "auto",
      width: "100%",
    },
  },
  radioLabel: { fontSize: 14, color: "rgba(0, 0, 0, 0.5)", alignItems: "center !important", textAlign: "left" },

  chatDrawerCustom: { minWidth: 411 },
  questionScroll: {
    marginTop: 30,    
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
      },
    },
  },
  lightGray: { color: "#999", fontSize: "0.75rem" },
  mxSmall: { margin: "0 6px" },
  radioLabelText: { lineHeight: "16px" },

  mrgBtm: { marginBottom: 15 },
  countlabel: { left: "calc(-50% - -8px)" },
}))
function range(start, stop, step = 1) {
  return [...Array(stop - start).keys()].map((v, i) =>
    start + i * step < 10 ? "0" + (start + i * step) : start + i * step
  )
}

function RateAnswer({ checked, onChange, value }) {
  const classes = useStyles()

  return (
    <div onClick={() => onChange(value)} className={checked ? classes.checkedContainer : classes.uncheckContainer}>
      {checked && <Typography className={classes.checkText}>
        <ReactMarkdown source={value} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />
      </Typography>}
    </div>
  )
}

function LinkRenderer(data:any) {
  return <a href={data.href} target="_blank">{data.children}</a>
}

function RadioOption({ onChange, options, value, ...props }) {
  const [selectedValue, setSelectedValue] = useState(value)
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <FormControl component="fieldset" className={classes.radioGroup}>
      <RadioGroup
        {...props}
        name="option"
        value={`${selectedValue}`}
        onChange={(event) => {
          setSelectedValue(event.target.value)
          onChange(event.target.value)
        }}
      >
        {options.map((x) => (
          <FormControlLabel
            key={x.label}
            value={`${x.value}`}
            style={{ alignItems: x.value.length > 25 && !!x.description ? "flex-start" : undefined }}
            control={
              <Radio
                className={classes.radioroot}
                disableRipple
                color="default"
                size="medium"
                onClick={() => {
                  if (selectedValue === `${x.value}`) {
                    setSelectedValue("")
                    onChange(undefined)
                  }
                }}
                checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
              />
            }
            label={
              <Box className={classes.radioLabelText}>
                <Typography
                  variant="body2"
                  style={{ color: selectedValue === `${x.value}` ? "black" : "rgba(0, 0, 0, 0.7)" }}
                >
                  <ReactMarkdown source={t(x.label)} escapeHtml={false}  plugins={[gfm, emoji]} renderers={{link: LinkRenderer}} />
                </Typography>
                <Typography component="span" variant="caption" className={classes.lightGray}>
                  <ReactMarkdown source={!!x.description && ` ${x.description}`} escapeHtml={false} plugins={[gfm, emoji]} renderers={{link: LinkRenderer}} />                  
                </Typography>
              </Box>
            }
            labelPlacement="end"
            className={classes.radioLabel}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

function TimeSelection({ onChange, options, value, ...props }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null)
  const [anchorE3, setAnchorE3] = React.useState<null | HTMLElement>(null)
  const currentValue = !!value ? value?.split(":") : ""
  const [hourSelectedIndex, setHourSelectedIndex] = React.useState(!!value ? currentValue[0] : "01")
  const [minuteSelectedIndex, setMinuteSelectedIndex] = React.useState(!!value ? currentValue[1].substr(0,2) : "00")
  const [ampmSelectedIndex, setAmPmSelectedIndex] = React.useState(!!value ? (currentValue[1].substr(2,3) ?? "") : "AM")
  const { t } = useTranslation()

  useEffect(() => {
    onChange((hourSelectedIndex.length === 1 ? "0" + hourSelectedIndex : hourSelectedIndex ) + ":" + 
      (minuteSelectedIndex.length === 1 ?  "0" + minuteSelectedIndex : minuteSelectedIndex ) + 
      (options[0].value === "standard" ? ampmSelectedIndex : ""))
  }, [])

  useEffect(() => {
    onChange((hourSelectedIndex.length === 1 ? "0" + hourSelectedIndex : hourSelectedIndex ) + ":" + 
      (minuteSelectedIndex.length === 1 ?  "0" + minuteSelectedIndex : minuteSelectedIndex ) + 
       (options[0].value === "standard" ? ampmSelectedIndex : ""))
   }, [hourSelectedIndex, minuteSelectedIndex, ampmSelectedIndex])
  
  const handleClickHours = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickMinutes = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget)
  }

  const handleClickAmPm = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE3(event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: any, type: number) => {
    switch (type) {
      case 0:
        setHourSelectedIndex(index)
        setAnchorEl(null)
        break
      case 1:
        setMinuteSelectedIndex(index)
        setAnchorE2(null)
        break
      case 2:
        setAmPmSelectedIndex(index)
        setAnchorE3(null)
        break
    }
    onChange((hourSelectedIndex.length === 1 ? "0" + hourSelectedIndex : hourSelectedIndex) +
       ":" + (minuteSelectedIndex.length === 1 ? "0" + minuteSelectedIndex : minuteSelectedIndex) + 
       (options[0].value === "standard" ? ampmSelectedIndex : ""))
  }
  const handleHoursClose = () => {
    setAnchorEl(null)
  }
  const handleMinutesClose = () => {
    setAnchorE2(null)
  }
  const handleAmPmClose = () => {
    setAnchorE3(null)
  }
  const ampm = []

  const hourvalues = options[0].value === "standard"? range(0, 12): range(0, 24)
  const minutevalues = ["00", "15", "30", "45"]
  if(options[0].value === "standard") {
    ampm.push(
      <MenuItem
        key="AM"
        selected={"AM" === ampmSelectedIndex}
        onClick={(event) => handleMenuItemClick(event, "AM", 2)}
        classes={{ selected: classes.listSelected }}
      >
        {t("AM")}
      </MenuItem>
    )
    ampm.push(
      <MenuItem
        key="PM"
        selected={"PM" === ampmSelectedIndex}
        onClick={(event) => handleMenuItemClick(event, "PM", 2)}
        classes={{ selected: classes.listSelected }}
      >
        {t("PM")}
      </MenuItem>
    )
  }
  
  return (
    <Box textAlign="center">
      <Grid container justify="center" alignItems="center" className={classes.timeWrapper}>
        <Grid item>
          <List component="nav" className={classes.timeHours}>
            <ListItem button aria-haspopup="true" aria-controls="lock-menu" onClick={handleClickHours}>
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
                {option.length === 1 ? "0" + option : option }
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        :
        <Grid item>
          <List component="nav" className={classes.timeHours} aria-label="Device settings">
            <ListItem button aria-haspopup="true" aria-controls="lock-menu" onClick={handleClickMinutes}>
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
                {option.length === 1 ? "0" + option : option }
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        {options[0].value === "standard" && (<Grid item>
          <List component="nav" className={classes.timeHours} aria-label="Device settings">
            <ListItem button aria-haspopup="true" aria-controls="lock-menu" onClick={handleClickAmPm}>
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
        </Grid>)}
      </Grid>
    </Box>
  )
}

function TextSection({ onChange, charLimit, value, ...props }) {
  const classes = useStyles()
  const [text, setText] = useState(value)

  return (
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
            setText(e.target.value)
            onChange(e.target.value)
          }}
          defaultValue={text}
          helperText={text ? `${text.length}/${charLimit} max characters` : `${charLimit} max characters`}
          inputProps={{
            maxLength: charLimit,
          }}
          classes={{ root: classes.textArea }}
        />
      </FormControl>
    </Box>
  )
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
})(InputBase)

function ShortTextSection({ onChange, value, ...props }) {
  const classes = useStyles()
  const [text, setText] = useState(value)

  return (
    <Box className={classes.textfieldwrapper}>
      <FormControl component="fieldset">
        <CssTextField
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            onChange(e.target.value)
          }}
        />
      </FormControl>
    </Box>
  )
}


function RadioRating({ onChange, options, value, ...props }) {
  const [val, setValue] = useState(value)

  return (
    <Box textAlign="center" mt={5}>
      <Grid direction="row" container justify="center" alignItems="center">
        {options.map((option) => (
          <Box mr={1}>
            <RateAnswer
              checked={val === option.value}
              onChange={() => {
                setValue(option.value)
                onChange(option.value)
              }}
              value={option.value}
            />
            <Typography variant="caption">
              <ReactMarkdown source={option.description} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}}/>
            </Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

function Rating({ onChange, options, value, ...props }) {
  const classes = useStyles()
  const getText = (val) => {
    let sliderValue = null
     // !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
    options.map((mark) => {
      if (mark.value === val) {
        sliderValue = !!mark.description && mark.description.trim().length > 0 ? mark.description : mark.value
      }
    })
    return sliderValue
  }

  const { t } = useTranslation()

  const [valueText, setValueText] = useState(
    !!value
      ? getText(value)
      : null
      // : !!options[0].description && options[0].description.trim().length > 0
      // ? options[0].description
      // : options[0].value
  )
  const [sliderValue, setSliderValue] = useState(!!value ? value : null)

  useEffect(() => {
    onChange(sliderValue)
  }, [])

  const valuetext = (value: number) => {
    return `${options[value]}`
  }
  const getSliderValue = (val) => {
    let sliderValue = null
      // !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
    const slValue = val
    options.map((mark) => {
      if (parseInt(mark.value, 10) === slValue) {
        sliderValue = !!mark.description && mark.description.trim().length > 0 ? mark.description : mark.value
      }
    })
    setSliderValue(val)
    setValueText(sliderValue)
    onChange(val)
    return sliderValue
  }
  return (
    <Box textAlign="center" mt={5}>
      <Slider
        defaultValue={sliderValue}
        value={sliderValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={
          parseInt(options[0].value, 10) < 0 && parseInt(options[1]?.value, 10 ?? 0) < 0
            ? Math.abs(parseInt(options[0].value, 10)) + parseInt(options[1]?.value ?? 0, 10)
            : parseInt(options[0].value, 10) < 0 && parseInt(options[1].value ?? 0, 10) > 0
            ? Math.abs(parseInt(options[0].value, 10)) - parseInt(options[1]?.value ?? 0, 10)
            : parseInt(options[1]?.value ?? 0, 10) - parseInt(options[0].value, 10)
        }
        marks={options}
        min={parseInt(options[0].value, 10)}
        max={parseInt(options[options.length - 1].value, 10)}
        track={false}
        classes={{
          root: classes.slider,
          rail: classes.centerBar,
          mark: classes.customTrack,
          thumb: classes.customThumb + (sliderValue !== null ?  "" : " " + classes.noInitialVal),
          valueLabel: classes.countlabel,
        }}
        onChange={(evt, val) => {
          getSliderValue(val)
        }}
      />
      <Grid container className={classes.sliderValueLabel} direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
          <ReactMarkdown source={!!options[0].description && options[0].description.trim().length === 0
              ? options[0].value
              : options[0].description} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />            
          </Typography>
        </Grid>
        <Grid item>
          {options.length > 2 && (
            <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
              <ReactMarkdown source={!!options[Math.ceil(options.length / 2) - 1].description &&
              options[Math.ceil(options.length / 2) - 1].description.trim().length === 0
                ? options[Math.ceil(options.length / 2) - 1].value
                : options[Math.ceil(options.length / 2) - 1].description} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />              
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
          <ReactMarkdown source={!!options[options.length - 1].description && options[options.length - 1].description.trim().length === 0
              ? options[options.length - 1].value
              : options[options.length - 1].description} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />
            
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.sliderResponse}>
        <Typography variant="caption" display="block" gutterBottom>
          {t("Your response:")}
        </Typography>
        <Typography variant="h4">
          <ReactMarkdown source={t(valueText)} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />          
        </Typography>
      </Box>
    </Box>
  )
}

// // eslint-disable-next-line
// function CheckboxResponse({ onChange, value, ...props }) {
//   return <Checkbox {...props} value={value || false} onChange={(event) => onChange(event.target.value)} />
// }

// // eslint-disable-next-line
// function SwitchResponse({ onChange, value, ...props }) {
//   return <Switch {...props} value={value || false} onChange={(event) => onChange(event.target.value)} />
// }
const csvParse = (x) => (Array.isArray(JSON.parse(`[${x}]`)) ? JSON.parse(`[${x}]`) : [])
const csvStringify = (x) => (Array.isArray(x) ? JSON.stringify(x).slice(1, -1) : "")

function Matrix({ onChange, options, value, ...props }) {
  const [selectedValue, setSelectedValue] = useState(value || [])
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
console.log(selectedValue)
  }, [])
  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue])

  return (
    <Table className={classes.matrix}>
      <TableRow>
        <TableCell>{null}</TableCell>
        {(options?.options || []).map((x) => (
          <TableCell> 
            <ReactMarkdown source={!!x.description && ` ${x.description}` + `(${x.value})`} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />   
          </TableCell>
        ))}
      </TableRow>
      {(options?.questions || []).map((question, index) => (
        <TableRow>
          <TableCell>
            <ReactMarkdown source={question} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />   
          </TableCell>
          { !options.multiple ?  (
            <RadioGroup aria-label="question" name={question} >            
            {(options?.options || []).map((x) => (
              // <TableCell>
                <FormControlLabel
                  key={`${x.value}`}
                  value={`${x.value}`}
                  style={{ alignItems: "flex-start" }}
                  control={                  
                      <Radio
                        className={classes.radioroot}
                        disableRipple
                        color="default"
                        size="medium"
                        checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                        icon={<span className={classes.icon} />}
                        onClick={() => {
                          const values = selectedValue
                          if(!!values[index]) {
                            values[index] = {question, value : [x.value]}
                          } else {
                            values.push({question, value : [x.value]})
                          }
                          setSelectedValue(values)                          
                        }}
                      />
                  }
                  label={
                    <Box className={classes.radioLabelText}>
                      <Typography
                        variant="body2"
                        style={{ color: (selectedValue[index]?.value || []).includes(`${x.value}`) ? "black" : "rgba(0, 0, 0, 0.7)" }}
                      >
                        <ReactMarkdown source={t(x.label)} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
                      </Typography>
                      <Box className={classes.lightGray}>
                        <ReactMarkdown source={!!x.description && ` ${x.description}`} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
                      </Box>
                    </Box>
                  }
                  labelPlacement="end"
                />
              // </TableCell>
            ))}
           </RadioGroup>
          ) :(
            
              (options?.options || []).map((x, j) => (
                <TableCell>

                {/* {(j === 0 &&  <FormGroup
                    {...props}
                    classes={{
                      root: classes.fieldGroup,
                    }}
                  >)} */}
                <FormControlLabel
                className={classes.mrgBtm}
                key={x.value}
                value={`${x.value}`}
                style={{ alignItems: x.value.length > 20 && !!x.description ? "flex-start" : undefined }}
                control={
                    <GreenCheckbox
                      checked={(selectedValue[index]?.value || []).includes(x.value)}
                      onClick={() => {
                        let values = selectedValue[index]?.value ?? []
                        values.push(x.value)
                        values = (values || []).filter((elem, i, self)  => {
                          return i === self.indexOf(elem);
                        })
                        console.log(values)
                        // const selValues = selectedValue
                        // selValues[index] = {question, value : values}
                        setSelectedValue({...selectedValue, [index]: {question, value : values}})
                      }}                     
                    />
                }
                label={
                  <Box className={classes.radioLabelText}>
                    <Typography
                      variant="body2"
                      style={{ color: (selectedValue[index]?.value || []).includes(`${x.value}`) ? "black" : "rgba(0, 0, 0, 0.7)" }}
                    >
                      <ReactMarkdown source={t(x.label)} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
                    </Typography>
                    <Box className={classes.lightGray}>
                      <ReactMarkdown source={!!x.description && ` ${x.description}`} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
                    </Box>
                  </Box>                                
                }
                labelPlacement="end"
                />
                             {/* {(j === 0 && </FormGroup> )} */}

                </TableCell>
              ))

          )}        
        </TableRow> 
      ))}
    </Table>
  )
}

function MultiSelectResponse({ onChange, options, value, ...props }) {
  const [selectedValue, setSelectedValue] = useState(value || "")
  const selection = csvParse(selectedValue)
  const classes = useStyles()
  const { t } = useTranslation()

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
          style={{ alignItems: x.value.length > 20 && !!x.description ? "flex-start" : undefined }}
          control={
            <GreenCheckbox
              checked={selection.includes(`${x.value}`)}
              onClick={() => {
                const targetValue = !selection.includes(`${x.value}`)
                  ? [...selection, `${x.value}`]
                  : selection.filter((y) => y !== `${x.value}`)
                const target = csvStringify(targetValue)
                setSelectedValue(target)
                onChange(target)
              }}
            />
          }
          label={
            <Box className={classes.radioLabelText}>
              <Typography
                variant="body2"
                style={{ color: selection.includes(`${x.value}`) ? "black" : "rgba(0, 0, 0, 0.7)" }}
              >
                <ReactMarkdown source={t(x.label)} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
              </Typography>
              <Box className={classes.lightGray}>
                <ReactMarkdown source={!!x.description && ` ${x.description}`} escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />                
              </Box>
            </Box>
          }
          labelPlacement="end"
        />
      ))}
    </FormGroup>
  )
}


function Question({ onResponse, text, desc, required, type, options, value, startTime, ...props }) {
  const { t } = useTranslation()

  const onChange = (value) => {
    onResponse({ item: text, value })
  }
  const binaryOpts = [
    { label: t("Yes"), value: "Yes" /* true */ },
    { label: t("No"), value: "No" /* false */ },
  ]
  const ternaryOpts = [
    { label: t("Yes"), value: "Yes" /* true */ },
    { label: t("No"), value: "No" /* false */ },
    { label: t("N/A"), value: null /* null */ },
  ]
  const classes = useStyles()
  // FIXME: CheckboxResponse, SwitchResponse
  const CHARACTER_LIMIT = 800
  let component = <Box />
  const likertOpts = [
    { label: t("Nearly All the Time"), value: 3 },
    { label: t("More than Half the Time"), value: 2 },
    { label: t("Several Times"), value: 1 },
    { label: t("Not at all"), value: 0 },
  ]
  console.log(type)
  switch (type) {
    case "slider":
      options = options.sort((a, b) =>
        parseInt(a.value, 10) > parseInt(b.value, 10) ? 1 : parseInt(a.value, 10) < parseInt(b.value, 10) ? -1 : 0
      )
      component = <Rating options={options} onChange={onChange} value={!!value ? value.value : undefined} />
      break
    case "rating":
      component = <RadioRating options={options} onChange={onChange} value={!!value ? value.value : undefined} />
      break
    case "likert":
    case "boolean":
    case "select":
    case "list":
      const selectOptions = type === "boolean" ? binaryOpts : type === "likert" ? likertOpts : options
      component = <RadioOption options={selectOptions} onChange={onChange} value={!!value ? value.value : undefined} />
      break
    case "short":
      component = <ShortTextSection onChange={onChange} value={!!value ? value.value : undefined} />
      break
    case "text":
      component = (
        <TextSection onChange={onChange} charLimit={CHARACTER_LIMIT} value={!!value ? value.value : undefined} />
      )
      break
    case "time":
      component = <TimeSelection onChange={onChange} options={options} value={!!value ? value.value : undefined} />
      break
    case "multiselect":
      component = (
        <MultiSelectResponse options={options} onChange={onChange} value={!!value ? value.value : undefined} />
      )
      break
    case "matrix":
      component = (
        <Matrix options={options} onChange={onChange} value={!!value ? value.value : {}} />
      )
      break
  }

  return (
    <Grid>
      <Box className={classes.questionhead}>
        <Typography variant="caption" className={classes.required}>
          <ReactMarkdown source={t(text + (!!required ? "<sup>*</sup>" : ""))} escapeHtml={false}  plugins={[gfm, emoji]} renderers={{link: LinkRenderer}} /> 
        </Typography>
        </Box>
      <Box className={classes.questionhead}>
        <Typography variant="caption" display="block" style={{ lineHeight: "0.66" }}>                 
          <ReactMarkdown source={type === "slider"
            ? t(
                `${options[0].value} being ${
                  !!options[0].description && options[0].description.trim().length > 0
                    ? options[0].description
                    : options[0].value
                }, 
                  ${options[options.length - 1].value} being ${
                  !!options[options.length - 1].description && options[options.length - 1].description.trim().length > 0
                    ? options[options.length - 1].description
                    : options[options.length - 1].value
                }`
              )
            : !!desc && t(`${desc}`) } escapeHtml={false}  plugins={[gfm, emoji]}  renderers={{link: LinkRenderer}} />           
        </Typography>
      </Box>
      <Box className={classes.questionScroll}>{component}</Box>
    </Grid>
  )
}
function Questions({
  idx,
  value,
  responses,
  x,
  setActiveStep,
  onResponse,
  handleBack,
  handleNext,
  onComplete,
  prefillData,
  prefillTimestamp,
  toolBarBack,
  startTime,
  ...props
}) {
  const classes = useStyles()
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"))
  const { t } = useTranslation()

  return (
    <Box style={{ marginTop: "100px" }}>
      <Box textAlign="center">
        <Typography gutterBottom align="center" classes={{ root: classes.questionTrack }}>
          {t("Question number of total", { number: idx + 1, total: value.settings.length })}
        </Typography>
      </Box>

      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item lg={4} sm={10} xs={12} className={classes.surveyQuestionAlign}>
          <Question
            text={x.text}
            type={x.type}
            required={x.required}
            desc={x.description ?? null}
            options={Array.isArray(x.options) ? x.options?.map((y) => ({ ...y, label: y.value })) : x.options}
            value={responses.current[idx]}
            onResponse={(response) => {
              const lastEndTime =
                responses.current
                  .filter((item) => item.value != null)
                  .sort((a, b) => {
                    return a.endTime > b.endTime ? 1 : a.endTime < b.endTime ? -1 : 0
                  })
                  .pop()?.endTime ?? startTime
              const currentItem = responses.current.filter((item) => item.item === x.text).pop()

              responses.current[idx] = response
              if (x.type !== "multiselect") {
                setActiveStep((prev) => prev + 1)
              }
              response.duration =
                (x.type !== "text" ? new Date().getTime() - startTime : new Date().getTime() - lastEndTime) +
                  currentItem?.duration ?? 0
              response.endTime = new Date().getTime()
              onResponse(
                Array.from({
                  ...responses.current,
                  length: value.settings.length,
                })
              )
            }}
            startTime={new Date().getTime()}
          />
          <div className={classes.sliderActionsContainer}>
            {supportsSidebar && idx === value.settings.length - 1 && (
              <Fab onClick={idx === value.settings.length - 1 ? onComplete : handleNext} className={classes.btngreen}>
                {toolBarBack && !!prefillData ? (!!prefillTimestamp ? "Overwrite" : "Duplicate") : t("Submit")}
              </Fab>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}
function Section({
  onResponse,
  value,
  type,
  prefillData,
  prefillTimestamp,
  onComplete,
  closeDialog,
  toolBarBack,
  ...props
}) {
  const base = value.settings.map((x) => ({ item: x.text, value: null, duration: 0 }))
  const responses = useRef(!!prefillData ? Object.assign(base, prefillData) : base)
  const [activeStep, setActiveStep] = useState(0)
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [progressValue, setProgressValue] = useState(100 / value.settings.length)
  const supportsSidebar = useMediaQuery(useTheme().breakpoints.up("md"))
  const [index, setIndex] = useState(0)
  const [slideElements, setSlideElements] = useState(null)
  const [elementIn, setElementIn] = useState(false)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  // Force creation of result data whether survey was interacted with or not.
  useEffect(() => {
    if (slideElements === null) {
      const slideElements = value.settings.map((x, idx) => {
        setElementIn(true)
        return (
          <Box key={idx}>
            <Questions
              idx={idx}
              x={x}
              value={value}
              responses={responses}
              setActiveStep={setActiveStep}
              onResponse={onResponse}
              handleBack={handleBack}
              handleNext={handleNext}
              onComplete={onComplete}
              toolBarBack={toolBarBack}
              prefillData={prefillData}
              prefillTimestamp={prefillTimestamp}
              startTime={new Date().getTime()}
            />
          </Box>
        )
      })
      setSlideElements(slideElements)
    }
    window.addEventListener("scroll", handleChange, true)
  }, [])
  const isComplete = (idx) => !!responses.current[idx]?.value
  const isError = (idx) => !isComplete(idx) && idx < activeStep

  const handleBack = () => {
    slideElementChange(0)
  }

  const slideElementChange = (type: number) => {
    if (!supportsSidebar) {
      setElementIn(false)
      setTimeout(() => {
        type === 0 ? setIndex((index - 1) % slideElements.length) : setIndex((index + 1) % slideElements.length)
        setElementIn(true)
      }, 500)
    }
    type === 0 ? setTab(tab - 1) : setTab(tab + 1)
    const val = type === 0 ? progressValue - 100 / value.settings.length : progressValue + 100 / value.settings.length
    type === 0 ? setProgressValue(val > 0 ? val : 100 / value.settings.length) : setProgressValue(val > 100 ? 100 : val)
  }

  const handleNext = () => {
    if(!value.settings[index].required || (value.settings[index].required && (responses.current[index].value !== null && typeof responses.current[index].value !== "undefined" &&
      (typeof responses.current[index].value !== "string" || (typeof responses.current[index].value === "string" &&
       responses.current[index].value?.trim().length !== 0))))) {
      slideElementChange(1)
    } else {
      enqueueSnackbar(t("Please enter your response."), {
        variant: "error",
      }) 
    }
  }
  const tabDirection = (currentTab) => {
    return supportsSidebar ? "up" : "left"
  }

  const handleChange = (event) => {
    const target = event.target
   // if (target.getAttribute("role") === "dialog") {
    //   const progressVal = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100
    //   setProgressValue(progressVal + 10 > 100 ? progressVal : progressVal + 10)
    // }
  }

  return (
    <Box>
      <AppBar position="fixed" style={{ background: "#E7F8F2", boxShadow: "none" }}>        
        <Toolbar className={classes.toolbardashboard}>
          <IconButton onClick={() => onResponse(null)}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="h5">
            <ReactMarkdown source={t(type.replace(/_/g, " "))} escapeHtml={false}  plugins={[gfm, emoji]} renderers={{link: LinkRenderer}} />   
          </Typography>
        </Toolbar>
        <BorderLinearProgress variant="determinate" value={progressValue} />
      </AppBar>
      {supportsSidebar ? (
        value.settings.map((x, idx) => (
          <Box my={4}>
            <Questions
              idx={idx}
              x={x}
              value={value}
              responses={responses}
              setActiveStep={setActiveStep}
              onResponse={onResponse}
              handleBack={handleBack}
              handleNext={handleNext}
              onComplete={onComplete}
              toolBarBack={toolBarBack}
              prefillData={prefillData}
              prefillTimestamp={prefillTimestamp}
              startTime={new Date().getTime()}
            />
          </Box>
        ))
      ) : (
        <Box>
          <Slide in={elementIn} direction={tabDirection(index)} mountOnEnter unmountOnExit>
            <Box>{slideElements ? slideElements[index] : null}</Box>
          </Slide>
          <Box className={classes.surveyQuestionNav}>
            {!supportsSidebar && index > 0 && (
              <Fab onClick={handleBack} className={classes.btnBack}>
                Back
              </Fab>
            )}
            {!supportsSidebar && (
              <Fab
                onClick={elementIn && (index === value.settings.length - 1 ? onComplete : handleNext)}
                className={classes.btngreen}
              >
                {index === value.settings.length - 1
                  ? toolBarBack && !!prefillData
                    ? !!prefillTimestamp
                      ? "Overwrite"
                      : "Duplicate"
                    : t("Submit")
                  : t("Next")}
              </Fab>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default function SurveyQuestions({...props}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const responses = useRef(null)
  const [content, setContent] = useState(null)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const { enqueueSnackbar } = useSnackbar()

  const validator = (response) => {
    let status = true
    const questions = content.sections[0].settings
    for (const section of response) {
      if(!!response && !!section) {      
        let i = 0 
        for (const question of section) {
          if(!questions[i].required || (!!questions[i].required && (question.value !== null && typeof question.value !== "undefined" &&
            (typeof question.value !== "string" || (typeof question.value === "string" &&
            question.value?.trim().length !== 0))))) {
              status = true              
          } else {
            status = false
            break
          }
          i++;
        } 
      }else {
        status = false
        break
      }
    }
    return status
  }
  const postSubmit = (response) => {
    if(response === null) {
      onResponse(null)
      return
    }
    if(validator(response)) {
      response.duration = new Date().getTime() - startTime
      onResponse(response, content?.prefillTimestamp)           
    } else {
      enqueueSnackbar(t("Some responses are missing. Please complete all required questions before submitting."), {
        variant: "error",
      }) 
    }
  }
  const onResponse = (response, prefillTimestamp?: any) => {
    parent.postMessage(
      response === null ? null : JSON.stringify({
        response,
        prefillTimestamp
      }),
      "*"
    )
  }
  
  useEffect(() => {  
    const activity = {
      "name": "A survey",
      "description": null,
      "sections": [
          {
              "id": "wdp7jxchr12176d46ebf",
              "category": [
                  "assess"
              ],
              "spec": "lamp.survey",
              "photo": null,
              "schedule": [
                  {
                      "start_date": "2021-12-07T04:13:00.000Z",
                      "time": null,
                      "custom_time": null,
                      "repeat_interval": "daily",
                      "notification_ids": [
                          43661
                      ]
                  }
              ],
              "settings": [
                  {
                      "text": "Q1",
                      "type": "matrix",
                      "required": true,
                      "options": {
                          "options": [
                              {
                                  "value": "Op1",
                                  "description": "Op1a"
                              },
                              {
                                  "value": "Op2",
                                  "description": "Op2a"
                              }
                          ],
                          "questions": [
                              "Q1a",
                              "Q2a",
                              "Q3a"
                          ],
                          "multiple": false
                      }
                  },
                  {
                      "text": "sdfsdf",
                      "type": "multiselect",
                      "required": true,
                      "options": [
                          {
                              "value": "zfdsf",
                              "description": "dsf"
                          },
                          {
                              "value": "cxv",
                              "description": "zxz"
                          }
                      ]
                  }
              ]
          }
      ],
      "partialValidationOnly": false,
      "validate": true,
      "toolBarBack": false,
      "type": "A survey",
      "spec": "lamp.survey",
      "id": "wdp7jxchr12176d46ebf"
  }
  console.log(activity)
    
    // props.data.activity ?? (props.data ?? {});
    const configuration = null // props.data.configuration;
    setContent(activity);
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    responses.current = {} // !!activity?.prefillData ? Object.assign({}, activity?.prefillData) : {}     
  }, [])

  return (
    <div className={classes.root}>      
      {(content !== null) ?
        (((content || {}).sections || []).map((x, idx) => (
          <Section
            onResponse={(response) => (response === null) ? postSubmit(null) :
              (responses.current[idx] = response)}
            value={x}
            prefillData={content?.toolBarBack ? content?.prefillData[idx] : {}}
            prefillTimestamp={content?.prefillTimestamp}
            type={content?.type}
            onComplete={() =>
              postSubmit(
                Array.from({
                  ...responses.current,
                  length: content.sections.length,
                })
              )
            }
            toolBarBack={content?.toolBarBack}
            closeDialog={props.closeDialog}
          />
        ))) : null}
    </div>
  )
}