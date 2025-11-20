import { useEffect, useState } from 'react'

function Countdown({ endAt }) {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    const tick = () => {
      const end = new Date(endAt).getTime()
      const now = Date.now()
      const diff = Math.max(0, end - now)
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
    }
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [endAt])
  return <span className="font-mono text-sm text-white/80">{timeLeft}</span>
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events`)
        const data = await res.json()
        setEvents(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-blue-100">Chargement des ventes…</div>

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Ventes en cours & à venir</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div key={e.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
            {e.banner_url ? (
              <img src={e.banner_url} alt={e.title} className="h-40 w-full object-cover" />
            ) : (
              <div className="h-40 w-full bg-gradient-to-br from-sky-400/30 to-cyan-300/20" />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold truncate pr-2">{e.title}</h3>
                <Countdown endAt={e.end_at} />
              </div>
              {e.subtitle && <p className="text-blue-100/80 text-sm line-clamp-2">{e.subtitle}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {(e.categories || []).slice(0,3).map((c) => (
                  <span key={c} className="px-2 py-0.5 text-xs rounded bg-white/10 text-white/80">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
