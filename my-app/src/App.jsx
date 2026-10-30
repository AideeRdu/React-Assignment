import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GalleryPage from './components/GalleryPage.jsx'
import ShowDetail from './components/ShowDetail.jsx'
import { API, fetchJson } from './utils.js'

const DEFAULT_QUERY = 'star trek'
const MAX_RESULTS = 10

// App owns the search state so the form, the summary, and the gallery
// all share it, and it survives navigating to a detail page and back.
export default function App() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [shows, setShows] = useState([])
  const [status, setStatus] = useState('loading') // loading | error | empty | noresults | success
  const [error, setError] = useState('')

  // Runs on first load (default search) and whenever the query changes.
  useEffect(() => {
    if (!query) {
      setShows([])
      setStatus('empty')
      return
    }
    const controller = new AbortController()
    setShows([])
    setStatus('loading')

    fetchJson(`${API}/search/shows?q=${encodeURIComponent(query)}`, controller.signal)
      .then((data) => {
        const found = data.slice(0, MAX_RESULTS).map((result) => result.show)
        setShows(found)
        setStatus(found.length ? 'success' : 'noresults')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setStatus('error')
      })

    // Cleanup: cancel the request if the query changes or the app unmounts.
    return () => controller.abort()
  }, [query])

  return (
    <>
      <header className="page-header">
        <h1>TVmaze Show Gallery</h1>
      </header>
      <main className="page-main">
        <Routes>
          <Route
            path="/"
            element={
              <GalleryPage
                query={query}
                shows={shows}
                status={status}
                error={error}
                onSearch={setQuery}
              />
            }
          />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route path="*" element={<p className="message">Page not found.</p>} />
        </Routes>
      </main>
      <footer className="page-footer">
        Data provided by{' '}
        <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">
          TVmaze.com
        </a>
        , licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-SA
        </a>
        .
      </footer>
    </>
  )
}
