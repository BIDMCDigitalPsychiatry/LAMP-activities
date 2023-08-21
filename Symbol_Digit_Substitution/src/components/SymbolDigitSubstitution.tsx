// Core Imports
import React, { useEffect, useRef, useState } from "react"
import {
    makeStyles,
    Grid,
    ListItem,
    TextField,
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import i18n from "../i18n"
import Box from "./Box"
import Header from "./Header"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        background: "#359ffe !important",
        minHeight: "100vh",
        position: "relative",
        display: "flex"
    },
    main: {
        width: "80%",
        margin: "auto",
    },
    outer: {
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            marginTop: "200px",
          },
    },
    outercontainer: {
        justifyContent: "center"

    },
    box: {
        margin: "10px",
        border: "3px solid white",
        textAlign: "center",
        color: "white",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            margin: "5px",
          },
        "& li": {
            fontSize: 22,
            justifyContent: "center"
        }
    },
    inputfield: {
        width: "75%",
        "& input": {
            fontSize: 22,
            textAlign: "center",
            color: "white"
        }
    },
    divider: {
        borderTop: "2px solid white",
        margin: "3px 0",
    },
    toolbardashboard: {
        minHeight: 65,
        padding: "0",
        width: "100%",
        justifyContent: "center",
        "& h5": {
            color: "rgba(0, 0, 0, 0.75)",
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            width: "calc(100% - 96px)",
        },
    },
    rightcolor: {
        color: "#ffffff",
        fontSize: "15px",
        background: "#05d300",
        padding: "8px 16px 7px",
        borderRadius: 15,
        fontWeight: 600,
        border: 0,

    },
    wrongcolor: {

        color: "#ffffff",
        fontSize: "15px",
        background: "#cf0000",
        padding: "8px 16px 7px",
        borderRadius: 15,
        fontWeight: 600,
        border: 0,
    },
    boxdiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        color: "blue",
    },
    timer: {
        textAlign: "center",
        position: "absolute",
        width: "100%",
        top: 80,
        "& h4": {
            color: "white"
        }
    },
    result: {
        height: 75
    },
    timeout: {
        color: "white",
        fontSize: "25px"
    },
boxAlert : {
        background: "white",
        padding: "10px",
        display: "inline-block",
        fontSize: "14px",
        color : "#26bcff",
}

}))

