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
      position: "absolute",
      top: "25%",
      left: "25%",
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
  const [stateValues, setStateValues] = useState(null);
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
  const getRandomQuadrant = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [random, setRandom] = useState(getRandomQuadrant(1, 4));

  const easyOffsetArray = [15, -15, 0];
  const mediumOffsetArray = [15, -15, 0, 30, -30];
  const hardOffsetArray = [15, -15, 0, 30, -30, 45, -45];
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
          handleMovement(ctx, event.clientX, event.clientY, centerX, centerY);
          //track mouse position and change for custom cursor
        };
      }
    })();
  }, [offset, random]);

  useEffect(() => {
    (async () => {
      if (canvasRef?.current && isMobile) {
        await setup(canvasRef);
        window.addEventListener("devicemotion", handleAcceleration);
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
          divRef.current.style.background =
            "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))";
          const targetPosition = getTargetPostion(centerX, centerY);
          drawTarget(ctx, centerX, centerY);
          clearCenter(ctx, centerX, centerY);
          setTrialStarted(true);
        };
        return () => {
          window.removeEventListener("devicemotion", handleAcceleration);
        };
      }
    })();
  }, [currentCount]);

  const getTargetPostion = (centerX, centerY) => {
    const ctx = canvasRef.current.getContext("2d");
    if (currentCount < 50) {
      let startX = centerX + ctx.canvas.width / (isMobile ? 4 : 8);
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
    let landscape = stateValues?.landscape;
    let rotation = event.rotationRate || 0;
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    x = oneDecimal(x);
    y = oneDecimal(y);
    z = oneDecimal(z);
    setStateValues({
      ...stateValues,
      rotation: rotation,
      x: x, // landscape ? y : x,
      y: y, //landscape ? x : y,
      z: z,
      landscape: stateValues?.landscape,
    });
  };

  const oneDecimal = (n) => {
    var number = n;
    var rounded = Math.round(number * 10) / 10;
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
        let x1 = ctx.canvas.width / (100 / toPercentage(stateValues.x, 1));
        let y1 = ctx.canvas.height / (100 / toPercentage(stateValues.y, 1));
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
  }, [stateValues]);

  const handleMovementMobile = (ctx, x, y, centerX, centerY) => {
    divRef.current.style.left = x + "px";
    divRef.current.style.top = y + "px";
    manageTarget(ctx, x, y, centerX, centerY);
  };

  const manageTarget = (ctx, x, y, centerX, centerY) => {
    let targetPosition = getTargetPostion(centerX, centerY);
    if (
      Math.abs(x - 5 - targetPosition?.startX) < 20 &&
      Math.abs(y - 5 - targetPosition?.startY) > 50 &&
      Math.abs(y - 5 - targetPosition?.startY) < 60
    ) {
      if (!done) {
        divRef.current.style.background = "transparent";
        clearTarget(ctx, centerX, centerY);
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
      divRef.current.style.background =
        "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))";
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
  };

  useEffect(() => {
    if (!!done && currentCount <= 100) {
      if (currentCount >= 50 && offsetLevelArray.length > 0) {
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
      }

      if (Math.floor(new Date().getTime() - time) > 300) {
        setWarning(true);
        setTimeout(() => {
          setWarning(false);
        }, 500);
      }
      setTimeout(() => {
        const route = {
          duration: Math.floor(new Date().getTime() - time) / 1000,
          item: currentCount,
          level: offset,
          type: null,
          value: null,
        };
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
      startY = centerY - ctx.canvas.height / (isMobile ? 5 : 8);
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
      drawCircle(ctx, {
        radius: 12,
        lineWidth: 0,
        strokeStyle: "#FFFFFF",
        colorFill: "#ADD8E6",
        startX: targetPosition.startX,
        startY: targetPosition.startY,
      });
      setTime(new Date().getTime());
    }
  };

  const clearTarget = (ctx, centerX, centerY) => {
    const targetPosition = getTargetPostion(centerX, centerY);
    drawCircle(ctx, {
      radius: 12,
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
        {!!warning && "Move Faster"}
      </span>
      <span className={classes.countText}>
        {`${currentCount}/${props?.totalCount ?? 100}`}
      </span>
      <span style={{ position: "absolute", zIndex: 99999 }}>
        Offset{" "}
        <select
          value={offset.toString()}
          onChange={(e) => {
            setOffset(parseInt(e.target.value));
            setDone(false);
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
      </span>
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
