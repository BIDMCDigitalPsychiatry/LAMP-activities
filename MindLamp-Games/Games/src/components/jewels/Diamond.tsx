
/**
 * @file   Diamond.tsx
 * @brief  diamond component to load jewels
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from 'react';

interface DiamondProps {
    diamondType: any;
    diamondNumber:number;
    index: number;   
    onClick(e:any, index: number): void;
}

export class Diamond extends React.Component<DiamondProps> {    
    onClick = (e:any): void => {
        this.props.onClick(e, this.props.index);        
    }
    
    render() {
        return (
            <div onClick={this.onClick} key={this.props.index} className="diamond-style"
                    style={{ backgroundImage:`url(${this.props.diamondType})` }}  >
                <span className="number-text"> {this.props.index}</span>
            </div>
        );
    }
}
