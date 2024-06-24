import React, { useEffect, useRef } from "react";
import "./layout.css";
import { Circle } from "../components/Circle";
import p5 from "p5";

let cx: number;
let cy: number;
const radius1 = 170;
let cells: Array<any> = [];
let ball: Ball;
let ball2: Ball;
const ballspeed = 0.7;
const ballspeed2 = 0.7;
const ballradius = 17;
let gap = 8;
let x: number;
let y: number;
let x2: number;
let y2: number;
let won = false;
let isPhone = false;
let permissionButton: any;
let permissionGranted = false;
let duration =  new Date().getTime()
let mv = false
let dir = ""
let collided = false
let collided2 = false
class Ball {
  pos: any;
  vel: any;
  radius: number;
  level: number;
  constructor(pos: any, vel: any, radius: number, level: number) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.level = level;
  }

  ballAngle(p: any, circle: any) {
    p.angleMode("degrees");
    const v1 = p.createVector(circle.radius, 0, 0);
    const v2 = p.createVector(
      this.pos.x - circle.pos.x,
      this.pos.y - circle.pos.y,
      0
    );

    let angle = v1.angleBetween(v2);
    if (angle < 0) {
      angle = angle + 360;
    }
    return angle;
  }

  getLevel(circles: number) {
    for (let i = 0; i < circles; i++) {
      const c = cells[i];

      const centerDist = p5.Vector.sub(c.pos, this.pos);
      if (centerDist.mag() <= c.radius + 2) {
        return c.level;
      }
    }
    return circles;
  }

  checkLevelPass(p: any, circle: any) {
    let pass = false;
    const ballangle = this.ballAngle(p, circle);
    p.angleMode("radians");

    for (const element of circle.angles) {
      const gapangle = element;
      if (ballangle > gapangle - 5 && ballangle < gapangle + circle.gap + 5) {
        pass = true;
        return pass;
      }
    }
    return pass;
  }

  isColliding(p: any, circles: number, circle: any) {
    if (won || this.level >= circles) {
      return;
    }
    const centerDist = p5.Vector.sub(circle.pos, this.pos); 
    const dist2 = circle.radius - (this.radius / 2 + centerDist.mag());

    const pass = this.checkLevelPass(p, circle);
    if (dist2 <= 0 && pass) {
      return false;
    }
    return dist2 <= 0;
  }

  collide(p: any, circles: number, circle: any) {
    if (this.isColliding(p, circles, circle)) {
      this.vel.mult(-1);  
      collided = true     
    } else {
      collided = false  
      if (x < this.pos.x) {
        this.vel.x = -1 * ballspeed;
      } else {
        this.vel.x = ballspeed;
      }
      if (y < this.pos.y) {
        this.vel.y = -1 * ballspeed;
      } else {
        this.vel.y = ballspeed;
      }
    }
  }

  collide2(p: any, circles: number, circle: any) {
    if (this.isColliding(p, circles, circle)) {
      this.vel.mult(-1);   
      collided2 = true
    } else {
      collided2 = false  
      if (x2 < this.pos.x) {
        this.vel.x = -1 * ballspeed;
      } else {
        this.vel.x = ballspeed;
      }
      if (y2 < this.pos.y) {
        this.vel.y = -1 * ballspeed;
      } else {
        this.vel.y = ballspeed;
      }
    }
  }

  move(circles: number) {

    if (won) {
      return;
    }
    
    if(mv) {this.pos.add(this.vel);}    
    this.level = this.getLevel(circles);     
  }

  render(p: any) {
    p.fill(61, 61, 255); 
    p.ellipse(this.pos.x, this.pos.y, this.radius);
  }
}

function setCells(p: any, circles: number) {
  for (let i = circles-1; i >= 0; i--) {
    const angles = [];   

    for (let j = 0; j <= i + 1; j++) {
      const a = p.random(0, 350);
      angles.push(a);
    }
    const r = (radius1/circles) * (i+1);
    const pos = p.createVector(cx, cy);
    const c = new Circle(pos, i, angles, r, gap);
    cells.push(c);
    gap = gap + 3
  }
  cells.reverse()
}

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

function init(p: any, props: any) {
  const { gameLevel, circles } = props;   
  if (gameLevel <= 6) {
    x = cx;
    y = cy;
    
    setCells(p, circles);
    p.frameRate(40);
    p.noStroke();
    p.background(255);
    const pos = p.createVector(x, y);
    const vel = p.createVector(ballspeed, ballspeed);
    ball = new Ball(pos, vel, ballradius, 0);
    ball.render(p);
  } else {
    x = cx - 10;
    y = cy;
    
    x2 = cx + 10;
    y2 = cy;
    
    setCells(p, circles);
    p.frameRate(40);
    p.noStroke();
    p.background(255);
    const pos = p.createVector(x, y);
    const pos2 = p.createVector(x2, y2);
    const vel = p.createVector(ballspeed, ballspeed);
    const vel2 = p.createVector(ballspeed2, ballspeed2);
    ball = new Ball(pos, vel, ballradius, 0);
    ball2 = new Ball(pos2, vel2, ballradius, 0);
    ball.render(p);
    ball2.render(p);
  }
}

function setup(p: any, props: any) {
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
    p.createCanvas(400, 600);    
    cx = p.width / 2;
    cy = p.height / 2;
    init(p, props);
  };
}

