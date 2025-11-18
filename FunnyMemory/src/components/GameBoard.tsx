/**
 * @file   src\components\GameBoard.tsx
 * @brief  Game component for the app
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import {
  getMonthIndex,
  getRandomNumbers,
  isTimestamp,
  shuffleArray,
} from "src/functions";
import i18n from "src/i18n";
import { getDataForIndex } from "./data";
import AudioRecorder from "./AudioRecorder";
import Questions from "./Questions";
import InfoModal from "./uielements/InfoModal";
import ShowImage from "./ShowImage";
import FinalRecognitionPhase from "./FinalRecognitionPhase";

const GameBoard = ({ ...props }: any) => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [trial, setTrial] = useState(0);
  const [loading, setLoading] = useState(true);
  const number_of_images_in_trial = 6;
  const randomNumberArray = React.useRef(
    getRandomNumbers(number_of_images_in_trial, 1, 5)
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const imageExposureTime = props?.imageExposureTime;
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [staticdata, setStaticData] = useState(null);
  const [phase, setPhase] = useState("Trial");
  const startTime = React.useRef(new Date().getTime());
  const [timeTaken, setTimeTaken] = useState(startTime.current);
  const numberOfTrials = props?.numberOfTrials;
  const delayBeforeRecall = props?.delayBeforeRecall;
  const [routes, setRoutes] = useState<any>([]);
  const [correctChoice, setCorrectChoice] = useState(0);
  const [data, setData] = useState<any>({});
  const [timeTakenForTrial, setTimeTakenForTrial] = useState(startTime.current);
  const [timeTakenForRecall, setTimeTakenForRecall] = useState(0);
  const [timeForRecognition1, setTimeForRecognition1] = useState(0);
  const timeForRecognition2Ref = useRef(0);
  const [recognitionPhase2Completed, setRecognitionPhase2Completed] =
    useState(false);

  useEffect(() => {
    if (trial === 0) {
      setShowModalInfo(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentIndex != -1) {
      setData(getDataForIndex(randomNumberArray.current[currentIndex]));
    }
  }, [currentIndex]);

  useEffect(() => {
    if (props.clickBack === true) {
      clickBack();
    }
    if (props.isForwardButton === true) {
      handleForwardClick();
    }
  }, [props.clickBack, props.isForwardButton]);

  //Function to handle back button click
  const clickBack = () => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime.current,
        static_data: Object.assign(staticdata ?? {}, {
          image_exposure_time: imageExposureTime,
          image_set_shown: getMonthIndex(),
          learning_trials: numberOfTrials,
          delay_time: delayBeforeRecall,
          timeTakenForTrial: isTimestamp(timeTakenForTrial)
            ? 0
            : timeTakenForTrial,
          timeTakenForRecall: isTimestamp(timeTakenForRecall)
            ? 0
            : timeTakenForRecall,
          timeForRecognition1: isTimestamp(timeForRecognition1)
            ? 0
            : timeForRecognition1,
          timeForRecognition2: isTimestamp(timeForRecognition2Ref.current)
            ? 0
            : timeForRecognition2Ref.current,
          number_of_correct_force_choice: correctChoice,
          total_number_of_pairings_listed: currentIndex + 1,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        ...(props?.forward && { forward: false }),
        clickBack: true,
      }),
      "*"
    );
    resetStates();
  };
  //Function to handle forward button click for group activity
  const handleForwardClick = () => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime.current,
        static_data: Object.assign(staticdata ?? {}, {
          image_exposure_time: imageExposureTime,
          image_set_shown: getMonthIndex(),
          learning_trials: numberOfTrials,
          delay_time: delayBeforeRecall,
          timeTakenForTrial: isTimestamp(timeTakenForTrial)
            ? 0
            : timeTakenForTrial,
          timeTakenForRecall: isTimestamp(timeTakenForRecall)
            ? 0
            : timeTakenForRecall,
          timeForRecognition1: isTimestamp(timeForRecognition1)
            ? 0
            : timeForRecognition1,
          timeForRecognition2: isTimestamp(timeForRecognition2Ref.current)
            ? 0
            : timeForRecognition2Ref.current,
          number_of_correct_force_choice: correctChoice,
          total_number_of_pairings_listed: currentIndex + 1,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        ...(props?.forward && { forward: true }),
      }),
      "*"
    );
    resetStates();
  };

  //Function to reset states
  const resetStates = () => {
    setTrial(0);
    setPhase("");
    setShowImage(false);
    setShowAudioRecorder(false);
    setCurrentIndex(-1);
  };

  //Function to save result
  const saveResult = (audio: string) => {
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: randomNumberArray.current[currentIndex],
      level: phase,
      type: null,
      value: `data:audio/mpeg;base64,${audio}`,
    };
    setRoutes(routes.concat(route));
  };

  //Function to handle audio recording complete
  const handleRecordComplete = (audio: string) => {
    saveResult(audio);
    setTimeTaken(new Date().getTime());
    if (currentIndex < number_of_images_in_trial - 1) {
      setCurrentIndex(currentIndex + 1);
      setData({});
      setShowImage(true);
      setShowAudioRecorder(false);
    } else {
      setShowAudioRecorder(false);
      if (phase.includes("Trial")) {
        if (trial === numberOfTrials) {
          setTimeTakenForTrial(new Date().getTime() - timeTakenForTrial);
          setShowQuestions(true);
          setPhase("questions");
        } else {
          setTimeout(() => {
            setCurrentIndex(0);
            setShowImage(true);
          }, 1000);
          setTrial(trial + 1);
          setPhase("Trial" + (trial + 1).toString());
        }
      } else if (phase === "recall") {
        setPhase("recognition1");
        setTimeForRecognition1(new Date().getTime());
        setTimeTakenForRecall(new Date().getTime() - timeTakenForRecall);
        setCurrentIndex(0);
        setShowImage(true);
      } else if (phase === "recognition1") {
        setPhase("recognition2");
        timeForRecognition2Ref.current = new Date().getTime();
        setTimeForRecognition1(new Date().getTime() - timeForRecognition1);
        setCurrentIndex(0);
      }
    }
  };

  //Function to handle modal close
  const handleClose = () => {
    setShowModalInfo(false);
    setTrial(1);
    setCurrentIndex(0);
    setShowImage(true);
  };

  //Function to send gane data to parent
  const sendGameResult = () => {   
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTime.current,
        static_data: Object.assign(staticdata ?? {}, {
          image_exposure_time: imageExposureTime,
          learning_trials: numberOfTrials,
          image_set_shown: getMonthIndex(),
          delay_time: delayBeforeRecall,
          timeTakenForTrial: timeTakenForTrial,
          timeTakenForRecall: timeTakenForRecall,
          timeForRecognition1: timeForRecognition1,
          timeForRecognition2: timeForRecognition2Ref.current,
          number_of_correct_force_choice: correctChoice,
          total_number_of_pairings_listed: currentIndex + 1,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        timestamp: new Date().getTime(),
        ...(props?.forward && { forward: props?.isForwardButton }),
        done: true,
      }),
      "*"
    );
    resetStates();
  };

  useEffect(() => {
    if (
      recognitionPhase2Completed &&
      currentIndex === number_of_images_in_trial - 1
    ) {
      const updatedTime = new Date().getTime() - timeForRecognition2Ref.current;
      timeForRecognition2Ref.current = updatedTime;
      setTimeout(() => {
        sendGameResult();
        setTrial(0);
      }, 300);
    }
  }, [recognitionPhase2Completed, currentIndex]);

  //funtion to handle Image selection in recognition phase 2
  const handleImageSelection = (img: any) => {
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: randomNumberArray.current[currentIndex],
      level: phase,
      type: img === data.img ? true : false,
      value: null,
    };
    setRoutes(routes.concat(route));
    if (route.type === true) {
      setCorrectChoice(correctChoice + 1);
    }
    if (currentIndex < number_of_images_in_trial - 1) {
      setCurrentIndex(currentIndex + 1);
      setData({});
      setTimeTaken(new Date().getTime());
    } else {
      setRecognitionPhase2Completed(true);
    }
  };

  //Function to handle render content based on phase
  const renderContent = () => {
    if (showImage) {
      return (
        <ShowImage
          text={phase === "recognition1" ? data.question : ""}
          image={phase === "recognition1" ? data.missingImg : data.img}
          currentIndex={randomNumberArray.current[currentIndex]}
          setShowImage={setShowImage}
          setShowAudioRecorder={setShowAudioRecorder}
          imageExposureTime={imageExposureTime}
        />
      );
    } else if (showAudioRecorder) {
      return (
        <AudioRecorder
          handleRecordComplete={handleRecordComplete}
          phase={phase}
          language={i18n.language}
        />
      );
    } else if (showQuestions) {
      return (
        <Questions
          language={i18n.language}
          onStateChange={(data: any) => {
            const startDateObj = new Date(data.start_time);
            const formattedTime = `${startDateObj.getHours()}:${startDateObj.getMinutes()}`;
            const orientation_survey = {
              start_time: { value: formattedTime, is_correct: true },
              day: { value: data.day, is_correct: true },
              today_date: { value: data.today_date, is_correct: true },
              month: { value: data.month, is_correct: true },
              year: { value: data.year, is_correct: true },
              season: { value: data.season, is_correct: true },
            };
            const stateDetails = Object.assign({}, data);
            stateDetails.start_time =
              new Date(data.start_time)?.getHours() +
              ":" +
              new Date(data.start_time)?.getMinutes();
            setStaticData((prev: any) => ({
              ...prev,
              orientation_survey,
            }));
          }}
          timeLimit={delayBeforeRecall}
          onSubmit={(data: any) => {
            const startDateObj = new Date(data.start_time);
            const formattedTime = `${startDateObj.getHours()}:${startDateObj.getMinutes()}`;
            const orientation_survey = {
              start_time: {
                value: formattedTime,
                is_correct: data.isValidStartTime,
              },
              day: { value: data.day, is_correct: data.isValidDay },
              today_date: {
                value: data.today_date,
                is_correct: data.isValidDate,
              },
              month: { value: data.month, is_correct: data.isValidMonth },
              year: { value: data.year, is_correct: data.isValidYear },
              season: { value: data.season, is_correct: data.isValidSeason },
            };
            const stateDetails = Object.assign({}, data);
            stateDetails.start_time =
              new Date(data.start_time)?.getHours() +
              ":" +
              new Date(data.start_time)?.getMinutes();
            // setStaticData(stateDetails);
            setStaticData((prev: any) => ({
              ...prev,
              orientation_survey,
            }));
            setTimeout(() => {
              setShowQuestions(false);
              setShowAudioRecorder(true);
              setPhase("recall");
              setTimeTakenForRecall(new Date().getTime());
            }, 1000);
          }}
        />
      );
    } else if (phase === "recognition2") {
      return (
        <FinalRecognitionPhase
          options={shuffleArray(data?.option)}
          handleImageSelection={handleImageSelection}
          setTimeTaken={setTimeTaken}
          language={i18n.language}
          currentIndex={randomNumberArray.current[currentIndex]}
        />
      );
    } else {
      return <></>;
    }
  };

  //Function to get phase title
  const getPhaseTitle = () => {
    if (phase.includes("Trial") && trial > 0) {
      return i18n.t("TRIAL") + " " + trial;
    } else if (phase === "recall") {
      return i18n.t("RECALL_PHASE");
    } else if (phase === "recognition1") {
      return i18n.t("RECOGNITION_PHASE1");
    } else if (phase === "recognition2") {
      return i18n.t("RECOGNITION_PHASE2");
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="game_board">
        {getPhaseTitle() != "" && (
          <div className="timer-div">{getPhaseTitle()}</div>
        )}
        {data ? renderContent() : <></>}
      </div>
      <Backdrop className="backdrop" open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <InfoModal
        show={showModalInfo}
        modalClose={() => {
          handleClose();
        }}
        msg={i18n.t("INSTRUCTION")}
        language={i18n.language}
      />
    </>
  );
};

export default GameBoard;
