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
  const { options, handleImageSelection, currentIndex, onImageError } = props;
  i18n.changeLanguage(!props.language ? "en-US" : props.language);

  const [selectedImg, setSelectedImg] = useState(-1);
  const [loadedImages, setLoadedImages] = useState<any>([]);
  const [failedImages, setFailedImages] = useState<any>([]);

  // Reset selected image when currentIndex changes
  useEffect(() => {
    setSelectedImg(-1);
    setLoadedImages([]); // Reset loaded images when the index changes
    setFailedImages([]);
  }, [currentIndex]);

  // Handle when an image finishes loading
  const handleImageLoad = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages((prev: any) => [...prev, index]);
    }
  };

  // A single unreachable stimulus used to leave every option hidden forever,
  // because the grid only rendered once all of them reported onLoad. Failures
  // now settle the option instead, so the remaining choices stay usable.
  const handleImageError = (index: number, img: string) => {
    if (!failedImages.includes(index)) {
      setFailedImages((prev: any) => [...prev, index]);
      if (onImageError) onImageError(img);
    }
  };

  // Check whether every option has settled, whether it loaded or failed
  const allImagesSettled =
    loadedImages.length + failedImages.length === options?.length;

  return (
    <div className="box-game mt-30">
      <p>{i18n.t("RECOGNITION4_TEXT")}</p>
      <div className="img-wrap-main">
        <div id="img-wrapper">
          {options && options.length > 0 ? (
            options?.map((img: string, index: number) => {
              if (failedImages.includes(index)) {
                return (
                  <div key={index} className="option-unavailable">
                    <span>{i18n.t("IMAGE_LOAD_ERROR")}</span>
                  </div>
                );
              }
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
                    className={allImagesSettled ? "" : "d-none"} // Hide images until all have settled
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index, img)}
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
