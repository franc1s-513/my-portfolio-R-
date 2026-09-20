import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Stars, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Award, Calendar, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import * as THREE from "three";

import { DEFAULT_MILESTONES } from "../data/milestones";

// Preload the Eywa tree model
useGLTF.preload("/eywa_tree.glb");

// ─── Helper: Radial Alpha Map for fading ground edges ──────────────────────────
const createRadialAlpha = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // solid center
  gradient.addColorStop(0.65, "rgba(255, 255, 255, 0.95)"); // mostly solid under roots
  gradient.addColorStop(0.95, "rgba(255, 255, 255, 0)"); // smooth fade out at edge
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
};

// ─── Eywa Tree (Original Bark + Glowing Strands + Float Bob) ──────────────────
function EywaTree({ onReady }) {
  const { scene } = useGLTF("/eywa_tree.glb");
  const groupRef = useRef();
  const [treeTransform, setTreeTransform] = useState({ scale: 1, offsetY: 0, height: 12 });

  // Clone the scene so we don't permanently mutate the cached GLTF materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);

    // Target: fill the marked rectangle — use 11 world units of height
    const targetH = 11;
    const s = targetH / size.y;
    // Shift so the base sits at y=0, then bring it down slightly (-1.2 units)
    const offsetY = (-box.min.y * s) - 1.2;

    setTreeTransform({ scale: s, offsetY, height: size.y * s });

    const treeMinY = box.min.y;
    const treeRangeY = size.y;

    // Traverse and selectively apply glowing materials to leaves/strands only
    clone.traverse((child) => {
      if (!child.isMesh) return;

      const matName = child.material?.name || "";
      
      const meshBox = new THREE.Box3().setFromObject(child);
      const sizeX = meshBox.max.x - meshBox.min.x;
      const sizeZ = meshBox.max.z - meshBox.min.z;
      
      // Hide the massive flat ground plane completely (we'll replace it with a custom circular island)
      if (sizeX > treeRangeY * 1.5 && sizeZ > treeRangeY * 1.5) {
        child.visible = false;
        return;
      }

      // Keep original bark and rock materials
      if (matName.includes("Bark") || matName.includes("blinn") || matName.includes("lambert")) {
        // Just make sure it reacts nicely to our lighting
        if (child.material) {
          child.material.needsUpdate = true;
        }
        return;
      }

      // For leaves and hanging strands, apply the glowing gradient
      const meshCenterY = (meshBox.min.y + meshBox.max.y) / 2;
      const t = Math.max(0, Math.min(1, (meshCenterY - treeMinY) / treeRangeY));

      let hexColor;
      if (t < 0.10) {
        hexColor = 0x00e5d0; // teal
      } else if (t < 0.28) {
        hexColor = 0x22d3ee; // bright teal
      } else if (t < 0.42) {
        hexColor = 0x9333ea; // deep violet
      } else if (t < 0.58) {
        hexColor = 0xd946ef; // fuchsia
      } else if (t < 0.72) {
        hexColor = 0xf0abfc; // soft pink
      } else if (t < 0.86) {
        hexColor = 0xf9a8d4; // rose-pink
      } else {
        hexColor = 0xfce7f3; // near-white lavender
      }

      child.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hexColor),
        transparent: true,
        opacity: 0.95, // slight transparency for soft look
        depthWrite: true,
      });
    });

    return clone;
  }, [scene]);

  // Float bob + gentle sway
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth vertical float: ±0.28 units, 4-second cycle
    groupRef.current.position.y = treeTransform.offsetY + Math.sin(t * 0.55) * 0.28;
    // Very slow Y-axis sway
    groupRef.current.rotation.y = Math.sin(t * 0.045) * 0.022;
  });

  useEffect(() => {
    onReady && onReady({ scale: treeTransform.scale, offsetY: treeTransform.offsetY, height: treeTransform.height });
  }, [treeTransform, onReady]);

  const sc = treeTransform.scale || 1;
  const h = treeTransform.height || 11;
  
  const alphaMap = useMemo(() => createRadialAlpha(), []);

  return (
    <group ref={groupRef} position={[0, treeTransform.offsetY, 0]} scale={[sc, sc, sc]}>
      {/* Floating Island Base (The Red Land) */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[h * 0.38 / sc, 64]} />
        <meshStandardMaterial 
          color="#500724" // Deep red/purple earth
          alphaMap={alphaMap}
          transparent={true}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      <primitive object={clonedScene} />

      {/* Crown bloom — blazing white like reference */}
      <pointLight position={[0, h * 0.85 / sc, 0]} color="#ffffff" intensity={30} distance={h} decay={1.4} />
      {/* Pink upper halo */}
      <pointLight position={[0, h * 0.75 / sc, 0]} color="#f0abfc" intensity={16} distance={h * 0.8} decay={1.5} />
      <pointLight position={[-1.2, h * 0.72 / sc, 1]} color="#e879f9" intensity={12} distance={h * 0.7} decay={1.7} />
      <pointLight position={[1.2, h * 0.72 / sc, -1]} color="#d946ef" intensity={12} distance={h * 0.7} decay={1.7} />
      {/* Mid violet */}
      <pointLight position={[0, h * 0.50 / sc, 0]} color="#a855f7" intensity={10} distance={h * 0.55} decay={1.9} />
      <pointLight position={[1.5, h * 0.45 / sc, 1.5]} color="#9333ea" intensity={8} distance={h * 0.5} decay={2} />
      <pointLight position={[-1.5, h * 0.45 / sc, -1.5]} color="#7c3aed" intensity={8} distance={h * 0.5} decay={2} />
      {/* Lower pink */}
      <pointLight position={[0, h * 0.28 / sc, 0]} color="#c026d3" intensity={8} distance={h * 0.4} decay={2} />
      {/* Teal roots */}
      <pointLight position={[0, h * 0.06 / sc, 0]} color="#06b6d4" intensity={10} distance={h * 0.3} decay={2} />
      <pointLight position={[1, h * 0.06 / sc, 1]} color="#00e5d0" intensity={6} distance={h * 0.2} decay={2} />
      <pointLight position={[-1, h * 0.06 / sc, -1]} color="#22d3ee" intensity={6} distance={h * 0.2} decay={2} />
    </group>
  );
}

