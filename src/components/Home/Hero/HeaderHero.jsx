import logo from "@/assets/image/logo (1).svg";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Documentation", href: "/documentation" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    setHidden(current > previous && current > 80);
    setScrolled(current > 20);
  });

  // Ferme le menu mobile au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95   backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex justify-between items-center">

        {/* Logo + Nom */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src={logo} alt="logo" className="w-9 h-9 object-cover rounded-lg" />
          <span className="text-base font-bold text-blue-700 dark:text-slate-100 tracking-tight">
            Orientation AI
          </span>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 rounded-lg hover:text-blue-600 dark:hover:text-slate-100 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              {label}
            </a>
          ))}
          <a
            href="/formulaire"
              className="ml-3 px-5 py-2 bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap"
          >
            Démarrer mon orientation
          </a>
        </nav>

        {/* Mobile : burger */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Menu mobile */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden md:hidden border-t border-gray-100 dark:border-gray-800"
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-slate-300 rounded-lg hover:text-blue-600 dark:hover:text-slate-100 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/formulaire"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full text-center transition-colors"
          >
            Démarrer mon orientation
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;