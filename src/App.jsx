import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import Ascii from "./components/Ascii";
import { useState, useEffect } from "react";
import Footer from "./components/Footer"; 
import { CHARSETS } from "./components/Ascii";
import "./App.css";

const DEFAULTS = {
  contrast: 1,
  brightness: 0,
  outputWidth: 200,
  chars: "Simple",
};

function App() {
  const [image, setImage] = useState(null);
  const [pixels, setPixels] = useState(null);
  const [contrast, setContrast] = useState(DEFAULTS.contrast);
  const [brightness, setBrightness] = useState(DEFAULTS.brightness);
  const [outputWidth, setOutputWidth] = useState(DEFAULTS.outputWidth);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [chars, setChars] = useState(DEFAULTS.chars);
  const [theme, setTheme] = useState("dark");
  const [fileName, setFileName] = useState("");

  const handleImageSelect = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImage(img);
      setFileName(file.name);
    };
  };

  const handleReset = () => {
    setContrast(DEFAULTS.contrast);
    setBrightness(DEFAULTS.brightness);
    setOutputWidth(DEFAULTS.outputWidth);
    setChars(DEFAULTS.chars);
  };

  const [stageFontPx, setStageFontPx] = useState(6);
  useEffect(() => {
    if (!canvasSize.width) return;
    const stageWidth = Math.min(1040, window.innerWidth - 360 - 48 - 48);
    const perChar = stageWidth / canvasSize.width;
    setStageFontPx(Math.max(2, Math.min(10, Math.round(perChar * 1.0))));
  }, [canvasSize.width]);

  const dirty =
    contrast !== DEFAULTS.contrast ||
    brightness !== DEFAULTS.brightness ||
    outputWidth !== DEFAULTS.outputWidth ||
    chars !== DEFAULTS.chars;

  return (
    <div className="app" data-theme={theme}>
      <header className="app__bar">
        <div className="app__brand">
          <span className="app__brand-mark" aria-hidden="true">
            {"</>"}
          </span>
          <div className="app__brand-text">
            <h1 className="app__title">ASCII</h1>
            <p className="app__subtitle">image → text, in the browser</p>
          </div>
        </div>
        <nav className="app__nav">
          <a
            className="app__link"
            href="https://github.com/hissaneomaradam/ASCII"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
          <button
            className="app__theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </nav>
      </header>

      <main className="app__main">
        <aside className="app__controls">
          <section className="panel">
            <div className="panel__head">
              <h2 className="panel__title">1 · Source</h2>
              {image && (
                <span className="chip" title={fileName}>
                  {fileName}
                </span>
              )}
            </div>

            <label className="dropzone">
              <ImageUpload onImageSelect={handleImageSelect} />
              <div className="dropzone__hint">
                <span className="dropzone__icon">⬆</span>
                <span className="dropzone__label">
                  {image ? "Replace image" : "Drop or choose an image"}
                </span>
                <span className="dropzone__accepts">.jpg .png .webp</span>
              </div>
            </label>
          </section>

          {image && (
            <section className="panel">
              <div className="panel__head">
                <h2 className="panel__title">2 · Adjust</h2>
                <button
                  className="app__reset"
                  onClick={handleReset}
                  disabled={!dirty}
                  aria-label="Reset adjustments"
                >
                  reset
                </button>
              </div>

              <div className="field">
                <div className="field__head">
                  <label htmlFor="contrast" className="field__label">
                    Contrast
                  </label>
                  <span className="field__value">{contrast.toFixed(2)}</span>
                </div>
                <input
                  id="contrast"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <div className="field__head">
                  <label htmlFor="brightness" className="field__label">
                    Brightness
                  </label>
                  <span className="field__value">
                    {brightness > 0 ? `+${brightness}` : brightness}
                  </span>
                </div>
                <input
                  id="brightness"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <div className="field__head">
                  <label htmlFor="outputWidth" className="field__label">
                    Output width
                  </label>
                  <span className="field__value">{outputWidth}px</span>
                </div>
                <input
                  id="outputWidth"
                  type="range"
                  min="50"
                  max="400"
                  step="10"
                  value={outputWidth}
                  onChange={(e) => setOutputWidth(Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label htmlFor="chars" className="field__label">
                  Character set
                </label>
                <select
                  id="chars"
                  value={chars}
                  onChange={(e) => setChars(e.target.value)}
                >
                  {Object.keys(CHARSETS).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
                <p className="field__preview">
                  {CHARSETS[chars].slice(0, 14)}…
                </p>
              </div>
            </section>
          )}
        </aside>

        <section className="app__stage" aria-label="ASCII output">
          {/* Hidden helper canvas used internally by the converter */}
          <Canvas
            image={image}
            setPixels={setPixels}
            setCanvasSize={setCanvasSize}
            outputWidth={outputWidth}
          />

          {!image ? (
            <div className="stage__empty">
              <pre className="stage__empty-art" aria-hidden="true">{`
    ___   _____ ______  ________
   /   | / ___// ____/ /  _/  _/
  / /| | \\__ \\/ /      / / / /
 / ___ |___/ / /___  _/ /_/ /
/_/  |_/____/\\____/ /____/___/
`}</pre>
              <h2 className="stage__empty-title">No image yet</h2>
              <p className="stage__empty-text">
                Upload an image from the left and it will be rendered as ASCII
                characters here. Adjust contrast, brightness, width and the
                character set to shape the output.
              </p>
            </div>
          ) : (
            <div
              className="stage__output"
              style={{ fontSize: `${stageFontPx}px` }}
            >
              <Ascii
                pixels={pixels}
                width={canvasSize.width}
                height={canvasSize.height}
                contrast={contrast}
                brightness={brightness}
                chars={chars}
              />
            </div>
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
