import { useNavigate } from "react-router-dom"
import logo from "@/assets/image/logo (1).svg"
import { useHeaderStore } from "@/store/useHeaderStore"

const Header = () => {
  const navActive = useHeaderStore((state) => state.navActive);
  const setNavActive = useHeaderStore((state) => state.setNavActive);
  const navigate = useNavigate()
  const navSection=[
    { key: "accueil", label: "Accueil", path: "/" },
    { key: "formulaire", label: "Formulaire", path: "/formulaire" },
    { key: "documentation", label: "Documentation", path: "/documentation" },
    {key:"contact", label:"Contact", path:"/contact"}
  ]
  return (
    <header className="bg-white border-b border-picton-blue-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl" />
          <span className="text-picton-blue-800 font-black text-lg tracking-tight">Orientation Acadamique</span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navSection.map(({ key, label, path }) => (
            <button
              key={key}
              onClick={() => {
                              navigate(path)
                              setNavActive(key)
                            }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${navActive === key
                  ? "bg-picton-blue-500 text-white shadow-md shadow-picton-blue-200"
                  : "text-picton-blue-600 hover:bg-picton-blue-50"}`}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>   
  )
}

export default Header
