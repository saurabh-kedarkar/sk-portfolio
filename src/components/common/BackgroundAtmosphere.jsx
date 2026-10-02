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

    // Particles configuration - Perfect balance (115-135 count, dedicated top-gap constellation)
    const particleCount = Math.max(115, Math.min(Math.floor((width * height) / 11000), 140));
    const particles = [];
    const shootingStars = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // 1. DEDICATED ANCHORED CONSTELLATION CLUSTER IN TOP OPEN GAP (Guaranteed on page refresh)
    const topGapCount = 22;
    for (let i = 0; i < topGapCount; i++) {
      const isGlowingNode = i % 4 === 0;
      // Spread across x: 18% to 82% of screen width, y: 25px to 38% of height
      const colPos = 0.18 + ((i % 6) / 5) * 0.64 + (Math.random() * 0.06 - 0.03);
      const rowPos = 0.05 + (Math.floor(i / 6) / 3) * 0.32 + (Math.random() * 0.05 - 0.025);

      particles.push({
        x: Math.max(20, Math.min(width - 20, colPos * width)),
        y: Math.max(20, Math.min(height * 0.40, rowPos * height)),
        vx: (Math.random() - 0.5) * (isGlowingNode ? 0.38 : 0.24),
        vy: (Math.random() - 0.5) * (isGlowingNode ? 0.38 : 0.24),
        radius: isGlowingNode ? Math.random() * 2.4 + 1.8 : Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.55,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        isGlowingNode,
        isTopGap: true,
      });
    }

    // 2. Full-Screen Grid Distribution for the remaining particles
    const bodyCount = particleCount - topGapCount;
    const rows = 4;
    const cols = 6;
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
        vx: (Math.random() - 0.5) * (isGlowingNode ? 0.45 : 0.28),
        vy: (Math.random() - 0.5) * (isGlowingNode ? 0.45 : 0.28),
        radius: isGlowingNode ? Math.random() * 2.2 + 1.6 : Math.random() * 1.5 + 0.7,
        alpha: Math.random() * 0.4 + 0.45,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        isGlowingNode,
        isTopGap: false,
      });
    }

    // Helper function to spawn shooting stars through top gap
    const spawnShootingStar = () => {
      if (shootingStars.length >= 3) return;
      shootingStars.push({
        x: Math.random() * width * 0.65 + width * 0.15,
        y: Math.random() * height * 0.25 + 20,
        length: Math.random() * 90 + 55,
        speed: Math.random() * 6.5 + 4.2,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
        alpha: 0.95,
        decay: Math.random() * 0.02 + 0.014,
      });
    };

    // Instant shooting star spawn on refresh across top space
    spawnShootingStar();
    setTimeout(spawnShootingStar, 300);

    const starInterval = setInterval(() => {
      if (Math.random() > 0.35) {
        spawnShootingStar();
      }
    }, 3500);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render shooting stars
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
        grad.addColorStop(0, selectedColor ? `${selectedColor}` : "rgba(6,182,212,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 2. Particle update & draw
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Smooth boundary wrap (Keep top gap particles smoothly floating in top 40% area)
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = p.isTopGap ? height * 0.40 : height;
        if (p.y > height) p.y = 0;

        // Subtle alpha pulsing
        p.alpha += Math.sin(Date.now() * 0.002 * p.pulseSpeed) * 0.004;
        p.alpha = Math.max(0.3, Math.min(0.9, p.alpha));

        // Interactive mouse effect
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 2.0;
          p.y -= (dy / dist) * force * 2.0;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = selectedColor ? `${selectedColor}${Math.floor(force * 60).toString(16).padStart(2, '0')}` : `rgba(6,182,212,${force * 0.3})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isGlowingNode) {
          ctx.fillStyle = selectedColor || "#06b6d4";
          ctx.shadowBlur = 9;
          ctx.shadowColor = selectedColor || "#06b6d4";
        } else {
          ctx.fillStyle = isDarkMode
            ? `rgba(255, 255, 255, ${p.alpha * 0.75})`
            : `rgba(15, 23, 42, ${p.alpha * 0.5})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Connect nearby particles (Balanced constellation distance: 125px, clean opacity 0.22)
        const connectDistance = 125;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - distNodes / connectDistance) * 0.22;

            if (p.isGlowingNode || p2.isGlowingNode) {
              ctx.strokeStyle = selectedColor ? `${selectedColor}${Math.floor(lineAlpha * 240).toString(16).padStart(2, '0')}` : `rgba(6, 182, 212, ${lineAlpha})`;
            } else {
              ctx.strokeStyle = isDarkMode
                ? `rgba(255, 255, 255, ${lineAlpha})`
                : `rgba(15, 23, 42, ${lineAlpha})`;
            }

            ctx.lineWidth = 0.7;
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
