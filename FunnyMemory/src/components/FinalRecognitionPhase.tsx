/**
 * @file   src\components\FinalRecognitionPhase.tsx
 * @brief  final recognition phase component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useState } from "react";
import i18n from "src/i18n";

const FinalRecognitionPhase = ({ ...props }) => {
  const { options, handleImageSelection, currentIndex } = props;
  i18n.changeLanguage(!props.language ? "en-US" : props.language);
  const [selectedImg, setSelectedImg] = useState(-1);
  const [loadedImages, setLoadedImages] = useState<any>([])

  useEffect(() => {
    setSelectedImg(-1);
  }, [currentIndex]);

  const handleImageLoad = (index : number) =>{
    setLoadedImages([...loadedImages,index])
  }

  return (
    <div className="box-game mt-30">
      <p>{i18n.t("RECOGNITION4_TEXT")}</p>
      <div className="img-wrap-main">
        <div id="img-wrapper">
          {options && options.length > 0 ? (
            options?.map((img: string, index: number) => {
              return (
                <div
                  className={selectedImg === index ? "active" : ""}
                  onClick={() => {
                    setTimeout(() => {
                      handleImageSelection(img);
                    }, 1000);
                    setSelectedImg(index);
                  }}
                >
                  <img
                    src={img}
                    className={loadedImages.includes(index) ? "" : "d-none"}
                    onLoad={()=>handleImageLoad(index)}
                    alt=""
                  ></img>
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
