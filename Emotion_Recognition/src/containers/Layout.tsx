import "./layout.css";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";
import Emotions from "src/components/Emotions";
import { shuffleArray } from "src/functions";
import { Fab, Icon, Tooltip } from "@material-ui/core";
import "material-icons";

const ems: any = [
  {
    emotion: "Happiness",
    index: "happiness",
  },
  {
    emotion: "Sadness",
    index: "sadness",
  },
  {
    emotion: "Fear",
    index: "fear",
  },
  {
    emotion: "Anger",
    index: "anger",
  },
  {
    emotion: "Neutral",
    index: "neutral",
  },
];

const Layout = ({ ...props }: any) => {
  const [level, setLevel] = useState(1);
  const [currentEmotion, setCurrentEmotion] = useState<any>({});
  const [routes, setRoutes] = useState<any>([]);
  const time = new Date().getTime();
  const [gameOver, setGameOver] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [totalLevels, setTotalLevels] = useState(0);
  const [emotions, setEmotions] = useState(ems);
  const [isFavoriteActive, setIsFavoriteActive] = useState(
    props?.data?.is_favorite
  );
  const [forward] = useState(props?.data?.forward ?? false);
  const [isForwardButton, setIsForwardButton] = useState(false);

  useEffect(() => {
    const configuration = props.data.configuration;
    let data = props.data.activity?.settings
      ? props.data.activity?.settings
      : null;
    let settings = (data || []).map((e: any) => e.emotion);
    let defaultEmotions = ems?.map((e: any) =>
      e.emotion?.toLowerCase()?.trim()
    );
    let missing = (settings || []).filter(
      (item: any) => defaultEmotions.indexOf(item?.trim()?.toLowerCase()) < 0
    );
    missing.map((m: string) => {
      ems.push({
        emotion: m,
        index: m?.trim()?.toLowerCase()?.replace(/ /g, ""),
      });
    });
    setEmotions(ems);
    data = shuffleArray(
      (props.data.activity?.settings ? props.data.activity?.settings : null) ??
        []
    );
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    const newArray = data?.map((em: any) => {
      return {
        ...em,
        selected: "",
      };
    });
    setSettings(newArray?.slice(0, 10));
    setTotalLevels(data?.length > 10 ? 10 : data?.length);
  }, [props.data]);

  useEffect(() => {
    if (settings !== null) {
      if (level <= totalLevels + 1) {
        setCurrentEmotion(settings[level - 1]);
      }
    }
  }, [level, settings]);

  useEffect(() => {
    if (gameOver) {
      sentResult();
    }
  }, [gameOver]);

  const sentResult = () => {
    setTimeout(() => {
      parent.postMessage(
        routes.length > 0
          ? JSON.stringify({
              timestamp: new Date().getTime(),
              duration: new Date().getTime() - time,
              temporal_slices: JSON.parse(JSON.stringify(routes)),
              static_data: { is_favorite: isFavoriteActive },
              ...(forward && { forward: isForwardButton }),
            })
          : null,
        "*"
      );
    }, 2000);
  };

  const handleLevelCompleted = (selected: any, duration: any, text: string) => {
    if (!routes.find((item: any) => item.item === level)) {
      const route = {
        duration: duration,
        item: level,
        level: currentEmotion?.emotionText,
        type:
          selected?.emotion?.toLowerCase() ===
          currentEmotion?.emotion?.toLowerCase()
            ? true
            : false,
        value: selected?.emotion,
      };
      setRoutes([...routes, route]);
      const newArray = settings?.map((em: any, index: number) => {
        if (level === index + 1) {
          em.selected = selected.emotion;
          return em;
        } else {
          return em;
        }
      });
      setSettings(newArray);
    }
    if (text === "previous") {
      setLevel(level - 1);
    } else if (text === "save") {
      const route = { type: "manual_exit", value: false };
      routes.push(route);
      setGameOver(true);
    } else {
      setLevel(level + 1);
    }
  };
  const clickBack = () => {
    const route = { type: "manual_exit", value: true };
    routes.push(route);
    parent.postMessage(
      routes.length > 0
        ? JSON.stringify({
            timestamp: new Date().getTime(),
            duration: new Date().getTime() - time,
            temporal_slices: JSON.parse(JSON.stringify(routes)),
            static_data: { is_favorite: isFavoriteActive },
            ...(forward && { forward: false }),
          })
        : null,
      "*"
    );
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
        <FontAwesomeIcon icon={faArrowLeft} onClick={clickBack} />
      </nav>
      {forward && (
        <nav className="forward-link">
          <FontAwesomeIcon icon={faArrowRight} onClick={handleForwardClick} />
        </nav>
      )}
      <div className="heading">
        {i18n.t("EMOTIONS")}{" "}
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
            <p className="error-class">{gameOver ? i18n.t("GAME_OVER") : ""}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Emotions
              emotions={emotions}
              data={currentEmotion}
              handleLevelCompleted={handleLevelCompleted}
              totalLevels={totalLevels}
              level={level <= totalLevels ? level : totalLevels}
              setLevel={setLevel}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layout;
