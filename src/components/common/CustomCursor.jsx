import React, { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

const CustomCursor = ({ selectedColor, cursorStyle = "glow-dot" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const crosshairRef = useRef(null);
  const auraRef = useRef(null);

  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Check if touch device
    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (touch) {
      setIsTouchDevice(true);
      return;
    }

    if (cursorStyle === "classic-arrow") return;

    const updateDOMPosition = () => {
      const { x, y } = posRef.current;
      const transformStr = `translate3d(${x}px, ${y}px, 0)`;

      if (dotRef.current) dotRef.current.style.transform = transformStr;
      if (ringRef.current) ringRef.current.style.transform = transformStr;
      if (crosshairRef.current) crosshairRef.current.style.transform = transformStr;
      if (auraRef.current) auraRef.current.style.transform = transformStr;
    };

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateDOMPosition();
          rafRef.current = null;
        });
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHoverable, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", checkHoverable);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorStyle]);

  if (isTouchDevice || cursorStyle === "classic-arrow" || !isVisible) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      {/* 1. Default Glow Dot & Ring */}
      {cursorStyle === "glow-dot" && (
        <>
          <div
            ref={dotRef}
            className={`cursor-dot ${isHovered ? "hovered" : ""} ${
              isClicking ? "clicked" : ""
            }`}
            style={{
              backgroundColor: selectedColor,
              color: selectedColor,
            }}
          />
          <div
            ref={ringRef}
            className={`cursor-ring ${isHovered ? "hovered" : ""} ${
              isClicking ? "clicked" : ""
            }`}
            style={{
              borderColor: selectedColor,
            }}
          />
        </>
      )}

      {/* 2. Cyber Crosshair */}
      {cursorStyle === "cyber-crosshair" && (
        <div
          ref={crosshairRef}
          className={`cursor-crosshair-wrap ${isHovered ? "hovered" : ""} ${
            isClicking ? "clicked" : ""
          }`}
          style={{
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
            ref={auraRef}
            className={`cursor-magnet-aura ${isHovered ? "hovered" : ""}`}
            style={{
              background: `radial-gradient(circle, ${selectedColor}bb 0%, ${selectedColor}22 60%, transparent 100%)`,
              boxShadow: `0 0 25px ${selectedColor}`,
            }}
          />
          <div
            ref={dotRef}
            className="cursor-dot"
            style={{
              backgroundColor: "#ffffff",
              color: selectedColor,
            }}
          />
        </>
      )}

      {/* 4. Particle Trail Sparkle / Fallback Dot */}
      {cursorStyle === "trail-sparkle" && (
        <div
          ref={dotRef}
          className="cursor-dot hovered"
          style={{
            backgroundColor: selectedColor,
            color: selectedColor,
          }}
        />
      )}
    </div>
  );
};

export default CustomCursor;
