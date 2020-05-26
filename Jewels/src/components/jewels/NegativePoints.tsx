/**
 * @file   NegativePoints.tsx
 * @brief  NegativePoints component which shows negative points for jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';

interface Props  {
    startPoints:number;
}
export class NegativePoints extends React.Component<Props> {    
   
    constructor(props:Props) {
        super(props);  
    }

    render() {     
        return ( 
            <div className="negative-points">        
                {this.props.startPoints}
            </div>                
        );
    }
}
  
