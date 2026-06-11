<script>
  // no props needed
</script>

<nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
  <a href="/" class="brand-pill">
    <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g fill="white">
        <circle cx="4"  cy="4"  r="3"><animate attributeName="opacity" values="0.9;0.12;0.9"  dur="2.1s" begin="-2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="12" cy="4"  r="3"><animate attributeName="opacity" values="0.15;0.85;0.15" dur="1.5s" begin="-0.1s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="20" cy="4"  r="3"><animate attributeName="opacity" values="0.5;0.4;0.5"   dur="3.1s" begin="-0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="28" cy="4"  r="3"><animate attributeName="opacity" values="0.15;0.8;0.15" dur="1.9s" begin="-2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="4"  cy="12" r="3"><animate attributeName="opacity" values="0.7;0.08;0.7"  dur="1.7s" begin="-2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="12" cy="12" r="3"><animate attributeName="opacity" values="0.2;0.3;0.2"   dur="2.0s" begin="-3.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="20" cy="12" r="3"><animate attributeName="opacity" values="0.7;0.92;0.7"  dur="2.7s" begin="-0.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="28" cy="12" r="3"><animate attributeName="opacity" values="0.18;0.82;0.18" dur="1.8s" begin="-1.0s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="4"  cy="20" r="3"><animate attributeName="opacity" values="0.25;0.68;0.25" dur="1.3s" begin="-3.0s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="12" cy="20" r="3"><animate attributeName="opacity" values="0.58;0.78;0.58" dur="1.7s" begin="-3.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="20" cy="20" r="3"><animate attributeName="opacity" values="0.72;0.84;0.72" dur="2.6s" begin="-1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="28" cy="20" r="3"><animate attributeName="opacity" values="0.7;0.18;0.7"   dur="3.0s" begin="-0.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="4"  cy="28" r="3"><animate attributeName="opacity" values="0.17;0.62;0.17" dur="3.0s" begin="-0.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="12" cy="28" r="3"><animate attributeName="opacity" values="0.85;0.92;0.85" dur="1.7s" begin="-2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="20" cy="28" r="3"><animate attributeName="opacity" values="0.73;0.18;0.73" dur="2.0s" begin="-0.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
        <circle cx="28" cy="28" r="3"><animate attributeName="opacity" values="0.62;0.24;0.62" dur="2.4s" begin="-2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/></circle>
      </g>
    </svg>
    <span class="brand-name">CHURNAUT</span>
  </a>

  <div class="flex items-center gap-8">
    <a href="#pricing" class="nav-link">Pricing</a>
    <a href="https://app.churnaut.com/login" class="nav-link">Log in</a>
    <a href="https://app.churnaut.com/register" class="nav-cta">Try now ↗</a>
  </div>
</nav>

<style>
  nav {
    background: transparent;
  }

  .brand-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 7px 16px 7px 10px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    text-decoration: none;
    transition: border-color 0.2s;
  }

  .brand-pill:hover {
    border-color: rgba(255,255,255,0.14);
  }

  .brand-name {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.22em;
    color: white;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: white;
  }

  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 9px 20px;
    border-radius: 100px;
    background: white;
    color: #0a0a0a;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .nav-cta:hover {
    opacity: 0.85;
  }
</style>
