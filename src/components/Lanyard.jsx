'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

const _vec = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _euler = new THREE.Euler();

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        resize={{ debounce: 0 }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 8, 14]} intensity={2.6} />
        <directionalLight position={[-5, -2, 10]} intensity={1.5} />
        <pointLight position={[0, 2, 8]} intensity={1.6} />
        {/* Soft purple/indigo bounce light from cloud field */}
        <pointLight position={[0, -4, 4]} intensity={2.4} color="#8b5cf6" />
        {/* Warm honey/gold shelf light at horizon */}
        <pointLight position={[3, 2, 6]} intensity={1.8} color="#D4AF37" />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 6.0, linearDamping: 5.0 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardImage || lanyard);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Woven gold ribbon strap with warm metallic rims and stitched edge highlights
  const defaultLanyardTex = useMemo(() => {
    if (lanyardImage) return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Rich warm gold & deep indigo woven strap
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.12, '#D4AF37');
    grad.addColorStop(0.24, '#1e1b4b');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(0.76, '#1e1b4b');
    grad.addColorStop(0.88, '#D4AF37');
    grad.addColorStop(1, '#fef08a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 256);

    // Stitched edge lines
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(0, 26);
    ctx.lineTo(1024, 26);
    ctx.moveTo(0, 230);
    ctx.lineTo(1024, 230);
    ctx.stroke();
    ctx.setLineDash([]);

    // Typography along strap: "★ FRANCIS FERNANDO V ★ FULL-STACK & AI"
    ctx.fillStyle = '#fef9c3';
    ctx.font = 'bold 34px "Space Mono", monospace';
    ctx.textBaseline = 'middle';
    const text = '★  FRANCIS FERNANDO V  ★  FULL-STACK & AI  ';
    for (let x = 0; x < 1024; x += 540) {
      ctx.fillText(text, x + 16, 128);
    }

    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [lanyardImage]);

  const activeLanyardTexture = defaultLanyardTex || texture;

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dw) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1.35, 0),
        new THREE.Vector3(0, 2.7, 0),
        new THREE.Vector3(0, 4.05, 0)
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Extended spherical links: provides a longer strap so card hangs parallel to submit button
  useSphericalJoint(fixed, j1, [[0, 0, 0], [0, 1.35, 0]]);
  useSphericalJoint(j1, j2, [[0, 0, 0], [0, 1.35, 0]]);
  useSphericalJoint(j2, j3, [[0, 0, 0], [0, 1.35, 0]]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.30, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      _vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      _dir.copy(_vec).sub(state.camera.position).normalize();
      _vec.add(_dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: _vec.x - dragged.x, y: _vec.y - dragged.y, z: _vec.z - dragged.z });
    } else if (card.current) {
      // Natural rest position: convert quaternion to Euler to avoid quaternion oscillation feedback
      const rot = card.current.rotation();
      _q.set(rot.x, rot.y, rot.z, rot.w);
      _euler.setFromQuaternion(_q);
      const angvel = card.current.angvel();

      if (Math.abs(_euler.y) > 0.008 || Math.abs(angvel.y) > 0.008 || Math.abs(angvel.x) > 0.008 || Math.abs(angvel.z) > 0.008) {
        card.current.setAngvel({
          x: angvel.x * 0.88 - _euler.x * 1.5,
          y: angvel.y * 0.88 - _euler.y * 2.0,
          z: angvel.z * 0.88 - _euler.z * 1.5
        }, false);
      }
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.01, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -1.35, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2.7, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -4.05, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -5.35, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.85, 1.2, 0.01]} />
          <group
            scale={isMobile ? 2.2 : 2.55}
            position={[0, -1.15, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(_vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.06}
                roughness={0.12}
                metalness={0.04}
                sheen={0.4}
                sheenColor={new THREE.Color('#8b5cf6')}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.15} material-metalness={0.95} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} material-roughness={0.15} material-metalness={0.95} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={activeLanyardTexture}
          repeat={[-4.5, 1]}
          lineWidth={lanyardWidth * 1.05}
        />
      </mesh>
    </>
  );
}
