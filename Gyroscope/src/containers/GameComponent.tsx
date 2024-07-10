import React, { useEffect, useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { drawCircle } from "../components/Circle";
let isPhone = false;
let permissionButton: any;
let permissionGranted = false;
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
      color:"green",
      width:"20px"
    }
  }))
//Up to 30 - same direction
export function GameComponent({...props}){ 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const helpTextRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState(null)
  const [currentCount, setcurrentCount] = useState(0)

  // Navigation
  // const [view, setView] = useState("start");
  // const handleNextClick = () => {
  //   setView("end");
  // };


  const classes = useStyles()
  const setup = (p: any) => {
    alert(navigator.userAgent)
    return () => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // is mobile..
        isPhone = true;
        getAccelerometerPermission(p);
      } 
    };
  }

  function getAccelerometerPermission(p: any) {
    if (!isPhone) {
      permissionGranted = true;
      return;
    }
    if(permissionGranted){
      return
    }
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      permissionButton = p.createButton(
        "Click to grant accelerometer Permission"
      );
      permissionButton.style("font-size", "24px");
      permissionButton.style("z-index", "999");
      permissionButton.position(1, 20);
      permissionButton.mousePressed(requestAccess);    
  
    } else {
      permissionGranted = true;
    }
  }
  useEffect(() => { 
    ;(async() => {
      await setup(canvasRef)
      window.addEventListener('devicemotion', handleAcceleration);
      window.addEventListener('orientationchange', handleOrientation);
      window.addEventListener('deviceorientation', handleOrientation);
      if (canvasRef?.current) {
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
        drawCenterCircle(ctx, centerX, centerY)

        divRef.current.style.background="transparent"
        canvasRef.current.onmousemove = (event) => {
          handleMovement(ctx, event.clientX -5, event.clientY -5 , centerX, centerY)
          //track mouse position and change for custom cursor                    
        };
      } 
    })()      
  }, [])
  
  function requestAccess() {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((permission: string) => {
        if (permission === "granted") {
          permissionGranted = true;
        }
      });
    if (permissionGranted) {
      permissionButton.remove();
    }
  }

  const handleOrientation = () => {
    let orientation = window.orientation;
    setState({...state, landscape: orientation === 90 || orientation === -90 });
  }
  
  const handleAcceleration = (event) => {
    let landscape = state?.landscape;
    let acceleration = event.accelerationIncludingGravity;
    let rotation = event.rotationRate || 0;
    let x = acceleration.x;
    let y = acceleration.y;
    let z = acceleration.z;
    setState({...state, 
      rotation: rotation,
      x: landscape ? y : x,
      y: landscape ? x : y,
      z: z,
      landscape: state?.landscape
    });
  }

  const [x, setX] = useState(null)
  const [coords, handleCoords] = useMousePosition();
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)
  useEffect(() => {
    console.log(state)
    if(canvasRef?.current && !!state && state.x) { 
      if(x == null)
        alert(state.x + "--" + state.y)
      setX(state.x)

      const ctx: any = canvasRef.current.getContext("2d");
      let centerX = ctx.canvas.width / 2 ;
      let centerY = ctx.canvas.height / 2;
     
      // cons
      if(x == null)
        alert(centerX + "--" + centerY)

      handleMovement(ctx, state.x, state.y , centerX, centerY)
    }
  }, [state])



  const handleMovement = (ctx, x, y, centerX, centerY) => {
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
        divRef.current.style.background = "transparent"
        clearTarget(ctx, centerX, centerY)       
        drawCenterCircle(ctx, centerX, centerY)               
        helpTextRef.current.style.display="block"
        setcurrentCount(currentCount+1)          
      }
  }

  const drawTarget = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#ADD8E6",
      startX: centerX + (ctx.canvas.width/10),
      startY: centerY
    });
  }

  const clearTarget = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startX: centerX + (ctx.canvas.width/10),
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

  const drawCenterCircle = (ctx, centerX, centerY) => {
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
        // style={{ border: "2px solid black" }}
        onMouseMove={(e) => {
          handleCoords((e as unknown) as MouseEvent);
        }}
        className={classes.canvas}
      />
      <div ref={divRef} className="cursor"></div>
      <span ref={helpTextRef} className={classes.helpText}>
        To find your cursor, try moving your mouse to the center of the screen
        </span>

        <span className={classes.countText}>
        {`${currentCount}/${props?.totalCount ?? 120}`}
        </span>
        
        {/* <Fab onClick={handleNextClick}>End Game</Fab> */} {/* Navigation */}
    </>
  )

  // Navigation
  //    ) : (
  //     <GameEnd />
  // );
};


