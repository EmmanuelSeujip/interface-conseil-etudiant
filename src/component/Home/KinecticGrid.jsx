import { useEffect, useRef } from "react";

const COLS      = 24;
const ROWS      = 16;
const INFLUENCE = 170;
const STRENGTH  = 50;
const LSPEED    = 0.11;

function lerp(a, b, t) { return a + (b - a) * t; }

export default function KineticGrid({ children }) {
  const wrapperRef = useRef(null);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext("2d");

    let W, H, points = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId;

    const pt = (r, c) => points[r * COLS + c];

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      W = wrapper.offsetWidth;
      H = wrapper.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      const cW = W / (COLS - 1), cH = H / (ROWS - 1);
      points = [];
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          const ox = c * cW, oy = r * cH;
          points.push({ ox, oy, x: ox, y: oy });
        }
    }

    function drawSegment(a, b) {
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = mouse.x - mx, dy = mouse.y - my;
      const prox = Math.max(0, 1 - Math.sqrt(dx*dx + dy*dy) / INFLUENCE);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${Math.round(lerp(210,55,prox))},${Math.round(lerp(210,138,prox))},${Math.round(lerp(215,221,prox))},${lerp(0.13,0.95,prox).toFixed(2)})`;
      ctx.lineWidth = lerp(0.45, 1.8, prox);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      points.forEach(p => {
        const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const ease = Math.pow(Math.max(0, 1 - dist / INFLUENCE), 2);
        const tx = p.ox + dx * ease * (STRENGTH / Math.max(dist, 1));
        const ty = p.oy + dy * ease * (STRENGTH / Math.max(dist, 1));
        p.x += (tx - p.x) * LSPEED;
        p.y += (ty - p.y) * LSPEED;
      });

      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS - 1; c++) drawSegment(pt(r,c), pt(r,c+1));
      for (let r = 0; r < ROWS - 1; r++)
        for (let c = 0; c < COLS; c++) drawSegment(pt(r,c), pt(r+1,c));

      points.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const prox = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) / INFLUENCE);
        ctx.beginPath();
        ctx.arc(p.x, p.y, lerp(1, 2.8, prox), 0, Math.PI*2);
        ctx.fillStyle = `rgba(${Math.round(lerp(200,55,prox))},${Math.round(lerp(200,138,prox))},${Math.round(lerp(200,221,prox))},${lerp(0.18,1,prox).toFixed(2)})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    const onMove  = (e) => { const r = wrapper.getBoundingClientRect(); mouse = { x: e.clientX-r.left, y: e.clientY-r.top }; };
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
      style={{ position: "relative", width: "100%", background: "#fff", borderRadius: 12, overflow: "hidden" }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
