import { useState } from 'react'
import Title from './components/Title';
import Stats from './components/Stats'
import Cards from './components/Cards';
import { useEffect } from 'react';
import GameOver from './components/GameOver';
import React from 'react';
import i18n from 'src/i18n';

let overlayStyle = {
  visibility: 'hidden',
  opacity: '0%'
}

let modalStyle = {
  transform: 'translate(0%, 0%)'
}


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
    if (gameState === 'game over') {
      overlayStyle = {
        opacity: '100%',
        visibility : 'visible'
      }
      modalStyle = {
        transform: 'translate(0%, 50%)'
      }
    }

    return () => {
      setTimeout(()=>{
        overlayStyle = {
          visibility: 'hidden',
          opacity: '0%'
        }
  
        modalStyle = {
          transform: 'translate(0%, 0%)'
        }
      },1000)      
    }
  }, [gameState])

  useEffect(() => {
    (score > highestScore) && setHighestScore(score);
  }, [score])

  const resetGame = () => {
    setGameState('new game');
    setScore(0);
    setLevel(1);
  }

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
      <GameOver
      language={props.language} 
      highestScore={highestScore} 
      overlayStyle={overlayStyle} 
      modalStyle={modalStyle}
      resetGame={resetGame}/>
    </>
  )
}

export default ColourMemo
