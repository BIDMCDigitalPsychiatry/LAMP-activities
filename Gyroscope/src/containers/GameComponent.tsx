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
  const cursorCanvas = useRef<HTMLCanvasElement | null>(null);

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
  const [level, setLevel] = useState(1);
  const [offset, setOffset] = useState(0);
  const [warning, setWarning] = useState(false);
  const [targetShow, setTargetShow] = useState(false);
  const [time, setTime] = useState(new Date().getTime());
  const [targetPosition, setTargetPosition] = useState([]);
  const getRandomQuadrant = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [doneCount, setDoneCount] = useState(0);
  const [random, setRandom] = useState(getRandomQuadrant(1, 4));

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
    const ctx = canvasRef.current.getContext("2d");
    if (doneCount >= (props.adventure == 3 ? 2 : 1)) {
      setDone(true);
      setTargetShow(false);
      divRef.current.style.background = "transparent";
      drawCenterCircle(ctx, centerX, centerY);
      if (helpTextRef.current) {
        helpTextRef.current.style.display = "block";
      }
    }
  }, [doneCount]);

  useEffect(() => {
    (async () => {
      if (canvasRef?.current) {
        await setup(canvasRef);
        window.addEventListener("devicemotion", handleAcceleration);
        window.addEventListener("orientationchange", handleOrientation);
        window.addEventListener("deviceorientation", handleOrientation);
        const ctx = canvasRef?.current?.getContext("2d");
        let centerX = 0;
        let centerY = 0;
        if (isMobile) {
          centerX = ctx?.canvas?.width / 2;
          centerY = ctx?.canvas?.height / 2 - 75;
        } else {
          centerX = ctx?.canvas?.width / 2;
          centerY = ctx?.canvas?.height / 2 - 100;
        }
        setCenterX(centerX);
        setCenterY(centerY);
        if (!started) {
          drawCenterCircle(ctx, centerX, centerY);
          divRef.current.style.background = "transparent";
        }
        setStarted(true);
        if (!!mobile) {
          canvasRef.current.ontouchend = (event) => {
            divRef.current.style.left = centerX + "px";
            divRef.current.style.top = centerY + "px";
            if (!targetShow) {
              setTargetPosition(getTargetPostion(centerX, centerY));
              helpTextRef.current.style.display = "none";
              divRef.current.style.background =
                "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))";
              drawTarget(ctx, centerX, centerY);
              clearCenter(ctx, centerX, centerY);
            }
          };
        } else {
          if (canvasRef.current) {
            canvasRef.current.onmousemove = (event) => {
              handleMovement(
                ctx,
                event.clientX,
                event.clientY,
                centerX,
                centerY
              );
              //track mouse position and change for custom cursor
            };
          }
        }
      }
    })();
  }, [offset, doneCount, done, targetPosition, random]);
  const getTargetPostion = (centerX, centerY) => {
    const ctx = canvasRef.current.getContext("2d");
    let startX = 0;
    let startY = 0;
    let position = [];

    if (level == 1) {
      if (props.adventure == 1) {
        startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
        startY = centerY;
        position.push({ startX: startX, startY: startY, done: false });
      }
    }
    if (level == 2) {
      if (props.adventure == 1) {
        startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
        startY = centerY - ctx.canvas.width / (isMobile ? 3 : 8);
        position.push({ startX: startX, startY: startY, done: false });
      }
    }

    if (props.adventure == 2) {
      const values = getAdv2or3Values(ctx, centerX, centerY, random);
      position.push({ startX: values.x, startY: values.y, done: false });
    }
    if (props.adventure == 3) {
      const values = getAdv2or3Values(ctx, centerX, centerY, random);
      position.push({ startX: values.x, startY: values.y, done: false });
      const values1 = getAdv2or3Values(
        ctx,
        centerX,
        centerY,
        random < 4 ? random + 1 : 1
      );
      position.push({ startX: values1.x, startY: values1.y, done: false });
    }
    return position;
  };

  const requestAccess = () => {
    (DeviceOrientationEvent as any)
      .requestPermission()
      .then((permission: string) => {
        if (permission === "granted") {
          window.addEventListener("devicemotion", handleAcceleration);
          window.addEventListener("orientationchange", handleOrientation);
          window.addEventListener("deviceorientation", handleOrientation);
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
      handleMovementMobile(
        ctx,
        ctx.canvas.width / (100 / toPercentage(stateValues.x, 1)),
        ctx.canvas.height / (100 / toPercentage(stateValues.y, 1)),
        centerX,
        centerY
      );
    }
  }, [stateValues, offset]);

  const handleMovementMobile = (ctx, x, y, centerX, centerY) => {
    let x1 = x;
    let y1 = y;
    if (offset > 0) {
      const xy = rotate(centerX, centerY, x, y, -offset);
      x1 = xy.x;
      y1 = xy.y;
    }
    divRef.current.style.left = x1 + "px";
    divRef.current.style.top = y1 + "px";
    manageTarget(ctx, x1, y1, centerX, centerY);
  };

  const manageTarget = (ctx, x, y, centerX, centerY) => {
    targetPosition &&
      targetPosition.forEach((pos) => {
        if (
          Math.abs(x - 5 - pos?.startX) < 20 &&
          Math.abs(y - 5 - pos?.startY) > 50 &&
          Math.abs(y - 5 - pos?.startY) < 60
        ) {
          if (!pos.done) {
            clearTarget(ctx, centerX, centerY, pos);
          }
        }
      });
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
    if (offset > 0) {
      const xy = rotate(centerX, centerY, x, y, -offset);
      x1 = xy.x;
      y1 = xy.y;
    }
    divRef.current.style.left = x1 + "px";
    divRef.current.style.top = y1 + "px";
    if (!targetShow) {
      if (Math.abs(x - centerX) < 20 && Math.abs(y - centerY) < 80) {
        setTargetPosition(getTargetPostion(centerX, centerY));
        helpTextRef.current.style.display = "none";
        divRef.current.style.background =
          "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))";
        drawTarget(ctx, centerX, centerY);
        clearCenter(ctx, centerX, centerY);
      }
    }
    manageTarget(ctx, x1, y1, centerX, centerY);
  };

  useEffect(() => {
    if (!!done && currentCount <= 100) {
      switch (currentCount) {
        case 80:
          if (props.adventure == 2) {
            setLevel(2);
            setOffset(15);
            setDone(false);
            setTargetPosition([]);
          }
          break;
        case 90:
          if (props.adventure == 1) {
            setLevel(2);
            setOffset(15);
            setDone(false);
          } else if (props.adventure == 2) {
            setLevel(3);
            setOffset(30);
            setDone(false);
          }
          setTargetPosition([]);
          break;
      }
      if (Math.floor(new Date().getTime() - time) > 300) {
        setWarning(true);
        setTimeout(() => {
          setWarning(false);
        }, 500);
      }
      if (currentCount + 1 >= 100) props.setView("end game");
      else setCurrentCount(currentCount + 1);
    }
  }, [done]);

  const getAdv2or3Values = (ctx, centerX, centerY, random) => {
    let startX = 0;
    let startY = 0;
    if (random == 1) {
      startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
      startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
    }
    if (random == 2) {
      startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
      startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
    }
    if (random == 3) {
      startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
      startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
    }
    if (random == 4) {
      startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
      startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
    }
    return { x: startX, y: startY };
  };

  // const getAdv4Values = (ctx) => {
  //   let startX = 0;
  //   let startY = 0;
  //   let random = getRandomQuadrant(1, 8);
  //   switch (random) {
  //     case 1:
  //       startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY;
  //       break;
  //     case 2:
  //       startX = centerX;
  //       startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //     case 3:
  //       startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY;
  //       break;
  //     case 4:
  //       startX = centerX;
  //       startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //     case 5:
  //       startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //     case 6:
  //       startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //     case 7:
  //       startX = centerX - ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY + ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //     case 8:
  //       startX = centerX + ctx.canvas.width / (isMobile ? 3 : 8);
  //       startY = centerY - ctx.canvas.height / (isMobile ? 3 : 8);
  //       break;
  //   }
  //   return { x: startX, y: startY };
  // };
  const drawTarget = async (ctx, centerX, centerY) => {
    if (!targetShow) {
      setTargetShow(true);
      setDone(false);
      targetPosition.map((pos) => {
        drawCircle(ctx, {
          radius: 12,
          lineWidth: 0,
          strokeStyle: "#FFFFFF",
          colorFill: "#ADD8E6",
          startX: pos.startX,
          startY: pos.startY,
        });
      });

      setTime(new Date().getTime());
    }
  };

  const clearTarget = (ctx, centerX, centerY, pos) => {
    drawCircle(ctx, {
      radius: 12,
      lineWidth: 0,
      strokeStyle: "#FFFFFF",
      colorFill: "#FFFFFF",
      startX: pos.startX,
      startY: pos.startY,
    });
    pos.done = true;
    setTimeout(() => setDoneCount(doneCount + 1), 100);
  };

  const clearCenter = (ctx, centerX, centerY) => {
    setDoneCount(0);
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
    setDoneCount(0);
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
      <canvas ref={cursorCanvas} />
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
        {level}-{`${currentCount}/${props?.totalCount ?? 100}`}
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
