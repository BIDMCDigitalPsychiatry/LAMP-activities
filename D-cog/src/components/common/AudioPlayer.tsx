import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = ({...props}) => {
  const audioRef = useRef<any>(null);
const [audioURL, setAudioURL] = useState("")
  // Convert Base64 to Blob URL


  useEffect(() => {
    const base64String = (props.sound).split(",")[1]; // Remove prefix if present
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/mpeg" });
    setAudioURL(URL.createObjectURL(blob));
  }, [])

  useEffect(() => {
    if (audioURL != "" && !!audioRef?.current) {
        audioRef?.current?.play();
      }
  }, [audioURL])
  
  return (
    <div>
      <audio ref={audioRef} >
       {audioURL !=="" &&  <source src={audioURL} type="audio/mpeg"  />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;