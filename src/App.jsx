import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Events from './components/Events'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <Hero />
      <Events />
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-blue-100/70 text-sm">
          <p>
            © {new Date().getFullYear()} RunFlash — Ventes événementielles à La Réunion. En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous désinscrire à tout moment.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
