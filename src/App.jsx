import ImageUpload from "./components/ImageUpload"
import { useState } from "react";

function App() {
  const handleImageSelect = (file)=> {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      console.log("Image loaded:", img.width, img.height);
      setImage(img)
    };
  }
  const [image, setImage] = useState(null);
  return (
    <div>
      <ImageUpload onImageSelect={handleImageSelect}/>

      {image && <img src={image.src} alt="Uploaded" />}
      
    </div>
  )
}

export default App