function drawCircles(p: any) {
  const col = p.color(0, 0, 0);

  p.strokeWeight(2);
  p.stroke(col);
  p.noFill();
  for (const element of cells) {
    const c = element;
    p.arc(
      c.pos.x,
      c.pos.y,
      c.radius * 2,
      c.radius * 2,
      p.radians(0),
      p.radians(360)
    );
  }
}
function drawcells(p: any) {
  const w = "white";

  p.strokeWeight(4);
  p.stroke(w);

  for (const element of cells) {
    const cell = element;
    for (const elem of cell.angles) {
      const start = elem;
      const end = start + cell.gap;      
      p.arc(
        cell.pos.x,
        cell.pos.y,
        cell.radius * 2,
        cell.radius * 2,
        p.radians(start),
        p.radians(end),
        p.OPEN
      );
      p.noFill();
    }
  }
}

function getAccelerometerData(p: any, props: any) {
  mv = true
  y = p.round(cy - 10 + p.rotationX * 10);
  x = p.round(cx - 10 + p.rotationY * 10);
  if (props.gameLevel > 6) {
      y2 = p.round(cy + 10 + p.rotationX * 10);
      x2 = p.round(cx + 10 + p.rotationY * 10);
  }
}

function draw(p: any, props: any) {
  const { gameLevel, circles, setLevelCompleted } = props;
  return () => {
    if (permissionGranted) {
      getAccelerometerData(p, props);
    }
    drawCircles(p);
    drawcells(p);    
    const cell = cells[ball.level];
    ball.collide(p, circles, cell);
    ball.render(p);
    ball.move(circles);


    if (gameLevel > 6) {
      const cell2 = cells[ball2.level];
      ball2.collide2(p, circles, cell2);
      ball2.move(circles);
      ball2.render(p);
    }

    if (gameLevel > 6) {
      if (ball.level >= circles && ball2.level >= circles) {
        won = true;
        props.setTimeTaken(new Date().getTime() - duration)
        setLevelCompleted(true);
      }
    } else {
      if (ball.level >= circles) {
        won = true;
        props.setTimeTaken(new Date().getTime() - duration)

        setLevelCompleted(true);
      }
    }
  };
}



export const MazeComponent = (props: any) => {   

  const containerRef = useRef<HTMLDivElement>(null);

  const sketch = (p: any) => {  
    p.setup = setup(p, props);
    p.draw = draw(p, props);    
  };
  useEffect(()=>{
    if(props.startGame){
      mv = true
    }
  },[props.startGame])

  useEffect(() => {
    
    const objDown = {}
    const keyDown = (e : any) =>{
      if(props.gameLevel > 1){
        mv = true
      }
      if (objDown[e.key]) {
        return
      } 
      
      objDown[e.key] = true;
      if( e.key === "ArrowLeft" && objDown[e.key]){
        dir = "left"
        if(props.gameLevel <= 6){
          if(!(collided && dir === "left")){
          
              x = x - 5;        
          }    
        }
        else{
          if(!(collided && dir === "left")){
            x = x - 5;        
          } 
          if(!(collided2 && dir === "left")){
            x2 = x2 - 5;        
          } 
          
        }
      }
      if(e.key === "ArrowRight" && objDown[e.key]){
        dir = "right"
        if(props.gameLevel <= 6){
          if(!(collided && dir === "right")){
            x = x + 5;       
          }           
        }        
        else{
          if(!(collided && dir === "right")){
            x = x + 5;       
          }
          if(!(collided2 && dir === "right")){
            x2 = x2 +5;      
          }          
        }
      }
      if(e.key === "ArrowUp" && objDown[e.key]){
        dir = "up"
        if(props.gameLevel <= 6){
          if(!(collided && dir === "up")){
            y = y - 5;        
          }           
        }      
        else{
          if(!(collided && dir === "up")){
            y = y - 5;        
          }
          if(!(collided2 && dir === "up")){
            y2 = y2 - 5;        
          }          
        }
      }
      if(e.key === "ArrowDown" && objDown[e.key]){
        dir = "down"
        if(props.gameLevel <= 6){
          if(!(collided && dir === "down")){
            y = y + 5 ;           
          }         
        }  
        else{
          if(!(collided && dir === "down")){
            y = y + 5 ;           
          }
          if(!(collided2 && dir === "down")){
            y2 = y2 + 5;         
          }           
        }
      } 
    
    }

    const keyUp = (ev: any) => {
      delete objDown[ev.key];
    }
    document.addEventListener("keydown",keyDown)
    document.addEventListener("keyup", keyUp)
    return () => {
      document.removeEventListener("keydown",keyDown)
      document.removeEventListener("keyup", keyUp)
    }
  }, [props.gameLevel])

  useEffect(
    () => {
      let newSketch: p5;
      if (containerRef.current !== null) {
        newSketch = new p5(sketch, containerRef.current);
        
      }

      return () => {
        newSketch.remove();
        won = false;
        mv = false
        dir = ""
        collided = false
        collided2 = false
        duration = new Date().getTime()
        cells = [];
        gap = 8;
      };
    },
    [props.gameLevel, props.circles]
  );

  return (
       <div ref={containerRef} />

  );
};


