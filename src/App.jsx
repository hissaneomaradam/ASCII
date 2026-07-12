import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import { useState, useEffect, useRef } from "react";

function App() {
  
  const [image, setImage] = useState(null);
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
      <Canvas image={image} />
      {image && <img src={image.src} alt="Uploaded" />}
    </div>
  );
}

export default App;
