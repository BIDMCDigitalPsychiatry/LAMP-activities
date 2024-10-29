/**
 * @file   src\components\FinalRecognitionPhase.tsx
 * @brief  final recognition phase component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React from "react";
import i18n from "src/i18n";
import { images } from "./ImageComponents";

const FinalRecognitionPhase = ({ ...props }) => {
  const { options, handleImageSelection , currentIndex} = props;
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  return (
    <div className="box-game mt-30">
      <p>{i18n.t("RECOGNITION4_TEXT")}</p>
      <div className="img-wrap-main">
      <div id="img-wrapper">
        {options && options.length > 0 ? (
          options?.map((img: number) => {
            return (
              <div
                onClick={() => {
                  handleImageSelection(img);
                }}
              >
                {images[currentIndex][img]}
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
