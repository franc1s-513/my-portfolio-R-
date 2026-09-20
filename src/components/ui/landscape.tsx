import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export const LANDSCAPE_VARIANTS = [
  'night',
  'sunrise',
  'noon',
  'sunset',
  'rain',
  'storm',
  'snow',
] as const;

export type LandscapeVariant = (typeof LANDSCAPE_VARIANTS)[number];

export interface LandscapeSceneProps {
  variant?: LandscapeVariant;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Preset color and environmental palettes
const PALETTES: Record<
  LandscapeVariant,
  {
    skyTop: string;
    skyHorizon: string;
    fog: string;
    fogDensity: number;
    terrainBase: string;
    terrainPeak: string;
    moonOrSunColor: string;
    moonOrSunPos: [number, number, number];
    lightColor: string;
    ambientColor: string;
    hasStars: boolean;
    hasMoon: boolean;
    weather?: 'rain' | 'snow';
  }
> = {
  night: {
    skyTop: '#02050e',
    skyHorizon: '#081226',
    fog: '#050c1b',
    fogDensity: 0.012,
    terrainBase: '#050b18',
    terrainPeak: '#12203d',
    moonOrSunColor: '#e3efff',
    moonOrSunPos: [32, 48, -60],
    lightColor: '#c8ddfc',
    ambientColor: '#121c32',
    hasStars: true,
    hasMoon: true,
  },
  sunrise: {
    skyTop: '#181b3a',
    skyHorizon: '#e08354',
    fog: '#533435',
    fogDensity: 0.011,
    terrainBase: '#1a1822',
    terrainPeak: '#5a3d31',
    moonOrSunColor: '#ffca9e',
    moonOrSunPos: [15, 12, -75],
    lightColor: '#ff9a5b',
    ambientColor: '#302636',
    hasStars: false,
    hasMoon: false,
  },
  noon: {
    skyTop: '#1565c0',
    skyHorizon: '#90caf9',
    fog: '#bbdefb',
    fogDensity: 0.009,
    terrainBase: '#1b431e',
    terrainPeak: '#437d36',
    moonOrSunColor: '#fffde7',
    moonOrSunPos: [0, 80, -20],
    lightColor: '#ffffff',
    ambientColor: '#546e7a',
    hasStars: false,
    hasMoon: false,
  },
  sunset: {
    skyTop: '#1c1538',
    skyHorizon: '#e65100',
    fog: '#3e1e2d',
    fogDensity: 0.012,
    terrainBase: '#1e141d',
    terrainPeak: '#542b2d',
    moonOrSunColor: '#ff8a50',
    moonOrSunPos: [-30, 14, -70],
    lightColor: '#ff7043',
    ambientColor: '#37202d',
    hasStars: false,
    hasMoon: false,
  },
  rain: {
    skyTop: '#151c24',
    skyHorizon: '#323e4a',
    fog: '#252d36',
    fogDensity: 0.018,
    terrainBase: '#0e141a',
    terrainPeak: '#1e2832',
    moonOrSunColor: '#78909c',
    moonOrSunPos: [0, 50, -50],
    lightColor: '#90a4ae',
    ambientColor: '#1c242c',
    hasStars: false,
    hasMoon: false,
    weather: 'rain',
  },
  storm: {
    skyTop: '#090d14',
    skyHorizon: '#181d28',
    fog: '#111520',
    fogDensity: 0.022,
    terrainBase: '#080a10',
    terrainPeak: '#121722',
    moonOrSunColor: '#546e7a',
    moonOrSunPos: [0, 60, -40],
    lightColor: '#78909c',
    ambientColor: '#0f141e',
    hasStars: false,
    hasMoon: false,
    weather: 'rain',
  },
  snow: {
    skyTop: '#253244',
    skyHorizon: '#8094a8',
    fog: '#5b6c7d',
    fogDensity: 0.015,
    terrainBase: '#2a3442',
    terrainPeak: '#d6e2ed',
    moonOrSunColor: '#e0eaf4',
    moonOrSunPos: [20, 45, -60],
    lightColor: '#d6e4f0',
    ambientColor: '#2b394a',
    hasStars: false,
    hasMoon: false,
    weather: 'snow',
  },
};

export const LandscapeScene: React.FC<LandscapeSceneProps> = ({
  variant = 'night',
  className = '',
  style,
  children,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const palette = useMemo(() => PALETTES[variant] || PALETTES.night, [variant]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(palette.skyTop);
    scene.fog = new THREE.FogExp2(palette.fog, palette.fogDensity);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.5, 600);
    camera.position.set(0, 9.5, 42);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(palette.ambientColor, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(palette.lightColor, 1.8);
    mainLight.position.set(...palette.moonOrSunPos);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(palette.skyHorizon, 0.8);
    rimLight.position.set(-mainLight.position.x, 20, 20);
    scene.add(rimLight);

    // --- Gradient Sky Dome ---
    const skyGeo = new THREE.SphereGeometry(260, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(palette.skyTop) },
        bottomColor: { value: new THREE.Color(palette.skyHorizon) },
        offset: { value: 15 },
        exponent: { value: 0.75 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
    });
    const skyDome = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyDome);

    // --- Star Field (Lightweight & Smooth) ---
    let starsPoints: THREE.Points | null = null;
    if (palette.hasStars) {
      const STAR_COUNT = 450;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(STAR_COUNT * 3);
      const starColors = new Float32Array(STAR_COUNT * 3);
      const starSizes = new Float32Array(STAR_COUNT);
      const starPhases = new Float32Array(STAR_COUNT);

      const colorWhite = new THREE.Color('#ffffff');
      const colorIce = new THREE.Color('#cce2ff');
      const colorCyan = new THREE.Color('#a0e6ff');
      const colorGold = new THREE.Color('#ffebb8');

      for (let i = 0; i < STAR_COUNT; i++) {
        const radius = THREE.MathUtils.randFloat(120, 240);
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        const phi = Math.acos(THREE.MathUtils.randFloat(0.12, 0.98));

        starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPos[i * 3 + 1] = radius * Math.cos(phi) + 4;
        starPos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

        starSizes[i] = THREE.MathUtils.randFloat(1.2, 3.2);
        starPhases[i] = Math.random() * Math.PI * 2;

        const rnd = Math.random();
        let starCol = colorWhite;
        if (rnd < 0.25) starCol = colorIce;
        else if (rnd < 0.35) starCol = colorCyan;
        else if (rnd < 0.5) starCol = colorGold;

        starColors[i * 3] = starCol.r;
        starColors[i * 3 + 1] = starCol.g;
        starColors[i * 3 + 2] = starCol.b;
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
      starGeo.setAttribute('phase', new THREE.BufferAttribute(starPhases, 1));

      const starMat = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });

      starsPoints = new THREE.Points(starGeo, starMat);
      scene.add(starsPoints);
    }

