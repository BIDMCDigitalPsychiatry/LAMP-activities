/**
 * @file   VoiceRecording.tsx
 * @brief  Starting component which is the initial of VoiceRecording
 * @date   May , 2021
 * @author ZCO Engineer
 * @copyright (c) 2021, ZCO
 */

import * as React from "react";
import Recorder from "./Recorder";  

import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./speech_recording.css";
import i18n from "./../../i18n";

interface AudioDuration {
  h: number | null;
  m: number | null;
  s: number | null;
}

interface AudioObject {
  url: string | null;
  blob: string | null;
  chunks: string | null;
  duration: AudioDuration;
}

interface AppState {
  audioDetails: AudioObject;
  disableUploadBtn: Boolean;
  loader: Boolean;
  errorData: Boolean;
  audioAllowed: Boolean;
  clickUpload: Boolean;
  clickStop: Boolean;
  time: number;
  settings: any;
  questions: any[];
  index: number;
  qn_duration: any;
}

interface AppProps {
  data: any;
  noBack:boolean;
}

class SpeechRecording extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loader: false,
      audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: null,
          m: null,
          s: null
        },
      },
      disableUploadBtn: true,
      errorData: false,
      audioAllowed: false,
      clickUpload: false,
      clickStop: false,
      settings: props.data.activity?.settings,
      time: new Date().getTime(),
      questions: props.data.activity?.questions,
      index: 0,
      qn_duration: 0,
     };
     i18n.changeLanguage(!!props?.data?.configuration?.language ? props?.data?.configuration?.language : "en-US");
   }

   handleAudioStop = (data) => {
     this.setState({ audioDetails: data, disableUploadBtn: false });
  };


  fileToBase64 = async (file) => {    
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader()
      reader.readAsDataURL(file)
      return reader.onload = () => {
        resolve(reader.result.replace("data:", "").replace(/^.+,/, ""))
      }
    })
  }

  handleAudioUpload = async ( data, qn_duration, question ) => {
    this.setState({loader: true})
    let currentDateTime: any = new Date().getTime();   
    let file = new File([data], currentDateTime+".mp3");    
    const newFileName = file;
    let audioBase64Url = await this.fileToBase64(newFileName);
    this.storeRecordedData(audioBase64Url, qn_duration, question);
    this.handleReset();
    this.setState({loader: false})
  }

  storeRecordedData = async (data, qn_duration, question) => {
    if (data && question) {  
      // eslint-disable-next-line no-restricted-globals
      const audioBase64URL = "data:audio/mpeg;base64," + data;
      const temporalSlices = [ 
        {
          value: audioBase64URL,
          item: question || this.state.questions[this.state.index]?.question,
          level: null,
          type: null,
          duration: qn_duration,
        },
      ];

      parent.postMessage(
        JSON.stringify({
          static_data: {
          },
          temporal_slices: [
            temporalSlices
          ],
          timestamp: new Date().getTime(),
        }),
        "*"
      ); 
    }
  };

  handleReset = async () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      },
    };
    await this.setState({ audioDetails: reset, disableUploadBtn: true });
  }
  
  clickBack = () => {
     // eslint-disable-next-line no-restricted-globals     
     parent.postMessage(JSON.stringify({clickBack: true}), "*");
  }
  

  // Game render function
  render() {
    return (
      <div id="voice-recording-body"> 
        <div className="heading">
          {!this.props.noBack &&
           <div style={{ float: "left"}}><FontAwesomeIcon className="cursorPointer" icon={faArrowLeft} onClick={this.clickBack} /></div>
          }
          <div>{i18n.t("SPEECH_RECORDING")}</div>
        </div> 
        { this.state.errorData ? <div className="errorMsg">{i18n.t("AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING")}</div> :"" }
        { this.state.loader ? <div className="overlay"></div> :"" }

        <Recorder
          title={i18n.t("SPEECH_RECORDING")}
          audioURL={this.state.audioDetails.url}
          hideHeader={true}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
          handleAudioUpload={(data, qn_duration, question) => this.handleAudioUpload(data, qn_duration, question)}
          handleReset={() => this.handleReset()}
          uploadButtonDisabled={this.state.disableUploadBtn}
          mimeTypeToUseWhenRecording={null}
          clickUpload={this.state.clickUpload}
          clickStop={this.state.clickStop}
          language={i18n.language}
          settings={this.state.settings}
          questions={this.props.data.activity?.questions}
          data={this.props.data}
        />
      </div>
    );
  }
}

export default SpeechRecording;
