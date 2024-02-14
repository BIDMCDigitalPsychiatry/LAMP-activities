import React from 'react'
import WheelComponent from '../WheelComponent'

const SpinWheel = ({...props}: any) => {
  const {centerX, centerY, canvasId, wheelId,handleLevelComplete, selectedItem, clicked, setClicked, setShowResult, setTimeTaken, totalSpins, setIsGameOver} = props;
  const segments = [
    '0',
    '50',
    '100',
    '250',
    '0',
    '50',
    '100',
    '250'
  ]
  const segColors = [
    '#008000',
    '#ffff00',
    '#ff0000',
    '#0000ff',
    '#008000',
    '#ffff00',
    '#ff0000',
    '#0000ff'
  ]
  const onFinished = (winner : any) => {
    setShowResult(true)
    setClicked(false)
    handleLevelComplete()
    if(totalSpins===0){
      setIsGameOver(true)
    }
  }

 
  return (
    <WheelComponent
      segments={segments}
      segColors={segColors}
      winningSegment={selectedItem}
      onFinished={(winner : any) => onFinished(winner)}
      primaryColor='white'
      contrastColor='black'
      arrowColor='white'
      buttonText=''
      isOnlyOnce={false}
      size={175}
      upDuration={100}
      downDuration={1000}
      circleCenterX={centerX}
      circleCenterY={centerY}
      canvasId= {canvasId}
      wheelId={wheelId}
      clicked={clicked}
      setClicked={setClicked}
      setTimeTaken={setTimeTaken}
    />
  )
}

export default SpinWheel