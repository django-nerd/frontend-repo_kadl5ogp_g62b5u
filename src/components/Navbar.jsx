export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-sky-500 to-cyan-400" />
          <span className="text-white font-bold">RunFlash</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-blue-100/80 text-sm">
          <a href="#" className="hover:text-white">Ventes</a>
          <a href="#" className="hover:text-white">Marques</a>
          <a href="#" className="hover:text-white">Aide</a>
        </nav>
      </div>
    </header>
  )
}
