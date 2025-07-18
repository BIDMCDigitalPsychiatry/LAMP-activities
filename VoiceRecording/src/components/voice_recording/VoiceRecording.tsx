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
import "./voice_recording.css";
import i18n from "./../../i18n";
import { Fab, Icon, Tooltip } from "@material-ui/core";
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
  isFavoriteActive: boolean;
  forward: boolean
}

interface AppProps {
  data: any;
  noBack: boolean;
}

class VoiceRecording extends React.Component<AppProps, AppState> {
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

  handleAudioUpload = async (data, duration) => {
    this.setState({ loader: true });
    let currentDateTime: any = new Date().getTime();
    let file = new File([data], currentDateTime + ".mp3");
    const newFileName = file;
    let audioBase64Url = await this.fileToBase64(newFileName);
    this.storeRecordedData(audioBase64Url, duration);
    this.handleReset();
    this.setState({ loader: false });
  };

  storeRecordedData = async (data, duration) => {
    if (data) {
      // eslint-disable-next-line no-restricted-globals
      parent.postMessage(
        JSON.stringify({
          static_data: {
            url: "data:audio/mpeg;base64," + data,
            duration: duration ? duration : this.state.audioDetails.duration,
            is_favorite: this?.state?.isFavoriteActive,
          },
          ...(this.state.forward && { forward: this.state.forward }),
          done: true,
          temporal_slices: [],
          timestamp: new Date().getTime(),
          duration: new Date().getTime() - this.state.time,
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
  };

  clickBack = () => {
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(
      JSON.stringify({
        clickBack: true,
        static_data: {
          is_favorite: this?.state?.isFavoriteActive,
        },
        ...(this.state.forward && { forward: false }),
      }),
      "*"
    );
  };
  clickForward = () => {
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(
      JSON.stringify({
        forward: true,
        static_data: {
          is_favorite: this?.state?.isFavoriteActive,
        },
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
            <div>
              <FontAwesomeIcon
                className="cursorPointer"
                icon={faArrowLeft}
                onClick={this.clickBack}
              />
            </div>
          )}
          <div className="center-title">
            {i18n.t("VOICE_RECORDING")}{" "}
            <Tooltip
              title={
                this.state.isFavoriteActive
                  ? "Tap to remove from Favorite Activities"
                  : "Tap to add to Favorite Activities"
              }
            >
              <Fab
                className={`headerTitleIcon ${this.state.isFavoriteActive ? "active" : ""
                  }`}
                onClick={this.handleFavoriteClick}
              >
                <Icon>star_rounded</Icon>
              </Fab>
            </Tooltip>
          </div>
          {this.state.forward && (
            <div>
              <FontAwesomeIcon
                className="cursorPointer"
                icon={faArrowRight}
                onClick={this.clickForward}
              />
            </div>
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
          title={i18n.t("VOICE_RECORDING")}
          audioURL={this.state.audioDetails.url}
          hideHeader={true}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
          handleAudioUpload={(data, duration) =>
            this.handleAudioUpload(data, duration)
          }
          handleReset={() => this.handleReset()}
          uploadButtonDisabled={this.state.disableUploadBtn}
          mimeTypeToUseWhenRecording={null}
          clickUpload={this.state.clickUpload}
          clickStop={this.state.clickStop}
          language={i18n.language}
          settings={this.state.settings}
        />
      </div>
    );
  }
}

export default VoiceRecording;
