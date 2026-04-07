/**
 * @file   Diamond.tsx
 * @brief  Individual jewel component with centered number overlay
 */
import * as React from "react";

interface DiamondProps {
  diamondColor: string;
  diamondType: any;
  index: number;
  onClick(e: any, index: number, diamondType: string): void;
}

export class Diamond extends React.Component<DiamondProps> {
  onClick = (e: any): void => {
    this.props.onClick(e, this.props.index, this.props.diamondType);
  };

  render() {
    const classVal =
      this.props.diamondType +
      " " +
      this.props.diamondType +
      "-" +
      this.props.diamondColor;
    return (
      <div onClick={this.onClick} key={this.props.index} className={`diamond-wrapper ${classVal}`}>
        <span className="number-text">{this.props.index}</span>
      </div>
    );
  }
}
