import React, { useEffect, useState } from "react"
import {
  Icon,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Dialog,
  // DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"

import i18n from "../i18n"
import QuestionSection from "./QuestionSection";
import { useTranslation } from "react-i18next";

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
      "& p": {
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
    btnDelete: {
      background: "#e5e5e5",
      padding: "10px 25px 10px 25px",
      borderRadius: "40px",
      minWidth: "100px",
      lineHeight: "22px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "16px",
      marginLeft: 20,
      color: "#333",
      fontWeight: 600,
      cursor: "pointer",
      "& span": { cursor: "pointer" },
      "&:hover": {
        background: "#e8e8e8",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        textDecoration: "none",
      },
    },
    btnDone: {
      background: "#359FFE",
      padding: "15px 25px 15px 25px",
      borderRadius: "40px",
      minWidth: "150px",
      lineHeight: "22px",
      display: "inline-block",
      textTransform: "capitalize",
      fontSize: "16px",
      marginTop: 40,
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer",
      "& span": { cursor: "pointer" },
      "&:hover": {
        background: "#0373d8",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        textDecoration: "none",
      },
    },
    headerIcon: {
      textAlign: "center",
      marginBottom: 15,
      "& img": { maxWidth: "100%", width: "100px" },
    },
    mainContainer: { padding: 0 },
    toolbardashboard: {
      minHeight: 65,
      padding: "0 10px",
      display: "flex",
      justifyContent: "space-between",
      "& h5": {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
        [theme.breakpoints.up("sm")]: {
          textAlign: "left",
        },
      },
      "& h6": {
        fontSize: 16,
        whiteSpace: "nowrap",
      }
    },
    levelMode: {
      maxWidth: 300,
      backgroundColor: "#f5f5f5",
      margin: "20px auto 20px",
      padding: 15,
      boxSizing: "border-box",
      borderRadius: 8
    },
    numberMain: { display: "flex", justifyContent: "center" },
    numberOuter: { display: "inline-block", border: "#359FFE solid 1px" },
    numberColumn: {
      width: 100,
      height: 100,
      border: "#359FFE solid 1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      color: "#359FFE",
      cursor: "pointer",
      "&.active": {
        background: "#359FFE",
        color: "#fff",
      }
    },
    answerNav: {
      display: "flex",
      textAlign: "center",
      alignItems: "center"
    },
    timer: {
      color: "#359FFE",
      fontSize: 15,
      marginTop: 15
    },
    selectedRightItem: {
      border: "2px solid green"
    },
    selectedWrongItem: {
      border: "2px solid red"
    },
    questiontext: {
      fontWeight: 600,
      color: "#00a51d",
      background: "#f5f5f5",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      fontSize: "28px",
      display: "inline-block",
      marginLeft: 5
    },
    questionh6: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  })
)

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Split numbers into rows of 3
const rows: number[][] = [];
for (let i = 0; i < numbers.length; i += 3) {
  rows.push(numbers.slice(i, i + 3));
}

// Get random numbers
export function getRandomNumbers(dcount: number, min: number, max: number) {
  const randomArray: Array<number> = [];
  for (let i = min; i <= dcount; i++) {
    randomArray[i - 1] = randomNumber(max, 0, randomArray)
  }
  return randomArray;
}

function randomNumber(max: number, min: number, randomArray: Array<number>): number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomArray.indexOf(num) >= 0 || num === 0 ? randomNumber(max, min, randomArray) : num;
}

