import React, { useEffect, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = ({ selectedColor, cursorStyle = "glow-dot" }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If classic system arrow is chosen, do not render custom cursor overlays
    if (cursorStyle === "classic-arrow") return;

    // Only enable on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPos(newPos);

      if (!isVisible) setIsVisible(true);

      // Maintain trail history for sparkle/trail mode
      if (cursorStyle === "trail-sparkle") {
        setTrail((prev) => [
          { x: e.clientX, y: e.clientY, id: Math.random(), size: Math.random() * 8 + 4 },
          ...prev.slice(0, 10),
        ]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest(".interactive") ||
          target.closest(".project-card") ||
          target.closest(".skill-category-card") ||
          target.closest(".action-card"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", checkHoverable);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", checkHoverable);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorStyle]);

  // If classic arrow mode is active or offscreen, return null
  if (cursorStyle === "classic-arrow" || !isVisible) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      {/* 1. Default Glow Dot & Ring */}
      {cursorStyle === "glow-dot" && (
        <>
          <div
            className={`cursor-dot ${isHovered ? "hovered" : ""} ${
              isClicking ? "clicked" : ""
            }`}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              backgroundColor: selectedColor,
              color: selectedColor,
            }}
          />
          <div
            className={`cursor-ring ${isHovered ? "hovered" : ""} ${
              isClicking ? "clicked" : ""
            }`}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              borderColor: selectedColor,
            }}
          />
        </>
      )}

      {/* 2. Cyber Crosshair */}
      {cursorStyle === "cyber-crosshair" && (
        <div
          className={`cursor-crosshair-wrap ${isHovered ? "hovered" : ""} ${
            isClicking ? "clicked" : ""
          }`}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            color: selectedColor,
          }}
        >
          <div
            className="crosshair-center-dot"
            style={{ backgroundColor: selectedColor, color: selectedColor }}
          />
          <span className="crosshair-line top" />
          <span className="crosshair-line bottom" />
          <span className="crosshair-line left" />
          <span className="crosshair-line right" />
        </div>
      )}

      {/* 3. Magnet Aura */}
      {cursorStyle === "magnet-ring" && (
        <>
          <div
            className={`cursor-magnet-aura ${isHovered ? "hovered" : ""}`}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              background: `radial-gradient(circle, ${selectedColor}bb 0%, ${selectedColor}22 60%, transparent 100%)`,
              boxShadow: `0 0 25px ${selectedColor}`,
            }}
          />
          <div
            className="cursor-dot"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              backgroundColor: "#ffffff",
              color: selectedColor,
            }}
          />
        </>
      )}

      {/* 4. Particle Trail Sparkle */}
      {cursorStyle === "trail-sparkle" && (
        <>
          <div
            className="cursor-dot hovered"
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              backgroundColor: selectedColor,
              color: selectedColor,
            }}
          />
          {trail.map((t, idx) => {
            const alpha = (10 - idx) / 10;
            return (
              <div
                key={t.id}
                className="trail-sparkle-dot"
                style={{
                  width: `${t.size * alpha}px`,
                  height: `${t.size * alpha}px`,
                  marginTop: `-${(t.size * alpha) / 2}px`,
                  marginLeft: `-${(t.size * alpha) / 2}px`,
                  transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
                  backgroundColor: selectedColor,
                  color: selectedColor,
                  opacity: alpha * 0.75,
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default CustomCursor;
