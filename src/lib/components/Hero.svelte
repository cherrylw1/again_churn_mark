<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let animId;
    const startTime = Date.now();

    const spheres = [
      { ox: 0.50, oy: 0.65, r: 88,  type: 'main',   phase: 0.0 },
      { ox: 0.18, oy: 0.42, r: 52,  type: 'small',  phase: 0.5 },
      { ox: 0.34, oy: 0.28, r: 32,  type: 'small',  phase: 1.2 },
      { ox: 0.74, oy: 0.44, r: 44,  type: 'small',  phase: 2.1 },
      { ox: 0.65, oy: 0.30, r: 24,  type: 'small',  phase: 3.0 },
      { ox: 0.10, oy: 0.62, r: 62,  type: 'medium', phase: 1.8 },
      { ox: 0.84, oy: 0.62, r: 38,  type: 'small',  phase: 4.2 },
      { ox: 0.90, oy: 0.34, r: 28,  type: 'small',  phase: 2.7 },
      { ox: 0.58, oy: 0.55, r: 18,  type: 'tiny',   phase: 0.9 },
      { ox: 0.40, oy: 0.72, r: 14,  type: 'tiny',   phase: 3.5 },
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

    <h1>Your CRM knows who they are. Your website should too.</h1>

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

    <div class="marquee-clip">
      <div class="marquee-track">

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF7A59"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="9">HS</text></svg>
          <span>HubSpot</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF4A00"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">Z</text></svg>
          <span>Zapier</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0A66C2"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="10">in</text></svg>
          <span>LinkedIn Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0082FB"/><text x="12" y="13" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="400" font-size="16">∞</text></svg>
          <span>Meta Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="white"/><text x="7" y="12" dominant-baseline="central" fill="#4285F4" font-family="Arial,sans-serif" font-weight="800" font-size="11">G</text><text x="13" y="12" dominant-baseline="central" fill="#EA4335" font-family="Arial,sans-serif" font-weight="800" font-size="11">o</text></svg>
          <span>Google Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="12">A</text></svg>
          <span>Apollo</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#6D2EFA"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="10">M</text></svg>
          <span>Make</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#4F6EF7"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">I</text></svg>
          <span>Instantly</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#059669"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="9">SL</text></svg>
          <span>Smartlead</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1C1C1C"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="#FFD600" font-family="Arial,sans-serif" font-weight="800" font-size="12">C</text></svg>
          <span>Close</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#C8202C"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">Z</text></svg>
          <span>Zoho</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A1A2E"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="#818cf8" font-family="Arial,sans-serif" font-weight="800" font-size="12">A</text></svg>
          <span>Attio</span>
        </div>

        <!-- DUPLICATE SET for seamless loop -->

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF7A59"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="9">HS</text></svg>
          <span>HubSpot</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF4A00"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">Z</text></svg>
          <span>Zapier</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0A66C2"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="10">in</text></svg>
          <span>LinkedIn Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#0082FB"/><text x="12" y="13" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="400" font-size="16">∞</text></svg>
          <span>Meta Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="white"/><text x="7" y="12" dominant-baseline="central" fill="#4285F4" font-family="Arial,sans-serif" font-weight="800" font-size="11">G</text><text x="13" y="12" dominant-baseline="central" fill="#EA4335" font-family="Arial,sans-serif" font-weight="800" font-size="11">o</text></svg>
          <span>Google Ads</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#7C3AED"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="12">A</text></svg>
          <span>Apollo</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#6D2EFA"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="10">M</text></svg>
          <span>Make</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#4F6EF7"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">I</text></svg>
          <span>Instantly</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#059669"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="9">SL</text></svg>
          <span>Smartlead</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1C1C1C"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="#FFD600" font-family="Arial,sans-serif" font-weight="800" font-size="12">C</text></svg>
          <span>Close</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#C8202C"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-weight="800" font-size="13">Z</text></svg>
          <span>Zoho</span>
        </div>

        <div class="brand-chip">
          <svg width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1A1A2E"/><text x="12" y="12" dominant-baseline="central" text-anchor="middle" fill="#818cf8" font-family="Arial,sans-serif" font-weight="800" font-size="12">A</text></svg>
          <span>Attio</span>
        </div>

      </div>
    </div>

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
    padding-top: 120px;
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
    font-size: clamp(36px, 3.8vw, 64px);
    font-weight: 800;
    line-height: 1.03;
    letter-spacing: -0.03em;
    color: white;
    margin-bottom: 24px;
  }

  /* removed */

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
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 11px 11px 11px 24px;
    width: calc(100vw - 80px);
    max-width: 1080px;
    overflow: hidden;
  }

  .works-label {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .marquee-clip {
    flex: 1;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
  }

  .marquee-track {
    display: flex;
    align-items: center;
    gap: 32px;
    width: max-content;
    animation: scroll-brands 38s linear infinite;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  @keyframes scroll-brands {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .brand-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .brand-chip span {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.6);
    white-space: nowrap;
  }

  .brand-chip svg {
    flex-shrink: 0;
    border-radius: 5px;
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
    flex-shrink: 0;
    margin-left: 4px;
  }

  .works-cta:hover { opacity: 0.85; }

  @media (max-width: 768px) {
    h1 { font-size: 38px; }
    .works-with-bar {
      bottom: 20px;
      width: calc(100vw - 32px);
      padding: 10px 10px 10px 16px;
      gap: 12px;
    }
    .works-label { display: none; }
  }
</style>