export default function Board({ ...props }) {
  const classes = useStyles()
  // const [startTime, setStartTime] = useState(new Date().getTime())
  const [answers, setAnswers] = useState<number[]>([])
  const [sequenceCount, setSequenceCount] = useState(3)
  const [questionSequence, setQuestionSequence] = useState<number[]>([])
  const [routes, setRoutes] = useState(JSON.stringify([]))
  const [level, setLevel] = useState(0)
  const [startTime, setStartTime] = useState(new Date().getTime())
  const [lastClickTime, setLastClickTime] = useState(new Date().getTime())
  // const [status, setStatus] = useState(false)
  const [errorState, setErrorState] = useState(0)
  const [largeScore, setLargeScore] = useState(0)
  const [successTaps, setSuccessTaps] = useState(0)
  const [totalQuestions, setTotal] = useState(3)
  const [mode, setMode] = useState(0)

  useEffect(() => {
    const configuration = props.data?.configuration ?? null
    const langugae = !!configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US"
    i18n.changeLanguage(langugae)
    setStartTime(new Date().getTime())
    setSequenceCount(3)
  }, [])

  const [start, setStart] = useState(false)

  const gameSetUp = () => {
    if (sequenceCount > 0) {
      setStartGame(false)
      setLevel(level + 1)
      const randomPicks: number[] = getRandomNumbers(sequenceCount, 1, 9)
      setQuestionSequence(randomPicks)
    }
  }

  useEffect(() => {
    if (answers.length > 0 && answers.length === questionSequence.length) {
      setSequenceCount(0)
      setTimeout(() => {
      setStartGame(false)
      if (mode == 0 && JSON.stringify(answers) == JSON.stringify(questionSequence))
        setLargeScore(questionSequence.length)
      const rev = [...answers].reverse()
      let newCount = questionSequence.length ?? 5
      if ((mode == 0 && JSON.stringify(answers) != JSON.stringify(questionSequence)) ||
        (mode == 1 && JSON.stringify(rev) != JSON.stringify(questionSequence)))
        setErrorState(errorState + 1)
      if ((mode == 0 && JSON.stringify(answers) == JSON.stringify(questionSequence)) || 
      (mode == 1 && JSON.stringify(rev) == JSON.stringify(questionSequence))) {
        newCount =  ++newCount
      } 
      if (errorState >= 1 || newCount === 10) {
        if (mode == 0) {
          setSequenceCount(-1)
          setErrorState(0)
          setMode(1)
        } else {
          sendGameResult()
        }
      } else {
        setSequenceCount(newCount)
      }
      if (newCount == 0) {
        sendGameResult()
      }
    }, 500)
    }
  }, [answers])

  useEffect(() => {
    if (mode == 1) {
      setSequenceCount(largeScore)
    }
  }, [mode])

  useEffect(() => {
    if(sequenceCount > 0) {
      if (level > 1) setTotal(totalQuestions + sequenceCount)
      gameSetUp()
      setTimeout(() => {
      setAnswers([])
      setStart(true)
      }, 300)
    }
  }, [sequenceCount])

  const updateAnswer = (num: number) => {
    const data = [...answers, num]
    setAnswers(data)
    const statusVal = (mode == 0) ? questionSequence.indexOf(num) === data.indexOf(num) :
      [...questionSequence].reverse().indexOf(num) === data.indexOf(num)
    if (!!statusVal) setSuccessTaps(successTaps + 1)
    updateRoute(num, statusVal)
    setLastClickTime(new Date().getTime())
  }

  // Call the API to pass game result
  const sendGameResult = (status?: boolean) => {
    const route = { 'type': 'manual_exit', 'value': status ?? false }
    const boxes: any[] = [];
    if (routes !== null) {
      const r = JSON.parse(routes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    boxes.push(route);

    const gameScore = Math.round(
      (successTaps / totalQuestions) * 100
    );
    let points = 0;
    if (gameScore === 100) {
      points = points + 2;
    } else {
      points = points + 1;
    }
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTime,
        static_data: {
          correct_answers: successTaps,
          point: points,
          score: gameScore,
          total_questions: totalQuestions,
          wrong_answers: totalQuestions - successTaps,
        },
        temporal_slices: boxes,
        timestamp: new Date().getTime(),
      }),
      "*"
    );
  }

  const updateRoute = (num: number | string, statusVal: boolean) => {
    const boxes = [];
    const lastclickTime = new Date().getTime() - lastClickTime;
    if (routes !== null) {
      const r = JSON.parse(routes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    const route = {
      duration: lastclickTime,
      item: num,
      level: level,
      type: statusVal,
      value: null,
    };
    boxes.push(route);
    setRoutes(JSON.stringify(boxes))
  }

  const deleteLast = () => {
    updateRoute("delete", false)
    const data = [...answers]
    data.pop()
    setAnswers(data)
  }

  const [popup, setPopup] = useState(true)
  const { t } = useTranslation()
  const [startGame, setStartGame] = useState(false)

  return (
    <React.Fragment>
      <Dialog open={popup} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{"Remember the sequence of digits presented to you. When prompted, repeat the sequence in order."}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPopup(false)
              setStart(true)
            }}
            color="primary"
          >{`${t("Ok")}`}</Button>
        </DialogActions>
      </Dialog>
      {!!start && !popup && (
        <Box>
          <AppBar position="static" style={{ background: "rgba(53, 159, 254, 1)", boxShadow: "none" }}>
            <Toolbar className={classes.toolbardashboard}>
              <Grid container alignItems="center">
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
              </Grid>
              <IconButton
                  onClick={() => {
                    window.location.reload()
                  }}
                  color="default"
                  aria-label="Menu"
                >
              <Icon>refresh</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box textAlign="center" className={classes.levelMode} justifyContent="center">
            <Typography>Level: {level}</Typography>
          </Box>
          <Typography variant="h6" align="center" className={classes.questionh6}>Enter the digits in {mode == 1 && " reverse "}order: <span className={classes.questiontext}>
            <QuestionSection complete={() => setStartGame(true)} count={sequenceCount} questionSequence={questionSequence} /></span></Typography>
          <Box className={classes.numberMain} my={3}>
            <Box className={classes.numberOuter}>
              {rows.map((row, rowIndex) => (
                <Grid container key={rowIndex}>
                  {row.map((num) => (
                    <Grid item className={classes.numberColumn}
                    // className={classes.numberColumn + " " +
                    //   (!answers.includes(num) ? "" :
                    //     (((mode == 0) && questionSequence.indexOf(num) === answers.indexOf(num)) ||
                    //       ((mode == 1) && [...questionSequence].reverse().indexOf(num) === [...answers].indexOf(num))) ?
                    //       classes.selectedRightItem : classes.selectedWrongItem)}
                      onClick={() => {
                        if (!!startGame) updateAnswer(num)
                      }}>
                      <Typography variant="h6" align="center">
                        {num} </Typography>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Box>
          </Box>
          <Grid justifyContent="center" container alignItems="center">
            <Box className={classes.answerNav}>
              <Typography variant="h5" align="center"> Current Answer: <span>{answers.toString().replace(/,/g, "")}</span></Typography>
              <Button variant="contained" className={classes.btnDelete} onClick={() => deleteLast()}>Delete</Button>
            </Box>
          </Grid>
          <Grid justifyContent="center" container>
            <Button variant="contained" className={classes.btnDone} onClick={()=>sendGameResult()}>Done</Button>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  )
}
