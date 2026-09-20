import React, { useRef, useEffect, forwardRef } from 'react';
import './IgnitionButton.css';

// Deep-space obsidian void color vectors with crisp, luminous hyperdrive filaments
const COLOR_PRESETS = {
  green: {
    base: [0.006, 0.012, 0.008], // Deep midnight emerald void
    haze: [0.01, 0.07, 0.03],    // Delicate emerald stardust
    star: [0.35, 1.0, 0.60],     // Mint emerald laser filaments
    core: [0.20, 0.95, 0.50],    // Emerald accelerator flare
  },
  emerald: {
    base: [0.006, 0.012, 0.008],
    haze: [0.01, 0.07, 0.03],
    star: [0.35, 1.0, 0.60],
    core: [0.20, 0.95, 0.50],
  },
  blue: {
    base: [0.006, 0.009, 0.018], // Deep sapphire void
    haze: [0.01, 0.05, 0.12],    // Cosmic azure dust
    star: [0.30, 0.85, 1.0],     // Electric cobalt filaments
    core: [0.20, 0.75, 1.0],     // Azure accelerator flare
  },
  cyan: {
    base: [0.006, 0.012, 0.018], // Deep cyber cyan void
    haze: [0.01, 0.07, 0.12],    // Cyber cyan dust
    star: [0.30, 0.95, 1.0],     // Luminous cyan filaments
    core: [0.25, 0.90, 1.0],     // Cyan accelerator flare
  },
  gold: {
    base: [0.014, 0.010, 0.005], // Deep amber obsidian void
    haze: [0.10, 0.05, 0.01],    // Molten champagne dust
    star: [1.0, 0.85, 0.35],     // Molten gold laser filaments
    core: [1.0, 0.75, 0.30],     // Radiant gold accelerator flare
  },
  amber: {
    base: [0.014, 0.010, 0.005],
    haze: [0.10, 0.05, 0.01],
    star: [1.0, 0.85, 0.35],
    core: [1.0, 0.75, 0.30],
  },
  violet: {
    base: [0.012, 0.006, 0.018], // Deep violet void
    haze: [0.07, 0.03, 0.12],
    star: [0.85, 0.55, 1.0],
    core: [0.75, 0.45, 1.0],
  },
  orange: {
    base: [0.015, 0.008, 0.005], // Deep ember void
    haze: [0.10, 0.04, 0.01],
    star: [1.0, 0.65, 0.30],
    core: [1.0, 0.55, 0.20],
  },
};

const VS_SOURCE = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

const FS_SOURCE = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_warp;
uniform float u_flash;
uniform vec3 u_col_base;
uniform vec3 u_col_haze;
uniform vec3 u_col_star;
uniform vec3 u_col_core;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.07+vec2(13.1,5.7); a*=0.5; }
  return v;
}

