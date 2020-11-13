/**
 * @file   Diamond.tsx
 * @brief  diamond component to load jewels
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
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
      <div onClick={this.onClick} key={this.props.index} className={classVal}>
        <span className="number-text"> {this.props.index}</span>
      </div>
    );
  }
}
