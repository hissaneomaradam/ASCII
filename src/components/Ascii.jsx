import { useEffect, useState } from "react";

export const CHARSETS = {
  Simple: "@%#*+=-:. ",
  Detailed:
    "$@B%8&WM#*oahkbdpqwmZO0QLCJYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  Blocks: "█▓▒░ ",
  Binary: "10 ",
  Letters: "MWNXK0Okxdolc:;.. ",
  Matrix: "01ZXS#@*+=-:. ",
  Hex: "0123456789ABCDEF",
  Braille: "⣿⣷⣶⣤⣄⣀ ",
};

export default function Ascii({
  pixels,
  width,
  height,
  contrast,
  brightness,
  chars,
}) {
  const [ascii, setAscii] = useState("");
  const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(ascii);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};
  const handleDownload = () => {
    const blob = new Blob([ascii], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

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
    <>
      {ascii && (
        <>
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
          <button onClick={handleCopy}>{copied ? "✅ Copied!" : "📋 Copy"}</button>
          <button onClick={handleDownload}>Download</button>
        </>
      )}
    </>
  );

  
}