// ─── Floating Milestone Beacon ────────────────────────────────────────────────
function MilestoneBeacon({ milestone, treeInfo, onHover, onUnhover, onSelect }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Derive world position from treeRatio + actual tree bounding box
  const pos = useMemo(() => {
    if (!treeInfo) return [0, 2, 0];
    const { scale, offsetY, height } = treeInfo;
    // treeRatio: [xFraction of width, yFraction of height, zFraction of depth]
    // tree spans roughly ±3.5 in X/Z at full scale — approximate
    const spread = (height / 12) * 3.5;
    return [
      milestone.treeRatio[0] * spread,
      offsetY + milestone.treeRatio[1] * height,
      milestone.treeRatio[2] * spread,
    ];
  }, [treeInfo, milestone]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    // Float up/down gently
    groupRef.current.position.y = pos[1] + Math.sin(t * 0.85 + pos[0]) * 0.14;
    
    // Core pulsing effect
    if (coreRef.current) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);
      coreRef.current.material.emissiveIntensity = hovered ? 2.2 : 1.2 + pulse * 0.5;
      const s = hovered ? 1.4 : 1 + pulse * 0.08;
      coreRef.current.scale.setScalar(s);
    }
    
    // Slow ring tilt wobble
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = (Math.PI / 2.2) + Math.sin(t * 0.5) * 0.05;
      ring1Ref.current.rotation.y = (Math.PI / 10) + Math.cos(t * 0.5) * 0.05;
      ring1Ref.current.rotation.z = t * 0.1; // slow spin
    }
    
    // Tiny moon orbiting the planet
    if (ring2Ref.current) {
      const orbitSpeed = 0.8;
      const radius = 0.42;
      ring2Ref.current.position.x = Math.cos(t * orbitSpeed + pos[0]) * radius;
      ring2Ref.current.position.y = Math.sin(t * orbitSpeed * 1.2) * 0.1;
      ring2Ref.current.position.z = Math.sin(t * orbitSpeed + pos[0]) * radius;
    }
  });

  const color = useMemo(() => new THREE.Color(milestone.color), [milestone.color]);

  return (
    <group 
      ref={groupRef} 
      position={[pos[0], pos[1], pos[2]]}
      scale={milestone.sizeMultiplier || 1}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); onHover(milestone); document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { setHovered(false); onUnhover(); document.body.style.cursor = "default"; }}
      onClick={(e) => { e.stopPropagation(); onSelect(milestone); }}
    >
      {/* Invisible hit sphere (extremely large to ensure easy clicking on moving target) */}
      <mesh>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshBasicMaterial transparent opacity={0.01} depthWrite={false} color="#000000" />
      </mesh>

      {/* Glowing core planet */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.05} metalness={0.6} />
      </mesh>

      {/* Saturn Planetary Ring (Dark, translucent) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, Math.PI / 10, 0]}>
        <ringGeometry args={[0.24, 0.38, 64]} />
        <meshBasicMaterial color="#0d0520" transparent opacity={0.8} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Tiny orbiting moon */}
      <mesh ref={ring2Ref}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Beacon glow light */}
      <pointLight color={milestone.color} intensity={hovered ? 5 : 2.2} distance={4} decay={2} />
    </group>
  );
}

