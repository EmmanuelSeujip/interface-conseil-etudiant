import logo from "@/assets/image/logo (1).svg";
import { useHeaderStore } from "@/store/useHeaderStore";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navActive = useHeaderStore((state) => state.navActive);
  const setNavActive = useHeaderStore((state) => state.setNavActive);
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navSection = [
    { key: "accueil",       label: "Accueil",       path: "/" },
    { key: "formulaire",    label: "Formulaire",    path: "/formulaire" },
    { key: "documentation", label: "Documentation", path: "/documentation" },
    { key: "contact",       label: "Contact",       path: "/contact" },
  ]

  // Ferme le menu au resize vers desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const handleNav = (key, path) => {
    navigate(path)
    setNavActive(key)
    setMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-blue-100 dark:border-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNav("accueil", "/")}>
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl" />
          <span className="text-blue-800 dark:text-slate-100 font-black text-base sm:text-lg tracking-tight">
            Orientation Acadamique
          </span>
        </div>

        {/* Nav desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {navSection.map(({ key, label, path }) => (
            <button
              key={key}
              onClick={() => handleNav(key, path)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${navActive === key
                  ? "bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-gray-800"
                  : "text-blue-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-gray-800"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Droite mobile : burger */}
        <div className="flex items-center gap-1 sm:hidden">
          <button
            className="p-2 rounded-lg text-blue-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden sm:hidden border-t border-blue-100 dark:border-gray-800"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navSection.map(({ key, label, path }) => (
                <button
                  key={key}
                  onClick={() => handleNav(key, path)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                    ${navActive === key
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-blue-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-gray-800"}`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
