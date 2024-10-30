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

const AudioRecorder = ({ ...props }) => {
  const { phase } = props;
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [recordedText, setRecordedText] = useState("");
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        {i18n.t("SPEECH_RECOGNITION_NOT_SUPPORTED")}
      </div>
    );
  }

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

  useEffect(() => {
    console.log("transcript", transcript);
    if (transcript && transcript != "") {
      setRecordedText(transcript);
    }
  }, [transcript]);

  const handleListing = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (phase === "recall") {
      const textArray = recordedText.split("next");
      let finalArray: string[][] = [];
      textArray.forEach((text) => {
        finalArray.push(text.split("and"));
      });
      props.handleRecall(finalArray);
    } else if (phase === "recognition1") {
      props.handleRecognition1(recordedText);
    } else {
      props.handleRecordComplete(recordedText.split("and"));
    }
    resetTranscript();
  };

  return (
    <div className="box-game mt-30">
      <p>{getTextForPhase()}</p>
      <h6>{getInstructionText()}</h6>
      <div className="microphone-wrapper">
        <div
          className="mircophone-container"
         >
          <div className="microphone-icon" ref={microphoneRef}
          onClick={(e) => {
            e.stopPropagation();
            handleListing();
          }}
        >
            <Microphone />
          </div>
          <div className="microphone-status">
            {isListening ? i18n.t("RECORDING") : i18n.t("START_RECORDING")}
          </div>
          {isListening && (
            <Button
              variant="primary"
              className="btn-stop"
              onClick={(e) => {
                e.stopPropagation();
                stopHandle();
              }}
            >
              {i18n.t("STOP")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
