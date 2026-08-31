/**
 * @file   src\containers\Layout.tsx
 * @brief  Layout component for the app
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import GameBoard from "src/components/GameBoard";
import "./layout.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRedo,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import i18n from "src/i18n";

const Layout = ({ ...props }: any) => {
  const configuration = props?.data?.configuration;
  const settings = props?.data?.activity?.settings;
  i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
  const delayBeforeRecall = settings?.delayBeforeRecall * 60; // in milli seconds
  const numberOfTrials = settings?.numberOfTrials;
  const imageExposureTime = settings?.imageExposureTime * 1000; //in milli seconds
  const [clickBack, setClickBack] = useState(false);
  const [forward] = useState(props?.data?.forward ?? false);
  const [isForwardButton, setIsForwardButton] = useState(false);
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="main-class">
      <div className="heading">
        <nav className="back-link" onClick={() => setClickBack(true)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </nav>
        <span className="heading-title">{i18n.t("FUNNY_MEMORY_GAME")}</span>
        <nav
          className={forward ? "home-link-forward" : "home-link"}
          onClick={reloadPage}
        >
          <FontAwesomeIcon icon={faRedo} />
        </nav>
        {forward && (
          <nav
            className="home-link"
            onClick={() => setIsForwardButton(true)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </nav>
        )}
      </div>
      <Container>
        <Row>
          <Col>
            <GameBoard
              language={i18n.language}
              delayBeforeRecall={delayBeforeRecall}
              imageExposureTime={imageExposureTime}
              numberOfTrials={numberOfTrials}
              clickBack={clickBack}
              forward={forward}
              isForwardButton={isForwardButton}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layout;
