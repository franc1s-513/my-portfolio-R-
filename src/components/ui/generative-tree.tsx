import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { generativeTreeSource } from "@/components/ui/generative-tree-utils/generative-tree-source";

export type GenerativeTreeProps = {
  speed?: number;
  size?: number;
  particleAmount?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  transparent?: boolean;
  className?: string;
  style?: CSSProperties;
};

export const GENERATIVE_TREE_DEFAULTS = {
  speed: 1,
  size: 1,
  particleAmount: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
  transparent: false,
} as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function buildFocusedDocument(
  size: number,
  particleAmount: number,
  transparent: boolean = false,
) {
  const particleCount = Math.max(
    0,
    Math.round(50 * clamp(particleAmount, 0, 2)),
  );
  const treePadding = 1 / clamp(size, 0.65, 1.5);
  const bgStyle = transparent ? "transparent !important" : "#0a0a0a";
  const focusStyles = `<style data-generative-tree-focus>
html, body, canvas { width: 100%; height: 100%; margin: 0; overflow: hidden; background: ${bgStyle}; }
.label { display: none !important; }
</style>`;
  const controls = `<script data-generative-tree-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { last: null, time: null };
  window.__GENERATIVE_TREE_CONTROLS = { speed: 1, paused: false };
  window.requestAnimationFrame = function (callback) {
    return nativeFrame(function (realTime) {
      var state = window.__GENERATIVE_TREE_CONTROLS;
      if (clock.last === null) {
        clock.last = realTime;
        clock.time = realTime;
      } else {
        if (!state.paused) clock.time += (realTime - clock.last) * state.speed;
        clock.last = realTime;
      }
      callback(clock.time);
    });
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'generative-tree-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) {
      window.__GENERATIVE_TREE_CONTROLS.speed = Math.max(0, Math.min(3, next.speed));
    }
    window.__GENERATIVE_TREE_CONTROLS.paused = Boolean(next.paused);
  });
  window.addEventListener('mousemove', function(e) {
    try {
      window.parent.postMessage({ type: 'tree-pointer', clientX: e.clientX, clientY: e.clientY }, '*');
    } catch(err) {}
  });
})();
</script>`;

  let doc = generativeTreeSource
    .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "")
    .replace("</head>", `${focusStyles}${controls}</head>`)
    .replace(
      "let GROWTH_SPEED_BASE = 0.006;",
      "let GROWTH_SPEED_BASE = 0.022;",
    )
    .replace("const HOLD_DURATION = 400;", "const HOLD_DURATION = 1800;")
    .replace(
      "const PARTICLE_COUNT = 50;",
      `const PARTICLE_COUNT = ${particleCount};`,
    )
    .replace(
      "const _pad = parseFloat(new URLSearchParams(location.search).get('p')) || 1;",
      `const _pad = ${treePadding.toFixed(4)};`,
    )
    .replace(
      `function frame(time) {
    // Decay shake`,
      `function frame(time) {
    if (window.__GENERATIVE_TREE_CONTROLS.paused) { requestAnimationFrame(frame); return; }

    // Decay shake`,
    )
    .replace(
      "b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed);",
      "b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed * window.__GENERATIVE_TREE_CONTROLS.speed);",
    )
    .replace(
      "holdTimer++;",
      "holdTimer += window.__GENERATIVE_TREE_CONTROLS.speed;",
    )
    .replace(
      "fadeTimer++;",
      "fadeTimer += window.__GENERATIVE_TREE_CONTROLS.speed;",
    )
    .replace(
      "waitTimer++;",
      "waitTimer += window.__GENERATIVE_TREE_CONTROLS.speed;",
    )
    .replace(
      `  createTree();
  requestAnimationFrame(frame);`,
      `  function startTreeWhenSized() {
    resize();
    if (W <= 0 || H <= 0) {
      requestAnimationFrame(startTreeWhenSized);
      return;
    }
    createTree();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(startTreeWhenSized);`,
    );

  if (transparent) {
    doc = doc
      .replace(
        "    // Background\n    ctx.fillStyle = '#0a0a0a';\n    ctx.fillRect(0, 0, W, H);",
        "    // Background\n    // transparent mode for landscape world",
      )
      .replace(
        "      case 'waiting': {\n        ctx.clearRect(0, 0, W, H);\n        ctx.fillStyle = '#0a0a0a';\n        ctx.fillRect(0, 0, W, H);",
        "      case 'waiting': {\n        ctx.clearRect(0, 0, W, H);",
      )
      .replace(
        "    vigGrad.addColorStop(1, 'rgba(4, 4, 4, 0.3)');",
        "    vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');",
      );
  }

  return doc;
}

export default function GenerativeTree({
  speed = GENERATIVE_TREE_DEFAULTS.speed,
  size = GENERATIVE_TREE_DEFAULTS.size,
  particleAmount = GENERATIVE_TREE_DEFAULTS.particleAmount,
  opacity = GENERATIVE_TREE_DEFAULTS.opacity,
  hue = GENERATIVE_TREE_DEFAULTS.hue,
  saturation = GENERATIVE_TREE_DEFAULTS.saturation,
  brightness = GENERATIVE_TREE_DEFAULTS.brightness,
  transparent = GENERATIVE_TREE_DEFAULTS.transparent,
  className = "",
  style,
}: GenerativeTreeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hostVisible, setHostVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );
  const safeSpeed = clamp(speed, 0, 3);
  const paused = !hostVisible || !documentVisible || safeSpeed === 0;
  const source = useMemo(
    () => buildFocusedDocument(size, particleAmount, transparent),
    [particleAmount, size, transparent],
  );

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "generative-tree-controls",
        controls: { speed: safeSpeed, paused },
      },
      "*",
    );
  }, [paused, safeSpeed]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || typeof IntersectionObserver === "undefined")
      return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setHostVisible(entry?.isIntersecting ?? true),
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    postControls();
  }, [postControls, source]);

  return (
    <div
      className={`threeui-background generative-tree${className ? ` ${className}` : ""}`}
      style={{
        background: transparent ? "transparent" : "#0a0a0a",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <iframe
        ref={iframeRef}
        title="Generative Tree background"
        srcDoc={source}
        sandbox="allow-scripts"
        onLoad={postControls}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: transparent ? "transparent" : "#0a0a0a",
          opacity: clamp(opacity, 0.05, 1),
          filter: `hue-rotate(${clamp(hue, -180, 180)}deg) saturate(${clamp(saturation, 0, 2)}) brightness(${clamp(brightness, 0.35, 1.8)})`,
        }}
      />
    </div>
  );
}

export { GenerativeTree };
