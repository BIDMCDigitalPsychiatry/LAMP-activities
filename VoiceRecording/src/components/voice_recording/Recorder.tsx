import React, { Component } from "react";
import stopIcon from './images/stop.png';
import closeIcons from './images/close.png';
import microphone from './images/microphone.png';
import './voice_recording_new.css';
import Alert from '@material-ui/lab/Alert';
import i18n from "./../../i18n";
import ReactMarkdown from "react-markdown"
import emoji from "remark-emoji"
import gfm from "remark-gfm"

const audioType = "audio/*";
const maximumRecordTime = 120;

declare let MediaRecorder;

interface AppState {
  time: any;
  seconds: number;
  recording: Boolean;
  medianotFound: Boolean;
  audios: any;
  audioBlob: any;
  pauseRecord: Boolean;
  maxRecordLimit: Boolean;
  clickUpload: Boolean;
  clickStop: Boolean;
  clickPause: Boolean;
}

interface AppProps {
  mimeTypeToUseWhenRecording: any;
  handleReset(): void;
  handleAudioStop(arg:any): void;
  showUIAudio: Boolean;
  title: string;
  audioURL: string | null;
  hideHeader: Boolean;
  handleAudioUpload( audioBlob: any, duration: number): void;
  uploadButtonDisabled: any;
  clickUpload: Boolean;
  clickStop: Boolean;
  language: string;
  settings: any;
}

class Recorder extends Component<AppProps, AppState> {
  protected timer;
  protected chunks;
  protected mediaRecorder;

  constructor(props) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    this.state = {
      time: {},
      seconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null,
      pauseRecord: false,
      maxRecordLimit: false,
      clickUpload: false,
      clickStop: false,
      clickPause: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleAudioPause(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.mediaRecorder.pause();
    this.setState({ pauseRecord: true });
  }

  handleAudioStart(e) {
    e.preventDefault();
    this.resumeTimer();
    this.mediaRecorder.resume();
    this.setState({ pauseRecord: false });
  }

  
  LinkRenderer(data:any) {
    return <a href={data.href} target="_blank">{data.children}</a>
  }

  startTimer = () => {
    this.setState({
      time: {},
      seconds: 0,
    });
    this.timer = setInterval(this.countDown, 1000);
  }

  resumeTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds + 1;
    if (seconds > Number(maximumRecordTime)) { // Time limit  to stop the recording
      this.reachedRecordLimit();
    } else {
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    }
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }
  getRootWindow(window) {
    if (window.parent === window) {
        return window;
    }

    return this.getRootWindow(window.parent);
}

