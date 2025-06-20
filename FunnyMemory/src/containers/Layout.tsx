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
import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import i18n from "src/i18n";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import "material-icons";

const Layout = ({ ...props }: any) => {
  
  const configuration = props?.data?.configuration;
  const settings = props?.data?.activity?.settings;
  i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
  const delayBeforeRecall = settings?.delayBeforeRecall * 60; // in milli seconds
  const numberOfTrials = settings?.numberOfTrials;
  const imageExposureTime = settings?.imageExposureTime * 1000; //in milli seconds
  const [clickBack, setClickBack] = useState(false);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );

  const reloadPage = () => {
    window.location.reload();
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };

  return (
    <div className="main-class">
      <nav className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => setClickBack(true)}
        />
      </nav>
      <nav className="home-link">
        <FontAwesomeIcon icon={faRedo} onClick={reloadPage} />
      </nav>
      <div className="heading">
        {i18n.t("FUNNY_MEMORY_GAME")}{" "}
        <Tooltip
          title={
            isFavoriteActive
              ? "Tap to remove from Favorite Activities"
              : "Tap to add to Favorite Activities"
          }
        >
          <Fab
            className={`headerTitleIcon ${isFavoriteActive ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            <Icon>star_rounded</Icon>
          </Fab>
        </Tooltip>{" "}
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
              isFavoriteActive={isFavoriteActive}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layout;
