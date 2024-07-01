import React, { useEffect, useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { drawCircle } from "../components/Circle";
let isPhone = false;
let permissionButton: any;
let permissionGranted = false;
export function GameComponent({...props}){ 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState(null)

  const setup = (p: any) => {
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
      setup(canvasRef)
      window.addEventListener('devicemotion', handleAcceleration);
      window.addEventListener('orientationchange', handleOrientation);
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
    var orientation = window.orientation;
    setState({...state, landscape: orientation === 90 || orientation === -90 });
  }
  const handleAcceleration = (event) => {
    var landscape = state?.landscape;
    var acceleration = event.accelerationIncludingGravity;
    var rotation = event.rotationRate || 0;
    var x = acceleration.x;
    var y = acceleration.y;
    var z = acceleration.z;
    setState({...state, 
      rotation: rotation,
      x: landscape ? y : x,
      y: landscape ? x : y,
      z: z,
      landscape: state?.landscape
    });
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  const [coords, handleCoords] = useMousePosition();

  useEffect(() => {
    if (canvasRef?.current) {
        const ctx = canvasRef.current.getContext("2d");
        var centerX = ctx.canvas.width / 2 - 110;
        var centerY = ctx.canvas.height / 2 - 100;
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
        
        divRef.current.style.background="transparent"
        canvasRef.current.onmousemove = (event) => {
          //track mouse position and change for custom cursor
          divRef.current.style.left = event.clientX-5 + 'px'
          divRef.current.style.top = event.clientY-5 + 'px'

          if(Math.abs(event.clientX- centerX - 100) < 10 &&
            Math.abs(event.clientY- centerY - 60) < 10) {
              divRef.current.style.background = "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
          } 
          if(Math.abs(event.clientX - 5 - 350) < 10 &&
            Math.abs(event.clientY - 5- 310) < 10) {
              divRef.current.style.background = "transparent"


              drawCircle(ctx, {
                radius: 16,
                lineWidth:2,
                strokeStyle: "#FFFFFF",
                colorFill: "#FFFFFF",
                startY: centerY,
                startX: centerX
              });
              drawCircle(ctx, {
                radius: 12,
                lineWidth: 5,
                strokeStyle: "#FFFFFF",
                colorFill: "#FFFFFF",
                startY: centerY,
                startX: centerX
              });

          }           
      };
    }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        // style={{ border: "2px solid black" }}
        onMouseMove={(e) => {
          handleCoords((e as unknown) as MouseEvent);
        }}
      />
      <div ref={divRef} className="cursor"></div>
    </>
  );
};


