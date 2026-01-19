import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
})
function About() {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // ─── This is the line that was failing ───
    // if (!window.electronAPI?.ipc) {
    //   console.warn('Electron API not exposed – running outside Electron?')
    //   // fallback
    //   window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')
    //   return
    // }

    // window.electronAPI.sendGoogleSearch(query)
    // // window.ipcRenderer.send('perform-google-search', query)
    // setQuery('')
    // window.op
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_self')
  }

  return (
    <div>
      <h2>Hello from About!</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Google search…"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}