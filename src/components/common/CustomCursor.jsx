import React, { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

const CustomCursor = ({ selectedColor = "#06b6d4", cursorStyle = "glow-dot" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Target mouse position
  const mouseRef = useRef({ x: -100, y: -100 });
  // Lerped smooth positions
  const posRef = useRef({ x: -100, y: -100 }); // Fast dot
  const trailPosRef = useRef({ x: -100, y: -100 }); // Smooth trailing ring/aura

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const crosshairRef = useRef(null);
  const auraRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const rafRef = useRef(null);

  useEffect(() => {
    // Touch device check
    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (touch) {
      setIsTouchDevice(true);
      return;
    }

    if (cursorStyle === "classic-arrow") {
      document.body.classList.remove("custom-cursor-active");
      return;
    }
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Emitting particles for Sparkle Trail cursor
      if (cursorStyle === "trail-sparkle") {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: e.clientX + (Math.random() * 10 - 5),
            y: e.clientY + (Math.random() * 10 - 5),
            size: Math.random() * 4 + 2,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.4,
            alpha: 1,
            color: selectedColor,
            decay: Math.random() * 0.035 + 0.02,
          });
        }
        if (particlesRef.current.length > 35) {
          particlesRef.current.shift();
        }
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
          target.closest(".skill-card") ||
          target.closest(".service-box") ||
          target.closest(".vcard-tab-item") ||
          target.closest(".scramble-text-wrapper") ||
          target.closest("[role='button']"))
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

    // Animation Loop (60-120 FPS lerping)
    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Smooth lerp
      posRef.current.x += (targetX - posRef.current.x) * 0.8;
      posRef.current.y += (targetY - posRef.current.y) * 0.8;

      trailPosRef.current.x += (targetX - trailPosRef.current.x) * 0.25;
      trailPosRef.current.y += (targetY - trailPosRef.current.y) * 0.25;

      const fastTransform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      const trailTransform = `translate3d(${trailPosRef.current.x}px, ${trailPosRef.current.y}px, 0)`;

      if (dotRef.current) dotRef.current.style.transform = fastTransform;
      if (ringRef.current) ringRef.current.style.transform = trailTransform;
      if (crosshairRef.current) crosshairRef.current.style.transform = trailTransform;
      if (auraRef.current) auraRef.current.style.transform = trailTransform;

      // Particle Trail Canvas Render
      if (cursorStyle === "trail-sparkle" && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Instant initial sync position
    posRef.current = { ...mouseRef.current };
    trailPosRef.current = { ...mouseRef.current };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", checkHoverable);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible, cursorStyle, selectedColor]);

  if (isTouchDevice || cursorStyle === "classic-arrow" || !isVisible) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      {/* 1. Default Glow Dot & Ring */}
      {cursorStyle === "glow-dot" && (
        <>
          <div
            ref={dotRef}
            className={`cursor-dot ${isHovered ? "hovered" : ""} ${isClicking ? "clicked" : ""}`}
            style={{ backgroundColor: selectedColor, color: selectedColor }}
          />
          <div
            ref={ringRef}
            className={`cursor-ring ${isHovered ? "hovered" : ""} ${isClicking ? "clicked" : ""}`}
            style={{ borderColor: selectedColor }}
          />
        </>
      )}

      {/* 2. Cyber Crosshair */}
      {cursorStyle === "cyber-crosshair" && (
        <div
          ref={crosshairRef}
          className={`cursor-crosshair-wrap ${isHovered ? "hovered" : ""} ${isClicking ? "clicked" : ""}`}
          style={{ color: selectedColor }}
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
          <div ref={auraRef} className="cursor-magnet-aura-wrap">
            <div
              className={`cursor-magnet-aura-inner ${isHovered ? "hovered" : ""}`}
              style={{
                background: `radial-gradient(circle, ${selectedColor}dd 0%, ${selectedColor}33 55%, transparent 100%)`,
                boxShadow: `0 0 25px ${selectedColor}`,
              }}
            />
          </div>
          <div
            ref={dotRef}
            className={`cursor-dot ${isHovered ? "hovered" : ""}`}
            style={{ backgroundColor: "#ffffff", color: selectedColor }}
          />
        </>
      )}

      {/* 4. Particle Trail Sparkle */}
      {cursorStyle === "trail-sparkle" && (
        <>
          <canvas ref={canvasRef} className="cursor-sparkle-canvas" />
          <div
            ref={dotRef}
            className={`cursor-dot ${isHovered ? "hovered" : ""}`}
            style={{ backgroundColor: selectedColor, color: selectedColor }}
          />
        </>
      )}
    </div>
  );
};

export default CustomCursor;

