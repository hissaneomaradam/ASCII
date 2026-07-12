import { useEffect, useState } from "react";

const CHARSETS = {
  Simple: "@%#*+=-:. ",
  Detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  Blocks: "█▓▒░ ",
  Binary: "10 ",
};


export default function Ascii({ pixels, width, height, contrast, brightness, chars}) {
  const [ascii, setAscii] = useState("");


  useEffect(() => {
    if (!pixels || width === 0 || height === 0) return;

    let result = "";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;

        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        let brightnessValue = 0.299 * r + 0.587 * g + 0.114 * b;

        brightnessValue += brightness;

        brightnessValue = 128 + (brightnessValue - 128) * contrast;

        brightnessValue = Math.max(0, Math.min(255, brightnessValue));

        const charIndex = Math.floor(
          (1 - brightnessValue / 255) * (CHARSETS[chars].length - 1),
        );
        result += CHARSETS[chars][charIndex];
      }

      result += "\n";
    }

    setAscii(result);
  }, [pixels, width, height, contrast, brightness, chars]);

  return (
    <pre
      style={{
        fontFamily: "Consolas, 'Courier New', monospace",
        fontWeight: "bold",
        fontSize: "6px",
        lineHeight: "5px",
        letterSpacing: "-0.5px",
        whiteSpace: "pre",
      }}
    >
      {ascii}
    </pre>
  );
}
