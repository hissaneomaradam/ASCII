import { useEffect, useRef } from "react";
const CELL_ASPECT = 2.1;

export default function Canvas({ image, setPixels, setCanvasSize, outputWidth }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = outputWidth;
    const scale = width / image.width;
    const height = Math.max(1, Math.round((image.height * scale) / CELL_ASPECT));

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setPixels(imageData.data);
    setCanvasSize({ width: canvas.width, height: canvas.height });
  }, [image, setPixels, setCanvasSize, outputWidth]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
}
