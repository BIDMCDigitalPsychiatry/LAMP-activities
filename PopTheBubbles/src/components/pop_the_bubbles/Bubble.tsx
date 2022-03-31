/**
 * @file   Boxes.tsx
 * @brief  Boxes component which is the initial point of Box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";

interface BubbleProps {
  bubbleToTap: boolean;
  class: string;
  delayed?: number;
  index: number;
  text?: string;
  x: number;
  y: number;
  onClick(e: any, index: number, lastClass: string, tapped: boolean): void;
  bubbleDuration: number;
}
interface BubbleState {
  tapped: boolean;
  visible: boolean;
}

export class Bubble extends React.Component<BubbleProps, BubbleState> {
  constructor(props: BubbleProps) {
    super(props);
    this.state = {
      tapped: false,
      visible: !this.props.text ? false : true,
    };
  }

  // Hanlde bubble rendering in 300ms and visible for 1 sec
  componentDidMount = () => {
    const bubbleDurationVal = this.props.bubbleDuration
      ? 1000 * this.props.bubbleDuration
      : 1500;
    if (!this.props.text) {
      setTimeout(() => {
        this.setState({
          tapped: false,
          visible: true,
        });
        setTimeout(() => {
          this.setState({
            tapped: false,
            visible: false,
          });
        }, bubbleDurationVal);
      }, this.props.delayed);
    }
  };

  // On tapping bubble hide bubble with animate effect
  onPop = (e: any): void => {
    if (!this.props.text) {
      this.setState({ tapped: true });
      setTimeout(() => {
          this.setState({
          visible: false,
        });
      }, 10);
    }
    this.props.onClick(
      e,
      this.props.index,
      this.props.class,
      this.props.bubbleToTap
    );
  };
  
  // Game render function
  render() {
    const cls = "bubble-colors size " + this.props.class;
    const clsToTap = !this.props.bubbleToTap ? " animate-bottom " : "";
    return (
      <div  
        className={cls + " " + clsToTap}
        style={{
          bottom: this.props.y,
          display: this.state.visible ? "block" : "none",
          left: this.props.x,
          opacity:
            !this.state.tapped && this.state.visible
              ? 1.0
              : this.state.visible
              ? 1.0
              : 0.0,
          position: "fixed",
          transform:
            this.state.tapped && this.state.visible ? "scale(1.5)" : "",
          transition: "opacity 100ms ease, transform 100ms ease",
        }}
        onClick={() => {
          this.onPop(this)
        }}
      >
        {this.props.text ? this.props.text : null}
      </div>
    );
  }
}
