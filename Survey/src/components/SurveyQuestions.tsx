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
  Tooltip,
  Icon,
  FormGroup,
  Backdrop,
  CircularProgress,
  InputBase,
  Checkbox,
  CheckboxProps,
} from "@material-ui/core"
import classnames from "classnames"
import { useSnackbar } from "notistack"
import i18n from "../i18n"
import { useTranslation } from "react-i18next"
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
    marginLeft: -15,
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
  textAreaControl: {
    width: "100%",
    marginTop: 35,
    background: "#f5f5f5",
    borderRadius: 10,
    "& p": { position: "absolute", bottom: 15, right: 0 },
  },
  textArea: {
    borderRadius: "10px",
    "& fieldset": { borderWidth: 0 },
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
      justifyContent: "left",
    },
  },
  textfieldwrapper: { marginLeft: -12, marginRight: -12 },
  listSelected: {
    background: "#E7F8F2 !important",
  },
  surveyQuestionNav: { textAlign: "center", position: "absolute", width: "100%", bottom: 40 },
  surveyQuestionAlign: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
      padding: "0 40px",
      maxHeight: "55%",
      position: "absolute",
      overflow: "auto",
    },
  },
  radioLabel: { fontSize: 14, color: "rgba(0, 0, 0, 0.5)", alignItems: "center !important", textAlign: "left" },

  chatDrawerCustom: { minWidth: 411 },
  questionScroll: {
    marginTop: 30,
    paddingLeft: 10,
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 380px)",
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
      {checked && <Typography className={classes.checkText}>{value}</Typography>}
    </div>
  )
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
                  {t(x.label)}
                </Typography>
                <Typography component="span" variant="caption" className={classes.lightGray}>
                  {!!x.description && ` ${x.description}`}
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

