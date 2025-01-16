// src/utils/letterUtils.js

export const createLetterImage = (letter: string, size = 300) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = size;
  canvas.height = size;

  // Draw letter on canvas
  if (context) {
    context.fillStyle = "white";
    context.fillRect(0, 0, size, size);
    context.font = `${size}px Arial`;
    context.fillStyle = "black";
    let sizeOfLetter = context.measureText(letter)
    context.fillText(letter, size / 2 - (sizeOfLetter.width)/2, size / 2 + 115);
  }

  return canvas.toDataURL(); // Return base64 image
};

export const fragmentImage = (
  context: CanvasRenderingContext2D | null,
  imageData: string,
  fragmentation: number,
  canvasHeight = 300,
  canvasWidth = 300
) => {
  const img = new Image();

  img.src = imageData;
  img.onload = () => {
    if (context) {
      context.drawImage(img, 0, 0);
      const pixels = context.getImageData(0, 0, img.width, img.height);
      const data = pixels.data;
      const numberOfSections = fragmentation * 8;
      // Loop to randomly color specified areas
      for (let i = 0; i < numberOfSections; i++) {
        const x = Math.floor(Math.random() * canvasWidth);
        const y = Math.floor(Math.random() * canvasHeight);
        const width = 10;
        const height = 10;

        // Make sure we don't go out of bounds
        const startX = Math.max(0, x);
        const startY = Math.max(0, y);
        const endX = Math.min(canvasWidth, startX + width);
        const endY = Math.min(canvasHeight, startY + height);

        // Loop through the selected area and set pixels to white
        for (let row = startY; row < endY; row++) {
          for (let col = startX; col < endX; col++) {
            const index = (row * canvasWidth + col) * 4; // Calculate pixel index
            data[index] = 255; // Red
            data[index + 1] = 255; // Green
            data[index + 2] = 255; // Blue
            data[index + 3] = 255; // Alpha (fully opaque)
          }
        }
      }
      context.putImageData(pixels, 0, 0);
    }
  };
};
