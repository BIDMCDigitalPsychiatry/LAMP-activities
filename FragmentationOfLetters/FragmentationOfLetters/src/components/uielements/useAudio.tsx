/**
 * @file   src\components\uielements\useAudio.tsx
 * @brief  Audio player component for the app
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import { useEffect, useRef, useState } from 'react';

const useAudio = (url: string | undefined) => {
    const audioRef = useRef(new Audio(url));
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Optional: Load the audio file
        audioRef.current.load();
        const handleAudioEnded = () => {
            setIsPlaying(false);
        };
        audioRef.current.addEventListener('ended', handleAudioEnded);
        // Cleanup function to stop the audio when the component unmounts
        return () => {
            audioRef.current.pause();
            audioRef.current.removeEventListener('ended', handleAudioEnded);

        };
    }, [url]); // Dependency on the URL

    const play = async () => {
        try {
            await audioRef.current.play();
            setIsPlaying(true);

        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return { play, isPlaying };
};

export default useAudio;