void main(){
  vec2 sc = gl_FragCoord.xy / u_res;
  
  // Vanishing point tilts towards cursor position on hover
  vec2 mNorm = u_mouse / max(u_res, vec2(1.0));
  vec2 center = mix(vec2(0.5, 0.5), mNorm, u_warp * 0.40);

  vec2 uv = (gl_FragCoord.xy - center * u_res) / u_res.y;
  float r = length(uv);
  float rr = max(r, 0.06);
  float a = atan(uv.y, uv.x);
  float t = u_time;

  // 1. Deep Space Obsidian Base Void
  vec3 col = u_col_base;
  float topSheen = smoothstep(0.0, 1.0, 1.0 - sc.y) * 0.025;
  col += vec3(topSheen);

  // 2. Delicate Cosmic Nebula Stardust
  float hz = fbm(uv * 2.4 + vec2(t * (0.15 + 0.35 * u_warp), 1.7));
  col += u_col_haze * hz * (0.35 + 0.35 * u_warp);

  // 3. ThreeUI Hyperdrive Starfield & Warp Streaks
  // At rest (u_warp=0): pinpoint celestial diamonds drifting softly
  // On hover (u_warp=1): ignites into razor-sharp hyperdrive warp filaments
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float ringN = 24.0 + fi * 8.0;
    vec2 sp = vec2((a / 6.28318 + 0.5) * ringN,
                   (0.32 + fi * 0.20) / rr + t * (1.6 + fi * 0.9 + u_warp * 3.6));
    vec2 cell = floor(sp);
    vec2 f = fract(sp);
    float h = hash(cell + fi * 17.31);
    float on = step(0.70, h);
    vec2 c = vec2(0.2 + 0.6 * hash(cell + 4.7), 0.5);
    vec2 dlt = f - c;
    
    // Elongation: tight circular points at rest (sy=160), razor warp needles on hover (sy=14)
    float sy = mix(160.0, 14.0, u_warp);
    // Angular sharpness: 300.0 keeps streaks needle-thin, preventing blurry radial spokes
    float star = on * exp(-(dlt.x * dlt.x * 300.0 + dlt.y * dlt.y * sy));
    
    float tw = 0.65 + 0.35 * sin(h * 81.0 + t * (5.0 + u_warp * 10.0));
    tw = mix(tw, 1.0, u_warp);
    
    // Star color: Crystalline white core with theme-colored fringe
    vec3 sCol = mix(vec3(0.96, 0.98, 1.0), u_col_star, step(0.60, h));
    
    // Center fade: keeps the focal area clear so text is always razor sharp
    float fade = smoothstep(0.04, 0.28, r);
    
    // Controlled intensity: gentle at rest (0.30), vibrant on hover (0.95)
    float intensity = mix(0.30, 0.95, u_warp);
    col += sCol * star * tw * fade * intensity;
  }

  // 4. Radiant Core Accelerator Glow (appears on hover)
  col += u_col_core * (u_warp * 0.28) * exp(-r * 4.0);

  // 5. Cinematic Vignette (darkens perimeter for rich glass depth)
  vec2 e = sc * (1.0 - sc);
  col *= 0.32 + 0.68 * pow(e.x * e.y * 16.0, 0.28);

  // 6. Filmic Tone Mapping (preserves deep black & prevents neon blow-out)
  col = col / (1.0 + col * 0.32);

  // 7. Tactile Click Flash Burst
  col = mix(col, vec3(1.0, 1.0, 1.0), clamp(u_flash, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const IgnitionButton = forwardRef(function IgnitionButton({
  children,
  color = 'gold',
  size = 'normal',
  variant = 'default',
  disableObserver = false,
  type = 'button',
  disabled = false,
  className = '',
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}, forwardedRef) {
  const innerButtonRef = useRef(null);
  const buttonRef = forwardedRef || innerButtonRef;
  const canvasRef = useRef(null);
  const animRef = useRef({
    warp: 0,
    warpTarget: 0,
    flash: 0,
    z: 0,
    mouseX: 110,
    mouseY: 24,
    last: performance.now(),
    rafId: null,
    isVisible: true,
  });

  const preset = COLOR_PRESETS[color] || COLOR_PRESETS.gold;

  useEffect(() => {
    const canvas = canvasRef.current;
    const btn = typeof buttonRef === 'object' && buttonRef ? buttonRef.current : null;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = compile(gl.FRAGMENT_SHADER, FS_SOURCE);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const locP = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uWarp = gl.getUniformLocation(prog, 'u_warp');
    const uFlash = gl.getUniformLocation(prog, 'u_flash');

    const uColBase = gl.getUniformLocation(prog, 'u_col_base');
    const uColHaze = gl.getUniformLocation(prog, 'u_col_haze');
    const uColStar = gl.getUniformLocation(prog, 'u_col_star');
    const uColCore = gl.getUniformLocation(prog, 'u_col_core');

    gl.uniform3fv(uColBase, preset.base);
    gl.uniform3fv(uColHaze, preset.haze);
    gl.uniform3fv(uColStar, preset.star);
    gl.uniform3fv(uColCore, preset.core);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth || (btn ? btn.clientWidth : 220);
      const ch = canvas.clientHeight || (btn ? btn.clientHeight : 48);
      const w = Math.max(1, Math.round(cw * dpr));
      const h = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();

    const state = animRef.current;
    state.mouseX = (canvas.width || 220) * 0.5;
    state.mouseY = (canvas.height || 48) * 0.5;

    function frame(now) {
      if (!state.isVisible) {
        state.rafId = null;
        return;
      }
      const dt = Math.min(0.05, (now - state.last) / 1000);
      state.last = now;
      state.warp += (state.warpTarget - state.warp) * Math.min(1, dt * 4.0);
      state.flash *= Math.exp(-4.5 * dt);
      state.z += dt * (0.05 + state.warp * 1.5);

      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, state.mouseX, state.mouseY);
      gl.uniform1f(uTime, reduced ? 4.0 : state.z);
      gl.uniform1f(uWarp, state.warp);
      gl.uniform1f(uFlash, state.flash);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      state.rafId = requestAnimationFrame(frame);
    }

    state.last = performance.now();
    state.rafId = requestAnimationFrame(frame);

    const startLoop = () => {
      if (!state.rafId) {
        state.last = performance.now();
        state.rafId = requestAnimationFrame(frame);
      }
    };

    // Observers to pause rendering when offscreen
    let observer;
    if (!disableObserver && typeof IntersectionObserver !== 'undefined' && btn) {
      observer = new IntersectionObserver(([entry]) => {
        state.isVisible = entry.isIntersecting;
        if (state.isVisible) startLoop();
      }, { threshold: 0.05 });
      observer.observe(btn);
    }

    return () => {
      if (observer) observer.disconnect();
      if (state.rafId) cancelAnimationFrame(state.rafId);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [preset, buttonRef, disableObserver]);

  const handleMouseEnter = (e) => {
    animRef.current.warpTarget = 1.0;
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const normY = Math.max(0, Math.min(1, (rect.bottom - e.clientY) / rect.height));
      const canvas = canvasRef.current;
      animRef.current.mouseX = normX * (canvas ? canvas.width : 220);
      animRef.current.mouseY = normY * (canvas ? canvas.height : 48);
    }
  };

  const handleMouseLeave = (e) => {
    animRef.current.warpTarget = 0.0;
    if (onMouseLeave) onMouseLeave(e);
  };

  const handleClick = (e) => {
    animRef.current.flash = 1.0;
    animRef.current.warp = 0.2;
    animRef.current.z = 0;
    if (onClick) onClick(e);
  };

  const sizeClass = size === 'compact' ? 'ignition-btn-shell--compact' : size === 'large' ? 'ignition-btn-shell--large' : '';
  const colorClass = `ignition-btn-shell--${color}`;
  const variantClass = variant === 'pill' ? 'ignition-btn-shell--pill' : '';

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className={`ignition-btn-shell ${colorClass} ${variantClass} ${sizeClass} ${className}`.trim()}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      <span className="ignition-inner-chamber">
        <canvas ref={canvasRef} className="ignition-gl-canvas" aria-hidden="true" />
        <span className="ignition-content">
          {children}
        </span>
      </span>
    </button>
  );
});

export default IgnitionButton;
