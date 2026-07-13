import { useEffect, useState } from "react";

function SocialIcon({ id, href, label }) {
  return (
    <a
      className="app__foot-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <svg width="16" height="16" aria-hidden="true">
        <use href={`${import.meta.env.BASE_URL}icons.svg#${id}`} />
      </svg>
    </a>
  );
}

export default function Footer() {
  const [year, setYear] = useState("");
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="app__foot animate-fade-up">
      <span>© {year} ASCII Generator</span>
      <span className="app__foot-sep" aria-hidden="true">
        ·
      </span>
      <span>
        Made with <span className="app__foot-heart" aria-label="love">♡</span> by HISSANE Omar Adam
      </span>
      <span className="app__foot-sep" aria-hidden="true">
        ·
      </span>
      <span className="app__foot-social">
        <SocialIcon
          id="github-icon"
          href="https://github.com/hissaneomaradam"
          label="GitHub"
        />
        <SocialIcon
          id="linkedin-icon"
          href="https://linkedin.com/in/hissaneomaradam"
          label="LinkedIn"
        />
        <a
          className="app__foot-link"
          href="mailto:omaradamhissane@gmail.com"
          aria-label="Email"
        >
          <svg width="16" height="16" aria-hidden="true">
            <use href={`${import.meta.env.BASE_URL}icons.svg#mail-icon`} />
          </svg>
        </a>
      </span>
    </footer>
  );
}
