import React, { useState, useEffect, useRef } from "react";
import { sound } from "../../utils/sound";
import "./ScrambleText.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#_$%";

const ScrambleText = ({
  text = "",
  className = "",
  scrambleOnHover = true,
  speed = 30,
  autoStart = true,
  audioFeedback = true,
  as: Component = "span",
  style = {},
}) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef(null);

  const startScramble = () => {
    if (!text) return;
    if (frameRef.current) clearInterval(frameRef.current);

    let iteration = 0;
    const maxIterations = text.length;

    if (audioFeedback) {
      sound.playDecryption();
    }

    frameRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(frameRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (autoStart) {
      startScramble();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      startScramble();
    }
  };

  return (
    <Component
      className={`scramble-text-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      style={style}
    >
      {displayText}
    </Component>
  );
};

export default ScrambleText;
