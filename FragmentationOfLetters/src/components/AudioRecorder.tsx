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

const AudioRecorder = ({ ...props }) => {
  const { handleRecordComplete } = props;
  const microphoneRef = useRef(null);
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(30);
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    (window as any)?.webkit?.messageHandlers?.allowSpeech?.postMessage?.({});
  }, []);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.onstop = handleStopRecording;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      audioChunksRef.current = []; // Clear any previous chunks
    } catch (err) {
      alert(i18n.t("PERMISSION_DENIED"));
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle available data from recorder
  const handleDataAvailable = (event: { data: any }) => {
    audioChunksRef.current.push(event.data);
  };

  // Handle the stop event and convert audio to base64
  const handleStopRecording = async () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/*" });
    convertBlobToBase64(blob);
  };

  // Convert the Blob into a base64 string
  const convertBlobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = (reader.result as string).split(",")[1]; // Get base64 string from Data URL
        handleRecordComplete(base64String);
      } else {
        handleRecordComplete(null);
      }
    };
    reader.readAsDataURL(blob);
  };

  const passTimerUpdate = (timerValue: number) => {
    if (timerValue === 1) {
      setTimeout(() => {
        // stopListening();
        setIsTimeOut(true);
      }, 1000);
    } else {
      setStartTimer(timerValue);
    }
  };

  return (
    <div>
      <h5>{i18n.t("INSTRUCTION_TEXT")}</h5>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className={
              isRecording
                ? "microphone-icon microphone-icon-dissable"
                : "microphone-icon cursor-pointer"
            }
            ref={microphoneRef}
            onClick={(e) => {
              startRecording();
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
            {isRecording ? i18n.t("RECORDING") : i18n.t("START_RECORDING")}
          </div>
          {isRecording && (
            <>
              <Button
                className="btn-cancel"
                variant="primary"
                onClick={(e) => {
                  setIsRecording(false);
                  setIsTimeOut(true);
                  setStartTimer(30);
                }}
              >
                {i18n.t("CANCEL")}
              </Button>{" "}
              <Button
                variant="primary"
                className="btn-stop"
                onClick={(e) => {
                  e.stopPropagation();
                  // if(recordedText==''){
                  //   setShowAlert(true)
                  // }
                  // else {stopListening()}
                  stopRecording();
                }}
              >
                {i18n.t("DONE")}
              </Button>
            </>
          )}
        </div>
      </div>
      {/* <AlertModal
      show={showAlert}
      close={()=>setShowAlert(false)}
      />     */}
    </div>
  );
};

export default AudioRecorder;