function TimeSelection({ onChange, value, ...props }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null)
  const [anchorE3, setAnchorE3] = React.useState<null | HTMLElement>(null)
  const [hourSelectedIndex, setHourSelectedIndex] = React.useState("01")
  const [minuteSelectedIndex, setMinuteSelectedIndex] = React.useState("00")
  const [ampmSelectedIndex, setAmPmSelectedIndex] = React.useState("am")
  const { t } = useTranslation()

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

  const hourvalues = range(1, 13)
  const minutevalues = range(0, 4, 15)

  ampm.push(
    <MenuItem
      key="am"
      selected={"am" === ampmSelectedIndex}
      onClick={(event) => handleMenuItemClick(event, "am", 2)}
      classes={{ selected: classes.listSelected }}
    >
      {t("am")}
    </MenuItem>
  )
  ampm.push(
    <MenuItem
      key="pm"
      selected={"pm" === ampmSelectedIndex}
      onClick={(event) => handleMenuItemClick(event, "pm", 2)}
      classes={{ selected: classes.listSelected }}
    >
      {t("pm")}
    </MenuItem>
  )

  return (
    <Box textAlign="center">
      <Grid container justify="center" alignItems="center" spacing={2} className={classes.timeWrapper}>
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
                key={option}
                selected={option === hourSelectedIndex}
                onClick={(event) => handleMenuItemClick(event, option, 0)}
                classes={{ selected: classes.listSelected }}
              >
                {option}
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
                key={option}
                selected={option === minuteSelectedIndex}
                onClick={(event) => handleMenuItemClick(event, option, 1)}
                classes={{ selected: classes.listSelected }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid item>
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
        </Grid>
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
  return (
    <Box textAlign="center" mt={5}>
      <Grid direction="row" container justify="center" alignItems="center">
        {options.map((option) => (
          <Box mr={1}>
            <RateAnswer checked={value === option.value} onChange={() => onChange(option.value)} value={option.value} />
            <Typography variant="caption">{option.description}</Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

function Rating({ onChange, options, value, ...props }) {
  const classes = useStyles()
  const getText = (val) => {
    let sliderValue =
      !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
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
      : !!options[0].description && options[0].description.trim().length > 0
      ? options[0].description
      : options[0].value
  )
  const [sliderValue, setSliderValue] = useState(!!value ? value : parseInt(options[0].value, 10))

  useEffect(() => {
    onChange(sliderValue)
  }, [])

  const valuetext = (value: number) => {
    return `${options[value]}`
  }
  const getSliderValue = (val) => {
    let sliderValue =
      !!options[0].description && options[0].description.trim().length > 0 ? options[0].description : options[0].value
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
          parseInt(options[0].value, 10) < 0 && parseInt(options[1].value, 10) < 0
            ? Math.abs(parseInt(options[0].value, 10)) + parseInt(options[1].value, 10)
            : parseInt(options[0].value, 10) < 0 && parseInt(options[1].value, 10) > 0
            ? Math.abs(parseInt(options[0].value, 10)) - parseInt(options[1].value, 10)
            : parseInt(options[1].value, 10) - parseInt(options[0].value, 10)
        }
        marks={options}
        min={parseInt(options[0].value, 10)}
        max={parseInt(options[options.length - 1].value, 10)}
        track={false}
        classes={{
          root: classes.slider,
          rail: classes.centerBar,
          mark: classes.customTrack,
          thumb: classes.customThumb,
          valueLabel: classes.countlabel,
        }}
        onChange={(evt, val) => {
          getSliderValue(val)
        }}
      />
      <Grid container className={classes.sliderValueLabel} direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
            {!!options[0].description && options[0].description.trim().length === 0
              ? options[0].value
              : options[0].description}
          </Typography>
        </Grid>
        <Grid item>
          {options.length > 2 && (
            <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
              {!!options[Math.ceil(options.length / 2) - 1].description &&
              options[Math.ceil(options.length / 2) - 1].description.trim().length === 0
                ? options[Math.ceil(options.length / 2) - 1].value
                : options[Math.ceil(options.length / 2) - 1].description}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Typography variant="caption" className={classes.textCaption} display="block" gutterBottom>
            {!!options[options.length - 1].description && options[options.length - 1].description.trim().length === 0
              ? options[options.length - 1].value
              : options[options.length - 1].description}
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.sliderResponse}>
        <Typography variant="caption" display="block" gutterBottom>
          {t("Your response:")}
        </Typography>
        <Typography variant="h4">{t(valueText)}</Typography>
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
                {t(x.label)}
              </Typography>
              <Box className={classes.lightGray}>{!!x.description && ` ${x.description}`}</Box>
            </Box>
          }
          labelPlacement="end"
        />
      ))}
    </FormGroup>
  )
}

function Question({ onResponse, text, desc, type, options, value, startTime, ...props }) {
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
  const CHARACTER_LIMIT = 300
  let component = <Box />
  const likertOpts = [
    { label: t("Nearly All the Time"), value: 3 },
    { label: t("More than Half the Time"), value: 2 },
    { label: t("Several Times"), value: 1 },
    { label: t("Not at all"), value: 0 },
  ]
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
      component = <TimeSelection onChange={onChange} value={!!value ? value.value : undefined} />
      break
    case "multiselect":
      component = (
        <MultiSelectResponse options={options} onChange={onChange} value={!!value ? value.value : undefined} />
      )
      break
  }

  return (
    <Grid>
      <Box className={classes.questionhead}>
        <Typography variant="h5">{t(`${text}`)}</Typography>
        <Typography variant="caption" display="block" style={{ lineHeight: "0.66" }}>
          {type === "slider"
            ? t(
                `(${options[0].value} being ${
                  !!options[0].description && options[0].description.trim().length > 0
                    ? options[0].description
                    : options[0].value
                }, 
                  ${options[options.length - 1].value} being ${
                  !!options[options.length - 1].description && options[options.length - 1].description.trim().length > 0
                    ? options[options.length - 1].description
                    : options[options.length - 1].value
                })`
              )
            : !!desc && t(` (${desc})`)}
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
            desc={x.description ?? null}
            options={x.options?.map((y) => ({ ...y, label: y.value }))}
            value={responses.current[idx]}
            onResponse={(response) => {
              console.log(responses, responses.current)
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
    slideElementChange(1)
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
          <Typography variant="h5">{t(type.replace(/_/g, " "))}</Typography>
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
  // const { enqueueSnackbar } = useSnackbar()

  const validator = (response) => {
    for (const section of response) {
      if (section === undefined) {
        if (!!content?.partialValidationOnly) {
          continue
        }
        else {
          return false
        }
      }
      for (const question of section) {
        if (question === undefined) {
          return false
        }
      }
    }
    return true
  }
  const postSubmit = (response) => {
    response.duration = new Date().getTime() - startTime
    if (!content?.validate) {
      onResponse(response, content?.prefillTimestamp)
    }
    else if (content?.validate && validator(response)) {
      onResponse(response, content?.prefillTimestamp)
    }
    else if (content?.validate && !validator(response)) {
      // enqueueSnackbar(t("Some responses are missing. Please complete all questions before submitting."), {
      //   variant: "error",
      // }) 
    }
  }
  const onResponse = (response, prefillTimestamp) => {
     parent.postMessage(
      JSON.stringify({
        response,
        prefillTimestamp
      }),
      "*"
    )
  }
  
  useEffect(() => {    
  //   const data = JSON.parse(JSON.stringify({
  //     "activity": {
  //         "name": "S1",
  //         "description": "S1 desc",
  //         "sections": [
  //             {
  //                 "id": "m52s452624qcxjn1khyx",
  //                 "spec": "lamp.survey",
  //                 "photo": "data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTI1NiAzMGgtMTk1djQ4MmgxOTUgMTk1di00ODJ6IiBmaWxsPSIjZmY2YzZjIi8+PHBhdGggZD0ibTI1NiAzMGgxOTV2NDgyaC0xOTV6IiBmaWxsPSIjZTYzOTUwIi8+PHBhdGggZD0ibTMxNiA2MC0zMC0zMGgtMzAtMzBsLTMwIDMwaC0xMDV2NDIyaDE2NSAxNjV2LTQyMnoiIGZpbGw9IiNmMGY3ZmYiLz48cGF0aCBkPSJtNDIxIDYwaC0xMDVsLTMwLTMwaC0zMHY0NTJoMTY1eiIgZmlsbD0iI2RmZTdmNCIvPjxnIGZpbGw9IiNjN2NmZTEiPjxwYXRoIGQ9Im0yNzEgMTIxaDEyMHYzMGgtMTIweiIvPjxwYXRoIGQ9Im0yNzEgMTgxaDYwdjMwaC02MHoiLz48cGF0aCBkPSJtMjcxIDI0MWgxMjB2MzBoLTEyMHoiLz48cGF0aCBkPSJtMjcxIDMwMWg2MHYzMGgtNjB6Ii8+PHBhdGggZD0ibTI3MSAzNjFoMTIwdjMwaC0xMjB6Ii8+PHBhdGggZD0ibTI3MSA0MjFoNjB2MzBoLTYweiIvPjwvZz48cGF0aCBkPSJtMjExIDIxMWgtOTB2LTkwaDkweiIgZmlsbD0iIzk3ZGUzZCIvPjxwYXRoIGQ9Im0yMTEgMzMxaC05MHYtOTBoOTB6IiBmaWxsPSIjOTdkZTNkIi8+PHBhdGggZD0ibTIxMSA0NTFoLTkwdi05MGg5MHoiIGZpbGw9IiM5N2RlM2QiLz48cGF0aCBkPSJtMTUxIDE1MWgzMHYzMGgtMzB6IiBmaWxsPSIjZjBmN2ZmIi8+PHBhdGggZD0ibTE1MSAyNzFoMzB2MzBoLTMweiIgZmlsbD0iI2YwZjdmZiIvPjxwYXRoIGQ9Im0xNTEgMzkxaDMwdjMwaC0zMHoiIGZpbGw9IiNmMGY3ZmYiLz48cGF0aCBkPSJtMjU2IDBoLTYwdjYwaDYwIDYwdi02MHoiIGZpbGw9IiM0NzRmNTQiLz48cGF0aCBkPSJtMjU2IDBoNjB2NjBoLTYweiIgZmlsbD0iIzMyMzkzZiIvPjwvZz48L3N2Zz4=",
  //                 "schedule": [],
  //                 "settings": [
  //                     {
  //                         "text": "Q1",
  //                         "type": "text",
  //                         "description": "q1 desc",
  //                         "options": null
  //                     },
  //                     {
  //                         "text": "Q2",
  //                         "type": "boolean",
  //                         "description": "Q2 desc",
  //                         "options": null
  //                     },
  //                     {
  //                         "text": "Q3",
  //                         "type": "short",
  //                         "description": "Q3 desc",
  //                         "options": null
  //                     },
  //                     {
  //                         "text": "q4",
  //                         "type": "multiselect",
  //                         "options": [
  //                             {
  //                                 "value": "gbb",
  //                                 "description": "sdf"
  //                             },
  //                             {
  //                                 "value": "fg",
  //                                 "description": "sdf3"
  //                             }
  //                         ]
  //                     },
  //                     {
  //                         "text": "fes",
  //                         "type": "slider",
  //                         "options": [
  //                             {
  //                                 "value": "3",
  //                                 "description": "dfg"
  //                             },
  //                             {
  //                                 "value": "5",
  //                                 "description": "df2g"
  //                             },
  //                             {
  //                                 "value": "6",
  //                                 "description": "d1fg"
  //                             }
  //                         ]
  //                     }
  //                 ]
  //             }
  //         ],
  //         "partialValidationOnly": false,
  //         "validate": true,
  //         "toolBarBack": false,
  //         "type": "S1",
  //         "spec": "lamp.survey"
  //     },
  //     "configuration": {
  //         "language": "en-US"
  //     }
  // }))
  //   responses.current = !!data.activity.prefillData ? Object.assign({}, data.activity.prefillData) : {}
  //   setContent(data.activity)
  //   i18n.changeLanguage(data.configuration.langugae)
  //   setTime(new Date().getTime())      
    const activity = localStorage.getItem("lamp-activity-settings")
      ? JSON.parse(localStorage.getItem("lamp-activity-settings"))
      : {}
    const configuration = localStorage.getItem("lamp-language")
      ? localStorage.getItem("lamp-language")
      : "en-US"   
    responses.current = !!activity.prefillData ? Object.assign({}, activity.prefillData) : {}
    setContent(activity)
    i18n.changeLanguage(!!configuration ? configuration : "en-US")
    // const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
    // const eventer = window[eventMethod]
    // const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
    // // Listen to message from child window
    // eventer(
    //   messageEvent,
    //   (e: any) => {
    //     console.log(e.data)
    //     const activity = e.data.activity ?? (e.data ?? {})
    //     const configuration = e.data?.configuration ?? null
    //     const langugae = !!configuration
    //       ? configuration.hasOwnProperty("language")
    //         ? configuration.language
    //         : "en-US"
    //       : "en-US"
    //     responses.current = !!activity.prefillData ? Object.assign({}, activity.prefillData) : {}
    //     setContent(activity)
    //     i18n.changeLanguage(langugae)      
    //   },
    //   false
    // )
  }, [])

  return (
    <div className={classes.root}>
      {(content !== null) ?
        (((content || {}).sections || []).map((x, idx) => (
          <Section
            onResponse={(response) => (responses.current[idx] = response)}
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