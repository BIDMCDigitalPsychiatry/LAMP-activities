/**
 * @file   src\components\GameBoard.tsx
 * @brief  Game component for the app
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import i18n from "src/i18n";
import AudioRecorder from "./AudioRecorder";
import InfoModal from "./uielements/InfoModal";
import { createLetterImage, fragmentImage } from "src/utils/FragmentationUtils";
import { checkTextInArray, getMaxValue } from "src/functions";

const GameBoard = ({ ...props }: any) => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const startingFragmentation = props?.startingFragmentation;
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState("");
  const [fragmentation, setFragmentation] = useState(startingFragmentation); // Starting fragmentation
  const [routes, setRoutes] = useState<any>([]);
  const startTime = new Date().getTime();
  const [timeTaken, setTimeTaken] = useState(startTime);
  const [falseCount, setFalseCount] = useState(0)

  useEffect(() => {
    if (!gameStarted) {
      setShowModalInfo(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (props.clickBack === true) {
      clickBack();
    }
  }, [props.clickBack]);

  const clickBack = () => {
    const maxFragmentation = getMaxValue(routes,"level")
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime,
        static_data: Object.assign({
          best_correct_fragmentation : maxFragmentation
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
      }),
      "*"
    );
    resetStates();
  };

  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      generateNewLetter();
    }
  }, [gameStarted]);

  const resetStates = () => {
    setCurrentLetter("");
    setGameStarted(false);
  };

  console.log("routes", routes);

  const sendGameResult = () => {
    const maxFragmentation = getMaxValue(routes,"level")
    console.log("result", JSON.stringify({
      duration: new Date().getTime() - startTime,
      static_data: Object.assign({
        best_correct_fragmentation : maxFragmentation
      }),
      temporal_slices: JSON.parse(JSON.stringify(routes)),
      timestamp: new Date().getTime(),
    }))
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTime,
        static_data: Object.assign({
          best_correct_fragmentation : maxFragmentation
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        timestamp: new Date().getTime(),
      }),
      "*"
    );
    resetStates();
  };

  useEffect(()=>{
    if(falseCount == 2){
      sendGameResult()
    }
  },[falseCount])

  const generateNewLetter = () => {
    if (canvasRef.current != null) {
      const ctx = canvasRef.current.getContext("2d");
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomLetter = letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
      setCurrentLetter(randomLetter);
      const letterImage = createLetterImage(randomLetter);
      fragmentImage(ctx, letterImage, fragmentation);
    }
  };

  console.log("fragmentation", fragmentation)

  const handleRecordComplete = (text: string) => { 
    console.log("text", text)   
    let res = false;
    if (text.toLowerCase().includes(currentLetter.toLowerCase()) || checkTextInArray(text)) {
      setFragmentation(fragmentation + 10);
      res = true
    } else {
      setFalseCount(falseCount+1)
      setFragmentation(fragmentation - 5);
    }
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: currentLetter,
      level: fragmentation,
      type: res,
      value: null,
    };
    setRoutes([...routes, route]);
    setTimeTaken(new Date().getTime());
    setTimeout(() => {
      generateNewLetter();
    }, 100);
  };

  const handleClose = () => {
    setShowModalInfo(false);
    setGameStarted(true);
  };

  return (
    <>
      {gameStarted ? (
        <div className="game_board">
          <div className="box-game mt-30">
            <p>{i18n.t("QUESTION")}</p>
            <div className="imgOption">
              <canvas ref={canvasRef} width={300} height={300} />
            </div>
            <AudioRecorder
            language={i18n.language}
            handleRecordComplete={handleRecordComplete}
          />
          </div>          
        </div>
      ) : (
        <></>
      )}
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
