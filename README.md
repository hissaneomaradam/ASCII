# 🎨 ASCII Art Generator

Convert any image into ASCII art directly in your browser.

Built with **React** and the **HTML5 Canvas API**, this project implements the
full conversion pipeline from scratch — from reading raw pixel data to
generating ASCII characters based on image luminance.

---

## ✨ Features

* 📁 Upload any image (`.jpg`, `.png`, `.webp`)
* 🖼️ Automatic image resizing to a configurable output width
* ⚡ Fast pixel processing using a hidden HTML Canvas
* 🔤 Converts pixels into ASCII characters via luminance mapping
* 🎚️ **Contrast** slider
* 🌗 **Brightness** slider
* 📏 **Output width** slider (50 – 400 px)
* 🔠 **Character set** picker — Simple, Detailed, Blocks, Binary, Letters,
  Matrix, Hex, Braille
* 🌙 / ☀️ **Dark/Light theme** toggle with OKLCH-based design tokens
* 📋 **Copy to clipboard**
* 💾 **Download** the result as a `.txt` file
* ↺ **Reset** button to restore defaults
* 📱 Responsive two-column workspace (controls + live preview) that collapses
  to a single column on small screens
* 🎬 Subtle, tasteful motion — entrance staggers, hover micro-interactions and
  a gently breathing empty state (all disabled when
  `prefers-reduced-motion: reduce` is set)

---

## 📸 How It Works

1. Upload an image.
2. The image is drawn onto a hidden HTML canvas, resized to the selected
   output width. Rows are halved (×0.5) to compensate for the ~2:1 aspect ratio
   of monospace cells, so the exported text looks right in a terminal or editor.
3. The canvas extracts every pixel (RGBA values).
4. Each pixel's brightness is calculated using:

   ```text
   Brightness = 0.299R + 0.587G + 0.114B
   ```

5. Brightness and contrast adjustments are applied, then the value is mapped
   to a character from a density string. For example, the *Detailed* set:

   ```text
   $@B%8&WM#*oahkbdpqwmZO0QLCJYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'.
   ```

6. On screen, the preview is re-stretched vertically by ~2× via `line-height`
   so what you see matches what you'll get when you paste the exported text.

---

## 🛠️ Tech Stack

* **React 19** + **Vite**
* JavaScript (ES modules)
* HTML5 Canvas API
* Plain CSS with OKLCH color tokens (no CSS framework)
* `lucide-react`, `react-icons` for UI icons

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── ImageUpload.jsx   # hidden file input + dropzone label
│   ├── Canvas.jsx        # hidden helper canvas, extracts pixel data
│   ├── Ascii.jsx         # pixel → character mapping + copy/download
│   └── Footer.jsx        # social links + footer
├── App.jsx               # shell, workspace, state, theme toggle
├── App.css               # full design system 
├── index.css             # global tokens, themes, scrollbar, reduced-motion
└── main.jsx
public/
└── icons.svg            
```

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/hissaneomaradam/ASCII.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

---

## 💡 Future Improvements

* 🎨 Colored ASCII mode
* 🖼️ Export as PNG
* 🎥 Real-time webcam ASCII
* ↩️ Invert / flip output
* 🔡 Custom (user-defined) character set field

> The following items from earlier versions are now **implemented**:
> cleaner UI/UX, dark/light themes, brightness slider, adjustable output
> resolution, custom character sets, export as `.txt`, and copy to clipboard.

---

## ⭐ Why I Built This

I wanted to better understand how image processing works in the browser using
the Canvas API. Rather than relying on existing libraries, I implemented the
conversion pipeline from scratch — from reading raw pixel data to generating
ASCII characters based on image luminance.

This project was a great way to learn about image manipulation, React state
management, and rendering performance.

---

If you like this project, consider giving it a ⭐ on GitHub!
