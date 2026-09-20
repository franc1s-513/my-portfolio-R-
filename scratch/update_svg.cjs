const fs = require('fs');

const oldSvg = fs.readFileSync('src/assets/lanyard/id-front.svg', 'utf8');
const base64Match = oldSvg.match(/href="(data:image\/jpeg;base64,[^"]+)"/);
if (!base64Match) {
  console.error('Could not find base64 image in id-front.svg');
  process.exit(1);
}
const base64Img = base64Match[1];

const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
    <clipPath id="circleClip">
      <circle cx="200" cy="135" r="76" />
    </clipPath>
  </defs>

  <!-- Card Body (Smooth Rounded Rectangle) -->
  <rect width="400" height="600" fill="#f8fafc" rx="24" ry="24" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Deep Navy Header Banner -->
  <path d="M0,24 Q0,0 24,0 L376,0 Q400,0 400,24 L400,135 L0,135 Z" fill="#0f172a" />
  
  <!-- Punched Lanyard Slot (Realistic attachment hole for clip) -->
  <g>
    <rect x="160" y="16" width="80" height="15" rx="7.5" fill="#050811" stroke="#334155" stroke-width="2" />
    <rect x="162" y="18" width="76" height="3" rx="1.5" fill="#1e293b" opacity="0.6"/>
  </g>

  <!-- Gold Accent Stripe -->
  <rect y="132" width="400" height="4" fill="#D4AF37" />

  <!-- Security Hologram / Company Pill Top Right -->
  <text x="360" y="32" font-family="'Space Mono', monospace, sans-serif" font-size="10" font-weight="700" fill="#94a3b8" text-anchor="end" letter-spacing="1.5">DEV·ID</text>

  <!-- Profile Image Ring & Photo -->
  <circle cx="200" cy="135" r="80" fill="#ffffff" stroke="#D4AF37" stroke-width="4" filter="url(#cardShadow)"/>
  <image href="${base64Img}" x="124" y="59" width="152" height="152" clip-path="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />

  <!-- Full Name -->
  <text x="200" y="252" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">
    FRANCIS FERNANDO V
  </text>

  <!-- Standardized Job Title matching About Page -->
  <text x="200" y="280" font-family="'Space Mono', 'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#0284c7" text-anchor="middle" letter-spacing="2">
    FULL-STACK &amp; AI DEVELOPER
  </text>

  <!-- Elegant Hairline Divider -->
  <line x1="50" y1="305" x2="350" y2="305" stroke="#cbd5e1" stroke-width="1.5" />

  <!-- Key Badges & Clean Identity Metadata -->
  <g font-family="'Inter', system-ui, sans-serif" text-anchor="middle">
    <!-- Status Chip -->
    <rect x="110" y="325" width="180" height="26" rx="13" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.2"/>
    <circle cx="128" cy="338" r="4" fill="#10b981"/>
    <text x="206" y="342" font-family="'Space Mono', monospace" font-size="10.5" font-weight="700" fill="#065f46" letter-spacing="1">
      OPEN FOR WORK · IST
    </text>

    <!-- Core Stack Summary -->
    <text x="200" y="388" font-size="12" font-weight="700" fill="#334155" letter-spacing="0.5">
      REACT · NODE · PYTHON · PYTORCH
    </text>
    <text x="200" y="412" font-size="11.5" font-weight="600" fill="#64748b" letter-spacing="0.5">
      KSR COLLEGE OF ENGINEERING
    </text>
    <text x="200" y="434" font-size="11" font-weight="600" fill="#94a3b8" letter-spacing="0.5">
      TAMIL NADU, INDIA
    </text>
  </g>

  <!-- Stylized Silicon Security Chip & Barcode -->
  <g transform="translate(60, 460)">
    <!-- Microchip Graphic -->
    <rect x="0" y="0" width="46" height="36" rx="5" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="15" y1="0" x2="15" y2="36" stroke="#94a3b8" stroke-width="1.2"/>
    <line x1="31" y1="0" x2="31" y2="36" stroke="#94a3b8" stroke-width="1.2"/>
    <line x1="0" y1="18" x2="46" y2="18" stroke="#94a3b8" stroke-width="1.2"/>
    <circle cx="23" cy="18" r="4" fill="#D4AF37"/>
    
    <!-- Access Code & Barcode Lines -->
    <g transform="translate(64, 4)">
      <rect x="0" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="6" y="0" width="5" height="28" fill="#1e293b"/>
      <rect x="14" y="0" width="2" height="28" fill="#1e293b"/>
      <rect x="19" y="0" width="6" height="28" fill="#1e293b"/>
      <rect x="28" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="34" y="0" width="2" height="28" fill="#1e293b"/>
      <rect x="39" y="0" width="7" height="28" fill="#1e293b"/>
      <rect x="49" y="0" width="4" height="28" fill="#1e293b"/>
      <rect x="56" y="0" width="2" height="28" fill="#1e293b"/>
      <rect x="61" y="0" width="6" height="28" fill="#1e293b"/>
      <rect x="70" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="76" y="0" width="8" height="28" fill="#1e293b"/>
      <rect x="87" y="0" width="2" height="28" fill="#1e293b"/>
      <rect x="92" y="0" width="5" height="28" fill="#1e293b"/>
      <rect x="100" y="0" width="4" height="28" fill="#1e293b"/>
      <rect x="107" y="0" width="6" height="28" fill="#1e293b"/>
      <rect x="116" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="122" y="0" width="4" height="28" fill="#1e293b"/>
      <rect x="129" y="0" width="8" height="28" fill="#1e293b"/>
      <rect x="140" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="146" y="0" width="5" height="28" fill="#1e293b"/>
      <rect x="154" y="0" width="2" height="28" fill="#1e293b"/>
      <rect x="159" y="0" width="6" height="28" fill="#1e293b"/>
      <rect x="168" y="0" width="4" height="28" fill="#1e293b"/>
      <rect x="175" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="181" y="0" width="7" height="28" fill="#1e293b"/>
      <rect x="191" y="0" width="3" height="28" fill="#1e293b"/>
      <rect x="197" y="0" width="5" height="28" fill="#1e293b"/>
      <rect x="205" y="0" width="4" height="28" fill="#1e293b"/>
      <rect x="212" y="0" width="2" height="28" fill="#1e293b"/>
    </g>
  </g>

  <!-- Deep Navy Footer Bar -->
  <path d="M0,545 L400,545 L400,576 Q400,600 376,600 L24,600 Q0,600 0,576 Z" fill="#0f172a" />
  <text x="200" y="578" font-family="'Space Mono', monospace, sans-serif" font-size="13" font-weight="900" fill="#D4AF37" text-anchor="middle" letter-spacing="4">
    VERIFIED IDENTITY · 2026
  </text>
</svg>`;

fs.writeFileSync('src/assets/lanyard/id-front.svg', newSvg, 'utf8');
console.log('Successfully written improved id-front.svg');
