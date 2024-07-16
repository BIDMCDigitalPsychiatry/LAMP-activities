import React, { useEffect, useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { drawCircle } from "../components/Circle";
import { makeStyles, Theme, createStyles, Fab, Typography, Box } from "@material-ui/core"
import { isMobile } from 'react-device-detect';
import GameEnd from "./GameEnd";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpText: {
      color: "#7599FF",
      bottom: 40,
      position: "absolute",
      textAlign: "center",
      width: "100%",
      fontSize: 18,
      [theme.breakpoints.down('xs')]: {
        bottom: 90,
      },
    },
    canvas: {
      position: "fixed"
    },
    countText: {
      color: "white",
      bottom: 30,
      position: "absolute",
      background: "#7599FF",
      padding: "10px 20px",
      fontSize: 18,
      right: 20,
      borderRadius: 25,

    },
    cursor: {
      width: "22px",
      height: "22px",
      background: "red",
      position: "absolute",
      top: "25%",
      left: "25%",
      borderRadius: "50%"
    }
    ,
    btnblue: {
      background: "#7599FF",
      padding: "15px 25px 15px 25px",
      borderRadius: "40px",
      minWidth: "200px",
      boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
      lineHeight: "22px",
      display: "inline-block",
      cursor: "pointer",
      width: "auto",
      "& h6": {
        textTransform: "capitalize",
        fontSize: "16px",
        color: "#FFFFFF",
        fontWeight: "bold",
      },
      "& span": { cursor: "pointer" },
      "&:hover": {
        background: "#5783ff",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      },
    },
  }))
