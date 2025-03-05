/**
 * @file   src\components\FinalRecognitionPhase.tsx
 * @brief  final recognition phase component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useState } from "react";
import i18n from "src/i18n";
import { getImage } from "./ImageComponents";

const FinalRecognitionPhase = ({ ...props }) => {
  const { options, handleImageSelection , currentIndex} = props;
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  const [selectedImg, setSelectedImg] = useState(-1);

  useEffect(()=>{
    setSelectedImg(-1)
  },[currentIndex])

  return (
    <div className="box-game mt-30">
      <p>{i18n.t("RECOGNITION4_TEXT")}</p>
      <div className="img-wrap-main">
      <div id="img-wrapper">
        {options && options.length > 0 ? (
          options?.map((img: number) => {
            return (
              <div className={selectedImg===img ? "active" : ""}
                onClick={() => {
                  setTimeout(()=>{
                    handleImageSelection(img);
                  },1000)
                  setSelectedImg(img)
                }}
              >
                {getImage(currentIndex,img)}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      </div>
    </div>
  );
};
export default FinalRecognitionPhase;
