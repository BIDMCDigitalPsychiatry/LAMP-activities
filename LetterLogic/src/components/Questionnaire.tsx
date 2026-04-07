import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import Star5 from "./5Star";
import Star4 from "./4Star";
import Star3 from "./3Star";
import Star2 from "./2Star";
import Star1 from "./1Star";
import i18n from "../i18n";

interface Props {
  show?: boolean;
  language?: string;
  setResponse(response: any): any;
}

interface State {
  showStatus: boolean;
  clarity: number;
  happiness: number;
}

export class Questionnaire extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    i18n.changeLanguage(props.language || "en-US");
    this.state = { showStatus: true, clarity: 0, happiness: 0 };
  }

  handleClose = () => {
    this.setState({ showStatus: false });
    this.props.setResponse({
      clarity: this.state.clarity,
      happiness: this.state.happiness,
    });
  };

  setClarity = (_e: any, response: number) => {
    this.setState({ clarity: response });
  };

  setHappiness = (_e: any, response: number) => {
    this.setState({ happiness: response });
  };

  render() {
    return (
      <Modal
        show={this.state.showStatus}
        onHide={this.handleClose}
        animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        backdrop="static"
      >
        <Modal.Header className="questionnaire-modal-header">
          <Modal.Title className="questionnaire-modal-title">
            {i18n.t("Questionnaire")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="questionnaire-modal-body">
          <div className="questionnaire-question">
            <div className="questionnaire-label">
              {i18n.t("How clear were the instructions?")}
            </div>
            <div className="smileynav questionnaire-faces">
              {[5, 4, 3, 2, 1].map((n) => {
                const Star = [Star1, Star2, Star3, Star4, Star5][n - 1];
                return (
                  <Button
                    key={n}
                    onClick={(e) => this.setClarity(e, n)}
                    className={this.state.clarity === n ? "active" : ""}
                  >
                    <Star />
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="questionnaire-question">
            <div className="questionnaire-label">
              {i18n.t("How happy would you be to do this again?")}
            </div>
            <div className="smileynav questionnaire-faces">
              {[5, 4, 3, 2, 1].map((n) => {
                const Star = [Star1, Star2, Star3, Star4, Star5][n - 1];
                return (
                  <Button
                    key={n}
                    onClick={(e) => this.setHappiness(e, n)}
                    className={this.state.happiness === n ? "active" : ""}
                  >
                    <Star />
                  </Button>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="questionnaire-modal-footer">
          <Button className="questionnaire-modal-btn" onClick={this.handleClose}>
            {i18n.t("Submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
