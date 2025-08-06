export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  circleDims: {
    radius: number;
    lineWidth: number;
    strokeStyle: string;
    colorFill?: string;
    startX: number;
    startY: number;
  },
  // rectDims: { w: number; h: number } = { w: startX *2, h: startY*2 }
) => {
 const {
    radius,
    strokeStyle,
    startX,
    startY,
    lineWidth,
    colorFill
  } = circleDims;
  // ctx?.clearRect(0, 0, rectDims.w, rectDims.h);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx?.beginPath();
  ctx?.arc(startX, startY, radius, 0, Math.PI * 2, true);
  ctx?.stroke();
 if (colorFill) {
    ctx.fillStyle = colorFill;
    ctx.fill();
  }
};