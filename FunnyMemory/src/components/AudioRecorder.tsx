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

const AudioRecorder = ({ ...props }) => {
  const { phase } = props;
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(45);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const recordedTextRef = useRef("");

  i18n.changeLanguage(!props.language ? "en-US" : props.language);

  useEffect(() => {
    (window as any)?.webkit?.messageHandlers?.allowSpeech?.postMessage?.({});
  }, []);

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
    if (transcript && transcript !== "") {
      recordedTextRef.current = transcript;
    }
  }, [transcript]);
  const handleListening = async () => {
    try {
      setIsListening(true);
      setIsTimeOut(false);

      SpeechRecognition.startListening({ continuous: true });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mpeg" });

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result?.toString() || null;

          const processAudio = (base64Audio: string | null) => {
            const currentText = recordedTextRef.current;
            if (phase === "recall") {
              const textArray = currentText.split("next");
              const finalArray: string[][] = textArray.map((text) =>
                text.split("and")
              );
              props.handleRecall(finalArray, base64Audio);
            } else if (phase === "recognition1") {
              props.handleRecognition1(currentText, base64Audio);
            } else {
              props.handleRecordComplete(currentText.split("and"), base64Audio);
            }
          };

          processAudio(base64Audio);
        };

        reader.readAsDataURL(blob); // Convert blob to Base64
      };

      recorder.start();
    } catch (error: any) {
      console.error("Microphone access denied or failed", error);
      setIsListening(false);
      setIsTimeOut(true);

      // Show alert or custom UI message
      alert(i18n.t("PERMISSION_DENIED"));

      // Optional: You can also show a UI banner or toast instead of alert
    }
  };

  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();

    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    resetTranscript();
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
    <div className="box-game mt-30">
      <p>{getTextForPhase()}</p>
      <h6>{getInstructionText()}</h6>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className={
              isListening
                ? "microphone-icon microphone-icon-dissable"
                : "microphone-icon cursor-pointer"
            }
            ref={microphoneRef}
            onClick={(e) => {
              e.stopPropagation();
              handleListening();
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
                  stopHandle();
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
