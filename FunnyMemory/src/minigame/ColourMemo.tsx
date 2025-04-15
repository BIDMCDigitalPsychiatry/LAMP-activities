import { useState } from 'react'
import Title from './components/Title';
import Stats from './components/Stats'
import Cards from './components/Cards';
import { useEffect } from 'react';
import React from 'react';
import i18n from 'src/i18n';

function ColourMemo({...props}) {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  i18n.changeLanguage(!props.language ? "en-US" : props.language);

  useEffect(() => {
    (gameState === 'next level') && setLevel(level + 1);
    return () => {
      setGameState("");
    }
  }, [gameState])

  useEffect(() => {
    (score > highestScore) && setHighestScore(score);
  }, [score])

   return (
    <>
      <header>
        <Title language={props.language}/>
        <Stats level={level} score={score} highestScore={highestScore} language={props.language}/>
      </header>
      <main>
        <Cards 
        level={level} 
        gameState={gameState}
        setGameState={setGameState} 
        setScore={setScore} score={score}/>
      </main>      
    </>
  )
}

export default ColourMemo
