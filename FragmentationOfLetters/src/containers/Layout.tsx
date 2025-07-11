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
import { Fab, Icon, Tooltip } from "@material-ui/core";
import "material-icons";

const Layout = ({ ...props }: any) => {
  const configuration = props?.data?.configuration;
  const settings = props?.data?.activity?.settings;
  i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
  const startingFragmentation = settings?.startingFragmentation; // in percentatge
  const [clickBack, setClickBack] = useState(false);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );
  const [forward] = useState(props?.data?.forward ?? false);
  const [isForwardButton, setIsForwardButton] = useState(false);
  const reloadPage = () => {
    window.location.reload();
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };
  const handleForwardClick = () => {
    setIsForwardButton(true);
    parent.postMessage(
      JSON.stringify({
        static_data: {
          is_favorite: isFavoriteActive,
        },
        forward: true,
      }),
      "*"
    );
  };

  return (
    <div className="main-class">
      <nav className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => setClickBack(true)}
        />
      </nav>
      <nav className={forward ? " home-link-forward" : "home-link"}>
        <FontAwesomeIcon icon={faRedo} onClick={reloadPage} />
      </nav>
      {forward && (
        <nav className="forward-link">
          <FontAwesomeIcon icon={faArrowRight} onClick={handleForwardClick} />
        </nav>
      )}
      <div className="heading">
        {i18n.t("GAME")}{" "}
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
              startingFragmentation={startingFragmentation}
              clickBack={clickBack}
              isFavoriteActive={isFavoriteActive}
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