// ─── Ambient Floating Particles (purple/violet/teal — matching reference) ──────
function FloatingParticles() {
  const pointsRef = useRef();
  const count = 320;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    // Reference palette: purple, violet, pink, white, teal
    const palette = [
      [0.53, 0.13, 0.66], // deep purple
      [0.73, 0.33, 0.83], // violet
      [0.94, 0.55, 0.96], // soft pink/orchid
      [0.96, 0.91, 1.00], // near-white lavender
      [0.02, 0.71, 0.82], // teal
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 14 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3 + 0] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.003 + Math.sin(t * 0.4 + i) * 0.001;
      arr[i * 3 + 0] += Math.sin(t * 0.25 + i * 0.8) * 0.002;
      if (arr[i * 3 + 1] > 14) arr[i * 3 + 1] = -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// ─── Camera: cinematic circular orbit ─────────────
function CameraController({ treeHeight }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const h = treeHeight || 11;
    const midY = h * 0.45; // look at mid-canopy (not the very top)

    if (!initialized.current) {
      // Frame it perfectly: look slightly below mid, pull camera back to fit 11 units tall
      camera.position.set(0, h * 0.40, h * 1.35);
      camera.lookAt(0, h * 0.40, 0);
      initialized.current = true;
    }

    // Orbit in a gentle circle around the tree
    const radius = h * 1.35;
    const speed = 0.08; // speed of rotation
    const angle = t * speed + mouse.current.x * 0.5;
    
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;
    // Height changes slightly with mouse and time
    const targetY = (h * 0.40) + mouse.current.y * -1.2 + Math.sin(t * 0.02) * 0.5;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
    camera.lookAt(0, midY, 0);
  });

  return null;
}

