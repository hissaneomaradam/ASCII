import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import Ascii from "./components/Ascii";
import { useState, useEffect, useRef } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [pixels, setPixels] = useState(null);
  const [contrast, setContrast] = useState(1);
  const [brightness, setBrightness] = useState(0);
  const [outputWidth, setOutputWidth] = useState(200);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [chars, setChars] = useState("Simple");
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
        outputWidth={outputWidth}
      />
      <Ascii
        pixels={pixels}
        width={canvasSize.width}
        height={canvasSize.height}
        contrast={contrast}
        brightness={brightness}
        chars={chars}
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
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
          <p>Brightness: {brightness}</p>
          <label>Output Width</label>
          <input
            type="range"
            min="50"
            max="400"
            step="10"
            value={outputWidth}
            onChange={(e) => setOutputWidth(Number(e.target.value))}
          />
          <p>Output Width: {outputWidth}</p>
          <label>Character Set</label>
          <select value={chars} onChange={(e) => setChars(e.target.value)}>
            <option value="Simple">Simple</option>
            <option value="Detailed">Detailed</option>
            <option value="Blocks">Blocks</option>
            <option value="Binary">Binary</option>
          </select>
          
        </>
      )}
    </div>
  );
}

export default App;
