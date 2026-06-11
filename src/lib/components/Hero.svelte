<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let animId;
    const startTime = Date.now();

    const spheres = [
      { ox: 0.50, oy: 0.52, r: 88,  type: 'main',   phase: 0.0 },
      { ox: 0.22, oy: 0.43, r: 28,  type: 'small',  phase: 0.5 },
      { ox: 0.35, oy: 0.30, r: 18,  type: 'small',  phase: 1.2 },
      { ox: 0.72, oy: 0.46, r: 22,  type: 'small',  phase: 2.1 },
      { ox: 0.63, oy: 0.35, r: 14,  type: 'small',  phase: 3.0 },
      { ox: 0.14, oy: 0.58, r: 38,  type: 'medium', phase: 1.8 },
      { ox: 0.82, oy: 0.60, r: 20,  type: 'small',  phase: 4.2 },
      { ox: 0.88, oy: 0.36, r: 16,  type: 'small',  phase: 2.7 },
      { ox: 0.57, oy: 0.42, r: 10,  type: 'tiny',   phase: 0.9 },
      { ox: 0.42, oy: 0.37, r: 8,   type: 'tiny',   phase: 3.5 },
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawMesh(t, w, h) {
      const cx = w * 0.5;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.055)';
      ctx.lineWidth = 1;

      const cols = 18;
      for (let i = 0; i <= cols; i++) {
        const x = (w / cols) * i;
        const tx = cx + (x - cx) * 0.22;
        const ty = h * 0.92;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }

      const rows = 10;
      for (let j = 0; j <= rows; j++) {
        const progress = j / rows;
        const y = h * 0.18 + progress * h * 0.68;
        const spread = 0.28 + progress * 0.72;
        ctx.beginPath();
        ctx.moveTo(cx - cx * spread, y);
        ctx.lineTo(cx + cx * spread, y);
        ctx.stroke();
      }

      for (let i = 1; i < cols; i += 3) {
        for (let j = 1; j < rows; j += 2) {
          const progress = j / rows;
          const spread = 0.28 + progress * 0.72;
          const segW = (cx * spread * 2) / cols;
          const x = cx - cx * spread + segW * i;
          const y = h * 0.18 + progress * h * 0.68;
          const pulse = (Math.sin(t * 0.001 + i * 0.72 + j * 1.31) + 1) * 0.5;
          if (pulse > 0.72) {
            ctx.globalAlpha = (pulse - 0.72) * 3 * 0.7;
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawSphere(s, t, w, h) {
      const ox = Math.sin(t * 0.00035 + s.phase) * 24;
      const oy = Math.cos(t * 0.00028 + s.phase * 1.3) * 16;
      const px = s.ox * w + ox;
      const py = s.oy * h + oy;

      if (s.type === 'main') {
        let grd = ctx.createRadialGradient(px, py, 0, px, py, s.r * 1.9);
        grd.addColorStop(0, 'rgba(99,102,241,0.18)');
        grd.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, s.r * 1.9, 0, Math.PI * 2);
        ctx.fill();

        grd = ctx.createRadialGradient(px - s.r * 0.3, py - s.r * 0.3, s.r * 0.04, px, py, s.r);
        grd.addColorStop(0,    'rgba(190,193,255,0.96)');
        grd.addColorStop(0.35, 'rgba(129,140,248,0.88)');
        grd.addColorStop(0.72, 'rgba(79,70,229,0.55)');
        grd.addColorStop(1,    'rgba(49,46,129,0.15)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const grd = ctx.createRadialGradient(
          px - s.r * 0.25, py - s.r * 0.25, s.r * 0.04,
          px, py, s.r
        );
        grd.addColorStop(0, 'rgba(215,215,225,0.75)');
        grd.addColorStop(0.5, 'rgba(130,130,150,0.42)');
        grd.addColorStop(1, 'rgba(60,60,80,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function draw() {
      const t = Date.now() - startTime;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      drawMesh(t, w, h);
      spheres.forEach(s => drawSphere(s, t, w, h));
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<section class="hero">
  <canvas bind:this={canvas} class="hero-canvas"></canvas>

  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      Deterministic personalization + Scout AI
    </div>

    <h1>
      Your CRM knows<br>who they are.<br>
      Your website<br class="mobile-only"> should too.
    </h1>

    <p class="hero-sub">
      Deterministic personalization
      <span class="dot">·</span>
      Scout AI deal intelligence
      <span class="dot">·</span>
      Built for B2B SaaS
    </p>
  </div>

  <div class="works-with-bar">
    <span class="works-label">WORKS WITH</span>

    <div class="works-brand">
      <span class="brand-icon hubspot">HS</span>
      <span class="brand-name">HubSpot</span>
    </div>

    <div class="works-brand">
      <span class="brand-icon instantly">I</span>
      <span class="brand-name">Instantly</span>
    </div>

    <div class="works-brand">
      <span class="brand-icon apollo">A</span>
      <span class="brand-name">Apollo</span>
    </div>

    <div class="works-brand">
      <span class="brand-icon smartlead">SL</span>
      <span class="brand-name">Smartlead</span>
    </div>

    <span class="works-stat">500+ SIGNALS TRACKED</span>

    <a href="https://app.churnaut.com/register" class="works-cta">Try now ↗</a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 148px;
    overflow: hidden;
  }

  .hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 860px;
    padding: 0 32px;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.02em;
    margin-bottom: 28px;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #818cf8;
    animation: badge-pulse 2.2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes badge-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }

  h1 {
    font-size: clamp(48px, 6.5vw, 92px);
    font-weight: 800;
    line-height: 1.03;
    letter-spacing: -0.03em;
    color: white;
    margin-bottom: 24px;
  }

  .mobile-only {
    display: none;
  }

  .hero-sub {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.025em;
    flex-wrap: wrap;
    justify-content: center;
  }

  .dot {
    opacity: 0.3;
  }

  /* Works-with bar */
  .works-with-bar {
    position: absolute;
    bottom: 44px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 24px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 100px;
    padding: 10px 10px 10px 24px;
    white-space: nowrap;
  }

  .works-label {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
  }

  .works-brand {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .brand-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.01em;
    flex-shrink: 0;
  }

  .hubspot    { background: #ff7a59; color: white; }
  .instantly  { background: #4f6ef7; color: white; }
  .apollo     { background: #7c3aed; color: white; }
  .smartlead  { background: #059669; color: white; font-size: 8px; }

  .brand-name {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
  }

  .works-stat {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    padding-left: 8px;
    border-left: 1px solid rgba(255,255,255,0.08);
  }

  .works-cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 9px 20px;
    border-radius: 100px;
    background: white;
    color: #0a0a0a;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 0.2s;
    margin-left: 4px;
  }

  .works-cta:hover { opacity: 0.85; }

  @media (max-width: 768px) {
    h1 { font-size: 40px; }
    .mobile-only { display: block; }
    .works-with-bar {
      bottom: 24px;
      gap: 14px;
      padding: 8px 8px 8px 16px;
    }
    .works-brand:nth-child(n+4) { display: none; }
    .works-stat { display: none; }
  }
</style>
