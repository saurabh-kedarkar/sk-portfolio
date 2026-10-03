import React, { useEffect, useRef } from "react";
import "./BackgroundAtmosphere.css";

const BackgroundAtmosphere = ({ selectedColor, isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const isMobile = width < 768 || (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

    // Dynamic particle count: 35 for mobile (lightweight), 75 for desktop (super fast 60fps)
    const particleCount = isMobile ? 35 : Math.max(50, Math.min(Math.floor((width * height) / 16000), 75));
    const particles = [];
    const shootingStars = [];
    const mouse = { x: -1000, y: -1000, radius: isMobile ? 0 : 130 };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // 1. Constellation Cluster
    const topGapCount = isMobile ? 8 : 14;
    for (let i = 0; i < topGapCount; i++) {
      const isGlowingNode = i % 4 === 0;
      const colPos = 0.18 + ((i % 5) / 4) * 0.64 + (Math.random() * 0.06 - 0.03);
      const rowPos = 0.05 + (Math.floor(i / 5) / 3) * 0.32 + (Math.random() * 0.05 - 0.025);

      particles.push({
        x: Math.max(20, Math.min(width - 20, colPos * width)),
        y: Math.max(20, Math.min(height * 0.40, rowPos * height)),
        vx: (Math.random() - 0.5) * (isGlowingNode ? 0.35 : 0.2),
        vy: (Math.random() - 0.5) * (isGlowingNode ? 0.35 : 0.2),
        radius: isGlowingNode ? Math.random() * 2.0 + 1.5 : Math.random() * 1.4 + 0.7,
        alpha: Math.random() * 0.35 + 0.55,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        isGlowingNode,
        isTopGap: true,
      });
    }

    // 2. Grid Distribution
    const bodyCount = particleCount - topGapCount;
    const rows = 3;
    const cols = 5;
    const cellW = width / cols;
    const cellH = height / rows;

    for (let i = 0; i < bodyCount; i++) {
      const isGlowingNode = i % 4 === 0;
      const gridCol = i % cols;
      const gridRow = Math.floor(i / cols) % rows;
      
      const x = (gridCol + Math.random() * 0.85 + 0.075) * cellW;
      const y = (gridRow + Math.random() * 0.85 + 0.075) * cellH;

      particles.push({
        x: Math.max(15, Math.min(width - 15, x)),
        y: Math.max(15, Math.min(height - 15, y)),
        vx: (Math.random() - 0.5) * (isGlowingNode ? 0.4 : 0.25),
        vy: (Math.random() - 0.5) * (isGlowingNode ? 0.4 : 0.25),
        radius: isGlowingNode ? Math.random() * 2.0 + 1.4 : Math.random() * 1.3 + 0.6,
        alpha: Math.random() * 0.4 + 0.45,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        isGlowingNode,
        isTopGap: false,
      });
    }

    // Helper for shooting stars
    const spawnShootingStar = () => {
      if (shootingStars.length >= (isMobile ? 1 : 2)) return;
      shootingStars.push({
        x: Math.random() * width * 0.65 + width * 0.15,
        y: Math.random() * height * 0.25 + 20,
        length: Math.random() * 70 + 45,
        speed: Math.random() * 6.0 + 4.0,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 0.9,
        decay: Math.random() * 0.025 + 0.015,
      });
    };

    spawnShootingStar();
    const starInterval = setInterval(() => {
      if (!document.hidden && Math.random() > 0.4) {
        spawnShootingStar();
      }
    }, 4500);

    const connectDistance = isMobile ? 90 : 115;
    const connectDistanceSq = connectDistance * connectDistance;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= star.decay;

        if (star.alpha <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        const headX = star.x;
        const headY = star.y;
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        grad.addColorStop(0, selectedColor || "rgba(6,182,212,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 2. Particle update & draw
      const now = Date.now();
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = p.isTopGap ? height * 0.40 : height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(now * 0.002 * p.pulseSpeed) * 0.003;
        p.alpha = Math.max(0.3, Math.min(0.85, p.alpha));

        // Interactive mouse effect (Desktop only)
        if (!isMobile && mouse.radius > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / (dist || 1)) * force * 1.8;
            p.y -= (dy / (dist || 1)) * force * 1.8;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = selectedColor ? `${selectedColor}${Math.floor(force * 50).toString(16).padStart(2, '0')}` : `rgba(6,182,212,${force * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGlowingNode
          ? (selectedColor || "#06b6d4")
          : (isDarkMode ? `rgba(255, 255, 255, ${p.alpha * 0.7})` : `rgba(15, 23, 42, ${p.alpha * 0.45})`);
        ctx.fill();

        // Connect nearby particles using fast squared distance check
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistanceSq) {
            const distNodes = Math.sqrt(distSq);
            const lineAlpha = (1 - distNodes / connectDistance) * 0.2;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (p.isGlowingNode || p2.isGlowingNode) {
              ctx.strokeStyle = selectedColor ? `${selectedColor}${Math.floor(lineAlpha * 220).toString(16).padStart(2, '0')}` : `rgba(6, 182, 212, ${lineAlpha})`;
            } else {
              ctx.strokeStyle = isDarkMode
                ? `rgba(255, 255, 255, ${lineAlpha})`
                : `rgba(15, 23, 42, ${lineAlpha})`;
            }

            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(starInterval);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isDarkMode, selectedColor]);

  return (
    <div className="cinematic-atmosphere" aria-hidden="true">
      {/* Dynamic Aurora Glow Orbs */}
      <div
        className="aurora-orb aurora-1"
        style={{
          background: `radial-gradient(circle, ${selectedColor}44 0%, transparent 70%)`,
        }}
      />
      <div
        className="aurora-orb aurora-2"
        style={{
          background: `radial-gradient(circle, ${selectedColor}33 0%, transparent 70%)`,
        }}
      />
      <div
        className="aurora-orb aurora-3"
        style={{
          background: `radial-gradient(circle, #8b5cf633 0%, transparent 70%)`,
        }}
      />
      <div
        className="aurora-orb aurora-4"
        style={{
          background: `radial-gradient(circle, ${selectedColor}28 0%, transparent 70%)`,
        }}
      />

      {/* Cyber Grid Pattern */}
      <div className="cyber-grid-overlay" />

      {/* Interactive Constellation & Shooting Star Canvas */}
      <canvas ref={canvasRef} className="atmosphere-canvas" />

      {/* Vignette Rim */}
      <div className="cinematic-vignette" />
    </div>
  );
};

export default BackgroundAtmosphere;
