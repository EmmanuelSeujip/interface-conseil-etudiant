const Header = ({navActive, setNavActive}) => {
  return (
    <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <span className="text-blue-800 font-black text-lg tracking-tight">Orientation Acadamique</span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {[
            { key: "accueil", label: "Accueil" },
            { key: "essai", label: "Essai" },
            { key: "documentation", label: "Documentation" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setNavActive(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                ${navActive === key
                  ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                  : "text-blue-600 hover:bg-blue-50"}`}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>   
  )
}

export default Header
