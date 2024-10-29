/**
 * @file   src\components\ShowImage.tsx
 * @brief  Show image component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React from "react";
import { images } from "./ImageComponents";

const ShowImage = ({...props}) =>{
    const {image, text, currentIndex} = props;
    return(
        <div className="box-game mt-30">
          <p>{text}</p>
          <div className="imgOption">
          {images[currentIndex][image]}
          </div>
        </div>
    )

}

export default ShowImage