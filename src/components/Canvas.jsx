import React from 'react'
import {useEffect, useRef } from "react";

export default function Canvas({ image }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = 100;
    const scale = width / image.width;
    const height = image.height * scale;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    console.log("Pixels:", pixels);
  }, [image]);
  return  <canvas ref={canvasRef} style={{ display: "none" }} />;
}