    // --- Luminous Moon ---
    if (palette.hasMoon) {
      const moonGeo = new THREE.SphereGeometry(6.5, 32, 32);
      const moonMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(palette.moonOrSunColor),
      });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(...palette.moonOrSunPos);
      scene.add(moonMesh);

      // Moon atmospheric halo sprite
      const haloCanvas = document.createElement('canvas');
      haloCanvas.width = 128;
      haloCanvas.height = 128;
      const hctx = haloCanvas.getContext('2d');
      if (hctx) {
        const hgrad = hctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        hgrad.addColorStop(0, 'rgba(215, 235, 255, 0.85)');
        hgrad.addColorStop(0.3, 'rgba(160, 200, 255, 0.35)');
        hgrad.addColorStop(0.6, 'rgba(90, 140, 230, 0.12)');
        hgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        hctx.fillStyle = hgrad;
        hctx.fillRect(0, 0, 128, 128);
      }
      const haloTex = new THREE.CanvasTexture(haloCanvas);
      const haloMat = new THREE.SpriteMaterial({
        map: haloTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(38, 38, 1);
      haloSprite.position.copy(moonMesh.position);
      scene.add(haloSprite);
    }

    // --- Procedural Moonlit Terrain ---
    const terrainWidth = 190;
    const terrainDepth = 190;
    const terrainSegments = 160;
    const terrainGeo = new THREE.PlaneGeometry(
      terrainWidth,
      terrainDepth,
      terrainSegments,
      terrainSegments
    );
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    // Multi-octave procedural displacement
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Distance from center
      const distFromCenter = Math.sqrt(x * x + z * z);
      const distFront = Math.max(0, z - 10);

      // 1. Distant sweeping mountain ridge
      let elevation = Math.sin(x * 0.032) * 5.2 + Math.cos(z * 0.028) * 4.8;
      // 2. Rolling hills and dunes
      elevation += Math.sin(x * 0.075 + z * 0.04) * 2.4;
      elevation += Math.cos(x * 0.14 - z * 0.11) * 1.1;

      // 3. High distant horizon mountain peaks
      if (z < -30) {
        const peakFactor = Math.min(1.0, (-30 - z) / 50);
        elevation +=
          (Math.sin(x * 0.045) * 14.0 +
            Math.cos(x * 0.09) * 6.5 +
            Math.abs(Math.sin(x * 0.08)) * 12.0) *
          peakFactor;
      }

      // 4. Foreground gentle mound (earthen pedestal for the tree)
      const pedestalRadius = Math.sqrt(x * x + Math.pow(z - 12, 2));
      if (pedestalRadius < 35) {
        const pFactor = Math.cos((pedestalRadius / 35) * (Math.PI / 2));
        elevation += pFactor * 4.8;
      }

      // Smooth front edge
      elevation -= Math.pow(distFront * 0.08, 1.8);

      pos.setY(i, elevation - 2.5);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.terrainBase),
      roughness: 0.88,
      metalness: 0.12,
      flatShading: false,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // Clean, smooth moonlit terrain surface (no spiky cones)

    // --- Weather Effects (Rain / Snow if selected) ---
    let weatherPoints: THREE.Points | null = null;
    let weatherGeo: THREE.BufferGeometry | null = null;
    if (palette.weather) {
      const W_COUNT = 3000;
      weatherGeo = new THREE.BufferGeometry();
      const wPos = new Float32Array(W_COUNT * 3);
      for (let i = 0; i < W_COUNT; i++) {
        wPos[i * 3] = THREE.MathUtils.randFloat(-70, 70);
        wPos[i * 3 + 1] = THREE.MathUtils.randFloat(0, 70);
        wPos[i * 3 + 2] = THREE.MathUtils.randFloat(-50, 45);
      }
      weatherGeo.setAttribute('position', new THREE.BufferAttribute(wPos, 3));
      const wMat = new THREE.PointsMaterial({
        color: palette.weather === 'snow' ? '#ffffff' : '#a0c4e8',
        size: palette.weather === 'snow' ? 1.6 : 0.9,
        transparent: true,
        opacity: 0.65,
      });
      weatherPoints = new THREE.Points(weatherGeo, wMat);
      scene.add(weatherPoints);
    }

    // --- Pointer & Parallax Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let orbitAngleX = 0;
    let orbitAngleY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = nx;
      targetMouseY = ny;

      if (isDragging) {
        const dx = e.clientX - prevPointerX;
        const dy = e.clientY - prevPointerY;
        orbitAngleX += dx * 0.003;
        orbitAngleY = Math.max(-0.2, Math.min(0.25, orbitAngleY + dy * 0.002));
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer parallax lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base camera position with parallax tilt
      const camBaseX = mouseX * 5.5 + Math.sin(orbitAngleX) * 35;
      const camBaseY = 9.5 + mouseY * 2.8 + orbitAngleY * 20;
      const camBaseZ = 42 * Math.cos(orbitAngleX);

      camera.position.x = camBaseX;
      camera.position.y = camBaseY;
      camera.position.z = Math.max(28, camBaseZ);

      // Look slightly above the tree pedestal center
      camera.lookAt(0, 6.0, -8);

      // Animate Star Twinkle Shader
      if (starsPoints) {
        const starMat = starsPoints.material as THREE.ShaderMaterial;
        if (starMat.uniforms?.uTime) {
          starMat.uniforms.uTime.value = elapsedTime;
        }
      }

      // Animate Weather
      if (weatherPoints && weatherGeo) {
        const positions = weatherGeo.attributes.position.array as Float32Array;
        const fallSpeed = palette.weather === 'snow' ? 0.25 : 1.2;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= fallSpeed;
          if (positions[i] < -2) {
            positions[i] = 70;
          }
        }
        weatherGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      skyGeo.dispose();
      skyMat.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      renderer.dispose();
    };
  }, [palette]);

  return (
    <div
      ref={mountRef}
      className={`landscape-scene relative w-full h-full overflow-hidden ${className}`}
      style={{ background: palette.skyTop, ...style }}
    >
      {children}
    </div>
  );
};

export default LandscapeScene;
