import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { DEFAULT_MILESTONES } from "../data/milestones";
import { ChevronLeft, ChevronDown, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const S = 6.5; // Scaled up significantly for better typography

function Face({ children, color, offsetPos, rotateAxis = "x", closedAngle = 0, isCover = false, milestone }) {
  const hingeRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (!hingeRef.current || !scroll) return;
    const offset = scroll.offset; 
    const ease = 1 - Math.pow(1 - offset, 3);
    const currentAngle = THREE.MathUtils.lerp(closedAngle, 0, ease);
    
    if (rotateAxis === "x") hingeRef.current.rotation.x = currentAngle;
    if (rotateAxis === "y") hingeRef.current.rotation.y = currentAngle;
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
            <Html transform occlude position={[0, 0, 0.05]} center className="p-8 flex flex-col justify-center items-center text-center font-sans" style={{ width: '600px', height: '600px', maxWidth: '600px', overflow: 'hidden', whiteSpace: 'normal', backfaceVisibility: 'hidden' }}>
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span className="text-sm font-bold tracking-[0.2em] uppercase mb-2 opacity-80 text-white drop-shadow-md">Role</span>
                <span className="text-xl font-bold tracking-widest uppercase mb-6 text-white drop-shadow-md">{milestone.badge}</span>
                
                <h2 className="text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg px-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{milestone.title}</h2>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30">
                    <Compass size={24} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full bg-black/30 text-white/90 backdrop-blur-md border border-white/10">{milestone.category}</span>
                </div>
              </div>
            </Html>
          )}
        </mesh>

        {/* INSIDE FACE (Parchment, faces inward, holds the text) */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[S, S]} />
          <meshStandardMaterial color="#fdfbf7" roughness={0.9} side={THREE.FrontSide} />
          
          <Html transform occlude position={[0, 0, 0.05]} center className="p-12 flex flex-col justify-center overflow-hidden font-sans text-[#2F5D9E]" style={{ width: '600px', height: '600px', maxWidth: '600px', overflow: 'hidden', whiteSpace: 'normal', backfaceVisibility: 'hidden' }}>
            <div className="w-full h-full flex flex-col justify-center">
              {children}
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}

function UnfoldingBox({ milestone }) {
  const c = milestone.color;

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
          <Html transform occlude position={[0, 0, 0.05]} center className="p-12 flex flex-col justify-center items-center text-center font-sans text-[#2F5D9E]" style={{ width: '600px', height: '600px', maxWidth: '600px', overflow: 'hidden', whiteSpace: 'normal', backfaceVisibility: 'hidden' }}>
            <span className="text-base font-bold tracking-widest uppercase mb-4 opacity-70">{milestone.category}</span>
            <h2 className="text-6xl font-extrabold mb-4 leading-tight px-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{milestone.title}</h2>
            <p className="text-lg font-medium opacity-70">{milestone.date}</p>
          </Html>
        </mesh>
      </group>

      {/* FACE 1: Bottom Flap (COVER) */}
      <Face 
        color={c} 
        rotateAxis="x" closedAngle={Math.PI / 2} 
        offsetPos={{ hinge: [0, -S/2, 0], mesh: [0, -S/2, 0] }}
        isCover={true}
        milestone={milestone}
      >
        <h3 className="text-3xl font-bold mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The Story</h3>
        <p className="text-xl text-slate-700 leading-relaxed font-medium">{milestone.description}</p>
      </Face>

      {/* FACE 2: Top Flap */}
      <Face 
        color={c} 
        rotateAxis="x" closedAngle={-Math.PI / 2} 
        offsetPos={{ hinge: [0, S/2, 0], mesh: [0, S/2, 0] }}
      >
        <h3 className="text-3xl font-bold mb-8 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Key Role</h3>
        <div className="px-8 py-6 border-2 rounded-xl text-center text-2xl font-bold tracking-widest inline-block w-full" style={{ borderColor: c, color: c, backgroundColor: `${c}10` }}>
          {milestone.badge}
        </div>
      </Face>

      {/* FACE 3: Left Flap */}
      <Face 
        color={c} 
        rotateAxis="y" closedAngle={-Math.PI / 2} 
        offsetPos={{ hinge: [-S/2, 0, 0], mesh: [-S/2, 0, 0] }}
      >
        <h3 className="text-3xl font-bold mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Highlights</h3>
        <ul className="flex flex-col gap-5">
          {milestone.highlights.map((h, i) => (
            <li key={i} className="text-xl text-slate-700 font-medium flex items-start gap-4">
              <span className="w-3 h-3 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: c }} /> 
              <span className="leading-snug">{h}</span>
            </li>
          ))}
        </ul>
      </Face>

      {/* FACE 4: Right Flap */}
      <Face 
        color={c} 
        rotateAxis="y" closedAngle={Math.PI / 2} 
        offsetPos={{ hinge: [S/2, 0, 0], mesh: [S/2, 0, 0] }}
      >
        <h3 className="text-3xl font-bold mb-6 uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Outcomes</h3>
        <p className="text-xl text-slate-700 leading-relaxed font-medium">Delivered significant measurable impact. Built and shipped production-ready features. Gained hands-on expertise.</p>
      </Face>
    </group>
  );
}

function CameraRig() {
  const scroll = useScroll();
  useFrame((state) => {
    if (!scroll) return;
    const o = scroll.offset;
    const ease = 1 - Math.pow(1 - o, 3);
    
    // Animate from 30deg to Top-Down
    const y = THREE.MathUtils.lerp(5, 18, ease);
    const z = THREE.MathUtils.lerp(16, 0.1, ease);
    
    state.camera.position.lerp(new THREE.Vector3(0, y, z), 0.1);
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
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-50">
      <AnimatePresence>
        {visible && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-2 text-[#fdfbf7]/60"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-bold whitespace-nowrap">Scroll to Unfold</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      
      <Canvas 
        camera={{ position: [0, 5, 16], fov: 50 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        <Scene milestone={selectedMilestone} />
      </Canvas>
      
      <ScrollHint />

      {/* Fixed Back Control */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        type="button"
        onClick={() => onNavigate("tech-journey")}
        style={{ top: '70px', left: '48px' }}
        className="absolute z-50 flex items-center justify-center gap-3 h-[48px] px-6 rounded-full bg-[#1e1c1b] hover:bg-[#2a2725] border border-[#fdfbf7]/10 text-[#fdfbf7] hover:border-[#fdfbf7]/30 transition-all cursor-pointer shadow-2xl group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform text-[#fbbf24]" />
        <span className="font-bold tracking-wider text-xs uppercase pt-0.5">Back to the tree</span>
      </motion.button>
    </div>
  );
};

export default MilestoneNode;
