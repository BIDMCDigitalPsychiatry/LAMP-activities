// Core Imports
import React, { useEffect, useRef, useState } from "react"
import {
    Button,
    makeStyles,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Dialog,
    DialogContent,
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Box from "./Box"
import Header from "./Header"
import DialogMessage from "./DialogMessage"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        background: "#359ffe !important",
        minHeight: "100vh",
        position: "relative",
        // display: "flex"
    },
    main: {
        width: "85%",
        margin: "auto",
        textAlign: "center",
        marginTop: "20px"
    },
    outer: {
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            marginTop: "30px",
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
        // position: "absolute",
        width: "100%",
        top: 80,
        "& h4": {
            color: "white"
        }
    },
    result: {
        height: 60
    },
    timeout: {
        color: "white",
        fontSize: "25px"
    },
    comment: {
        color: "#000",
        textAlign: "justify"
    },
    boxAlert: {
        background: "white",
        padding: "10px",
        display: "inline-block",
        fontSize: "14px",
        color: "#26bcff",
        position: "relative",
        zIndex: 1,
        opacity: 1,
        transition: "opacity 1s ease"
    },
    griddiv: {

        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "40px",
    },

    btncontainer: {
        textAlign: "center"

    },
    btnstyle: {
        fontSize: "22px",
        width: 64,
        height: 64,
        border: "#fff solid 3px",
        borderRadius: 10,
        margin: "1%",
        color: "white",
        minWidth: "auto",
        padding: '12px 54px',
        [theme.breakpoints.down('sm')]: {
            width: 50,
            height: 50,

        },
        [theme.breakpoints.up('lg')]: {
            '&:hover, &:active': {
                color: 'white',
                background: "#005ea9",
            },
        },
    },
    startDiv: {
        '& p': {
            color: '#fff'
        },
        width: "100%",
        textAlign: "center",
        marginTop: "20px"
    },
    startBtn: {
        background: "#ffffff",
        color: "#359ffe",
        fontWeight: "bold",
        borderRadius: "10px",
        marginTop: "15px",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)",
        cursor: "pointer",
        minWidth: "100px",
        "&:hover": { background: "#ffffff" },

    },

    popupstartBtn: {
        background: "#359ffe",
        color: "#ffffff",
        fontWeight: "bold",
        borderRadius: "10px",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.20)",
        cursor: "pointer",
        minWidth: "100px",
        "&:hover": { background: "#359ffe" },

    },
    startbtnDiv: {
        width: "59%",
        marginBottom: "10px"
    },
    container: {
        paddingTop: 100
    },
    disabledButton: {
        '&.MuiButtonBase-root.Mui-disabled': {
            opacity: 1,
            color: "white"
        },
    }
}))