// ─── Loading fallback ─────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0d0520]">
      <div className="w-12 h-12 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin mb-4" />
      <p className="text-purple-300/70 text-sm font-medium tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
        Loading Eywa Tree…
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TechJourney = ({ onNavigate }) => {
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [treeInfo, setTreeInfo] = useState(null);

  const handleTreeReady = useCallback((info) => setTreeInfo(info), []);



  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#0d0520]">
      {/* ── 3D Canvas ──────────────────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 5.5, 14], fov: 52, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.95 }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
        onCreated={() => setLoaded(true)}
      >
        {/* Scene — deep purple atmosphere matching reference */}
        <color attach="background" args={["#0d0520"]} />
        <fog attach="fog" args={["#1a0535", 20, 48]} />

        {/* Lighting: violet + pink atmospheric, not blue/teal */}
        <ambientLight color="#3b0764" intensity={3.5} />
        <directionalLight position={[6, 18, 4]} color="#c026d3" intensity={2.2} />
        <directionalLight position={[-8, 10, -6]} color="#7c3aed" intensity={1.8} />
        {/* Strong violet fill from below (like reference ground fog) */}
        <pointLight position={[0, -1, 0]} color="#6b21a8" intensity={4} distance={18} decay={1.8} />
        {/* Wide pink hemisphere overhead */}
        <hemisphereLight args={["#c026d3", "#0d0520", 1.2]} />

        {/* Stars — fewer, more subtle behind purple fog */}
        <Stars
          radius={80} depth={50} count={2500}
          factor={2.8} saturation={0.4} fade speed={0.3}
        />

        {/* Camera — gets actual tree height once model loads */}
        <CameraController treeHeight={treeInfo?.height} />

        {/* Ambient floating spores */}
        <FloatingParticles />

        {/* Eywa Tree 3D model */}
        <Suspense fallback={null}>
          <EywaTree onReady={handleTreeReady} />
        </Suspense>

        {/* Milestone beacons — positioned inside tree canopy using real bounding box */}
        {DEFAULT_MILESTONES.map((m) => (
          <MilestoneBeacon
            key={m.id}
            milestone={m}
            treeInfo={treeInfo}
            onHover={setHoveredMilestone}
            onUnhover={() => setHoveredMilestone(null)}
            onSelect={(milestone) => onNavigate(`milestone-${milestone.id}`)}
          />
        ))}
      </Canvas>

      {!loaded && <LoadingScreen />}

      {/* ── Hovered beacon label ───────────────────────────────────────────── */}
      <AnimatePresence>
        {hoveredMilestone && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <div
              className="px-5 py-3 rounded-2xl backdrop-blur-2xl shadow-2xl border flex items-center gap-3"
              style={{
                background: "rgba(1, 10, 28, 0.92)",
                borderColor: hoveredMilestone.color,
                boxShadow: `0 12px 36px rgba(0,0,0,0.7), 0 0 28px ${hoveredMilestone.color}55`,
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: hoveredMilestone.color }} />
              <div>
                <div className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">{hoveredMilestone.category}</div>
                <div className="text-sm font-bold text-white">{hoveredMilestone.title}</div>
              </div>
              <span className="text-[10px] font-semibold ml-2 px-2 py-0.5 rounded-full border" style={{ color: hoveredMilestone.color, borderColor: `${hoveredMilestone.color}50`, background: `${hoveredMilestone.color}18` }}>
                Click ✦
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top header ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        <motion.div
          key="title-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-7 left-7 z-20 pointer-events-none"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full animate-pulse bg-fuchsia-400 shadow-[0_0_14px_#e879f9]" />
            <span className="text-xs font-bold tracking-[0.28em] uppercase text-fuchsia-300" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
              The Journey • Celestial Milestones
            </span>
          </div>
          <p className="text-sm text-violet-300/70 italic mt-1.5 max-w-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Approach the glowing beacons in the tree to explore each chapter.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom milestone selector ──────────────────────────────────────── */}
      <AnimatePresence>
        <motion.div 
          key="bottom-selector"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 max-w-[96vw] overflow-x-auto py-2.5 px-4 rounded-2xl backdrop-blur-2xl bg-black/50 border border-white/12 shadow-2xl"
        >
          {DEFAULT_MILESTONES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onNavigate(`milestone-${m.id}`)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider flex items-center gap-2 border cursor-pointer hover:scale-105 transition-all duration-200 shrink-0"
              style={{
                background: "rgba(5, 12, 30, 0.80)",
                borderColor: "rgba(255,255,255,0.12)",
                color: "#94a3b8",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
              <span>{m.number}. {m.title.split(":")[0].trim()}</span>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Note: The detail modal has been moved to a separate global page (MilestoneNode) for global navigation transitions */}
    </div>
  );
};

export default TechJourney;
