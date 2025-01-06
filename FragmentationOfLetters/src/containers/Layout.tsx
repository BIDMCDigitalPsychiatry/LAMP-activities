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

const Layout = ({ ...props }: any) => {  
  const configuration = props?.data?.configuration;
  const settings= props?.data?.activity?.settings;
  i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
  const startingFragmentation = settings?.startingFragmentation // in percentatge 
  const [clickBack, setClickBack] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="main-class">
      <nav className="back-link">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={()=>setClickBack(true)}
        />
      </nav>
      <nav className="home-link">
        <FontAwesomeIcon
          icon={faRedo}
          onClick={reloadPage}
        />
      </nav>
      <div className="heading">{i18n.t("GAME")}</div>
      <Container>
        <Row>
          <Col>
            <GameBoard 
            language={i18n.language}
            startingFragmentation={startingFragmentation}
            clickBack={clickBack}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layout;