//Up to 30 - same direction
export function GameComponent({ ...props }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const helpTextRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState(null)
  const [currentCount, setCurrentCount] = useState(0)
  const [started, setStarted] = useState(false)
  // Navigation
  // const [view, setView] = useState("start");
  // const handleNextClick = () => {
  //   setView("end");
  // };
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)
  const [iPhone, setiPhone] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const classes = useStyles()
  const [mobile, setMobile] = useState(false)
  const [done, setDone] = useState(false)
  const [level, setLevel] = useState(1)
  const [offset, setOffset] = useState(0)
  const [quadrant, setQuadrant] = useState(1)
  const setup = async (p: any) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) {
      setMobile(true)
    }
    if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      setiPhone(true);
    }
  }

  useEffect(() => {
    ; (async () => {
      if (canvasRef?.current) {
        await setup(canvasRef)
        window.addEventListener('devicemotion', handleAcceleration);
        window.addEventListener('orientationchange', handleOrientation);
        window.addEventListener('deviceorientation', handleOrientation);
        const ctx = canvasRef.current.getContext("2d");
        let centerX = 0
        let centerY = 0
        if (isMobile) {
          centerX = ctx.canvas.width / 2;
          centerY = ctx.canvas.height / 2 - 75;
        } else {
          centerX = ctx.canvas.width / 2;
          centerY = ctx.canvas.height / 2 - 100;
        }
        setCenterX(centerX)
        setCenterY(centerY)
        if (!started)
          drawCenterCircle(ctx, centerX, centerY)
        setStarted(true)
        divRef.current.style.background = "transparent"
        if (!!mobile) {
          canvasRef.current.ontouchend = (event) => {
            divRef.current.style.left = centerX + 'px'
            divRef.current.style.top = centerY + 'px'
            helpTextRef.current.style.display = "none"
            divRef.current.style.background = "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
            drawTarget(ctx, centerX, centerY)
            clearCenter(ctx, centerX, centerY)
          };
        } else {
          canvasRef.current.onmousemove = (event) => {
            handleMovement(ctx, event.clientX - 5, event.clientY - 5, centerX, centerY)
            //track mouse position and change for custom cursor                    
          };
        }
      }
    })()
  }, [])

  function requestAccess() {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((permission: string) => {
        if (permission === "granted") {
          window.addEventListener('devicemotion', handleAcceleration);
          window.addEventListener('orientationchange', handleOrientation);
          window.addEventListener('deviceorientation', handleOrientation);
          setPermissionGranted(true)
        }
      });
  }

  const handleOrientation = (e) => {
    let orientation = window.orientation;
    setState({ ...state, landscape: orientation === 90 || orientation === -90 })
  }

  const handleAcceleration = (event) => {
    let landscape = state?.landscape;
    // let acceleration = event.accelerationIncludingGravity;
    let rotation = event.rotationRate || 0;
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    x = oneDecimal(x); y = oneDecimal(y); z = oneDecimal(z);
    setState({
      ...state,
      rotation: rotation,
      x: x, // landscape ? y : x,
      y: y, //landscape ? x : y,
      z: z,
      landscape: state?.landscape
    });
  }

  function oneDecimal(n) {
    var number = n;
    var rounded = Math.round(number * 10) / 10;
    return rounded;
  }

  function toPercentage(x, n) {
    var p = 0;
    if (n) {
      p = ((x + 10) / 20) * 100;
    }
    else {
      p = ((x + 10) / 20);
    }
    return oneDecimal(p);
  }


  const [coords, handleCoords] = useMousePosition();

  useEffect(() => {
    if (canvasRef?.current && !!state && state.x) {
      const ctx: any = canvasRef.current.getContext("2d");
      handleMovementMobile(ctx, ctx.canvas.width / (100 / toPercentage(state.x, 1)),
        ctx.canvas.height / (100 / toPercentage(state.y, 1)))
    }
  }, [state])

  const handleMovementMobile = (ctx, x, y) => {
    divRef.current.style.left = x + 'px'
    divRef.current.style.top = y + 'px'
    manageTarget(ctx, x, y)
  }

  const manageTarget = (ctx, x, y) => {
    if (Math.abs(x - 5 - (centerX + (ctx.canvas.width / (isMobile ? 3 : 8)))) < 10 &&
      Math.abs(y - 5 - centerY) < 60) {
      if (!done) {
        divRef.current.style.background = "transparent"
        clearTarget(ctx, centerX, centerY)
        drawCenterCircle(ctx, centerX, centerY)
        helpTextRef.current.style.display = "block"
      }
    }
  }

  const handleMovement = (ctx, x, y, centerX, centerY) => {
    divRef.current.style.left = x + 'px'
    divRef.current.style.top = y + 'px'
    if (Math.abs(x - centerX) < 20 &&
      Math.abs(y - centerY) < 80) {
      helpTextRef.current.style.display = "none"
      divRef.current.style.background = "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
      drawTarget(ctx, centerX, centerY)
      clearCenter(ctx, centerX, centerY)
    }
    manageTarget(ctx, x, y)
  }

  useEffect(() => {
    if (!!done) {
      switch(currentCount) { 
        case 60: 
        if(props.adventure == 2) { 
          setLevel(2)
          setOffset(45)
          setQuadrant(2)
        }
        break
        case 90: 
        if(props.adventure == 2) { 
          setLevel(3)
          setOffset(45)
          setQuadrant(2)
        }
        break
        case 168: 
        if(props.adventure == 2) { 
          setLevel(4)
          setOffset(0)
          setQuadrant(2)
        }
        break
        case 180: 
        if(props.adventure == 2) { 
          setLevel(5)
          setOffset(45)
          setQuadrant(3)
        }
        break
        case 228: 
        if(props.adventure == 2) { 
          setLevel(6)
          setOffset(0)
          setQuadrant(4)
        }
        break
        case 119: 
        if(props.adventure == 3) { 
          setLevel(2)
          setOffset(0)
          setQuadrant(2)
        }
        break
        case 435: 
        if(props.adventure == 3) { 
          setLevel(3)
          setOffset(45)
          setQuadrant(0)
        }
        break
        case 459: 
        if(props.adventure == 3) { 
          setLevel(4)
          setOffset(0)
          setQuadrant(2)
        }
        break
        case 555: 
        if(props.adventure == 3) { 
          setLevel(5)
          setOffset(45)
          setQuadrant(0)
        }
        break
        case 239: 
        if(props.adventure == 4) { 
          setLevel(2)
          setOffset(0)
          setQuadrant(-1)        
        }
        break
        case 671: 
        if(props.adventure == 4) { 
          setLevel(3)
          setOffset(45)
          setQuadrant(-1) 
        }
        break
        case 719: 
        if(props.adventure == 4) { 
          setLevel(4)
          setOffset(0)
          setQuadrant(-1)
        }
        break
        case 914: 
        if(props.adventure == 4) { 
          setLevel(5)
          setOffset(45)
          setQuadrant(-1) 
        }
        break
        case 30: 
        if(props.adventure == 1) { 
          setLevel(2)
          setOffset(45)
          setQuadrant(3)
        }
        break
        case 84: 
        if(props.adventure == 1) { 
          setLevel(3)
          setOffset(0)
          setQuadrant(1)
        }
        break
        case 90: 
        if(props.adventure == 1) { 
          setLevel(4)
          setOffset(45)
          setQuadrant(2)
        }
        break
        case 114: 
        if(props.adventure == 1) { 
          setLevel(5)
          setOffset(0)
          setQuadrant(1)
        }
        break        
      }
      setCurrentCount(currentCount + 1)
    }
  }, [done])
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)

  const getRandomQuadrant = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getAdv2or3Values = (ctx) => {
    let startX = 0
    let startY = 0
    let random = getRandomQuadrant(1, 4)
        if(random == 1) { 
          startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
          startY = centerY 
        }
        if(random == 2) { 
          startX = centerX 
          startY = centerY + (ctx.canvas.height / (isMobile ? 3 : 8))
        }
        if(random == 3) { 
          startX = centerX - (ctx.canvas.width / (isMobile ? 3 : 8))
          startY = centerY 
        }
        if(random == 4) { 
          startX = centerX 
          startY = centerY - (ctx.canvas.height / (isMobile ? 3 : 8))
        }
      return {x: startX, y: startY}
  }

  const getAdv4Values = (ctx) => {
    let startX = 0
    let startY = 0
    let random = getRandomQuadrant(1, 8)
    switch(random) {
      case 1:
        startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY 
        break
      case 2:
        startX = centerX 
        startY = centerY + (ctx.canvas.height / (isMobile ? 3 : 8))
        break
      case 3: 
        startX = centerX - (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY 
        break
      case 4:
        startX = centerX 
        startY = centerY - (ctx.canvas.height / (isMobile ? 3 : 8))
        break
      case 5:
        startX = centerX - (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY - (ctx.canvas.height / (isMobile ? 3 : 8))
        break
      case 6: 
      startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY + (ctx.canvas.height / (isMobile ? 3 : 8))
        break
      case 7:
        startX = centerX - (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY + (ctx.canvas.height / (isMobile ? 3 : 8))
        break
      case 8: 
        startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY - (ctx.canvas.height / (isMobile ? 3 : 8))
        break  
    }
    return {x: startX, y: startY}
  }

  const drawTarget = (ctx, centerX, centerY) => {
    setDone(false)
    let startX = 0
    let startY = 0
    if(props.adventure == 4) {
      const values = getAdv4Values(ctx)
      startX = values.x
      startY = values.y
    }
    if(level == 1) { 
      if(props.adventure == 1) {
        startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY 
      }
      if(props.adventure == 2) {
        const values = getAdv2or3Values(ctx)
        startX = values.x
        startY = values.y
      }
      if(props.adventure == 3) {
        const values = getAdv2or3Values(ctx)
        startX = values.x
        startY = values.y
      }      
    }
    if(level == 2) {
      if(props.adventure == 1) {
        startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY - (ctx.canvas.width / (isMobile ? 3 : 8))
      }      
    } 
    if(level == 3) {
      if(props.adventure == 1) {
        startX = centerX 
        startY = centerY + (ctx.canvas.height / (isMobile ? 3 : 8)) 
      }      
    }
    if(level == 4) {
      if(props.adventure == 1) {
        startX = centerX + (ctx.canvas.width / (isMobile ? 3 : 8))
        startY = centerY + (ctx.canvas.width / (isMobile ? 3 : 8))
      }
    }
    if(props.adventure == 2) {
      const values = getAdv2or3Values(ctx)
      startX = values.x
      startY = values.y
    }
    if(props.adventure == 3) {
      const values = getAdv2or3Values(ctx)
      startX = values.x
      startY = values.y
    }
    setStartX(startX)
    setStartY(startY)
    alert(startX + " -- " + startY)
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#ADD8E6",
      startX: startX,
      startY: startY
    });
    
  }

  const clearTarget = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startX: centerX + (ctx.canvas.width / (isMobile ? 3 : 8)),
      startY: centerY
    });
    setDone(true)
  }

  const clearCenter = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 16,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startY: centerY,
      startX: centerX
    });
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startY: centerY,
      startX: centerX
    });
  }

  const drawCenterCircle = async (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 16,
      lineWidth: 2,
      strokeStyle: "#FF0000",
      colorFill: "#FF0000",
      startY: centerY,
      startX: centerX
    });
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 5,
      strokeStyle: "#FFFF00",
      colorFill: "#FF0000",
      startY: centerY,
      startX: centerX
    });
  }

  // return view === "start" ? (     //Navigation
  return (
    <>
      <canvas onLoad={setup}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={(e) => {
          handleCoords((e as unknown) as MouseEvent);
        }}
        className={classes.canvas}
      />
      <div ref={divRef} className={classes.cursor}></div>
      <span ref={helpTextRef} className={classes.helpText}>
        {mobile ? 'To find your ball, touch on the center circle' :
          'To find your cursor, try moving your mouse to the center of the screen'}
      </span>

      <span className={classes.countText}>
        {`${currentCount}/${props?.totalCount ?? 120}`}
      </span>
      {iPhone && !permissionGranted && (
      <Box textAlign="center" pb={2} mt={2}>
        <Fab className={classes.btnblue} onClick={requestAccess}>
          <Typography variant="h6">Grant accelerometer Permission</Typography></Fab>
      </Box>
      )} 
      {/* <Fab onClick={handleNextClick}>End Game</Fab> */} {/* Navigation */}
    </>
  )

  // Navigation
  //    ) : (
  //     <GameEnd />
  // );
};


