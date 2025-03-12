/**
 * @file   src\components\ShowImage.tsx
 * @brief  Show image component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useState } from "react";
const ShowImage = ({ ...props }) => {
  const { image, text } = props;
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
    setTimeout(() => {
      props.setShowImage(false);
      props.setShowAudioRecorder(true);
    }, props.imageExposureTime);
  };

  return (
    <div className="box-game mt-30">
      <p>{text}</p>
      <div className="imgOption">
        <img
          src={image}
          className={loaded ? "" : "d-none"}
          onLoad={handleImageLoad}
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default ShowImage;
