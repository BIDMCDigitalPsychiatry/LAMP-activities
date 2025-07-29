import React, { useEffect, useRef, useState } from "react";
import { silent } from "./audioVars";

const AudioPlayer = ({ ...props }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const [audioURL, setAudioURL] = useState("");

    // Initialize AudioContext and unlock it on user interaction
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext)();

        const unlockAudioContext = () => {
            if (audioContextRef.current?.state === "suspended") {
                audioContextRef.current.resume().then(() => {
                });
            }

            // Play silent audio to ensure subsequent playback works
            const silentAudio = new Audio(silent);
            silentAudio.load();
            silentAudio.play().catch((error) => {
                console.error("Silent audio playback failed:", error);
            });

            document.removeEventListener("click", unlockAudioContext);
        };

        document.addEventListener("click", unlockAudioContext, { once: true });

        return () => document.removeEventListener("click", unlockAudioContext);
    }, []);

    // Convert Base64 to Blob URL
    useEffect(() => {
        if (props.sound) {
            const base64String = props.sound.split(",")[1]; // Remove prefix
            const binaryString = atob(base64String);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: "audio/mpeg" });
            setAudioURL(URL.createObjectURL(blob));
        }
    }, [props.sound]);

    // Play the audio once the Blob URL is set
    useEffect(() => {
        if (audioURL && audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    }, [audioURL]);

    return (
        <div>
            <audio ref={audioRef} autoPlay>
                {audioURL && <source src={audioURL} type="audio/mpeg" />}
                Your browser does not support the audio element.
            </audio>
            <p>Click anywhere to enable audio playback if needed.</p>
        </div>
    );
};

export default AudioPlayer;