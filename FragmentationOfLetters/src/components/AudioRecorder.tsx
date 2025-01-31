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
import { getStringAfterWord } from "src/functions";
import AlertModal from "./uielements/AlertModal";

const AudioRecorder = ({ ...props }) => {
  const { handleRecordComplete } = props;
  const { transcript, resetTranscript, interimTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [recordedText, setRecordedText] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(180);
  const [showAlert, setShowAlert] = useState(false);
  const [permissionlist, setPermissionList] = useState("")
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        {i18n.t("SPEECH_RECOGNITION_NOT_SUPPORTED")}
      </div>
    );
  }




  // Array of permissions
const permissions = [
  "accelerometer",
  "accessibility-events",
  "ambient-light-sensor",
  "background-sync",
  "camera",
  "clipboard-read",
  "clipboard-write",
  "geolocation",
  "gyroscope",
  "local-fonts",
  "magnetometer",
  "microphone",
  "midi",
  "notifications",
  "payment-handler",
  "persistent-storage",
  "push",
  "screen-wake-lock",
  "storage-access",
  "top-level-storage-access",
  "window-management",
];


// Iterate through the permissions and log the result
async function processPermissions() {
  let text = ""
  for (const permission of permissions) {
    const result = await getPermission(permission);
    text = text+" , "+result
  }
  setPermissionList(text)
}

console.log("processpermisiions", processPermissions())

// Query a single permission in a try...catch block and return result
async function getPermission(permission: any) {
  try {
    let result;
    if (permission === "top-level-storage-access") {
      result = await navigator.permissions.query({
        name: permission
      });
    } else {
      result = await navigator.permissions.query({ name: permission });
    }
    return `${permission}: ${result.state}`;
  } catch (error) {
    return `${permission} (not supported)`;
  }
}

  useEffect(() => {
      setRecordedText(transcript);
  }, [transcript, interimTranscript]);

  useEffect(()=>{
    processPermissions()
    ;(window as any)?.webkit?.messageHandlers?.allowSpeech?.postMessage?.("")
  },[])

  const handleListing = () => {
    setIsListening(true);
    setIsTimeOut(false);
    resetTranscript();
    setRecordedText("");
    SpeechRecognition.startListening({
      continuous: false,
      language: 'en-US',
      interimResults: false
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
      <h6>{i18n.t("INSTRUCTION_TEXT")}</h6>
      <span style={{color: "black"}}>{permissionlist}</span>
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
                  if(recordedText==''){
                    setShowAlert(true)
                  }           
                  else {stopHandle()}
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
