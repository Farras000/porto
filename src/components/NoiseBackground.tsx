import React, { useEffect, useRef } from 'react';

export const NoiseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create small pre-rendered noise tile for ultra-fast performance
    const patternCanvas = document.createElement('canvas');
    const patternSize = 160;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');

    let scrollProgress = 0;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ambient floating light orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 450, color: 'rgba(196, 240, 65, 0.04)', vx: 0.3, vy: 0.2 },
      { x: width * 0.8, y: height * 0.6, radius: 550, color: 'rgba(56, 189, 248, 0.035)', vx: -0.25, vy: 0.3 },
      { x: width * 0.5, y: height * 0.85, radius: 500, color: 'rgba(168, 85, 247, 0.025)', vx: 0.2, vy: -0.25 },
    ];

    let frameCount = 0;

    const render = () => {
      frameCount++;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Clear main canvas
      ctx.clearRect(0, 0, width, height);

      // Base deep dark gradient
      const bgGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a0d14');
      bgGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle ambient orbs
      orbs.forEach((orb, i) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce boundaries
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Scroll influence
        const yOffset = (scrollProgress * height * 0.3) * (i % 2 === 0 ? 1 : -0.5);

        const orbGrad = ctx.createRadialGradient(
          orb.x,
          orb.y + yOffset,
          0,
          orb.x,
          orb.y + yOffset,
          orb.radius
        );
        orbGrad.addColorStop(0, orb.color);
        orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y + yOffset, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update noise pattern every 2 frames for a cinema grain feel
      if (patternCtx && frameCount % 2 === 0) {
        const imgData = patternCtx.createImageData(patternSize, patternSize);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = (Math.random() * 255) | 0;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          // Very subtle opacity for pleasant tactile film texture
          data[i + 3] = (Math.random() * 22) | 0;
        }
        patternCtx.putImageData(imgData, 0, 0);
      }

      if (patternCtx) {
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // Draw subtle grid lines on scroll
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 120;
      const startY = (window.scrollY * 0.2) % gridSize;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -gridSize + startY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07090e]/80 pointer-events-none" />
    </div>
  );
};
