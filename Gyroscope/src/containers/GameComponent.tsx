import React, { useEffect, useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { drawCircle } from "../components/Circle";
let permissionButton: any;

import { makeStyles, Theme, createStyles, Fab } from "@material-ui/core"
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
      fontSize: 18
    },
    canvas:{
      position:"fixed"
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
      [theme.breakpoints.down('sm')]: {
        bottom: 'red',
      },
    },
    cursor: {
      width: "22px",
      height: "22px",
      background: "red",
      position: "absolute",
      top: "25%",
      left: "25%",
      borderRadius:"50%"  
    }
  ,
  button:{
    width:"auto",
    padding:"5px",
    borderRadius:"10%",
    background:"blue"
    }
  }))
//Up to 30 - same direction
export function GameComponent({...props}){ 
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

  const [iPhone, setiPhone] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const classes = useStyles()
  const [mobile, setMobile] = useState(false)
  const [done, setDone] = useState(false)
  const setup = async (p: any) => {   
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) { 
       setMobile(true)
    }
    if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      setiPhone(true);
    } 
  }

  useEffect(() => { 
    ;(async() => {      
      if (canvasRef?.current) {
        await setup(canvasRef)
        window.addEventListener('devicemotion', handleAcceleration);
        window.addEventListener('orientationchange', handleOrientation);
        window.addEventListener('deviceorientation', handleOrientation);
        const ctx = canvasRef.current.getContext("2d");
        let centerX = 0
        let centerY = 0
        if (isMobile) {
          centerX = ctx.canvas.width / 2 - 25;
          centerY = ctx.canvas.height / 2 - 75;
        } else {
          centerX = ctx.canvas.width / 2 ;
          centerY = ctx.canvas.height / 2-100;
        }
        if(!started)
           drawCenterCircle(ctx, centerX, centerY)
        setStarted(true)
        divRef.current.style.background="transparent"
        if(!!mobile) {
          canvasRef.current.ontouchend = (event) => {
            alert("sad")
            divRef.current.style.left = centerX + 'px'
            divRef.current.style.top = centerY + 'px'  
            helpTextRef.current.style.display="none" 
            divRef.current.style.background = "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
            drawTarget(ctx, centerX, centerY)    
            clearCenter(ctx, centerX, centerY)                   
          };
        } else { 
          canvasRef.current.onmousemove = (event) => {
            handleMovement(ctx, event.clientX -5, event.clientY -5 , centerX, centerY)
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
    setState({...state, landscape: orientation === 90 || orientation === -90})
  }
  
  const handleAcceleration = (event) => {
    let landscape = state?.landscape;
    // let acceleration = event.accelerationIncludingGravity;
    let rotation = event.rotationRate || 0;
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    x = oneDecimal(x);  y = oneDecimal(y);  z = oneDecimal(z);
    



    setState({...state, 
      rotation: rotation,
      x: x, // landscape ? y : x,
      y: y, //landscape ? x : y,
      z: z,
      landscape: state?.landscape
    });
  }

  function oneDecimal(n) {
    var number = n;
    var rounded = Math.round( number * 10 ) / 10;
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
    if(canvasRef?.current && !!state && state.x) { 
      const ctx: any = canvasRef.current.getContext("2d");
      let centerX = ctx.canvas.width / 2 ;
      let centerY = ctx.canvas.height / 2;
      handleMovement(ctx, ctx.canvas.width / (100 / toPercentage(state.x, 1)), 
      ctx.canvas.height / (100 / toPercentage(state.y, 1)) , centerX, centerY)
    }
  }, [state])



  const handleMovement = (ctx, x, y, centerX, centerY) => {
    setDone(false)
    divRef.current.style.left = x + 'px'
    divRef.current.style.top = y + 'px'
    if(Math.abs(x- centerX) < 20 &&
      Math.abs(y- centerY) < 80) {
        helpTextRef.current.style.display="none" 
        divRef.current.style.background = "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
        drawTarget(ctx, centerX, centerY)    
        clearCenter(ctx, centerX, centerY)    
      } 
    if(Math.abs(x - 5 - (centerX + (ctx.canvas.width/10))) < 10 &&
      Math.abs(y - 5- centerY) < 60) {
        if(!done) { 
          divRef.current.style.background = "transparent"
          clearTarget(ctx, centerX, centerY)       
          drawCenterCircle(ctx, centerX, centerY)               
          helpTextRef.current.style.display="block"        
          setDone(true)  
        }   
      }
  }

  useEffect(() => {
    if(!!done) { 
      setCurrentCount(currentCount+1)          
    }
  }, [done])

  const drawTarget = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#ADD8E6",
      startX: centerX + (ctx.canvas.width/8),
      startY: centerY
    });
  }

  const clearTarget = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startX: centerX + (ctx.canvas.width/8),
      startY: centerY
    });
  }

  const clearCenter = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 16,
      lineWidth:0,
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
      lineWidth:2,
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
        <Fab className={classes.button} onClick={requestAccess}>Grant accelerometer Permission</Fab>
        )}
        {/* <Fab onClick={handleNextClick}>End Game</Fab> */} {/* Navigation */}
    </>
  )

  // Navigation
  //    ) : (
  //     <GameEnd />
  // );
};


