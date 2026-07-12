import React from 'react'

export default function ImageUpload({onImageSelect}) {
    function handleUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        onImageSelect(file);
    }

  return (
    <input type="file" onChange={handleUpload} accept='.jpg, .jpeg, .webp, .png'/>
  )
  
}

