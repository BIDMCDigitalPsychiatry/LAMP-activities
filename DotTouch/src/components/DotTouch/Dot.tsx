
/**
 * @file   Dot.tsx
 * @brief  Dot component 
 * @date   June , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from 'react';

interface DotProps {
    index: string;   
    onClick(e:any, index: string): void;
}

export class Dot extends React.Component<DotProps> {    
    onClick = (e:any): void => {
        this.props.onClick(e, this.props.index);        
    }
    
    render() {
        const classNameVal = this.props.index === '1' ? 'dot-style dot-selected ' : 'dot-style ';
        return (
            <div onClick={this.onClick} key={this.props.index} className={classNameVal}>
                <span className="number-text">{this.props.index}</span>
            </div>
        );
    }
}
