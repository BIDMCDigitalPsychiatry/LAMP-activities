/**
 * @file   Boxes.tsx
 * @brief  Boxes component which is the initial point of Box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';

interface BubbleProps {
  bubbleToTap : boolean,
  class : string,
  delayed? : number,
  index : number,
  text?:string,
  x : number,
  y : number,  
  onClick(e:any, index: number, tapped : boolean): void
}
interface BubbleState {
  tapped : boolean;
  visible : boolean;
}


export class Bubble extends React.Component<BubbleProps, BubbleState> { 
  constructor(props:BubbleProps) {
    super(props);
    this.state = {
      tapped : false,
      visible : !this.props.text? false :true
    };
  } 
  componentDidMount = () => {
    if(!this.props.text) {     
      setTimeout(() => {
        this.setState ({
          tapped : false,
          visible : true
        });  
        setTimeout(() => {
          this.setState ({
            tapped : false,
            visible : false
          });  
        }, 1000);
      }, this.props.delayed);
    }
  }
  onPop = (e:any): void => {
    this.setState({tapped : true});
    setTimeout(() => {
      this.setState({ 
         visible : false,        
      });
    }, 500);
    this.props.onClick(e, this.props.index, this.props.bubbleToTap);  
  }
  // Game render function
  render() {   
     const cls = "size " + this.props.class;
    return (
      <div
       className={cls}
        style={{             
          bottom: this.props.y,
          display:this.state.visible ? 'block' : 'none'     ,
          left: this.props.x,
          opacity: !this.state.tapped && this.state.visible ? 1.0 : (this.state.visible ? 1.0 : 0.0),
          position: "fixed",
          transform: this.state.tapped && this.state.visible ? "scale(1.5)" : "" ,
          transition: "opacity 150ms ease, transform 150ms ease",
       }}
        onClick={() => {  setTimeout(() => this.onPop(this), 150); }}
      >{this.props.text ? this.props.text : null}</div> 
    );
  }
}