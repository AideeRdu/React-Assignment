import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Poster from './Poster.jsx'
import ShowFacts from './ShowFacts.jsx'
import CastList from './CastList.jsx'
import { API, fetchJson, getCast, stripHtml, getNetwork, NA } from '../utils.js'

export default function ShowDetail() {
  const { id } = useParams() // read the id from the URL
  const validId = /^\d+$/.test(id)

  const [show, setShow] = useState(null)
  const [status, setStatus] = useState('loading') // loading | error | notfound | success
  const [error, setError] = useState('')
  const [cast, setCast] = useState([])
  const [castStatus, setCastStatus] = useState('loading')

  // Load the show. Runs again if the id in the URL changes, and on a direct visit or refresh.
  useEffect(() => {
    if (!validId) return
    const controller = new AbortController()
    setStatus('loading')
    fetchJson(`${API}/shows/${id}`, controller.signal)
      .then((data) => {
        setShow(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        if (err.status === 404) {
          setStatus('notfound')
        } else {
          setError(err.message)
          setStatus('error')
        }
      })
    return () => controller.abort()
  }, [id, validId])

  // Load the cast separately so a cast failure doesn't hide the show.
  useEffect(() => {
    if (!validId) return
    const controller = new AbortController()
    setCastStatus('loading')
    getCast(id, controller.signal)
      .then((data) => {
        setCast(data)
        setCastStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setCastStatus('error')
      })
    return () => controller.abort()
  }, [id, validId])

  const backLink = (
    <Link to="/" className="back-link">
      ← Back to gallery
    </Link>
  )

  if (!validId || status === 'notfound') {
    return (
      <>
        {backLink}
        <p className="message error">We couldn't find a show with the ID "{id}".</p>
      </>
    )
  }
  if (status === 'loading') return <p className="message">Loading show…</p>
  if (status === 'error') {
    return (
      <>
        {backLink}
        <p className="message error">{error}</p>
      </>
    )
  }

  const summary = stripHtml(show.summary)

  return (
    <article className="detail">
      {backLink}
      <div className="detail-layout">
        <Poster show={show} size="original" />
        <div className="detail-body">
          <h2>{show.name}</h2>
          <p>{summary || `Summary: ${NA}`}</p>
          <ShowFacts show={show}>
            <dt>Status</dt>
            <dd>{show.status || NA}</dd>
            <dt>Network</dt>
            <dd>{getNetwork(show)}</dd>
          </ShowFacts>
          <h3>Cast</h3>
          {castStatus === 'loading' && <p>Loading cast…</p>}
          {castStatus === 'error' && <p>Cast could not be loaded.</p>}
          {castStatus === 'success' && <CastList cast={cast} limit={15} showCharacters />}
          {show.url && (
            <p>
              <a href={show.url} target="_blank" rel="noopener noreferrer">
                View on TVmaze
              </a>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
