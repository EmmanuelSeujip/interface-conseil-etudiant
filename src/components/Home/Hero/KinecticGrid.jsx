import { useEffect, useRef } from "react";

const COLS      = 24;
const ROWS      = 16;
const INFLUENCE = 170;
const STRENGTH  = 50;
const LSPEED    = 0.11;
const G_RADIUS  = 130;

function lerp(a, b, f) { return a + (b - a) * f; }

export default function KineticGrid({ children, className, style }) {
  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext("2d");

    let W, H, points = [];
    let mouse = { x: -9999, y: -9999 };
    let ghost = { x: 0, y: 0 };
    let t = 0, rafId;

    const pt = (r, c) => points[r * COLS + c];

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      W = wrapper.offsetWidth;
      H = wrapper.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      const cW = W / (COLS - 1);
      const cH = H / (ROWS - 1);
      points = [];
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          const ox = c * cW, oy = r * cH;
          points.push({ ox, oy, x: ox, y: oy });
        }

      ghost.x = W * 0.5;
      ghost.y = H * 0.5;
    }

    function ghostTarget(t) {
      return {
        x: W * 0.5 + W * 0.38 * Math.sin(t * 0.47) * Math.cos(t * 0.19),
        y: H * 0.5 + H * 0.32 * Math.cos(t * 0.31) * Math.sin(t * 0.23 + 1.1),
      };
    }

    function drawSegment(a, b, gx, gy, mprox) {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = gx - mx, dy = gy - my;
      const gprox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / G_RADIUS);
      const bright = Math.min(1, gprox + mprox * 0.5);
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // light: gris→bleu vif  |  dark: bleu profond→bleu clair
      const r = dark ? Math.round(lerp(30, 51, bright))  : Math.round(lerp(210, 51, bright));
      const g = dark ? Math.round(lerp(60, 172, bright)) : Math.round(lerp(210, 172, bright));
      const b2 = dark ? Math.round(lerp(120, 253, bright)) : Math.round(lerp(215, 253, bright));
      const a2 = dark ? lerp(0.06, 0.9, bright).toFixed(2) : lerp(0.13, 0.95, bright).toFixed(2);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${r},${g},${b2},${a2})`;
      ctx.lineWidth = lerp(0.45, 1.8, bright);
      ctx.stroke();
    }

    function mproxAt(ax, ay, bx, by) {
      if (mouse.x < -100) return 0;
      const dx = mouse.x - (ax + bx) / 2;
      const dy = mouse.y - (ay + by) / 2;
      return Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / INFLUENCE);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const tgt = ghostTarget(t);
      ghost.x += (tgt.x - ghost.x) * 0.04;
      ghost.y += (tgt.y - ghost.y) * 0.04;

      const hasMouse = mouse.x > -100;

      points.forEach(p => {
        let tx = p.ox, ty = p.oy;
        if (hasMouse) {
          const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ease = Math.pow(Math.max(0, 1 - dist / INFLUENCE), 2);
          tx = p.ox + dx * ease * (STRENGTH / Math.max(dist, 1));
          ty = p.oy + dy * ease * (STRENGTH / Math.max(dist, 1));
        }
        p.x += (tx - p.x) * LSPEED;
        p.y += (ty - p.y) * LSPEED;
      });

      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS - 1; c++) {
          const a = pt(r, c), b = pt(r, c + 1);
          drawSegment(a, b, ghost.x, ghost.y, mproxAt(a.x, a.y, b.x, b.y));
        }
      for (let r = 0; r < ROWS - 1; r++)
        for (let c = 0; c < COLS; c++) {
          const a = pt(r, c), b = pt(r + 1, c);
          drawSegment(a, b, ghost.x, ghost.y, mproxAt(a.x, a.y, b.x, b.y));
        }

      points.forEach(p => {
        const gdx = ghost.x - p.x, gdy = ghost.y - p.y;
        const gprox = Math.max(0, 1 - Math.sqrt(gdx * gdx + gdy * gdy) / G_RADIUS);
        let mprox = 0;
        if (hasMouse) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          mprox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / INFLUENCE);
        }
        const bright = Math.min(1, gprox + mprox * 0.5);
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const r = dark ? Math.round(lerp(30, 51, bright))  : Math.round(lerp(200, 51, bright));
        const g = dark ? Math.round(lerp(60, 172, bright)) : Math.round(lerp(200, 172, bright));
        const b2 = dark ? Math.round(lerp(120, 253, bright)) : Math.round(lerp(200, 253, bright));
        const a2 = dark ? lerp(0.08, 1, bright).toFixed(2) : lerp(0.18, 1, bright).toFixed(2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, lerp(1, 3, bright), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b2},${a2})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    const onMove  = (e) => {
      const r = wrapper.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };

    setup();
    draw();
    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(rafId);
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", width: "100%", overflow: "hidden", ...style }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
