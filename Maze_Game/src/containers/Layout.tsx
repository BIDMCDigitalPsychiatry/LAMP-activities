import "./layout.css";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";
import ModalPopup from "./uielements/ModalPopup";
import { MazeComponent } from "./MazeComponent";
import DialogMessage from "./DialogMessage";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import "material-icons";

const Layout = ({ ...props }: any) => {
  const [circles, setCircles] = useState(2);
  const [gameLevel, setGameLevel] = useState(1);
  const [footerMsg, setFooterMsg] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const time = new Date().getTime();
  const [timeTaken, setTimeTaken] = useState(0);
  const [routes, setRoutes] = useState<any>([]);
  const [startGame, setStartGame] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite ?? false
  );
  const [hasForward] = useState(props?.data?.forward ?? false);

  useEffect(() => {
    const configuration = props?.data?.configuration;
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    setFooterMsg(
      i18n.t("LEVEL") +
        " " +
        gameLevel +
        "/" +
        (props.data.activity?.settings?.level ?? 12)
    );
    if (gameLevel === 1) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        setShowStartButton(false);
      } else {
        setShowStartButton(true);
      }
    }
    setOpen(true);
  }, [props.data]);

  const showModal = () => {
    setConfirmModalShow(true);
  };

  const hideModal = () => {
    setConfirmModalShow(false);
  };

  useEffect(() => {
    if (levelCompleted) {
      setFooterMsg(i18n.t("YOU_WON"));
      const route = {
        duration: timeTaken,
        item: circles,
        level: gameLevel,
        type: levelCompleted,
        value: timeTaken,
      };
      setRoutes([...routes, route]);
      if (gameLevel < 12) {
        showModal();
      } else {
        setIsGameOver(true);
      }
    }
  }, [levelCompleted]);

  const sentResult = () => {
    const route = { type: "manual_exit", value: false };
    routes.push(route);
    setTimeout(() => {
      parent.postMessage(
        JSON.stringify({
          timestamp: new Date().getTime(),
          duration: new Date().getTime() - time,
          temporal_slices: JSON.parse(JSON.stringify(routes)),
          static_data: { is_favorite: isFavoriteActive },
          ...(hasForward && { forward: true }),
          done:true
        }),
        "*"
      );
    }, 3000);
  };

  useEffect(() => {
    if (isGameOver) {
      sentResult();
    }
  }, [isGameOver]);

  const clickBack = (isBack: boolean) => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - time,
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        static_data: { is_favorite: isFavoriteActive },
        ...(hasForward && { forward: !isBack }),
        ...(isBack && { clickBack : true }),

      }),
      "*"
    );
  };
  const handleFavoriteClick = () => {
    setIsFavoriteActive((prev: boolean) => !prev);
  };

  return (
    <div className="main-class">
      {confirmModalShow && (
        <ModalPopup
          show={confirmModalShow}
          onHide={(e: any) => {
            hideModal();
            sentResult();
          }}
          message={i18n.t("CONTINUE")}
          handleConfirm={(e: any) => {
            hideModal();

            if (props.data.activity?.settings?.level ?? 12) {
              setFooterMsg(
                i18n.t("LEVEL") +
                  " " +
                  (gameLevel + 1).toString() +
                  "/" +
                  (props.data.activity?.settings?.level ?? 12).toString()
              );
              setGameLevel(gameLevel + 1);
              if (gameLevel === 6) {
                setCircles(2);
              } else {
                setCircles(circles + 1);
              }
              setLevelCompleted(false);
            }
          }}
          action="mindLamp"
        />
      )}

      <nav className="back-link">
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => clickBack(true)} />
      </nav>
      {hasForward && (
        <nav className="forward-link">
          <FontAwesomeIcon
            icon={faArrowRight}
            onClick={() => clickBack(false)}
          />
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
        {isGameOver && (
          <Row>
            <Col>
              <p className="error-class">{i18n.t("GAME_OVER")}</p>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <MazeComponent
              circles={circles}
              setFooterMsg={setFooterMsg}
              gameLevel={gameLevel}
              setLevelCompleted={setLevelCompleted}
              setTimeTaken={setTimeTaken}
              startGame={startGame}
              setShowStartButton={setShowStartButton}
            />
          </Col>
        </Row>
        {showStartButton && (
          <Row>
            <Col className="mt-80">
              <Button
                variant="primary"
                className="start-button"
                size="sm"
                onClick={() => {
                  setStartGame(true);
                  setShowStartButton(false);
                }}
              >
                {i18n.t("START_GAME")}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <div className="footer fixed_bottom">{footerMsg}</div>
      <DialogMessage
        open={open}
        setStartGame={setStartGame}
        setOpen={setOpen}
      />
    </div>
  );
};
export default Layout;
