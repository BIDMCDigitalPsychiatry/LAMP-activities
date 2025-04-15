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
  const [loadedImages, setLoadedImages] = useState<any>([]);

  // Reset selected image when currentIndex changes
  useEffect(() => {
    setSelectedImg(-1);
    setLoadedImages([]); // Reset loaded images when the index changes
  }, [currentIndex]);

  // Handle when an image finishes loading
  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages((prev: any) => [...prev, index]);
    }
  };

  // Check if all images are loaded
  const allImagesLoaded = loadedImages.length === options?.length;

  return (
    <div className="box-game mt-30">
      <p>{i18n.t("RECOGNITION4_TEXT")}</p>
      <div className="img-wrap-main">
        <div id="img-wrapper">
          {options && options.length > 0 ? (
            options?.map((img: string, index: number) => {
              return (
                <div
                  key={index}
                  className={selectedImg === index ? "active" : ""}
                  onClick={() => {
                    handleImageSelection(img);
                    setSelectedImg(index);
                  }}
                >
                  <img
                    src={img}
                    className={allImagesLoaded ? "" : "d-none"} // Hide images until all are loaded
                    onLoad={() => handleImageLoad(index)}
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