  async componentDidMount() {
    if (this.getRootWindow(window).navigator.mediaDevices) {
      const stream = await this.getRootWindow(window).navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      if(this.props.mimeTypeToUseWhenRecording) {
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.props.mimeTypeToUseWhenRecording });
      } else {
        this.mediaRecorder = new MediaRecorder(stream); 
      }
      this.chunks = [];
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };
    } else {
      this.setState({ medianotFound: true });
      console.log("Media Decives will work only with SSL.....");
    }
  }

  async componentDidUpdate(prevProps, prevState){
    if(prevState.clickUpload){
      await this.setState({
        time: {},
        seconds: 0,
        clickUpload: false
      });
    }
    
    if(prevState.clickStop && prevState.pauseRecord){
      await this.setState({
        time: {},
        seconds: 0,
        clickStop: false
      });
    }

    if(prevState.clickPause){
      await this.setState({
        time: {},
        seconds: 0,
        clickPause: false
      });
    }
  }

  startRecording(e) {
    this.setState({ maxRecordLimit: false,  });
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    this.startTimer();
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    clearInterval(this.timer);
    this.setState({ time: {} });
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false, pauseRecord: false, clickStop: true });
    // save the video to memory
    this.saveAudio();
  }
  
  reachedRecordLimit() {
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false, pauseRecord: false, maxRecordLimit: true,  clickStop: false });
    // save the video to memory
    this.saveAudio();
    clearInterval(this.timer);
  }

  handleReset(e) {
    if (this.state.recording) {
      this.stopRecording(e);
    }
    this.setState(
      {
        time: {},
        seconds: 0,
        recording: false,
        medianotFound: false,
        audios: [],
        audioBlob: null,
        clickPause: true,
        clickStop: false,
        clickUpload: false
      },
      () => {
        this.props.handleReset();
      }
    );
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = [audioURL];
    this.setState({ audios, audioBlob: blob });
    this.props.handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: this.chunks,
      duration: this.state.time,
    });
  }

  render() {
    const { recording, audios, time, medianotFound, pauseRecord } = this.state;
    const { showUIAudio, title, audioURL } = this.props;
    return (
      <div className="recorder_library_box">
        {this.state.maxRecordLimit ? (
          <Alert severity="error" variant="filled" className="mT25">
            {i18n.t("ERROR_MAX_RECORD_TIME_REACHED")}
          </Alert>
        ) : (
          <Alert severity="info" variant="filled" className="mT25">
            {i18n.t("INFO_MAX_RECORD_TIME_REACHED")}
          </Alert>
        )}  
        <div className="recorder_box">
          <div className="recorder_box_inner">
            {!this.props.hideHeader ? (
              <div className="reco_header">
                <h2 className="h2">{title}</h2>
                <span className="close_icons">
                  {
                    <img
                      src={closeIcons}
                      width={20}
                      height={20}
                      alt="Close icons"
                    />
                  }
                </span>
              </div>
            ) : null}
            {!medianotFound ? (
              <div className="record_section">
                <div className="btn_wrapper">
                  <button
                    onClick={() => {
                        this.setState({clickUpload: true, clickStop: false, maxRecordLimit: false})  
                        this.props.handleAudioUpload(this.state.audioBlob, this.state.time)
                      }
                    }
                    disabled={this.props.uploadButtonDisabled}
                    className="btn upload_btn"
                  >
                    {i18n.t("UPLOAD_BTN")}
                  </button>
                  <button
                    onClick={(e) => this.handleReset(e)}
                    className="btn clear_btn"
                  >
                    {i18n.t("CLEAR_BTN")}
                  </button>
                </div>
                <div className="duration_section">
                  <div className="audio_section">
                    {audioURL !== null && showUIAudio ? (
                      <audio controls>
                        <source src={audios[0]} type="audio/ogg" />
                        <source src={audios[0]} type="audio/mpeg" />
                      </audio>
                    ) : null}
                  </div>
                  <div className="duration">
                    <span className="mins">
                      {time.m !== undefined
                        ? `${time.m <= 9 ? "0" + time.m : time.m}`
                        : "00"}
                    </span>
                    <span className="divider">:</span>
                    <span className="secs">
                      {time.s !== undefined
                        ? `${time.s <= 9 ? "0" + time.s : time.s}`
                        : "00"}
                    </span>
                  </div>
                  {!recording && !this.state.clickStop ? (
                    <p className="help tACenter">
                      <ReactMarkdown  remarkPlugins={[gfm, emoji]} skipHtml={false} components={{link: this.LinkRenderer}} >{this.props?.settings?.record_label ?? i18n.t("PRESS_MICROPHONE_TO_RECORD")}</ReactMarkdown> 
                    </p>
                  ) : 
                  (this.state.clickStop ? (
                    <p className="help tACenter">
                        <ReactMarkdown  remarkPlugins={[gfm, emoji]} skipHtml={false} components={{link: this.LinkRenderer}} >{this.props?.settings?.record_label ?? i18n.t("CLICK_TO_CLEAR_MSG")}</ReactMarkdown>                     </p>
                  ) :
                  null)}
                </div>
                {!recording && !this.state.clickStop ? (                  
                  <a
                    onClick={(e) => this.startRecording(e)}
                    href=" #"
                    className="mic_icon"
                  >
                    <span className="microphone_icon_sec">
                      <svg
                        className="mic_icon_svg"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1000 1000"
                        enableBackground="new 0 0 1000 1000"
                      >
                        <g>
                          <path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z" />
                        </g>
                      </svg>
                    </span>
                  </a>
                ) : (                    
                   this.state.clickStop  ? (
                    <div className="record_controller">
                  <a className="mic_icon_disabled"><img src={microphone} width={30} height={30} alt="Microphone icons" /></a>
                  </div>
                  ) : (
                    <div className="record_controller">
                      <a
                        onClick={(e) => this.stopRecording(e)}
                        href=" #"
                        className="icons stop"
                      >
                        {
                          <img
                            src={stopIcon}
                            width={20}
                            height={20}
                            alt="Stop icons"
                          />
                        }
                      </a>
                      <a
                        onClick={
                          !pauseRecord
                            ? (e) => this.handleAudioPause(e)
                            : (e) => this.handleAudioStart(e)
                        }
                        href=" #"
                        className="icons pause"
                      >
                        {pauseRecord ? (
                          <span className="play_icons"></span>
                        ) : (
                          <span className="pause_icons"></span>
                        )}
                      </a>
                    </div>
                    ) 
                )}
              </div>
            ) : (
              <p style={{ color: "#fff", marginTop: 30, fontSize: 25 }}>
                Seems the site is Non-SSL
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Recorder;
