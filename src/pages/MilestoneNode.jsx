import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, ContactShadows, Text, Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";
import { DEFAULT_MILESTONES } from "../data/milestones";
import { ChevronLeft, ChevronDown, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "../components/LightRays/LightRays";

const S = 6.5; // Scaled up significantly for better typography
const SERIF_FONT = "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display@4.5.10/files/playfair-display-latin-700-normal.woff";
const SERIF_REGULAR = "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display@4.5.10/files/playfair-display-latin-400-normal.woff";
const COLOR_TITLE = "#1e3a8a"; // Deep navy
const COLOR_TEXT = "#334155"; // Rich slate
const COLOR_ACCENT = "#92400e"; // Deep gold/bronze

function Face({ children, color, offsetPos, rotateAxis = "x", closedAngle = 0, isCover = false, milestone, explodeDir = [0,0,0] }) {
  const hingeRef = useRef();
  const scroll = useScroll();
  const htmlRef = useRef();

  useFrame(() => {
    if (!hingeRef.current || !scroll) return;
    const offset = scroll.offset; 
    
    let unfold = 0, explode = 0;
    if (offset < 0.33) {
      unfold = 1 - Math.pow(1 - (offset / 0.33), 3);
    } else if (offset < 0.66) {
      unfold = 1;
      let t = (offset - 0.33) / 0.33;
      explode = Math.sin(t * Math.PI); // 0 -> 1 -> 0
    } else {
      unfold = 1 - Math.pow((offset - 0.66) / 0.34, 3);
    }
    
    const currentAngle = THREE.MathUtils.lerp(closedAngle, 0, unfold);
    
    if (rotateAxis === "x") hingeRef.current.rotation.x = currentAngle;
    if (rotateAxis === "y") hingeRef.current.rotation.y = currentAngle;

    const GAP = 2.0;
    hingeRef.current.position.x = offsetPos.hinge[0] + explodeDir[0] * explode * GAP;
    hingeRef.current.position.y = offsetPos.hinge[1] + explodeDir[1] * explode * GAP;
    hingeRef.current.position.z = offsetPos.hinge[2] + explodeDir[2] * explode * GAP;
  });

  return (
    <group ref={hingeRef} position={offsetPos.hinge}>
      <group position={offsetPos.mesh}>
        {/* OUTSIDE FACE (Tinted, faces outward when closed) */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[S, S]} />
          <meshStandardMaterial color={color} roughness={0.7} side={THREE.FrontSide} />
          
          {/* Subtle Crease line on the outside edge */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(S, S)]} />
            <lineBasicMaterial color="#000000" transparent opacity={0.1} />
          </lineSegments>

          {isCover && milestone && (
            <group position={[0, 0, 0.02]}>
              <Text position={[0, 1.2, 0]} fontSize={0.2} letterSpacing={0.15} color="rgba(255,255,255,0.8)" anchorY="bottom">
                ROLE
              </Text>
              <Text position={[0, 0.7, 0]} fontSize={0.4} letterSpacing={0.1} color="#ffffff" font={SERIF_FONT} anchorY="bottom">
                {milestone.badge}
              </Text>
              <Text position={[0, 0, 0]} fontSize={0.8} color="#ffffff" maxWidth={S * 0.8} textAlign="center" anchorY="middle" font={SERIF_FONT}>
                {milestone.title}
              </Text>
              <Text position={[0, -1.2, 0]} fontSize={0.25} letterSpacing={0.1} color="rgba(255,255,255,0.9)" anchorY="top">
                {milestone.category.toUpperCase()}
              </Text>
            </group>
          )}
        </mesh>

        {/* INSIDE FACE (Parchment, faces inward, holds the text) */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[S, S]} />
          <meshStandardMaterial color="#fdfbf7" roughness={0.9} side={THREE.FrontSide} />
          
          <group position={[0, 0, 0.05]}>
            {children}
          </group>
        </mesh>
      </group>
    </group>
  );
}