export default function SymbolDigitSubstitution() {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const classes = useStyles()
    const SYMBOLS: Array<string> = ['@', '#', '$', '%', '&', '*', '+', '-', '='];
    const TIME_LIMIT = 120;
    const KEY = [{
        number: 1,
        keyvalue: "A",
    },
    {
        number: 2,
        keyvalue: "X",

    },
    {

        number: 3,
        keyvalue: "M",
    },

    {

        number: 4,
        keyvalue: "L",
    },

    {

        number: 5,
        keyvalue: "N",
    },

    {

        number: 6,
        keyvalue: "Q",
    },

    {

        number: 7,
        keyvalue: "O",
    },

    {
        number: 8,
        keyvalue: "Y",
    },
    {

        number: 9,
        keyvalue: "P",
    }
    ]
    const [currentSymbol, setCurrentSymbol] = useState('');
    const [currentNumber, setCurrentNumber] = useState(0);
    const [currentKey, setCurrentKey] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [flag, setFlag] = useState(2)
    const [inputText, setInputText] = useState('');
    const [time, setTime] = useState(new Date().getTime())
    const [shuffledSymbols, setShuffledSymbols] = useState<Array<string>>([]);
    const [noBack, setNoBack] = useState(false)
    const [ temporalSlices, setTemporalSlices]=useState<string | null>(null);
    const [previousClickTime, setPreviousClickTime] = useState(new Date().getTime())
    const [textShow , setTextShow] = useState(true);
    const [symbolsShown, setSymbolShown] = useState<Array<string>>([])

    const { t } = useTranslation()

    const generateRandomSymbolNumberPair = (symbols: Array<string>) => {
        const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
        setCurrentSymbol(symbols[randomIndex]);
        setSymbolShown(prevArray => [...prevArray, symbols[randomIndex]]);
        setCurrentNumber(randomIndex + 1);
        const currentkey = KEY.find((value) => value.number === randomIndex + 1)
        if (!!currentkey) {
            setCurrentKey(currentkey.keyvalue)
        }
    };
    const handleUserInput = (event: { target: { value: string; }; }) => {
        const currentTime = new Date().getTime();
        setPreviousClickTime(currentTime);
        const userInput = event.target.value.toUpperCase();

        const matchingItem = KEY.find(
          item => item.keyvalue === userInput || item.number.toString() === userInput
        );
        setInputText(matchingItem ? String(matchingItem.number) : '');
        if (event.target.value === currentNumber.toString() || event.target.value.toUpperCase() === currentKey) {
            setScore((prevScore: number) => prevScore + 1);
            setFlag(1)
            updateWithTaps(1, symbolDigitMapping[currentSymbol])
            setTimeout(() => {
                generateRandomSymbolNumberPair(shuffledSymbols);
            }, 1500);
        }
        else {
            setFlag(0)
            updateWithTaps(0, symbolDigitMapping[currentSymbol])
        }
        clearAfterTimeout()

    };

    const handleClearText = () => {
        setInputText('');
        inputRef?.current?.focus();
    };

    const updateWithTaps = (value: number, symbolvalue: any, ) => {
        const item =[]
        if (temporalSlices !== null) {
            const r = JSON.parse(temporalSlices);
            Object.keys(r).forEach((key) => {
              item.push(r[key]);
            });
          }
        const data={
            duration: (new Date().getTime() - previousClickTime)/1000 ,
            level: null,
            value : value ===1 ? true : false,
            type : symbolvalue
        }
        item.push(data)
        setTemporalSlices(JSON.stringify(item))

    };
    const clearAfterTimeout = () => {
        setTimeout(() => {
            setFlag(2)
            handleClearText();
        }, 1500);
    };

    const startTimer = () => {
        const intervalId: NodeJS.Timeout = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return intervalId;
    };

    const stopTimer = (timer: NodeJS.Timeout | null) => {
        if (timer) {
            clearInterval(timer);
        }
    };

    const saveScore = (status?: boolean) => {
            const gameScore = Math.round(
            (score / symbolsShown.length) * 100
          );
        const route = {'type': 'manual_exit', 'value': status ??  false} 
        const item =[]
        if (temporalSlices !== null) {
            const r = JSON.parse(temporalSlices);
            Object.keys(r).forEach((key) => {
              item.push(r[key]);
            });

          }
        item.push(route)
        parent.postMessage(
            JSON.stringify({
                timestamp: time,
                static_data: {
                    score: gameScore,

                },
                temporal_slices: item,
            }),
            "*"
        )
    }
     const clickBack = () => {
        saveScore(true)
    }

    const symbolDigitMapping = {};
    shuffledSymbols.forEach((symbol, index) => {
      symbolDigitMapping[symbol] = index + 1;
    });

    useEffect(() => {
        const timerId: NodeJS.Timeout | null = timeLeft > 0 ? startTimer() : null;
        return () => stopTimer(timerId);
    }, [timeLeft]);

    useEffect(() => {
        inputRef?.current?.focus();
        const symbolsCopy = [...SYMBOLS];
        for (let i = symbolsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [symbolsCopy[i], symbolsCopy[j]] = [symbolsCopy[j], symbolsCopy[i]];
        }
        setShuffledSymbols(symbolsCopy);
        generateRandomSymbolNumberPair(symbolsCopy);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            saveScore();
        }
        if(timeLeft===115){
            setTextShow(false)
        }
    }, [timeLeft]);

    useEffect(() => {
        const eventMethod = typeof window.addEventListener === "function" ? "addEventListener" : "attachEvent";
        const eventer = window[eventMethod]
        const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
        eventer(
            messageEvent,
            (e: any) => {
                const configuration = e.data?.configuration ?? null
                const langugae = !!configuration
                    ? configuration.hasOwnProperty("language")
                        ? configuration.language
                        : "en-US"
                    : "en-US"
                i18n.changeLanguage(langugae)
                setNoBack(e.data.noBack)
                setTime(new Date().getTime())
            },
            false
        )
    }, [])
    return (
        <div className={classes.root}>
            <Header data={noBack} clickBackData={clickBack}/>
            {timeLeft !== 0 && (
                <div className={classes.timer}>
                    <h4>{t("Time left:")} {timeLeft} {t("seconds")}</h4>
                   {!!textShow&& <span className= {classes.boxAlert} >{t("Observe the symbol shown and press the number or letter corresponding to it.")}</span> }
                </div>
              )}
            <div className={classes.main}>
                {timeLeft !== 0 ? (
                    <>
                        <Box className = {classes.outer} data ={shuffledSymbols} />
                        <div className={classes.boxdiv}>
                            {
                                flag !== 2 && inputText!=='' &&
                                <div className={classes.result}>
                                    <h5 className={flag ? classes.rightcolor : classes.wrongcolor}>
                                        {flag === 1 ? t("Right") : flag === 0 && inputText!=='' ? t("Wrong!") : null}
                                    </h5>
                                </div>
                            }
                            <Grid className={classes.boxdiv} container style={{ marginBottom: "40px" }}>
                                <Grid className={classes.box} item xs={2} sm={2} md={1}>
                                    <ListItem>{currentSymbol}</ListItem>
                                    <div className={classes.divider} />
                                    <TextField disabled={timeLeft === 0} value={inputText} inputRef={inputRef} className={classes.inputfield} id="outlined-basic" onChange={handleUserInput} />
                            </Grid>
                            </Grid>
                                   </div>
                        <Box className = {classes.outercontainer} data ={KEY} type={true}/>
                    </>
                ) : (
                    <div className={classes.boxdiv} >
                        <h5 className={classes.timeout} style={{ color: "white" }}>{t("TIME OUT !!!")}</h5>
                    </div>
                )}
            </div>

        </div>
    )
}