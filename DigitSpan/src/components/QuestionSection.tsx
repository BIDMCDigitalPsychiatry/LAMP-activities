import React, { useEffect, useRef, useState } from "react"
import { one, two, three, four, five, six, seven, eight, nine, silent } from "./audioVars";
import { Box } from "@material-ui/core";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const numberAudio = [one, two, three, four, five, six, seven, eight, nine]
// Split numbers into rows of 3
const rows: number[][] = [];
for (let i = 0; i < numbers.length; i += 3) {
  rows.push(numbers.slice(i, i + 3));
}

// Get random numbers
export function getRandomNumbers(dcount: number, min: number, max: number) {
  const randomArray: Array<number> = [];
  for (let i = min; i <= dcount; i++) {
    randomArray[i - 1] = randomNumber(max, 0, randomArray)
  }
  return randomArray;
}

function randomNumber(max: number, min: number, randomArray: Array<number>): number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomArray.indexOf(num) >= 0 || num === 0 ? randomNumber(max, min, randomArray) : num;
}

export default function QuestionSection({ ...props }) {
  const [numberToShow, setNumberToShow] = useState(0)
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0); // Store the current index in a ref

  useEffect(() => {
    const audioContext = new (window.AudioContext)();
    const silentAudio = new Audio();
    silentAudio.src = silent
    silentAudio.load(); // Preload the silent audio

    const enableBackgroundAudio = () => {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      silentAudio.play().catch((error) => console.error("Silent audio failed:", error));
    };

    document.addEventListener("click", enableBackgroundAudio, { once: true });
  }, []);

  useEffect(() => {
    setNumberToShow(0)
    setIndex(0)    
  }, [props.count])

  useEffect(() => {
    if (numberToShow > 0) {
      setIndex(index + 1)
    }
  }, [numberToShow])

  useEffect(() => {
    indexRef.current = 0
    const interval = setInterval(() => {
      if (indexRef.current < props.questionSequence.length) {
        const nextNumber = props.questionSequence[indexRef.current];
        if (nextNumber > 0) {
          const s = new Audio()
          s.src = numberAudio[nextNumber - 1]
          s.load()
          s.play()
          setNumberToShow(nextNumber);
          indexRef.current += 1; // Update the ref
        }
      } else {
        setNumberToShow(0);
        props.complete()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [props.questionSequence])


  return (
    <React.Fragment>
      {numberToShow > 0 && (<Box>
        {numberToShow}</Box>)}
    </React.Fragment>

  )
}
