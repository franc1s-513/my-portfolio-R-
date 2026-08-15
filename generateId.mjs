import fs from 'fs';
import path from 'path';

const photoPath = './src/assets/photos/profile.jpg';
const photoBase64 = fs.readFileSync(photoPath, { encoding: 'base64' });
const photoDataUri = `data:image/jpeg;base64,${photoBase64}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <!-- Background -->
  <rect width="400" height="600" fill="#f8fafc" rx="20" ry="20" />
  
  <!-- Header Bar -->
  <rect width="400" height="150" fill="#0ea5e9" rx="20" ry="20" />
  <rect y="100" width="400" height="50" fill="#0ea5e9" />

  <!-- Profile Image -->
  <g transform="translate(125, 60)">
    <circle cx="75" cy="75" r="78" fill="#ffffff" />
    <clipPath id="circleClip">
      <circle cx="75" cy="75" r="75" />
    </clipPath>
    <image href="${photoDataUri}" width="150" height="150" clip-path="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Name -->
  <text x="200" y="270" font-family="system-ui, sans-serif" font-size="32" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="2">
    FRANCIS
  </text>
  <text x="200" y="300" font-family="system-ui, sans-serif" font-size="18" font-weight="600" fill="#0ea5e9" text-anchor="middle" letter-spacing="4">
    SOFTWARE ENGINEER
  </text>

  <!-- Divider -->
  <line x1="50" y1="330" x2="350" y2="330" stroke="#e2e8f0" stroke-width="2" />

  <!-- Details -->
  <g font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">
    <!-- College -->
    <text x="200" y="380" font-size="16" font-weight="800" fill="#0f172a">KSR COLLEGE OF ENGINEERING</text>
    
    <!-- Email -->
    <text x="200" y="440">francisfernandov07@gmail.com</text>
    
    <!-- Phone -->
    <text x="200" y="490">+91 [PHONE NUMBER]</text>
  </g>

  <!-- Footer -->
  <rect y="550" width="400" height="50" fill="#020617" rx="20" ry="20" />
  <rect y="550" width="400" height="20" fill="#020617" />
  <text x="200" y="580" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="4">
    ACCESS GRANTED
  </text>
</svg>`;

fs.writeFileSync('./src/assets/lanyard/id-front.svg', svg);
console.log('Successfully generated id-front.svg');
