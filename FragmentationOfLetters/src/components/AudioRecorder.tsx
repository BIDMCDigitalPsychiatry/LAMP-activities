/**
 * @file   src\components\AudioRecorder.tsx
 * @brief  Audio recorder component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useRef, useState } from "react";
import i18n from "src/i18n";
import Microphone from "./images/MicroPhoneImage";
import { Button } from "react-bootstrap";
import { Timer } from "./common/Timer";
import { getStringAfterWord } from "src/functions";
import AlertModal from "./uielements/AlertModal";

const AudioRecorder = ({ ...props }) => {
  const { handleRecordComplete } = props;
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [recordedText, setRecordedText] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(180);
  const [showAlert, setShowAlert] = useState(false);
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  const [transcript, setTranscript] = useState('');


  useEffect(()=>{
    ;(window as any)?.webkit?.messageHandlers?.allowSpeech?.postMessage?.({})
  },[])
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition || (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition || (window as any).oSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language to English
    recognition.continuous = true; // Keep recognition going even after pauses
    recognition.interimResults = true; // Capture interim results

    // When speech recognition returns a result
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const latestTranscript = Array.from(event.results)
        .map((result: SpeechRecognitionResult) => result[0].transcript)
        .join(" ");
      setTranscript(latestTranscript);
    };

    // Handle errors
    recognition.onerror = (event) => {
      alert(`Error: ${event.error}`);
    };

    // Start/stop listening based on `isListening` state
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      // Cleanup when component unmounts
      recognition.stop();
    };
  }, [isListening]);

  const startListening = () => {
      setIsListening(true);
      setTranscript("")
      setIsTimeOut(false);    
  };

  const stopListening = () => {
      setIsListening(false);
      setIsTimeOut(true);
      setStartTimer(180);
      handleRecordComplete(getStringAfterWord(recordedText));
  };

  const passTimerUpdate = (timerValue: number) => {
    if (timerValue === 1) {
      setTimeout(() => {
        stopListening();
        setIsTimeOut(true);
      }, 1000);
    } else {
      setStartTimer(timerValue);
    }
  };

  useEffect(()=>{
    setRecordedText(transcript);
  },[transcript])

  return (
    <div>
      <h6>{i18n.t("INSTRUCTION_TEXT")}</h6>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className={isListening ? "microphone-icon" : "microphone-icon cursor-pointer"}
            ref={microphoneRef}
            onClick={(e) => {
              startListening();
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
                  setTranscript("");
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
                  if(recordedText==''){
                    setShowAlert(true)
                  }           
                  else {stopListening()}
                }}
              >
                {i18n.t("STOP")}
              </Button>
            </>
          )}
        </div>
      </div>  
      <AlertModal
      show={showAlert}
      close={()=>setShowAlert(false)}
      />    
    </div>
  );
};

export default AudioRecorder;
