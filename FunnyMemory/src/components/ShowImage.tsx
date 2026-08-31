/**
 * @file   src\components\ShowImage.tsx
 * @brief  Show image component for funny memory game
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import React, { useEffect, useRef, useState } from "react";
import i18n from "src/i18n";

/**
 * Stimuli are fetched over the network, so a slow or failed request must not
 * strand the participant: the phase advanced only from onLoad, which never
 * fires on a 404 or offline device. Both onError and a watchdog now advance
 * the phase, and the failure is reported so the trial can be excluded at
 * analysis time rather than scored as if the image had been seen.
 */
const IMAGE_LOAD_TIMEOUT = 15000;

const ShowImage = ({ ...props }) => {
  const { image, text, onImageError } = props;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const advanced = useRef(false);

  // Held in a ref so the watchdog below can stay keyed on `image` alone; the
  // callbacks are recreated every render and would otherwise keep resetting it.
  const failRef = useRef<() => void>(() => undefined);

  const advance = () => {
    if (advanced.current) return;
    advanced.current = true;
    setTimeout(() => {
      props.setShowImage(false);
      props.setShowAudioRecorder(true);
    }, props.imageExposureTime);
  };

  const handleImageLoad = () => {
    setLoaded(true);
    advance();
  };

  const handleImageError = () => {
    setFailed(true);
    if (onImageError) onImageError(image);
    advance();
  };

  failRef.current = handleImageError;

  // Covers the case where neither onLoad nor onError fires — a request that
  // hangs open rather than failing outright.
  useEffect(() => {
    advanced.current = false;
    const watchdog = setTimeout(() => {
      if (!advanced.current) failRef.current();
    }, IMAGE_LOAD_TIMEOUT);
    return () => clearTimeout(watchdog);
  }, [image]);

  return (
    <div className="box-game mt-30">
      <p>{text}</p>
      <div className="imgOption">
        {failed ? (
          <p className="image-load-error">{i18n.t("IMAGE_LOAD_ERROR")}</p>
        ) : (
          <img
            src={image}
            className={loaded ? "" : "d-none"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt=""
          ></img>
        )}
      </div>
    </div>
  );
};

export default ShowImage;
