import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import logo from "@/assets/image/logo (1).svg"
import { useHeaderStore } from "@/store/useHeaderStore"

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
    <header className="bg-white border-b border-picton-blue-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNav("accueil", "/")}>
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl" />
          <span className="text-picton-blue-800 font-black text-base sm:text-lg tracking-tight">
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
                  ? "bg-picton-blue-500 text-white shadow-md shadow-picton-blue-200"
                  : "text-picton-blue-600 hover:bg-picton-blue-50"}`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Burger mobile */}
        <button
          className="sm:hidden p-2 rounded-lg text-picton-blue-600 hover:bg-picton-blue-50 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
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
            className="overflow-hidden sm:hidden border-t border-picton-blue-100"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navSection.map(({ key, label, path }) => (
                <button
                  key={key}
                  onClick={() => handleNav(key, path)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                    ${navActive === key
                      ? "bg-picton-blue-500 text-white shadow-sm"
                      : "text-picton-blue-600 hover:bg-picton-blue-50"}`}
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
