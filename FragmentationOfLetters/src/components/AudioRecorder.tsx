/**
 * @file   src\components\AudioRecorder.tsx
 * @brief  Audio recorder component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useRef, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import i18n from "src/i18n";
import Microphone from "./images/MicroPhoneImage";
import { Button } from "react-bootstrap";
import { Timer } from "./common/Timer";
import { getStringAfterWord } from "src/functions";
import AlertModal from "./uielements/AlertModal";

const AudioRecorder = ({ ...props }) => {
  const { handleRecordComplete } = props;
  // const { transcript, resetTranscript } = useSpeechRecognition();
  const [transcript, setTranscript] = useState('');

  const [isListening, setIsListening] = useState(false);
  // const microphoneRef = useRef(null);
  const [recordedText, setRecordedText] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [startTimer, setStartTimer] = useState(180);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  i18n.changeLanguage(!props.language ? "en-US" : props.language);

  // useEffect(()=>{
  //   navigator.mediaDevices.getUserMedia({ audio: true });
  // },[])
  
  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return (
  //     <div className="mircophone-container">
  //       {i18n.t("SPEECH_RECOGNITION_NOT_SUPPORTED")}
  //     </div>
  //   );
  // }

  const recognitionRef: any = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    // eslint-disable-next-line new-cap
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Allow continuous speech
    recognition.interimResults = true; // Display interim results

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      // let finalTranscript = '';

      // eslint-disable-next-line no-plusplus
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          // finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      setError(event?.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  console.log("Error", error)

  useEffect(() => {
    if(transcript && transcript != ""){
      setRecordedText(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    handleRecordComplete(getStringAfterWord(recordedText));
  };

  // const handleListing = () => {
  //   setIsListening(true);
  //   setIsTimeOut(false);
  //   // resetTranscript();
  //   setRecordedText("");
  //   SpeechRecognition.startListening({
  //     continuous: false,
  //     language: 'en-US',
  //     interimResults: false
  //   });
  // };
  // const stopHandle = () => {
  //   setIsTimeOut(true);
  //   setIsListening(false);
  //   SpeechRecognition.stopListening();
  //   setStartTimer(180);
  //   handleRecordComplete(getStringAfterWord(recordedText));
  // };

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

  return (
    <div>
      <h6>{i18n.t("INSTRUCTION_TEXT")}</h6>
      <div style={{ marginTop: '20px' }}>
        <p style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>Transcript:{recordedText}</p>
      </div>
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <div
            className={isListening ? "microphone-icon" : "microphone-icon cursor-pointer"}
            ref={recognitionRef}
            onClick={isListening ? stopListening : startListening}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleListing();
            // }}
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
                  // SpeechRecognition.stopListening();
                  // resetTranscript();
                  if (recognitionRef.current) {
                    recognitionRef.current.stop();
                  }
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
