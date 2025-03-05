/**
 * @file   src\components\GameBoard.tsx
 * @brief  Game component for the app
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  checkIsStringInArray,
  getRandomNumbers,
  replaceDuplicatesWithEmptyString,
  shuffleArray,
  stringCleanUp,
} from "src/functions";
import i18n from "src/i18n";
import { getDataForIndex, getIdentificationList } from "./data";
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
  const startTime = new Date().getTime();
  const [timeTaken, setTimeTaken] = useState(startTime);
  const numberOfTrials = props?.numberOfTrials;
  const delayBeforeRecall = props?.delayBeforeRecall;
  const [routes, setRoutes] = useState<any>([]);
  const [identificationList, setIdentificationList] = useState<any>([]);
  const [pairsIdentified, setPairsIdentified] = useState(0);
  const [itemsIdentified, setItemsIdentified] = useState(0);
  const [itemRecognized, setItemRecognized] = useState(0);
  const [correctChoice, setCorrectChoice] = useState(0);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (trial === 0) {
      setShowModalInfo(true);
      setLoading(false);
    }
  }, []);

  useEffect(() =>{
    if(currentIndex != -1){
      setData(getDataForIndex(randomNumberArray.current[currentIndex]))
    }
  },[currentIndex])

  useEffect(() => {
    if (randomNumberArray && randomNumberArray.current.length > 0) {      
      setIdentificationList(getIdentificationList(randomNumberArray.current));
    }
  }, [randomNumberArray]);

  useEffect(() => {
    if (props.clickBack === true) {
      clickBack();
    }
  }, [props.clickBack]);

  const clickBack = () => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime,
        static_data: Object.assign(staticdata ?? {}, {
          image_exposure_time: imageExposureTime,
          learning_trials: numberOfTrials,
          delay_time: delayBeforeRecall,
          number_of_correct_pairs_recalled: pairsIdentified,
          number_of_correct_items_recalled: itemsIdentified,
          number_of_correct_recognized: itemRecognized,
          number_of_correct_force_choice: correctChoice,
          number_of_total_pairs: currentIndex + 1,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
      }),
      "*"
    );
    resetStates();
  };
  const resetStates = () => {
    setTrial(0);
    setPhase("");
    setShowImage(false);
    setShowAudioRecorder(false);
    setCurrentIndex(-1);
  };

  const checkImageIdentified = (text: string) => {
    if (phase === "recall") {
      let valueExists = false;
      for (let i = 0; i < identificationList.length; i++) {
        for (let j = 0; j < identificationList[i].length; j++) {
          if (stringCleanUp(identificationList[i][j]) === stringCleanUp(text)) {
            valueExists = true;
            break;
          }
        }
      }
      return valueExists;
    } else {
      const isEqual = data.images.find(
        (word: string) => stringCleanUp(word) === stringCleanUp(text)
      );
      if (isEqual) {
        return true;
      } else {
        return false;
      }
    }
  };

  const validateStrings = (array: string[]) => {
    let found = false;
    const arr = array.map((str: string) => {
      if (!found) {
        if (
          data.missingItem.find(
            (itm: string) => stringCleanUp(itm) === stringCleanUp(str)
          )
        ) {
          found = true;
        }
        return str;
      } else {
        return "";
      }
    });
    return arr;
  };

  const saveResult = (recorededText: any[]) => {
    let tempRoute: any = [];
    if (recorededText && recorededText.length > 0) {
      recorededText.length = 2;
      const validatedArray = validateStrings(recorededText);
      validatedArray.map((word) => {
        const route = {
          duration: new Date().getTime() - timeTaken,
          item: randomNumberArray.current[currentIndex],
          level: phase,
          type: checkImageIdentified(word),
          value: null,
        };
        tempRoute.push(route);
      });
    }
    setRoutes(routes.concat(tempRoute));
  };

  const handleRecall = (textArray: string[][]) => {
    let tempRoute: any = [];
    let itemCount = 0;
    let pairCount = 0;
    if (textArray && textArray.length > 0) {
      textArray.forEach((arr: any[]) => {
        if (arr && arr.length > 0) {
          let firstIndex: number[] = []
          let secondIndex: number[] = []
          replaceDuplicatesWithEmptyString(arr).forEach((str: string) => {
            let imageIdentified = false;
            for (let i = 0; i < identificationList.length; i++) {
              for (let j = 0; j < identificationList[i].length; j++) {
                if (stringCleanUp(identificationList[i][j]) === stringCleanUp(str)) {
                  if(firstIndex.length > 0){
                    if(i===firstIndex[0] && (j === 0 || secondIndex[0]===0)){
                      imageIdentified = true
                    }
                    else{
                      imageIdentified = false
                    }
                  }else{
                    imageIdentified = true

                  }
                  firstIndex.push(i)
                  secondIndex.push(j)
                  break;
                }          
              }
            }
            const route = {
              duration: new Date().getTime() - timeTaken,
              item: null,
              level: phase,
              type: imageIdentified,
              value: null,
            };
            tempRoute.push(route)
            if (route.type === true) {
              itemCount++;
            }
          }) 
          if(firstIndex[0]===firstIndex[1] && secondIndex.includes(0)){
            pairCount++;
          }       
        }
      });
      setPairsIdentified(pairCount);
      setItemsIdentified(itemCount);
      setRoutes(routes.concat(tempRoute));
    }
    setPhase("recognition1");
    setShowAudioRecorder(false);
    setTimeout(() => {
      setCurrentIndex(0);
      setShowImage(true);
    }, 1000);
  };
  

  const handleRecognition1 = (text: string) => {
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: randomNumberArray.current[currentIndex],
      level: phase,
      type: checkIsStringInArray(
        data.missingItem,
        text
      )
        ? true
        : false,
      value: null,
    };
    if (route.type === true) {
      setItemRecognized(itemRecognized + 1);
    }
    setRoutes([...routes, route]);

    setShowAudioRecorder(false);
    if (currentIndex < number_of_images_in_trial - 1) {
      setData({});
      setCurrentIndex(currentIndex + 1);
      setShowImage(true);
    } else {
      setPhase("recognition2");
      setCurrentIndex(0);
      setTimeTaken(new Date().getTime());
    }
  };

  const handleRecordComplete = (text: any[]) => {
    saveResult(text);
    setTimeTaken(new Date().getTime());
    if (currentIndex < number_of_images_in_trial - 1) {
      setCurrentIndex(currentIndex + 1);
      setData({})
      setShowImage(true);
      setShowAudioRecorder(false);
    } else {
      setShowAudioRecorder(false);
      if (trial === numberOfTrials && phase.includes("Trial")) {
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (showImage) {
        setShowImage(false);
        setShowAudioRecorder(true);
      }
    }, imageExposureTime);

    return () => clearInterval(interval);
  }, [showImage]);

  const handleClose = () => {
    setShowModalInfo(false);
    setTrial(1);
    setCurrentIndex(0);
    setShowImage(true);
  };

  const sendGameResult = () => {
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTime,
        static_data: Object.assign(staticdata ?? {}, {
          image_exposure_time: imageExposureTime,
          learning_trials: numberOfTrials,
          delay_time: delayBeforeRecall,
          number_of_correct_pairs_recalled: pairsIdentified,
          number_of_correct_items_recalled: itemsIdentified,
          number_of_correct_recognized: itemRecognized,
          number_of_correct_force_choice: correctChoice,
          number_of_total_pairs: currentIndex + 1,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        timestamp: new Date().getTime(),
      }),
      "*"
    );
    resetStates();
  };

  const handleImageSelection = (img: any) => {
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: randomNumberArray.current[currentIndex],
      level: phase,
      type:
        img === data.img
          ? true
          : false,
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
      setTimeout(() => {
        sendGameResult();
        setTrial(0);
      }, 500);
    }
  };
  const renderContent = () => {
    if (showImage) {
      return (
        <ShowImage
          text={
            phase === "recognition1"
              ? data.question
              : ""
          }
          image={
            phase === "recognition1"
              ? data.missingImg
              : data.img
          }
          currentIndex={randomNumberArray.current[currentIndex]}
        />
      );
    } else if (showAudioRecorder) {
      return (
        <AudioRecorder
          handleRecordComplete={handleRecordComplete}
          phase={phase}
          handleRecall={handleRecall}
          handleRecognition1={handleRecognition1}
          language={i18n.language}
        />
      );
    } else if (showQuestions) {
      return (
        <Questions
          language={i18n.language}
          onStateChange={(data: any) => {
            const stateDetails = Object.assign({}, data);
            stateDetails.start_time =
              new Date(data.start_time)?.getHours() +
              ":" +
              new Date(data.start_time)?.getMinutes();
          }}
          timeLimit={delayBeforeRecall}
          onSubmit={(data: any) => {
            const stateDetails = Object.assign({}, data);
            stateDetails.start_time =
              new Date(data.start_time)?.getHours() +
              ":" +
              new Date(data.start_time)?.getMinutes();
            setStaticData(stateDetails);
            setTimeout(() => {
              setShowQuestions(false);
              setShowAudioRecorder(true);
              setPhase("recall");
            }, 1000);
          }}
        />
      );
    } else if (phase === "recognition2") {
      return (
        <FinalRecognitionPhase
          options={shuffleArray(
            data.option
          )}
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
