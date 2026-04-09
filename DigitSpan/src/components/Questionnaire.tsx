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
    i18n.changeLanguage(!!props.language ? props.language : "en-US");
    this.state = {
      showStatus: true,
      clarity: 0,
      happiness: 0,
    };
  }

  handleClose = () => {
    this.setState({ showStatus: false });
    this.props.setResponse({
      clarity: this.state.clarity,
      happiness: this.state.happiness,
    });
  };

  setClarity = (e: any, response: any) => {
    this.setState({ clarity: response });
  };

  setHappiness = (e: any, response: any) => {
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
        backdrop={"static"}
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
              <Button onClick={(e) => this.setClarity(e, 1)} className={this.state.clarity === 1 ? "active" : ""}><Star1 /></Button>
              <Button onClick={(e) => this.setClarity(e, 2)} className={this.state.clarity === 2 ? "active" : ""}><Star2 /></Button>
              <Button onClick={(e) => this.setClarity(e, 3)} className={this.state.clarity === 3 ? "active" : ""}><Star3 /></Button>
              <Button onClick={(e) => this.setClarity(e, 4)} className={this.state.clarity === 4 ? "active" : ""}><Star4 /></Button>
              <Button onClick={(e) => this.setClarity(e, 5)} className={this.state.clarity === 5 ? "active" : ""}><Star5 /></Button>
            </div>
          </div>
          <div className="questionnaire-question">
            <div className="questionnaire-label">
              {i18n.t("How happy would you be to do this again?")}
            </div>
            <div className="smileynav questionnaire-faces">
              <Button onClick={(e) => this.setHappiness(e, 1)} className={this.state.happiness === 1 ? "active" : ""}><Star1 /></Button>
              <Button onClick={(e) => this.setHappiness(e, 2)} className={this.state.happiness === 2 ? "active" : ""}><Star2 /></Button>
              <Button onClick={(e) => this.setHappiness(e, 3)} className={this.state.happiness === 3 ? "active" : ""}><Star3 /></Button>
              <Button onClick={(e) => this.setHappiness(e, 4)} className={this.state.happiness === 4 ? "active" : ""}><Star4 /></Button>
              <Button onClick={(e) => this.setHappiness(e, 5)} className={this.state.happiness === 5 ? "active" : ""}><Star5 /></Button>
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
