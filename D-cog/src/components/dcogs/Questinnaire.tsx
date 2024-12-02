/**
 * @file   InfoModal.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import "./box.css";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Star5 from "./5Star.svg";
import Star4 from "./4Star.svg";
import Star3 from "./3Star.svg";
import Star2 from "./2Star.svg";
import Star1 from "./1Star.svg";
import i18n from "../../i18n";

interface Props {
  show?: boolean;
  // modalClose(status: boolean)?: void;
  msg?: string;
  language?: string;
  setResponse(response: any): any
}

interface State {
  showStatus: boolean;
  clarity: number,
  happiness: number
}

export class Questinnaire extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    i18n.changeLanguage(!!props.language ? props.language : "en-US");
    this.state = {
      showStatus: true,
      clarity: 5,
      happiness: 5,
    };
  }

  // Handles modal close
  handleClose = () => {
    this.setState({
      showStatus: false,
    });
    this.props.setResponse({clarity: this.state.clarity, happiness: this.state.happiness});
  };

  setClarity = (e: any,response: any) => { 
    this.setState({clarity: response})
  }

  setHappiness = (e: any,response: any) => { 
    this.setState({happiness: response})
  }

  // Modal render function
  render() {
    return (
      <Modal
        show={this.state.showStatus}
        onHide={this.handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title><h4>Questinnaire</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center mb-4">
            <Col lg={4} className="fw-bolder">How clear were the instructions?</Col>
            <Col className="smileynav">
              <Button onClick={(e) => this.setClarity(e, 5)} className={this.state.clarity == 5 ? "active" : ""}><img src={Star5}/></Button>
              <Button onClick={(e) => this.setClarity(e, 4)} className={this.state.clarity == 4 ? "active" : ""}><img src={Star4}/></Button>
              <Button onClick={(e) => this.setClarity(e, 3)} className={this.state.clarity == 3 ? "active" : ""}><img src={Star3}/></Button>
              <Button onClick={(e) => this.setClarity(e, 2)} className={this.state.clarity == 2 ? "active" : ""}><img src={Star2}/></Button>
              <Button onClick={(e) => this.setClarity(e, 1)} className={this.state.clarity == 1 ? "active" : ""}><img src={Star1}/></Button>
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col lg={4} className="fw-bolder">How happy would you be to do this again?</Col>
            <Col className="smileynav">
              <Button onClick={(e) => this.setHappiness(e, 5)} className={this.state.happiness == 5 ? "active" : ""}><img src={Star5}/></Button>
              <Button onClick={(e) => this.setHappiness(e, 4)} className={this.state.happiness == 4 ? "active" : ""}><img src={Star4}/></Button>
              <Button onClick={(e) => this.setHappiness(e, 3)} className={this.state.happiness == 3 ? "active" : ""}><img src={Star3}/></Button>
              <Button onClick={(e) => this.setHappiness(e, 2)} className={this.state.happiness == 2 ? "active" : ""}><img src={Star2}/></Button>
              <Button onClick={(e) => this.setHappiness(e, 1)} className={this.state.happiness == 1 ? "active" : ""}><img src={Star1}/></Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            {i18n.t("Submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
