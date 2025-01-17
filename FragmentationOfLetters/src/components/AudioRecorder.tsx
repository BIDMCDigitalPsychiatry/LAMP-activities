/**
 * @file   src\components\AudioRecorder.tsx
 * @brief  Audio recorder component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import i18n from "src/i18n";
import Microphone from "./images/MicroPhoneImage";
import { Button } from "react-bootstrap";
import { Timer } from "./common/Timer";
import AlertModal from "./uielements/AlertModal";
import { getStringAfterWord } from "src/functions";

const AudioRecorder = ({ ...props }) => {
  const { handleRecordComplete } = props;
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [recordedText, setRecordedText] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(180);
  const [showAlert, setShowAlert] = useState(false);

  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        {i18n.t("SPEECH_RECOGNITION_NOT_SUPPORTED")}
      </div>
    );
  }

  useEffect(() => {
    console.log("transcript", transcript);
      setRecordedText(transcript);
  }, [transcript]);

  const handleListing = () => {
    setIsListening(true);
    setIsTimeOut(false);
    resetTranscript();
    setRecordedText("");
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
      interimResults: true
    });
  };
  const stopHandle = () => {
    setIsTimeOut(true);
    setIsListening(false);
    SpeechRecognition.stopListening();
    setStartTimer(180);
    handleRecordComplete(getStringAfterWord(recordedText));
  };

  const passTimerUpdate = (timerValue: number) => {
    if (timerValue === 1) {
      setTimeout(() => {
        stopHandle();
        setIsTimeOut(true);
      }, 1000);
    } else {
      setStartTimer(timerValue);
    }
  };

  return (
    <div>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className={isListening ? "microphone-icon" : "microphone-icon cursor-pointer"}
            ref={microphoneRef}
            onClick={(e) => {
              e.stopPropagation();
              handleListing();
            }}
          >
            <Microphone />
          </div>
          {!isTimeOut ? (
            <Timer
              passTimerUpdate={passTimerUpdate}
              startTimeInSeconds={startTimer}
              startTimer={startTimer - 1}
            />
          ) : null}
          <div className="microphone-status">
            {isListening ? i18n.t("RECORDING") : i18n.t("START_RECORDING")}
          </div>
          {isListening && (
            <>
              <Button
                className="btn-cancel"
                variant="primary"
                onClick={(e) => {
                  setIsListening(false);
                  SpeechRecognition.stopListening();
                  resetTranscript();
                  setIsTimeOut(true);
                  setStartTimer(180);
                }}
              >
                {i18n.t("CANCEL")}
              </Button>{" "}
              <Button
                variant="primary"
                className="btn-stop"
                onClick={(e) => {
                  e.stopPropagation();
                  if(transcript===""){
                    setShowAlert(true)
                  }
                  else {stopHandle();}
                }}
              >
                {i18n.t("STOP")}
              </Button>
            </>
          )}
        </div>
      </div>
      <AlertModal
      show = {showAlert}
      close = {()=>{setShowAlert(false)}}
      />
    </div>
  );
};

export default AudioRecorder;
