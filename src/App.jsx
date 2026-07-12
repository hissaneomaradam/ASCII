import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import Ascii from "./components/Ascii";
import { useState, useEffect, useRef } from "react";

function App() {
  
  const [image, setImage] = useState(null);
  const [pixels, setPixels] = useState(null);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
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
      <Canvas image={image} setPixels={setPixels} setCanvasSize={setCanvasSize}/>
      <Ascii pixels={pixels} width={canvasSize?.width} height={canvasSize?.height} />
      {image && <img src={image.src} alt="Uploaded" />}
    </div>
  );
}

export default App;
