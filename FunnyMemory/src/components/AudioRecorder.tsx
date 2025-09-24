/**
 * @file   src\components\AudioRecorder.tsx
 * @brief  Audio recorder component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useRef, useState } from "react";
import i18n from "src/i18n";
import Microphone from "./images/MicroPhoneImage";
import { Button } from "react-bootstrap";
import { Timer } from "./common/Timer";

const AudioRecorder = ({ ...props }) => {
  const { phase } = props;  
  const microphoneRef = useRef(null);
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(45);  
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [permissionNotGranted, setPermissionNotGranted] = useState(false);

  i18n.changeLanguage(!props.language ? "en-US" : props.language);


  const getTextForPhase = () => {
    if (phase === "recall") {
      return i18n.t("RECALL_TEXT");
    } else if (phase.includes("Trial")) {
      return i18n.t("TRIAL_TEXT");
    } else if (phase === "recognition1") {
      return i18n.t("RECOGNITION1_TEXT");
    } else {
      return "";
    }
  };

  const getInstructionText = () => {
    if (phase === "recall") {
      return i18n.t("RECALL_INSTRUCTION_TEXT");
    } else if (phase.includes("Trial")) {
      return i18n.t("TRIAL_INSTRUCTION_TEXT");
    } else {
      return "";
    }
  };

  // Function to handle start recording
  const startRecording = async () => {
    try {
       let stream = mediaStreamRef.current;

      if (!stream || !stream.active) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      setIsTimeOut(false);
      mediaRecorderRef.current.onstop = handleStopRecording;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      audioChunksRef.current = [];
    } catch (err) {
      setPermissionNotGranted(true);
    }
  };

  // Function to handle stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setIsTimeOut(true);
    setStartTimer(30);
  };

  // Function to handle data available event
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
        const base64String = (reader.result as string).split(",")[1];
        props.handleRecordComplete(base64String);
      } else {
        props.handleRecordComplete(null);
      }
    };
    reader.readAsDataURL(blob);
  };

  const passTimerUpdate = (timerValue: number) => {
    if (timerValue === 1) {
      setTimeout(() => {
        stopRecording();
        setIsTimeOut(true);
      }, 1000);
    } else {
      setStartTimer(timerValue);
    }
  };
  return (
    <div className="box-game mt-30">
      <p>{getTextForPhase()}</p>
      <h6>{getInstructionText()}</h6>
      {permissionNotGranted ? <h6 style={{"color" : "red"}}>{i18n.t("PERMISSION_DENIED")}</h6> :<></>}
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
              e.stopPropagation();
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
                  setStartTimer(45);
                }}
              >
                {i18n.t("CANCEL")}
              </Button>{" "}
              <Button
                variant="primary"
                className="btn-stop"
                onClick={(e) => {
                  e.stopPropagation();
                  stopRecording();
                }}
              >
                {i18n.t("DONE")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