function UnfoldingBox({ milestone }) {
  const c = milestone.color || "#4f46e5"; // Fallback color
  const layout = milestone.customLayout;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
      {/* FACE 0: Center (Base). Static. Inside points UP to camera. */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[S, S]} />
          <meshStandardMaterial color={c} roughness={0.7} side={THREE.FrontSide} />
          <lineSegments><edgesGeometry args={[new THREE.PlaneGeometry(S, S)]} /><lineBasicMaterial color="#000000" transparent opacity={0.1} /></lineSegments>
        </mesh>
        
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[S, S]} />
          <meshStandardMaterial color="#fdfbf7" roughness={0.9} side={THREE.FrontSide} />
          <group position={[0, 0, 0.05]}>
            {layout?.center?.image ? (
              <Suspense fallback={
                <mesh>
                  <planeGeometry args={[S * 0.8, S * 0.8]} />
                  <meshBasicMaterial color="#e2e8f0" />
                </mesh>
              }>
                <DreiImage url={layout.center.image} scale={[S * 0.8, S * 0.8]} transparent />
              </Suspense>
            ) : (
              <group>
                <Text position={[0, 1.5, 0]} fontSize={0.3} letterSpacing={0.1} color={COLOR_ACCENT} opacity={0.9} anchorY="bottom">
                  {milestone.category.toUpperCase()}
                </Text>
                <Text position={[0, 0, 0]} fontSize={0.9} color={COLOR_TITLE} maxWidth={S * 0.8} textAlign="center" anchorY="middle" font={SERIF_FONT}>
                  {milestone.title}
                </Text>
                <Text position={[0, -1.5, 0]} fontSize={0.35} color={COLOR_TEXT} opacity={0.8} anchorY="top" font={SERIF_REGULAR}>
                  {milestone.date}
                </Text>
              </group>
            )}
          </group>
        </mesh>
      </group>

      {/* FACE 1: Bottom Flap (COVER) */}
      <Face 
        color={c} 
        rotateAxis="x" closedAngle={Math.PI / 2} 
        offsetPos={{ hinge: [0, -S/2, 0], mesh: [0, -S/2, 0] }}
        explodeDir={[0, -1, 0]}
        isCover={true}
        milestone={milestone}
      >
        <Text position={[0, 1.5, 0]} fontSize={0.5} letterSpacing={0.05} color={COLOR_TITLE} font={SERIF_FONT} anchorY="bottom">
          THE STORY
        </Text>
        <Text position={[0, 0.5, 0]} fontSize={0.3} color={COLOR_TEXT} font={SERIF_REGULAR} maxWidth={S * 0.8} textAlign="center" anchorY="top" lineHeight={1.6}>
          {milestone.description}
        </Text>
      </Face>

      {/* FACE 2: Top Flap */}
      <Face 
        color={c} 
        rotateAxis="x" closedAngle={-Math.PI / 2} 
        offsetPos={{ hinge: [0, S/2, 0], mesh: [0, S/2, 0] }}
        explodeDir={[0, 1, 0]}
      >
        <Text position={[0, 1.5, 0]} fontSize={0.5} letterSpacing={0.05} color={COLOR_TITLE} font={SERIF_FONT} anchorY="bottom">
          {(layout?.top?.title || "Key Role").toUpperCase()}
        </Text>
        {layout?.top?.content ? (
          <Text position={[0, 0.5, 0]} fontSize={0.3} color={COLOR_TEXT} font={SERIF_REGULAR} maxWidth={S * 0.8} textAlign="left" anchorY="top" anchorX="center" lineHeight={1.6}>
            {layout.top.content}
          </Text>
        ) : (
          <Text position={[0, 0, 0]} fontSize={0.4} color={c} anchorY="middle" letterSpacing={0.1} font={SERIF_FONT}>
            {milestone.badge}
          </Text>
        )}
      </Face>

      {/* FACE 3: Left Flap */}
      <Face 
        color={c} 
        rotateAxis="y" closedAngle={-Math.PI / 2} 
        offsetPos={{ hinge: [-S/2, 0, 0], mesh: [-S/2, 0, 0] }}
        explodeDir={[-1, 0, 0]}
      >
        <Text position={[0, 1.8, 0]} fontSize={0.5} letterSpacing={0.05} color={COLOR_TITLE} font={SERIF_FONT} anchorY="bottom">
          {(layout?.left?.title || "Highlights").toUpperCase()}
        </Text>
        <group position={[-1.5, 1.0, 0]}>
          {(layout?.left?.points || milestone.highlights).map((h, i) => (
            <group key={i} position={[0, -i * 0.7, 0]}>
              <mesh position={[0, -0.05, 0]}>
                <circleGeometry args={[0.08, 16]} />
                <meshBasicMaterial color={COLOR_ACCENT} />
              </mesh>
              <Text position={[0.3, 0, 0]} fontSize={0.28} color={COLOR_TEXT} font={SERIF_REGULAR} maxWidth={S * 0.7} textAlign="left" anchorX="left" anchorY="top" lineHeight={1.5}>
                {h}
              </Text>
            </group>
          ))}
        </group>
      </Face>

      {/* FACE 4: Right Flap */}
      <Face 
        color={c} 
        rotateAxis="y" closedAngle={Math.PI / 2} 
        offsetPos={{ hinge: [S/2, 0, 0], mesh: [S/2, 0, 0] }}
        explodeDir={[1, 0, 0]}
      >
        <Text position={[0, 1.8, 0]} fontSize={0.5} letterSpacing={0.05} color={COLOR_TITLE} font={SERIF_FONT} anchorY="bottom">
          {(layout?.right?.title || "Outcomes").toUpperCase()}
        </Text>
        {layout?.right?.points ? (
          <group position={[-1.5, 1.0, 0]}>
            {layout.right.points.map((h, i) => (
              <group key={i} position={[0, -i * 0.7, 0]}>
                <mesh position={[0, -0.05, 0]}>
                  <circleGeometry args={[0.08, 16]} />
                  <meshBasicMaterial color={COLOR_ACCENT} />
                </mesh>
                <Text position={[0.3, 0, 0]} fontSize={0.28} color={COLOR_TEXT} font={SERIF_REGULAR} maxWidth={S * 0.7} textAlign="left" anchorX="left" anchorY="top" lineHeight={1.5}>
                  {h}
                </Text>
              </group>
            ))}
          </group>
        ) : (
          <Text position={[0, 1.0, 0]} fontSize={0.3} color={COLOR_TEXT} font={SERIF_REGULAR} maxWidth={S * 0.8} textAlign="center" anchorY="top" lineHeight={1.6}>
            Delivered significant measurable impact. Built and shipped production-ready features. Gained hands-on expertise.
          </Text>
        )}
      </Face>
    </group>
  );
}

