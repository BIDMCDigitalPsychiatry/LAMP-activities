import React, { useEffect, useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { drawCircle } from "../components/Circle";
import {
  makeStyles,
  Theme,
  createStyles,
  Fab,
  Typography,
  Box,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";
import GameEnd from "./GameEnd";
import hoop from "../components/Images/bb-hoop.svg";
import basketBall from "../components/Images/basketball.svg";
import { Landscape } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpText: {
      color: "#7599FF",
      bottom: 40,
      position: "absolute",
      textAlign: "center",
      width: "100%",
      left: 0,
      fontSize: 18,
      [theme.breakpoints.down("xs")]: {
        bottom: 90,
      },
    },

    warningText: {
      color: "red",
      bottom: "70%",
      right: "25%",
      position: "absolute",
      textAlign: "center",
      fontSize: 18,
      [theme.breakpoints.down("xs")]: {
        bottom: "70%",
      },
    },
    canvas: {
      position: "fixed",
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
      position: "relative",
      // top: "25%",
      // left: "25%",
      borderRadius: "50%",
    },
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
  })
);

//Up to 30 - same direction
export function GameComponent({ ...props }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const divRef = useRef<HTMLDivElement | null>(null);
  const helpTextRef = useRef<HTMLElement | null>(null);
  const warningRef = useRef<HTMLElement | null>(null);
  const [stateValues, setStateValues] = useState({x:0, y:0, z:0, landscape:null, rotation:0});
  const [currentCount, setCurrentCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [iPhone, setiPhone] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const classes = useStyles();
  const [mobile, setMobile] = useState(false);
  const [done, setDone] = useState(false);
  const [offset, setOffset] = useState(0);
  const [warning, setWarning] = useState(false);
  const [targetShow, setTargetShow] = useState(false);
  const [time, setTime] = useState(new Date().getTime());
  const [offsetArray, setOffsetArray] = useState([]);
  const [routes, setRoutes] = useState<any>([]);
  const [trialStarted, setTrialStarted] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [result, setResult] = useState(false);
  const [speed, setSpeed] = useState<any>("1"); // Control the base speed
  const [angle, setAngle] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const THRESHOLD = 0.05;  // Minimum value to register movement
  const getRandomQuadrant = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [random, setRandom] = useState(getRandomQuadrant(1, 4));

  const easyOffsetArray = [15, -15, 0];
  const mediumOffsetArray = [15, -15, 0, 30, -30];
  const hardOffsetArray = [15, -15, 0, 30, -30, 45, -45];
  const min = 1;
  const max = 5;
  const TIME_THRESHOLD = 75;

  // Velocity variables
  const [velocity, setVelocity] = useState({x:0,y:0})
  const friction = 0.98;  // To simulate slowing down, use a friction factor


  let offArray = [];
  if (props.adventure === "Hard") {
    offArray = hardOffsetArray;
  } else if (props.adventure === "Medium") {
    offArray = mediumOffsetArray;
  } else {
    offArray = easyOffsetArray;
  }
  const [offsetLevelArray, setOffsetLevelArray] = useState(offArray);

  const setup = async (p: any) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      )
    ) {
      setMobile(true);
    }
    if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      setiPhone(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (canvasRef?.current && !isMobile) {
        await setup(canvasRef);
        const ctx = canvasRef.current.getContext("2d");
        let centerX = ctx.canvas.width / 2;
        let centerY = ctx.canvas.height / 2 - 100;
        setCenterX(centerX);
        setCenterY(centerY);
        if (!started) drawCenterCircle(ctx, centerX, centerY);
        setStarted(true);
        divRef.current.style.background = "transparent";
        canvasRef.current.onmousemove = (event) => {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          handleMovement(ctx, x, y, centerX, centerY);
          //track mouse position and change for custom cursor
        };
      }
    })();
  }, [offset, random, targetShow, currentCount]);

  useEffect(() => {
    (async () => {
      if (canvasRef?.current && isMobile) {
        await setup(canvasRef);
        const ctx = canvasRef.current.getContext("2d");
        let centerX = ctx.canvas.width / 2;
        let centerY = ctx.canvas.height / 2 - 75;
        setCenterX(centerX);
        setCenterY(centerY);
        if (!started) drawCenterCircle(ctx, centerX, centerY);
        setStarted(true);
        divRef.current.style.background = "transparent";
        canvasRef.current.ontouchend = (event) => {
          helpTextRef.current.style.display = "none";
          divRef.current.style.background = "url(" + basketBall + ") no-repeat";
          divRef.current.style.left = centerX + "px";
          divRef.current.style.top = centerY + "px";
          drawTarget(ctx, centerX, centerY);
          clearCenter(ctx, centerX, centerY);
          setTimeout(() => {
            setTrialStarted(true);
          }, 300);
        };
      }
    })();
  }, [currentCount]);

  useEffect(() => {
    if (isMobile) {
      window.addEventListener("devicemotion", handleAcceleration);
      return () => {
        window.removeEventListener("devicemotion", handleAcceleration);
      };
    }
  }, [speed, lastUpdate]);

  const getTargetPostion = (centerX, centerY) => {
    const ctx = canvasRef.current.getContext("2d");
    if (currentCount < 50) {
      let startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
      let startY = centerY;
      return { startX: startX, startY: startY, done: false };
    } else {
      const values = getAdv2or3Values(ctx, centerX, centerY, 1);
      return { startX: values.x, startY: values.y, done: false };
    }
  };

  const requestAccess = () => {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((permission: string) => {
        if (permission === "granted") {
          window.addEventListener("devicemotion", handleAcceleration);
          setPermissionGranted(true);
        }
      });
  };

  const handleOrientation = (e) => {
    let orientation = window.orientation;
    setStateValues({
      ...stateValues,
      landscape: orientation === 90 || orientation === -90,
    });
  };

  const handleAcceleration = (event) => {    
    const currentTime = Date.now();
    const ctx: any = canvasRef.current.getContext("2d");
    const yOffset = ctx.canvas.height * (0.25/100);
    if (currentTime - lastUpdate > TIME_THRESHOLD) {
      let landscape = stateValues?.landscape;
      let rotation = event.rotationRate || 0;
      let { x, y, z } = event.accelerationIncludingGravity;
      let deltaTime = (currentTime - lastUpdate) / 1000;

      let velX = (velocity.x + (x * deltaTime)) * friction
      let velY = (velocity.y + (y * deltaTime)) * friction
      setVelocity({x: velX, y: velY})
      setStateValues((preStateValues)=>{
       return { rotation: rotation,
        x: preStateValues.x + (velX * deltaTime * 100), // landscape ? y : x,
        y: preStateValues.y + (velY * deltaTime * 100), //landscape ? x : y,
        z: 0,
        landscape: stateValues?.landscape
      }});


      // Ignore small movements (deadzone)
      // x = Math.abs(x) > THRESHOLD ? x : 0;
      // y = Math.abs(y) > THRESHOLD ? y : 0;
      // z = Math.abs(z) > THRESHOLD ? z : 0;
      // Apply speed multiplier
      // const newX = oneDecimal(x * speed);
      // const newY = oneDecimal(y * speed); // Inverted for canvas Y-axis
      // const newZ = oneDecimal(z * speed);
      // const newX = x * parseInt(speed);
      // const newY = y * parseInt(speed); // Invert Y-axis for canvas
      // const newZ = z * parseInt(speed);
      // x = oneDecimal(newX);
      // y = oneDecimal(newY);
      // z = oneDecimal(newZ);
      // setStateValues({
      //   ...stateValues,
      //   rotation: rotation,
      //   x: newX, // landscape ? y : x,
      //   y: newY - yOffset, //landscape ? x : y,
      //   z: newZ,
      //   landscape: stateValues?.landscape,
      // });
      setLastUpdate(currentTime);
    }
  };

  const oneDecimal = (n) => {
    var number = n;
    var rounded = Math.round(number * 10) / 10;
    return rounded;
  };

  const twoDecimal = (n) => {
    var number = n;
    var rounded = Math.round(number * 100) / 100;
    return rounded;
  };

  const toPercentage = (x, n) => {
    var p = 0;
    if (n) {
      p = ((x + 10) / 20) * 100;
    } else {
      p = (x + 10) / 20;
    }
    return oneDecimal(p);
  };

  const [coords, handleCoords] = useMousePosition();

  useEffect(() => {
    if (canvasRef?.current && !!stateValues && stateValues.x) {
      const ctx: any = canvasRef.current.getContext("2d");
      let centerX = ctx.canvas.width / 2;
      let centerY = ctx.canvas.height / 2 - 75;
      if (trialStarted) {
        // let x1 = ctx.canvas.width / (100 / toPercentage(stateValues.x, 1));
        // let y1 = ctx.canvas.height / (100 / toPercentage(stateValues.y, 1));
        // let x1 = ctx.canvas.width / 2 + stateValues.x * 10; // Adjust position with acceleration
        // let y1 = ctx.canvas.height / 2 + stateValues.y * 10; // Adjust position with acceleration
        let x1 = stateValues.x;
        let y1 = stateValues.y;
        if (Math.abs(offset) > 0) {
          const xy = rotate(centerX, centerY, x1, y1, -offset);
          const offsetX = xy.x;
          const offsetY = xy.y;
          handleMovementMobile(ctx, offsetX, offsetY, centerX, centerY);
        } else {
          handleMovementMobile(ctx, x1, y1, centerX, centerY);
        }
      }
    }
  }, [stateValues.x, stateValues.y]);

  const handleMovementMobile = (ctx, x, y, centerX, centerY) => {
    divRef.current.style.left = x + "px";
    divRef.current.style.top = y + "px";
    // manageTarget(ctx, x, y, centerX, centerY);
  };
  const getDistanceBetweenPoints = (x1, y1, x2, y2) => {
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return dist;
  };

  const checkPointOutsideCircle = (x, y, centerX, centerY, radius) => {
    const distance = getDistanceBetweenPoints(x, y, centerX, centerY);
    if (distance <= radius) {
      return false;
    } else {
      return true;
    }
  };

  const getAngle = (x, y, targetPosition, centerX, centerY) => {
    const vector1 = { x: x - centerX, y: y - centerY };
    const vector2 = {
      x: targetPosition.startX - centerX,
      y: targetPosition.startY - centerY,
    };
    const angle1 = Math.atan2(vector1.y, vector1.x);
    const angle2 = Math.atan2(vector2.y, vector2.x);
    let angleDifference = angle2 - angle1;
    if (angleDifference > Math.PI) {
      angleDifference -= 2 * Math.PI;
    } else if (angleDifference < -Math.PI) {
      angleDifference += 2 * Math.PI;
    }
    return twoDecimal(angleDifference); // in radians
  };

  const manageTarget = (ctx, x, y, centerX, centerY) => {
    let targetPosition = getTargetPostion(centerX, centerY);
    const radius = getDistanceBetweenPoints(
      targetPosition?.startX,
      targetPosition?.startY,
      centerX,
      centerY
    );
    const status = checkPointOutsideCircle(x, y, centerX, centerY, radius);
    if (status && targetShow) {
      if (!done) {
        if (
          Math.abs(x - 5 - targetPosition?.startX) < 20 &&
          Math.abs(y - 5 - targetPosition?.startY) > 10 &&
          Math.abs(y - 5 - targetPosition?.startY) < 25
        ) {
          setResult(true);
          setAngle(0);
        } else {
          setResult(false);
          setAngle(getAngle(x, y, targetPosition, centerX, centerY));
        }
        clearTarget(ctx, centerX, centerY);
        divRef.current.style.background = "transparent";
        drawCenterCircle(ctx, centerX, centerY);
        setTrialStarted(false);
        if (helpTextRef.current) helpTextRef.current.style.display = "block";
      }
    }
  };

  const rotate = (cx, cy, x, y, angle) => {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) + sin * (y - cy) + cx,
      ny = cos * (y - cy) - sin * (x - cx) + cy;
    return { x: Math.round(nx), y: Math.round(ny) };
  };
  const handleMovement = (ctx, x, y, centerX, centerY) => {
    let x1 = x;
    let y1 = y;
    if (Math.abs(offset) > 0) {
      const xy = rotate(centerX, centerY, x, y, -offset);
      x1 = xy.x;
      y1 = xy.y;
    }
    divRef.current.style.left = x1 + "px";
    divRef.current.style.top = y1 + "px";
    if (Math.abs(x - centerX) < 20 && Math.abs(y - centerY) < 80) {
      helpTextRef.current.style.display = "none";
      divRef.current.style.background = "url(" + basketBall + ") no-repeat";
      drawTarget(ctx, centerX, centerY);
      clearCenter(ctx, centerX, centerY);
    }
    manageTarget(ctx, x1, y1, centerX, centerY);
  };

  const getRandomOffset = () => {
    if (offsetLevelArray.length > 0) {
      const random = Math.floor(Math.random() * offsetLevelArray.length);
      if (
        offsetArray.filter((off) => off === offsetLevelArray[random]).length < 5
      ) {
        return offsetLevelArray[random];
      } else {
        setOffsetLevelArray(
          offsetLevelArray.filter((off) => off != offsetLevelArray[random])
        );
        return 0;
      }
    } else {
      return 0;
    }
  };

  useEffect(()=>{
    if(props.clickBack===true){
      clickBack()
    }

  },[props.clickBack])

  const clickBack= () => { 
    const route = {'type': 'manual_exit', 'value': true} 
    routes.push(route)
    console.log("routes", routes)
    parent.postMessage(JSON.stringify({
      timestamp: new Date().getTime(),
      duration: new Date().getTime() - time,
      temporal_slices: JSON.parse(JSON.stringify(routes)),
      static_data: {},
    }), "*")        
  }

  const sentResult = () => {
    parent.postMessage(
      routes.length > 0
        ? JSON.stringify({
            timestamp: new Date().getTime(),
            duration: new Date().getTime() - time,
            temporal_slices: JSON.parse(JSON.stringify(routes)),
            static_data: {},
          })
        : null,
      "*"
    );
    props.setView("end");
  };

  useEffect(() => {
    if (!!done && currentCount <= 100) {
      if (currentCount > 50 && offsetLevelArray.length > 0) {
        setDone(false);
        const tempRandom = getRandomQuadrant(1, 4);
        setRandom(
          tempRandom != random ? tempRandom : random + 1 > 4 ? 1 : random + 1
        );
        const randomOffset = getRandomOffset();
        setOffset(randomOffset);
        setOffsetArray([...offsetArray, randomOffset]);
      } else {
        setOffset(0);
        if (!isMobile) {
          setDone(false);
        }
      }

      if (Math.floor(new Date().getTime() - time) > 600) {
        setWarning(true);
        setWarningMessage("Move faster");
        setTimeout(() => {
          setWarning(false);
        }, 500);
      }
      if (Math.floor(new Date().getTime() - time) < 300) {
        setWarning(true);
        setWarningMessage("Move Slower");
        setTimeout(() => {
          setWarning(false);
        }, 500);
      }
      setTimeout(() => {
        const route = {
          duration: Math.floor(new Date().getTime() - time) / 1000,
          item: currentCount,
          level: result,
          type: angle,
          value: null,
        };
        console.log("route", route);
        setRoutes([...routes, route]);
        if (currentCount + 1 >= 100) {
          sentResult();
        } else setCurrentCount(currentCount + 1);
      }, 100);
    }
  }, [done]);

  const getAdv2or3Values = (ctx, centerX, centerY, random) => {
    let startX = 0;
    let startY = 0;
    if (random == 1) {
      startX = centerX + ctx.canvas.width / (isMobile ? 4 : 8);
      startY = centerY - ctx.canvas.height / (isMobile ? 7 : 8);
    }
    // if (random == 2) {
    //   startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
    //   startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
    // }
    // if (random == 3) {
    //   startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
    //   startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
    // }
    // if (random == 4) {
    //   startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
    //   startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
    // }
    return { x: startX, y: startY };
  };

  const drawTarget = async (ctx, centerX, centerY) => {
    if (!targetShow) {
      setTargetShow(true);
      setDone(false);
      const targetPosition = getTargetPostion(centerX, centerY);
      // drawCircle(ctx, {
      //   radius: getDistanceBetweenPoints(centerX,centerY,targetPosition.startX,targetPosition.startY),
      //   lineWidth: 0,
      //   strokeStyle: "#FFFFFF",
      //   colorFill: "#ADD8E6",
      //   startX: centerX,
      //   startY: centerY,
      // });
      const image = new Image();
      image.src = hoop;
      image.onload = () => {
        ctx.drawImage(
          image,
          targetPosition.startX - 10,
          targetPosition.startY - 10
        );
      };
      setTime(new Date().getTime());
    }
  };

  const clearTarget = (ctx, centerX, centerY) => {
    const targetPosition = getTargetPostion(centerX, centerY);
    drawCircle(ctx, {
      radius: 24,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startX: targetPosition.startX,
      startY: targetPosition.startY,
    });
    setDone(true);
    setTargetShow(false);
  };

  const clearCenter = (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 16,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startY: centerY,
      startX: centerX,
    });
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startY: centerY,
      startX: centerX,
    });
  };

  const drawCenterCircle = async (ctx, centerX, centerY) => {
    drawCircle(ctx, {
      radius: 16,
      lineWidth: 2,
      strokeStyle: "#FF0000",
      colorFill: "#FF0000",
      startY: centerY,
      startX: centerX,
    });
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 5,
      strokeStyle: "#FFFF00",
      colorFill: "#FF0000",
      startY: centerY,
      startX: centerX,
    });
  };

  const handleChange = (event) => {
    const result = event.target.value;
    if (parseInt(result) >= min && parseInt(result) <= max) {
      setSpeed(result);
    } else {
      setSpeed("");
    }
  };

  return (
    <>
      <canvas
        onLoad={setup}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={(e) => {
          handleCoords(e as unknown as MouseEvent);
        }}
        className={classes.canvas}
      />
      <div ref={divRef} className={classes.cursor}></div>
      <span ref={helpTextRef} className={classes.helpText}>
        {mobile
          ? "To find your ball, touch on the center circle"
          : "To find your cursor, try moving your mouse to the center of the screen"}
      </span>
      <span ref={warningRef} className={classes.warningText}>
        {!!warning && warningMessage}
      </span>
      <span className={classes.countText}>
        {`${currentCount}/${props?.totalCount ?? 100}`}
      </span>
      {/* <span style={{ position: "absolute", zIndex: 99999 }}>
        Offset{" "}
        <select
          value={offset.toString()}
          onChange={(e) => {
            setOffset(parseInt(e.target.value));
          }}
        >
          <option value="45">45</option>
          <option value="30">30</option>
          <option value="15">15</option>
          <option value="0">0</option>
          <option value="-45">-45</option>
          <option value="-30">-30</option>
          <option value="-15">-15</option>
        </select>
      </span> */}
      {isMobile && (
        <span style={{ position: "absolute", zIndex: 99999 }}>
          Speed Factor:
          <input
            type="text"
            value={speed}
            onChange={(e) => handleChange(e)}
            placeholder="Enter value between 1-5"
          />
        </span>
      )}
      {iPhone && !permissionGranted && (
        <Box textAlign="center" pb={2} mt={2}>
          <Fab className={classes.btnblue} onClick={requestAccess}>
            <Typography variant="h6">Grant accelerometer Permission</Typography>
          </Fab>
        </Box>
      )}
      {/* <Fab onClick={handleNextClick}>End Game</Fab> */} {/* Navigation */}
    </>
  );

  // Navigation
  //    ) : (
  //     <GameEnd />
  // );
}
