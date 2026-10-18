import { useEffect, useRef } from "react";
import type { Mesh, Object3D, OrthographicCamera, ShaderMaterial, WebGLRenderer } from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Flowing inert matter: domain-warped FBM, night tones veined with clay —
// the atelier's palette (night / night-2 / clay) computed per pixel.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uRes;
  uniform float uDpr;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / (uRes * uDpr);
    vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 1.6;

    float t = uTime * 0.05;
    vec2 warp = vec2(fbm(p + t), fbm(p - t + 3.7));
    float n = fbm(p + warp * 1.4 + t * 0.6);

    vec3 night = vec3(0.110, 0.098, 0.086);
    vec3 night2 = vec3(0.165, 0.149, 0.133);
    vec3 clay = vec3(0.710, 0.322, 0.165);

    vec3 col = mix(night, night2, smoothstep(0.30, 0.85, n));
    col += clay * 0.35 * smoothstep(0.62, 0.96, n) * (0.55 + 0.45 * sin(t * 4.0 + n * 9.0));
    col -= (1.0 - smoothstep(0.0, 0.55, uv.y)) * 0.05;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function ShaderField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let raf = 0;
    let renderer: WebGLRenderer | undefined;
    let material: ShaderMaterial | undefined;
    let camera: OrthographicCamera | undefined;
    let scene: Object3D | undefined;
    let mesh: Mesh | undefined;
    let ro: ResizeObserver | undefined;
    let io: IntersectionObserver | undefined;
    let visible = true;
    let running = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = renderer;
      const m = material;
      const s = scene;
      const c = camera;
      if (!r || !m || !s || !c) return;
      m.uniforms.uTime.value = performance.now() / 1000;
      r.render(s, c);
    };

    const start = () => {
      if (running || reduced || disposed || !visible) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
      renderer.setPixelRatio(dpr);

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: new THREE.Vector2(1, 1) },
          uDpr: { value: dpr },
        },
        vertexShader,
        fragmentShader,
      });
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      scene = new THREE.Scene();
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(plane);
      mesh = plane;

      const resize = () => {
        if (!renderer || !material) return;
        const w = Math.max(canvas.clientWidth, 1);
        const h = Math.max(canvas.clientHeight, 1);
        renderer.setSize(w, h, false);
        material.uniforms.uRes.value.set(w, h);
      };
      resize();
      ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const ioLocal = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          if (visible) start();
          else stop();
        },
        { rootMargin: "10% 0px" },
      );
      ioLocal.observe(canvas);
      io = ioLocal;

      const renderStill = () => {
        const r = renderer;
        const m = material;
        if (!r || !m || !scene || !camera) return;
        m.uniforms.uTime.value = 8.4;
        r.render(scene, camera);
      };
      renderStill();
      start();
    })();

    return () => {
      disposed = true;
      stop();
      ro?.disconnect();
      io?.disconnect();
      renderer?.dispose();
      material?.dispose();
      mesh?.geometry.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