const _cameraTarget = new THREE.Vector3();

function CameraRig() {
  const scroll = useScroll();
  useFrame((state) => {
    if (!scroll) return;
    const offset = scroll.offset;
    
    let unfold = 0;
    if (offset < 0.33) {
      unfold = 1 - Math.pow(1 - (offset / 0.33), 3);
    } else if (offset < 0.66) {
      unfold = 1;
    } else {
      unfold = 1 - Math.pow((offset - 0.66) / 0.34, 3);
    }
    
    // Animate from 30deg to Top-Down
    const y = THREE.MathUtils.lerp(5, 26, unfold); // 26 fits all squares!
    const z = THREE.MathUtils.lerp(16, 0.1, unfold);
    
    _cameraTarget.set(0, y, z);
    state.camera.position.lerp(_cameraTarget, 0.1);
    state.camera.lookAt(0, -3.2, 0); 
  });
  return null;
}

function ScrollHint() {
  const scroll = useScroll();
  const [visible, setVisible] = useState(true);

  useFrame(() => {
    if (scroll.offset > 0.05 && visible) setVisible(false);
    if (scroll.offset <= 0.05 && !visible) setVisible(true);
  });

  return (
    <Html position={[0, -4.5, 0]} center zIndexRange={[100, 0]}>
      <AnimatePresence>
        {visible && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-2 text-[#fdfbf7]/60 pointer-events-none w-max"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold whitespace-nowrap drop-shadow-md">Scroll to Unfold</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ChevronDown size={20} className="drop-shadow-md" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}

function Scene({ milestone }) {
  return (
    <group>
      <color attach="background" args={["#121110"]} />
      <fog attach="fog" args={["#121110", 15, 35]} />
      
      {/* Warm ambient fill */}
      <ambientLight intensity={0.6} color="#fdfbf7" />
      
      {/* Spotlight from top-left for distinct face shading */}
      <spotLight 
        position={[-15, 20, 15]} 
        intensity={3.5} 
        angle={0.6}
        penumbra={1}
        color="#fef5e7"
      />
      
      <directionalLight position={[10, 5, 5]} intensity={0.4} color="#ffffff" />

      {/* Soft Contact Shadow beneath the box */}
      <ContactShadows position={[0, -3.3, 0]} opacity={0.7} scale={25} blur={3} far={10} color="#000000" />

      <ScrollControls pages={2.5} damping={0.25}>
        <CameraRig />
        <UnfoldingBox milestone={milestone} />
        <ScrollHint />
      </ScrollControls>
    </group>
  );
}

const MilestoneNode = ({ activeModal, onNavigate }) => {
  const milestoneId = activeModal.replace("milestone-", "");
  const selectedMilestone = DEFAULT_MILESTONES.find(m => m.id === milestoneId) || DEFAULT_MILESTONES[0];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#121110] z-50 overflow-hidden font-sans">
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* LightRays Background */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
        <LightRays
          raysOrigin="top-center"
          raysColor={selectedMilestone.color}
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.05}
          distortion={0.02}
        />
      </div>
      
      <Canvas 
        camera={{ position: [0, 5, 16], fov: 50 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10 }}
      >
        <Scene milestone={selectedMilestone} />
      </Canvas>

      {/* Screen-Space Title Overlay for Context */}
      <div
        className="absolute z-[9999] pointer-events-none flex flex-col"
        style={{ top: 'clamp(80px, 12vh, 120px)', left: 'clamp(24px, 5vw, 60px)', animation: 'fadeIn 1s ease-out forwards' }}
      >
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#D4AF37] drop-shadow-2xl m-0 leading-none"
          style={{ fontFamily: "var(--font-editorial), 'Playfair Display', serif", textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}
        >
          {selectedMilestone.id === "praskala-intern" ? "Praskala Technology" : selectedMilestone.title}
        </h1>
        <p className="text-white/90 font-sans tracking-widest text-sm sm:text-base mt-4 uppercase font-bold" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
          {selectedMilestone.id === "praskala-intern" ? "Graphic Design & Sales Intern" : selectedMilestone.badge}
        </p>
      </div>
    </div>
  );
};

export default MilestoneNode;
