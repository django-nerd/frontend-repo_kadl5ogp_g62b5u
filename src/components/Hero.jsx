import { useEffect, useState } from 'react'

export default function Hero({ onSubscribe }) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName, source: 'landing' })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage('Merci ! Vous serez prévenu des prochaines ventes.')
        setEmail('')
        setFirstName('')
        onSubscribe && onSubscribe()
      } else {
        setMessage("Une erreur est survenue. Réessayez plus tard.")
      }
    } catch (e) {
      setMessage("Impossible de s'inscrire pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#60a5fa,transparent_40%),radial-gradient(circle_at_70%_60%,#22d3ee,transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Ventes flash péi, bons plans exclusifs à La Réunion
          </h1>
          <p className="mt-5 text-blue-100/90 text-lg">
            Des marques locales et des trouvailles importées, à prix cassés. Inscrivez-vous pour accéder en avant-première.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 bg-white/10 backdrop-blur rounded-xl p-3 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Prénom (optionnel)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-100/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="email"
              placeholder="Votre e‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-100/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold shadow disabled:opacity-60"
            >
              {loading ? 'Inscription…' : "Je m'inscris"}
            </button>
          </form>
          {message && <p className="mt-3 text-sm text-emerald-300">{message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 md:h-56 rounded-2xl bg-gradient-to-br from-sky-400/40 to-cyan-300/30 border border-white/10" />
          <div className="h-40 md:h-56 rounded-2xl bg-gradient-to-br from-fuchsia-400/30 to-violet-300/20 border border-white/10" />
          <div className="h-40 md:h-56 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-lime-300/20 border border-white/10" />
          <div className="h-40 md:h-56 rounded-2xl bg-gradient-to-br from-amber-400/40 to-orange-300/20 border border-white/10" />
        </div>
      </div>
    </section>
  )
}
