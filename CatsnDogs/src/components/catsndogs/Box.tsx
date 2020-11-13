/**
 * @file   Box.tsx
 * @brief  box component to load cats and dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";

interface BoxProps {
  animateStatus: boolean;
  boxClass: string;
  boxSQClass: string;
  enableTap: boolean;
  img: string;
  index: number;
  itemType: number;
  onClick(e: any, index: number, type: number): void;
}

export class Box extends React.Component<BoxProps> {
  // To handle box click which inturn call parent function
  onClick = (e: any): void => {
    if (this.props.enableTap) {
      this.props.onClick(e, this.props.index, this.props.itemType);
    }
  };

  // Box render with conditions passed from Board.tsx
  render() {
    const classN =
      this.props.img !== null && this.props.animateStatus === true
        ? this.props.boxSQClass + " slideIn"
        : this.props.animateStatus === false || this.props.img === null
        ? this.props.boxSQClass
        : this.props.boxSQClass + " slideOut";
    return (
      <div
        key="this.props.index"
        className={this.props.boxClass}
        onClick={this.onClick}
      >
        <div className={classN} />
        <div className={this.props.img} />
      </div>
    );
  }
}
