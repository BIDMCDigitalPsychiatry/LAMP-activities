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
import { getMaxValue, getSequence } from "src/functions";

const GameBoard = ({ ...props }: any) => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const startingFragmentation = parseInt(
    props?.startingFragmentation?.split("%")[0]
  );
  const totalLevels = 10; // Total levels in the game
  const [level, setLevel] = useState(0); // Current level
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState("");
  const [fragmentation, setFragmentation] = useState(startingFragmentation); // Starting fragmentation
  const [routes, setRoutes] = useState<any>([]);
  const startTime = new Date().getTime();
  const [timeTaken, setTimeTaken] = useState(startTime);

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
    if (props.isForwardButton === true) {
      handleForwardClick();
    }
  }, [props.clickBack, props.isForwardButton]);

  const clickBack = () => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime,
        static_data: Object.assign({
          is_favorite: props?.isFavoriteActive,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        ...(props?.forward && { forward: false }),
        clickBack: true,
      }),
      "*"
    );
    resetStates();
  };
  const handleForwardClick = () => {
    const maxFragmentation = getMaxValue(routes, "level");
    const sequence = getSequence(routes);
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - startTime,
        static_data: Object.assign({
          best_correct_fragmentation: maxFragmentation + "%",
          sequence: sequence,
          is_favorite: props?.isFavoriteActive,
        }),
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        ...(props?.forward && { forward: true }),
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
    setLevel(0);
    setFragmentation(startingFragmentation);
    setRoutes([]);
  };

  const sendGameResult = () => {
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTime,
        static_data: Object.assign({
          is_favorite: props?.isFavoriteActive,
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

  const handleRecordComplete = (audioText: string) => {
    const route = {
      duration: new Date().getTime() - timeTaken,
      item: currentLetter,
      level: fragmentation,
      type: null,
      value: `data:audio/mpeg;base64,${audioText}`,
    };
    setRoutes([...routes, route]);
    setTimeTaken(new Date().getTime());
    setTimeout(() => {
      if (level < totalLevels) {
        setLevel(level + 1);
        setFragmentation(fragmentation + 10); // Increase fragmentation by 10% for next level
        generateNewLetter();
      } else {
        sendGameResult();
      }
    }, 100);
  };

  const handleClose = () => {
    setShowModalInfo(false);
    setLevel(1);
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
