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
  onClick(e: any, index: number): void;
}

export class Box extends React.Component<BoxProps> {
  // To handle box click which inturn call parent function
  onClick = (e: any): void => {
    if (this.props.enableTap) {
      this.props.onClick(e, this.props.index);
    }
  };

  // Box render with conditions passed from Board.tsx
  render() {
    // All boxes always get dog-cover (blue). Cover fades out during memorization phase
    // so all boxes look identical (white) except dog boxes which show the dog image.
    const classN = this.props.boxSQClass + " dog-cover" +
      (!this.props.animateStatus ? " dog-cover-revealed" : "");

    return (
      <div
        className={this.props.boxClass}
        onClick={this.onClick}
      >
        <div className={classN} />
        <div className={this.props.img} />
      </div>
    );
  }
}
