<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let canvas;

  onMount(() => {
    let w = window.innerWidth;
    let h = window.innerHeight;

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 100);
    camera.position.set(0, 3, 20);
    camera.lookAt(0, 0, 0);

    // Renderer — transparent so page bg shows through
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 0.10));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-5, 9, 7);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x818cf8, 0.35);
    rimLight.position.set(6, -3, -5);
    scene.add(rimLight);

    // MESH GRID
    const SEG = 24;
    const planeGeo = new THREE.PlaneGeometry(42, 24, SEG, SEG);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.058,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI * 0.36;
    plane.position.set(0, -5, -3);
    scene.add(plane);

    const posAttr = planeGeo.attributes.position;
    const origX = new Float32Array(posAttr.count);
    const origZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      origX[i] = posAttr.getX(i);
      origZ[i] = posAttr.getZ(i);
    }

    // MAIN ORB
    const orbGeo = new THREE.SphereGeometry(2.4, 64, 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x9095f8,
      emissive: new THREE.Color(0x4338ca),
      emissiveIntensity: 0.28,
      roughness: 0.12,
      metalness: 0.06,
    });
    const mainOrb = new THREE.Mesh(orbGeo, orbMat);
    mainOrb.position.set(0, -0.5, 1.5);
    scene.add(mainOrb);
    const orbGlow = new THREE.PointLight(0x6366f1, 5, 16);
    mainOrb.add(orbGlow);

    // GRAY SPHERES
    const grayMat = new THREE.MeshStandardMaterial({
      color: 0xb2b4c4,
      roughness: 0.22,
      metalness: 0.04,
    });
    const graySphereData = [
      { p: [-7.8,  2.2, -1.0], r: 1.15 },
      { p: [-4.8,  5.0, -3.5], r: 0.62 },
      { p: [ 7.5,  1.8, -2.0], r: 0.95 },
      { p: [ 5.8,  4.2, -4.5], r: 0.46 },
      { p: [-11.0, 0.2, -1.5], r: 1.42 },
      { p: [ 9.8, -0.5, -2.5], r: 0.82 },
      { p: [ 11.0, 2.8, -4.5], r: 0.40 },
      { p: [-1.0,  4.0, -0.5], r: 0.30 },
      { p: [ 2.8, -2.8,  0.5], r: 0.24 },
      { p: [-5.5, -2.5, -1.0], r: 0.55 },
    ];
    const grayMeshes = graySphereData.map(({ p, r }) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), grayMat.clone());
      mesh.position.set(p[0], p[1], p[2]);
      scene.add(mesh);
      return { mesh, base: [...p] };
    });

    // ANIMATION
    let animId;
    const startTime = Date.now();

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = (Date.now() - startTime) * 0.001;

      // Wave displacement on mesh vertices
      for (let i = 0; i < posAttr.count; i++) {
        const x = origX[i];
        const z = origZ[i];
        const y = Math.sin(x * 0.32 + t * 0.52) * 0.52
                + Math.cos(z * 0.26 + t * 0.40) * 0.38
                + Math.sin((x + z) * 0.18 + t * 0.35) * 0.24;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      // Float main orb
      mainOrb.position.y = -0.5 + Math.sin(t * 0.30) * 0.20;
      mainOrb.position.x = Math.sin(t * 0.20) * 0.14;

      // Float gray spheres
      grayMeshes.forEach(({ mesh, base }, i) => {
        const ph = i * 0.92;
        mesh.position.x = base[0] + Math.sin(t * 0.26 + ph) * 0.32;
        mesh.position.y = base[1] + Math.cos(t * 0.21 + ph * 1.3) * 0.26;
      });

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
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
