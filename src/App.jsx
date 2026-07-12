import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import Ascii from "./components/Ascii";
import { useState, useEffect, useRef } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [pixels, setPixels] = useState(null);
  const [contrast, setContrast] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const handleImageSelect = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      console.log("Image loaded:", img.width, img.height);
      setImage(img);
    };
  };

  return (
    <div>
      <ImageUpload onImageSelect={handleImageSelect} />
      <Canvas
        image={image}
        setPixels={setPixels}
        setCanvasSize={setCanvasSize}
      />
      <Ascii
        pixels={pixels}
        width={canvasSize.width}
        height={canvasSize.height}
        contrast={contrast}
      />
      {image && (
        <>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
          />
          <p>Contrast: {contrast}</p>
        </>
      )}
    </div>
  );
}

export default App;
