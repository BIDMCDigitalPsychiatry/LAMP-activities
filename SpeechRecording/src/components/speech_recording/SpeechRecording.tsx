/**
 * @file   VoiceRecording.tsx
 * @brief  Starting component which is the initial of VoiceRecording
 * @date   May , 2021
 * @author ZCO Engineer
 * @copyright (c) 2021, ZCO
 */

import * as React from "react";
import Recorder from "./Recorder";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SpeechRecordingCSS.css";
import i18n from "./../../i18n";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import "material-icons";

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
  recordedData: any[];
  submitEnabled: boolean;
  isFavoriteActive: boolean;
  forward: boolean;
}

interface AppProps {
  data: any;
  noBack: boolean;
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
          s: null,
        },
      },
      disableUploadBtn: true,
      errorData: false,
      audioAllowed: false,
      clickUpload: false,
      clickStop: false,
      settings: props.data.activity?.settings,
      time: new Date().getTime(),
      questions: props.data.activity?.settings,
      index: 0,
      qn_duration: 0,
      recordedData: [],
      submitEnabled: false,
      isFavoriteActive: props?.data?.is_favorite ?? false,
      forward: props?.data?.forward ?? false,
    };
    i18n.changeLanguage(
      !!props?.data?.configuration?.language
        ? props?.data?.configuration?.language
        : "en-US"
    );
  }

  handleAudioStop = (data) => {
    this.setState({ audioDetails: data, disableUploadBtn: false });
  };

  fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      return (reader.onload = () => {
        resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
      });
    });
  };

  handleAudioUpload = async (data, qn_duration, question) => {
    this.setState({ loader: true });
    let currentDateTime: any = new Date().getTime();
    let file = new File([data], currentDateTime + ".mp3");
    const newFileName = file;
    let audioBase64Url = await this.fileToBase64(newFileName);
    const newRecording = {
      question: question || this.state.questions[this.state.index]?.question,
      audioData: audioBase64Url,
      duration: qn_duration,
    };

    this.setState((prevState) => ({
      recordedData: [...prevState.recordedData, newRecording],
      loader: false,
    }));
    // this.storeRecordedData(audioBase64Url, qn_duration, question);
    this.handleReset();
    this.setState({ loader: false });
  };

  handleSubmit = async () => {
    const submissionPayload = {
      static_data: { is_favorite: this.state.isFavoriteActive },
      temporal_slices: this.state.recordedData.map((recording) => ({
        value: `data:audio/mpeg;base64,${recording.audioData}`,
        item: recording.question,
        level: null,
        type: null,
        duration: recording.duration,
      })),
      timestamp: new Date().getTime(),
      ...(this.state.forward && { forward: true }),
      done:true,
    };
    parent.postMessage(JSON.stringify(submissionPayload), "*");
  };

  // storeRecordedData = async (data, qn_duration, question) => {
  //   if (data && question) {
  //     // eslint-disable-next-line no-restricted-globals
  //     const audioBase64URL = "data:audio/mpeg;base64," + data;
  //     const temporalSlices = [
  //       {
  //         value: audioBase64URL,
  //         item: question || this.state.questions[this.state.index]?.question,
  //         level: null,
  //         type: null,
  //         duration: qn_duration,
  //       },
  //     ];
  //     console.log(temporalSlices)
  //     parent.postMessage(
  //       JSON.stringify({
  //         static_data: {
  //         },
  //         temporal_slices: [
  //           temporalSlices
  //         ],
  //         timestamp: new Date().getTime(),
  //       }),
  //       "*"
  //     );
  //   }
  // };

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
  };

  clickBack = (isBack: boolean) => {
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(
      JSON.stringify({
        clickBack: true,
        static_data: { is_favorite: this.state.isFavoriteActive },
        ...(this.state.forward && { forward: !isBack }),
        ...(isBack && { clickBack : true }),
      }),
      "*"
    );
  };
  handleFavoriteClick = () => {
    this.setState((prevState) => ({
      isFavoriteActive: !prevState.isFavoriteActive,
    }));
  };

  // Game render function
  render() {
    return (
      <div id="voice-recording-body">
        <div className="heading">
          {!this.props.noBack && (
            <nav className="back-link">
              <FontAwesomeIcon
                className="cursorPointer"
                icon={faArrowLeft}
                onClick={() => this.clickBack(true)}
              />
            </nav>
          )}
          <div className="center-title">
            {i18n.t("SPEECH_RECORDING")}{" "}
            <Tooltip
              title={
                this.state.isFavoriteActive
                  ? "Tap to remove from Favorite Activities"
                  : "Tap to add to Favorite Activities"
              }
            >
              <Fab
                className={`headerTitleIcon ${
                  this.state.isFavoriteActive ? "active" : ""
                }`}
                onClick={this.handleFavoriteClick}
              >
                <Icon>star_rounded</Icon>
              </Fab>
            </Tooltip>
          </div>
          {this.state.forward && (
            <nav className="forward-link">
              <FontAwesomeIcon
                className="cursorPointer"
                icon={faArrowRight}
                onClick={() => this.clickBack(false)}
              />
            </nav>
          )}
        </div>
        {this.state.errorData ? (
          <div className="errorMsg">
            {i18n.t("AN_ERROR_HAS_BEEN_OCCURRED_WHILE_RECORDING")}
          </div>
        ) : (
          ""
        )}
        {this.state.loader ? <div className="overlay"></div> : ""}

        <Recorder
          title={i18n.t("SPEECH_RECORDING")}
          audioURL={this.state.audioDetails.url}
          hideHeader={true}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
          handleAudioUpload={(data, qn_duration, question) =>
            this.handleAudioUpload(data, qn_duration, question)
          }
          handleSubmit={() => this.handleSubmit()}
          handleReset={() => this.handleReset()}
          uploadButtonDisabled={this.state.disableUploadBtn}
          mimeTypeToUseWhenRecording={null}
          clickUpload={this.state.clickUpload}
          clickStop={this.state.clickStop}
          language={i18n.language}
          settings={this.state.settings}
          questions={this.props.data.activity?.settings}
          data={this.props.data}
        />
      </div>
    );
  }
}

export default SpeechRecording;
