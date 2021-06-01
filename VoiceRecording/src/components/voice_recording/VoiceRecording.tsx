/**
 * @file   VoiceRecording.tsx
 * @brief  Starting component which is the initial point of bubbles game
 * @date   May , 2021
 * @author ZCO Engineer
 * @copyright (c) 2021, ZCO
 */

import * as React from "react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import "./voice_recording.css";
import i18n from "./../../i18n";
import * as AWS from "aws-sdk";

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
}

class VoiceRecording extends React.Component<{}, AppState> {
  constructor(props: {}) {
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
      audioAllowed: false
    };
  }

  handleAudioStop = (data) => {
    this.setState({ audioDetails: data, disableUploadBtn: false });
  };

  handleAudioUpload = async (data) => {
    this.setState({loader: true, errorData: false})
    let currentDateTime: any = new Date().getTime();    
    let file = new File([data], currentDateTime+".mp3");    
    const newFileName = file;        
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRECT_ACCESS_KEY
    });
    let s3: any = new AWS.S3({
      endpoint: new AWS.Endpoint(process.env.REACT_APP_S3_URL as string),
      s3ForcePathStyle: true,
      apiVersion: process.env.REACT_APP_S3_API_VERSION,
      signatureVersion: process.env.REACT_APP_S3_SIGNATURE_VERSION,
      region: process.env.REACT_APP_S3_REGION,
    });

    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME, 
      Key: newFileName.name,  
      Expires: 3600,
    });
    
    fetch(url, {
      method: "PUT",
      body: newFileName,
    }).then((data) => {
      // Call API to store the recorded AWS S3 URL on DB
      this.storeRecordedData(process.env.REACT_APP_S3_URL+"/"+process.env.REACT_APP_S3_BUCKET_NAME+"/"+newFileName.name);
      this.setState({ disableUploadBtn: true, loader: false });
    }).catch((err) => {
      this.setState({loader: false, errorData: true})
    });
  };  
  
  storeRecordedData = async (data) => {
    if (data) {
      // eslint-disable-next-line no-restricted-globals
      parent.postMessage(
        JSON.stringify({
          static_data: {
            url: data,
            duration: this.state.audioDetails.duration,
          },
          temporal_slices: [],
          timestamp: new Date().getTime(),
        }),
        "*"
      );
    }
  };

  handleReset() {
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
    this.setState({ audioDetails: reset, disableUploadBtn: true });
  }
  
  // Game render function
  render() {
    return (
      <div id="voice-recording-body"> 
        <div className="heading"> {i18n.t("VOICE_RECORDING")}</div>
        { this.state.errorData ? <div className="errorMsg">{i18n.t("AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING")}</div> :"" }
        { this.state.loader ? <div className="overlay"></div> :"" }
        <Recorder
          record={false}
          title={i18n.t("VOICE_RECORDING")}
          audioURL={this.state.audioDetails.url}
          hideHeader={true}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
          handleAudioUpload={(data) => this.handleAudioUpload(data)}
          handleReset={() => this.handleReset()}
          uploadButtonDisabled={this.state.disableUploadBtn}
        />
        
      </div>
    );
  }
}

export default VoiceRecording;
