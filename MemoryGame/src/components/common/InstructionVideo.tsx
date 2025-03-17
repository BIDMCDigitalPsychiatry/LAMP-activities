import React from "react";
import { Button } from "react-bootstrap";
import i18n from "src/i18n";

interface Props {
  handleGameStart(): void;
  language: string;
}
const InstructionVideo = (props : Props) => {
  i18n.changeLanguage(!!props.language ? props.language : "en-US");
  const video = "https://github.com/BIDMCDigitalPsychiatry/LAMP-activities/raw/refs/heads/dist/misc/TicTacToe.mp4";
  return (
    <div className="instructionvideo">
      <h5>{i18n.t("INSTRUCTIONAL_VIDEO")}</h5>
      <video controls>
        <source src={video} type="video/mp4" />
        {i18n.t("VIDEO_ERROR")}
      </video>
      <div>
      <Button variant="primary" className="btn-start-game mt-4" onClick={props.handleGameStart}>{i18n.t("START_GAME")}</Button>
      </div>      
    </div>
  );
};

export default InstructionVideo;
