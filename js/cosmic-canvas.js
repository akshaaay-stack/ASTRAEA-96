/**
 * ASTRAEA Cosmic Canvas Visualizer
 * Real-time particle physics, orbital planes, and living nebula universe
 */

class CosmicCanvas {
  constructor(canvasId = 'cosmic-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.planets = [];
    this.mouse = { x: null, y: null, targetX: 0, targetY: 0 };
    this.animationFrameId = null;
    this.activeSpecialisation = 'aether';
    this.reducedMotion = localStorage.getItem('astraea_reduced_motion') === 'true';

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX - this.canvas.width / 2) * 0.03;
      this.mouse.targetY = (e.clientY - this.canvas.height / 2) * 0.03;
    });

    this.createStars(220);
    this.setupPlanets();
    this.animate();

    // Spawn shooting stars periodically
    setInterval(() => {
      if (!this.reducedMotion && Math.random() > 0.4) {
        this.spawnShootingStar();
      }
    }, 4500);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars(count) {
    this.stars = [];
    const colors = ['#ffffff', '#e0e7ff', '#c084fc', '#818cf8', '#38bdf8', '#f472b6'];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1.5 + 0.5,
        radius: Math.random() * 1.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  setupPlanets() {
    // 4 BCA World Planets in orbit
    this.planets = [
      { id: 'nova', name: 'NOVA', color: '#c084fc', orbitRadius: 210, speed: 0.003, angle: 0, size: 7, glow: 'rgba(192, 132, 252, 0.6)' },
      { id: 'aether', name: 'AETHER', color: '#818cf8', orbitRadius: 290, speed: 0.0022, angle: Math.PI * 0.5, size: 9, glow: 'rgba(129, 140, 248, 0.7)' },
      { id: 'quanta', name: 'QUANTA', color: '#38bdf8', orbitRadius: 370, speed: 0.0016, angle: Math.PI, size: 8, glow: 'rgba(56, 189, 248, 0.6)' },
      { id: 'lumina', name: 'LUMINA', color: '#f472b6', orbitRadius: 450, speed: 0.0011, angle: Math.PI * 1.5, size: 7.5, glow: 'rgba(244, 114, 182, 0.6)' }
    ];
  }

  spawnShootingStar() {
    this.shootingStars.push({
      x: Math.random() * this.canvas.width * 0.8,
      y: Math.random() * (this.canvas.height * 0.4),
      length: Math.random() * 100 + 80,
      speed: Math.random() * 10 + 12,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 1,
      fadeSpeed: 0.022
    });
  }

  setActiveSpecialisation(spec) {
    this.activeSpecialisation = spec;
  }

  setReducedMotion(enabled) {
    this.reducedMotion = enabled;
    localStorage.setItem('astraea_reduced_motion', enabled);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Smooth mouse parallax
    this.mouse.x = (this.mouse.x || 0) + (this.mouse.targetX - (this.mouse.x || 0)) * 0.05;
    this.mouse.y = (this.mouse.y || 0) + (this.mouse.targetY - (this.mouse.y || 0)) * 0.05;

    const centerX = this.canvas.width / 2 + this.mouse.x;
    const centerY = this.canvas.height / 2 + this.mouse.y;

    // 1. Draw Starfield
    for (let star of this.stars) {
      star.angle += star.twinkleSpeed;
      const alpha = 0.3 + Math.sin(star.angle) * 0.5 * star.alpha;

      // Slow drift
      if (!this.reducedMotion) {
        star.y -= 0.1 * star.z;
        if (star.y < 0) {
          star.y = this.canvas.height;
          star.x = Math.random() * this.canvas.width;
        }
      }

      const drawX = star.x + this.mouse.x * star.z;
      const drawY = star.y + this.mouse.y * star.z;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, star.radius * star.z, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
      this.ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
      this.ctx.shadowColor = star.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw Subtle Constellation Link Lines for nearby stars
    this.ctx.save();
    for (let i = 0; i < 40; i++) {
      for (let j = i + 1; j < 40; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.stars[i].x + this.mouse.x, this.stars[i].y + this.mouse.y);
          this.ctx.lineTo(this.stars[j].x + this.mouse.x, this.stars[j].y + this.mouse.y);
          this.ctx.strokeStyle = 'rgba(129, 140, 248, ' + (1 - dist / 110) * 0.12 + ')';
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
    this.ctx.restore();

    // 3. Draw Shooting Stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      const endX = ss.x + Math.cos(ss.angle) * ss.length;
      const endY = ss.y + Math.sin(ss.angle) * ss.length;

      const grad = this.ctx.createLinearGradient(ss.x, ss.y, endX, endY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
      grad.addColorStop(1, 'rgba(129, 140, 248, 0)');

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(ss.x, ss.y);
      this.ctx.lineTo(endX, endY);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.6;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = '#c084fc';
      this.ctx.stroke();
      this.ctx.restore();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.opacity -= ss.fadeSpeed;

      if (ss.opacity <= 0) {
        this.shootingStars.splice(i, 1);
      }
    }

    // 4. Draw Background Universe Planetary Orbital Tracks (When in Universe Dashboard)
    const isDashboard = document.getElementById('view-universe')?.classList.contains('active-view');
    if (isDashboard) {
      for (let planet of this.planets) {
        if (!this.reducedMotion) {
          planet.angle += planet.speed;
        }

        const isActive = planet.id === this.activeSpecialisation;

        // Draw faint orbital ring ellipse
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, planet.orbitRadius, planet.orbitRadius * 0.45, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = isActive ? 'rgba(129, 140, 248, 0.28)' : 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = isActive ? 1.5 : 1;
        this.ctx.setLineDash(isActive ? [4, 6] : [2, 8]);
        this.ctx.stroke();
        this.ctx.restore();

        // Calculate planet position on 3D-angled ellipse
        const planetX = centerX + Math.cos(planet.angle) * planet.orbitRadius;
        const planetY = centerY + Math.sin(planet.angle) * (planet.orbitRadius * 0.45);

        // Planet body
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(planetX, planetY, isActive ? planet.size * 1.3 : planet.size, 0, Math.PI * 2);
        this.ctx.fillStyle = planet.color;
        this.ctx.shadowBlur = isActive ? 24 : 12;
        this.ctx.shadowColor = planet.color;
        this.ctx.fill();

        // Label
        this.ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)';
        this.ctx.font = `600 ${isActive ? 11 : 9}px Space Grotesk, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(planet.name, planetX, planetY - planet.size - 6);
        this.ctx.restore();
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

window.CosmicCanvas = CosmicCanvas;
