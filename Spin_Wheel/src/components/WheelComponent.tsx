import React, { useEffect, useState } from 'react'

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor,
  contrastColor,
  arrowColor,
  buttonText = ' ',
  isOnlyOnce = false,
  size,
  upDuration,
  downDuration,
  fontFamily = 'proxima-nova',  
  circleCenterX,
  circleCenterY,
  canvasId,
  clicked = true,
  setClicked,
  setTimeTaken,
} : any) => {
  let currentSegment = ''
  let isStarted = false
  const [isFinished, setFinished] = useState(false)
  let timerHandle = 0
  const timerDelay = segments.length
  let angleCurrent = 10.6
  let angleDelta = 0
  let canvasContext: any = null
  let maxSpeed = Math.PI / segments.length
  const upTime = segments.length * upDuration
  const downTime = segments.length * downDuration
  let spinStart = 0
  let frames = 0
  const centerX = circleCenterX
  const centerY = circleCenterY

  useEffect(() => {
    wheelInit()
    if(clicked === true){spin()}
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 0)
  }, [clicked])

  const wheelInit = () => {
    initCanvas()
    wheelDraw()
  }

  const initCanvas = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (navigator.userAgent.indexOf('MSIE') !== -1) {      
      document?.getElementById('wheel')?.appendChild(canvas)
    }
    canvasContext = canvas.getContext('2d')
  }

  const spin = () => {
    isStarted = true
    if (timerHandle === 0) {
      spinStart = new Date().getTime()
      // maxSpeed = Math.PI / ((segments.length*2) + Math.random())
      maxSpeed = Math.PI / segments.length
      frames = 0
      timerHandle = window.setInterval(onTimerTick, timerDelay)
    }      
  }
  
  const onTimerTick = () => {
    frames++
    draw()
    const duration = new Date().getTime() - spinStart     
    let progress = 0
    let finished = false
    if (duration < upTime) {
      progress = duration / upTime
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
          progress = 1
        } else {
          progress = duration / downTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        }
      } else {
        progress = duration / downTime
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
      }
      if (progress >= 1) {finished = true}
    }
    angleCurrent += angleDelta
    while (angleCurrent >= Math.PI * 2) {angleCurrent -= Math.PI * 1.5}
    if (finished) {
      setTimeTaken(duration)
      setFinished(true)
      onFinished(currentSegment)
      clearInterval(timerHandle)
      timerHandle = 0
      angleDelta = 0
    }
  }

  const wheelDraw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const draw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const drawSegment = (key:any, lastAngle:any, angle:any) => {
    const ctx = canvasContext
    const value = segments[key]
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, size, lastAngle, angle, false)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = segColors[key]
    ctx.fill()
    ctx.stroke()
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((lastAngle + angle) / 2)
    ctx.fillStyle = contrastColor
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0)
    ctx.restore()
  }

  const drawWheel = () => {
    const ctx = canvasContext
    let lastAngle = angleCurrent
    const len = segments.length
    const PI2 = Math.PI * 2
    ctx.lineWidth = 0.1
    ctx.strokeStyle = primaryColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = '1em ' + fontFamily
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent
      drawSegment(i - 1, lastAngle, angle)
      lastAngle = angle
    }

    // Draw a center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 50, 0, PI2, false)
    ctx.closePath()
    ctx.fillStyle = primaryColor
    ctx.lineWidth = 5
    ctx.strokeStyle = 'white'
    ctx.fill()
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillStyle = contrastColor
    ctx.textAlign = 'center'
    ctx.fillText(buttonText, centerX, centerY + 3)
    ctx.stroke()

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, size, 0, PI2, false)
    ctx.closePath()

    ctx.lineWidth = 10
    ctx.strokeStyle = primaryColor
    ctx.stroke()
  }

  const drawNeedle = () => {
    const ctx = canvasContext
    ctx.lineWidth = 1
    ctx.strokeStyle = arrowColor
    ctx.fillStyle = arrowColor
    ctx.beginPath()    
    ctx.moveTo(centerX + 20, centerY - 40)
    ctx.lineTo(centerX - 20, centerY - 40)
    ctx.lineTo(centerX, centerY - 70)
    ctx.closePath()
    ctx.fill()
    const change = angleCurrent + Math.PI / 2
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1
    if (i < 0){ i = i + segments.length}
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = primaryColor
    ctx.font = 'bold 1.5em ' + fontFamily
    currentSegment = segments[i] 
    if(isStarted){
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50)
    }
  }
  const clear = () => {
    const ctx = canvasContext
    ctx.clearRect(0, 0, 1000, 800)
  }
  return (
    <div id='wheel' className='wheel'>
      <canvas
        id={canvasId}
        width='450'
        height='450'
        style={{
          pointerEvents: isFinished ? 'none' : 'auto'
        }}
      />
    </div>
  )
}
export default WheelComponent