export default function SymbolDigitSubstitution({ ...props }) {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const classes = useStyles()
    const SYMBOLS: Array<string> = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'σ'];
    const [TIME_LIMIT, setTimeLimit] = useState(props?.data?.activity?.settings?.duration ?? 120);

    const [currentSymbol, setCurrentSymbol] = useState('');
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [flag, setFlag] = useState(2)
    const [inputText, setInputText] = useState('');
    const [time, setTime] = useState(new Date().getTime())
    const [shuffledSymbols, setShuffledSymbols] = useState<Array<string>>([]);
    const [noBack, setNoBack] = useState(false)
    const [temporalSlices, setTemporalSlices] = useState<string | null>(null);
    const [previousClickTime, setPreviousClickTime] = useState(new Date().getTime())
    const [textShow, setTextShow] = useState(false);
    const [displayedSymbol, setDisplayedSymbol] = useState<Array<string>>([]);
    const [showMapping, setShowMapping] = useState(props?.data?.activity?.settings?.show_mapping ?? 'during')
    const [startGame, setStartGame] = useState(false)
    const [random, setRandom] = useState(0)
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()

    const generateRandomSymbolNumberPair = (symbols: Array<string>) => {
        const randomIndex = getRandomNumber() ?? 0
        setCurrentSymbol(symbols[randomIndex]);
        setCurrentNumber(randomIndex + 1);
        setDisplayedSymbol((prevHistory) => [...prevHistory, symbols[randomIndex]]);
    };

    const getRandomNumber = (): number => {
        const randomIndex = Math.floor(Math.random() * (props?.data?.activity?.settings?.count_of_symbols ?? 9));
        if (random !== randomIndex) {
            setRandom(randomIndex)
            return randomIndex
        }
        return getRandomNumber()
    }

    const handleClearText = () => {
        setInputText('');
        inputRef?.current?.focus();
    };

    const updateWithTaps = (value: number, symbolvalue: any,) => {
        const item = []
        if (temporalSlices !== null) {
            const r = JSON.parse(temporalSlices);
            Object.keys(r).forEach((key) => {
                item.push(r[key]);
            });
        }
        const data = {
            duration: (new Date().getTime() - previousClickTime) / 1000,
            level: null,
            value: value === 1 ? true : false,
            type: symbolvalue
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
            setTimeLeft((prevTime: number) => prevTime - 1);
        }, 1000);

        return intervalId;
    };

    const stopTimer = (timer: NodeJS.Timeout | null) => {
        if (timer) {
            clearInterval(timer);
        }
    };

    const saveScore = (status?: boolean) => {
        const timeTakenMinutes = (TIME_LIMIT - timeLeft) / 60
        const correctResponsesPerMinute = Math.round(score / timeTakenMinutes);
        const route = { 'type': 'manual_exit', 'value': status ?? false }
        const item = []
        if (temporalSlices !== null) {
            const r = JSON.parse(temporalSlices);
            Object.keys(r).forEach((key) => {
                item.push(r[key]);
            });

        }
        item.push(route)
        const data = temporalSlices !== null && JSON.parse(temporalSlices)
        let trueCount = 0;
        let falseCount = 0;
        let trueDurationSum = 0;
        let falseDurationSum = 0;
        (data || []).forEach((d: any) => {
            if (d.value === true) {
                trueCount++;
                trueDurationSum += d.duration;
            } else if (d.value === false) {
                falseCount++;
                falseDurationSum += d.duration;
            }
        });
        parent.postMessage(
            JSON.stringify({
                timestamp: time,
                static_data: {
                    score: correctResponsesPerMinute,
                    number_of_symbols: displayedSymbol?.length,
                    number_of_correct_responses: trueCount,
                    number_of_incorrect_responses: falseCount,
                    avg_correct_response_time: Math.round(trueDurationSum / data.length),
                    avg_incorrect_response_time: Math.round(falseDurationSum / data.length)

                },

                temporal_slices: item,
            }),
            "*"
        )
    }
    const clickBack = () => {
        saveScore(true)
    }
    const handleClick = (data: any) => {
        setInputText(data);
        const currentTime = new Date().getTime();
        setPreviousClickTime(currentTime);
        if (data === currentNumber) {
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
    }
    const symbolDigitMapping = {};
    shuffledSymbols.forEach((symbol, index) => {
        symbolDigitMapping[symbol] = index + 1;
    });

    useEffect(() => {
        if (timeLeft === 0) {
            saveScore();
        }

        if (!!startGame) {
            setTextShow(true)
            const timerId: NodeJS.Timeout | null = timeLeft > 0 ? startTimer() : null;
            return () => stopTimer(timerId);
        }
        return
    }, [timeLeft, startGame]);

    useEffect(() => {
        setNoBack(props?.data?.noBack ?? false)
        setTime(new Date().getTime())
        setShowMapping(props?.data?.activity?.settings?.show_mapping ?? 'during')
        setTimeLimit(props?.data?.activity?.settings?.duration ?? 120)
        setTimeLeft(props?.data?.activity?.settings?.duration ?? 120)
        inputRef?.current?.focus();
        const symbolsCopy = [...SYMBOLS];
        for (let i = (props?.data?.activity?.settings?.count_of_symbols ?? 10) - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [symbolsCopy[i], symbolsCopy[j]] = [symbolsCopy[j], symbolsCopy[i]];
        }
        const symbols = symbolsCopy.splice(0, (props?.data?.activity?.settings?.count_of_symbols ?? 10))
        setShuffledSymbols(symbols)
        generateRandomSymbolNumberPair(symbols);
        setOpen(true)
    }, [props.data]);

    return (
        <>
            {(shuffledSymbols.length > 0) && (
                <div className={classes.root}>
                    <Header data={noBack} clickBackData={clickBack} />
                    {!open && (
                        <div className={classes.container}>
                            {timeLeft !== 0 && (
                                <div className={classes.timer}>
                                    {<span> {!!showMapping && showMapping === "not_at_all" ? `${t("In this game, you will be shown a symbol in the middle of your screen, represented by a greek letter. This symbol will correspond to a numerical digit.")}` :
                                        !!showMapping ? `${t("In this game, you will be shown a symbol in the middle of your screen, represented by a greek letter. This symbol will correspond to a numerical digit. There is a symbol-mapping legend in the top row of your screen. Use the legend to identify the digit which corresponds to your symbol. Then, press the button at the bottom of the screen which contains this digit. After you select the correct button, you will move on to a new symbol. Try to get as many symbols as you can.")}` : ""}</span>}

                                    <h4>{t("Time left:")} {timeLeft} {t("seconds")}</h4>
                                    {!!textShow && !!startGame && <span className={classes.boxAlert} >{t("Observe the symbol shown and press the number corresponding to it.")}</span>}
                                </div>
                            )}


                            <div className={classes.main}>
                                {timeLeft !== 0 ? (
                                    <>


                                        <div className={classes.startDiv}>
                                            {(!startGame && showMapping === "before") && <span ><p><b>In this game mode, try to memorize the key. Once you press start, it will disappear!</b></p></span>}

                                            {((showMapping === "before" && !startGame) || (timeLeft !== 0 && showMapping === "during")) && (
                                                <Box className={classes.outer} data={shuffledSymbols} boxClass={classes.box} />
                                            )}



                                            {!startGame && <Button className={classes.startBtn} onClick={() => setStartGame(true)}>Start</Button>}</div>

                                        {!!startGame && (<>
                                            <div className={classes.boxdiv}>
                                                <div className={classes.result}>

                                                    {
                                                        flag !== 2 && inputText !== '' &&
                                                        <h5 className={flag ? classes.rightcolor : classes.wrongcolor}>
                                                            {flag === 1 ? t("Right") : flag === 0 && inputText !== '' ? t("Wrong!") : null}
                                                        </h5>

                                                    }
                                                </div>

                                                <Box className={classes.griddiv} currentSymbol={currentSymbol} boxClass={classes.box} />

                                            </div>
                                            <div className={classes.btncontainer}>
                                                {shuffledSymbols.map((value, index) => (
                                                    <Button
                                                        classes={{ disabled: classes.disabledButton }}
                                                        className={classes.btnstyle} disabled={flag !== 2}
                                                        onClick={(event) => handleClick(index + 1)}>{index + 1}</Button>

                                                ))}
                                            </div>
                                        </>


                                        )}
                                    </>
                                ) : (
                                    <div className={classes.boxdiv} >
                                        <h5 className={classes.timeout} style={{ color: "white" }}>{t("TIME OUT !!!")}</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
<DialogMessage open={open} setStartGame={setStartGame} setOpen={setOpen} showMapping={showMapping} />
                </div>
            )}
        </>

    )
}