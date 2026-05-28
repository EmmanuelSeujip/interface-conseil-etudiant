import { useHeaderStore } from "@/store/useHeaderStore";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { marked } from "marked";

// ── Importez votre fichier markdown local ici ─────────────────────
// Vite supporte l'import ?raw nativement, aucune config nécessaire.
// Exemple : import docContent from "./documentation.md?raw";
import docContent from "@/assets/document/documentation.md?raw";

// ── Markdown renderer ─────────────────────────────────────────────
function buildRenderer() {
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }) => {
    const slug = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    return `<h${depth} id="${slug}" class="doc-h${depth}">${text}</h${depth}>`;
  };
  renderer.code = ({ text, lang }) =>
    `<pre class="doc-pre"><code class="doc-code lang-${lang || ""}">${text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code></pre>`;
  renderer.blockquote = ({ text }) =>
    `<blockquote class="doc-blockquote">${text}</blockquote>`;
  renderer.table = (token) => {
    const header = token.header.map((h) => `<th>${h.text}</th>`).join("");
    const rows = token.rows
      .map((row) => `<tr>${row.map((cell) => `<td>${cell.text}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>`;
  };
  return renderer;
}

// ── Extract headings for TOC ──────────────────────────────────────
function extractHeadings(md) {
  const headings = [];
  let match;
  const re = /^(#{1,3})\s+(.+)$/gm;
  while ((match = re.exec(md)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    headings.push({ level, text, slug });
  }
  return headings;
}

// ── Documentation component ───────────────────────────────────────
const Documentation = () => {
  const setNavActive = useHeaderStore((state) => state.setNavActive);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("");
  const contentRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    setNavActive("documentation");
  }, [setNavActive]);

  const renderedHtml = useMemo(() => {
    try {
      marked.use({ renderer: buildRenderer(), breaks: true, gfm: true });
      return marked.parse(docContent);
    } catch {
      return "<p>Erreur de rendu.</p>";
    }
  }, []);

  const headings = useMemo(() => extractHeadings(docContent), []);

  // Active heading via IntersectionObserver
  useEffect(() => {
    if (!contentRef.current) return;
    observerRef.current?.disconnect();
    const els = contentRef.current.querySelectorAll("h1,h2,h3");
    if (!els.length) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveSlug(hit.target.id);
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
    );
    els.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, [renderedHtml]);

  const scrollTo = useCallback((slug) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSlug(slug);
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <style>{`
        .doc-scroll::-webkit-scrollbar { width: 5px; }
        .doc-scroll::-webkit-scrollbar-track { background: transparent; }
        .doc-scroll::-webkit-scrollbar-thumb { background: var(--color-picton-blue-300); border-radius: 9999px; }

        .doc-content { line-height: 1.85; }
        .doc-content .doc-h1 { font-size: 2rem; font-weight: 700; color: var(--color-picton-blue-900); border-bottom: 3px solid var(--color-picton-blue-300); padding-bottom: .5rem; margin: 2rem 0 1.25rem; }
        .doc-content .doc-h2 { font-size: 1.45rem; font-weight: 700; color: var(--color-picton-blue-800); border-left: 4px solid var(--color-picton-blue-400); padding-left: .75rem; margin: 2rem 0 1rem; }
        .doc-content .doc-h3 { font-size: 1.15rem; font-weight: 600; color: var(--color-picton-blue-700); margin: 1.5rem 0 .75rem; }
        .doc-content p { margin: .75rem 0; text-align: justify; }
        .doc-content ul, .doc-content ol { padding-left: 1.5rem; margin: .75rem 0; }
        .doc-content li { margin: .35rem 0; }
        .doc-content code:not(.doc-code) { background: var(--color-picton-blue-100); color: var(--color-picton-blue-800);font-size: .82em; padding: .15em .45em; border-radius: 4px; border: 1px solid var(--color-picton-blue-200); }
        .doc-content .doc-pre { background: var(--color-picton-blue-950); border-radius: 10px; padding: 1.25rem 1.5rem; overflow-x: auto; margin: 1rem 0; border: 1px solid var(--color-picton-blue-800); }
        .doc-content .doc-code { color: var(--color-picton-blue-100);font-size: .85rem; line-height: 1.7; white-space: pre; }
        .doc-content .doc-blockquote { border-left: 4px solid var(--color-picton-blue-400); background: var(--color-picton-blue-50); padding: .75rem 1.25rem; margin: 1rem 0; border-radius: 0 8px 8px 0; color: var(--color-picton-blue-800); font-style: italic; }
        .doc-content .doc-table-wrap { overflow-x: auto; margin: 1rem 0; border-radius: 10px; border: 1px solid var(--color-picton-blue-200); }
        .doc-content .doc-table { width: 100%; border-collapse: collapse; font-size: .9rem; }
        .doc-content .doc-table thead { background: var(--color-picton-blue-600); color: white; }
        .doc-content .doc-table th { padding: .6rem 1rem; text-align: left; font-weight: 600; }
        .doc-content .doc-table td { padding: .55rem 1rem; border-bottom: 1px solid var(--color-picton-blue-100); }
        .doc-content .doc-table tbody tr:nth-child(even) { background: var(--color-picton-blue-50); }
        .doc-content .doc-table tbody tr:hover { background: var(--color-picton-blue-100); transition: background .15s; }
        .doc-content hr { border: none; border-top: 2px solid var(--color-picton-blue-200); margin: 2rem 0; }
        .doc-content strong { color: var(--color-picton-blue-900); }
      `}</style>

      <div className="min-h-screen flex flex-col" >

        {/* ── Top bar (mobile only) ── */}
        <div
          className="sticky top-0 z-30 flex items-center px-4 py-3 lg:hidden"
          style={{ background: "white", borderBottom: "1px solid var(--color-picton-blue-200)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
            style={{ background: "var(--color-picton-blue-100)", color: "var(--color-picton-blue-700)" }}
          >
            Sommaire
          </button>
        </div>

        <div className="flex flex-1 relative">

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(6,41,75,0.45)", backdropFilter: "blur(2px)" }}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── Sidebar ── */}
          <aside
            className={`
              fixed top-0 left-0 h-full z-50 w-72 flex flex-col
              lg:sticky lg:top-0 lg:h-screen lg:z-20 lg:w-64 xl:w-72
              transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            style={{ background: "white", borderRight: "1px solid var(--color-picton-blue-200)" }}
          >
            {/* Sidebar header */}
            <div
              className="flex items-center justify-between px-4 py-4 border-b"
              style={{ borderColor: "var(--color-picton-blue-100)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-picton-blue-700)" }}>
                  Sommaire
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded" style={{ color: "var(--color-picton-blue-400)" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* TOC */}
            <nav className="flex-1 overflow-y-auto doc-scroll py-3 px-2">
              {headings.map((h, i) => {
                const isActive = activeSlug === h.slug;
                const pl = h.level === 1 ? "pl-2" : h.level === 2 ? "pl-5" : "pl-8";
                return (
                  <button
                    key={i}
                    onClick={() => scrollTo(h.slug)}
                    className={`w-full text-left rounded-lg px-2 py-1.5 mb-0.5 transition-all duration-150 ${pl}`}
                    style={{
                      fontSize: h.level === 1 ? ".85rem" : h.level === 2 ? ".82rem" : ".78rem",
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? "var(--color-picton-blue-100)" : "transparent",
                      color: isActive ? "var(--color-picton-blue-700)" : "var(--color-picton-blue-900)",
                      borderLeft: isActive ? "3px solid var(--color-picton-blue-500)" : "3px solid transparent",
                    }}
                  >
                    {h.text}
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t text-xs" style={{ borderColor: "var(--color-picton-blue-100)", color: "var(--color-picton-blue-400)" }}>
              {headings.length} sections
            </div>
          </aside>

          {/* ── Content ── */}
          <main
            ref={contentRef}
            className="flex-1 min-w-0 overflow-y-auto doc-scroll doc-content px-5 sm:px-8 lg:px-12 py-8 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>
    </>
  );
};

export default Documentation;