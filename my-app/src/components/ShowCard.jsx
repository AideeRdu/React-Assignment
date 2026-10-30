import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Poster from './Poster.jsx'
import ShowFacts from './ShowFacts.jsx'
import CastList from './CastList.jsx'
import { getCast, stripHtml, truncate, NA } from '../utils.js'

export default function ShowCard({ show }) {
  const [cast, setCast] = useState([])
  const [castStatus, setCastStatus] = useState('loading') // loading | error | success

  // Each card loads its own cast. A failure here only affects this card.
  useEffect(() => {
    const controller = new AbortController()
    setCastStatus('loading')
    getCast(show.id, controller.signal)
      .then((data) => {
        setCast(data)
        setCastStatus('success')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setCastStatus('error')
      })
    return () => controller.abort()
  }, [show.id])

  const summary = stripHtml(show.summary)

  return (
    <article className="card">
      <Poster show={show} />
      <div className="card-body">
        <h2>
          <Link to={`/shows/${show.id}`}>{show.name || 'Untitled show'}</Link>
        </h2>
        <p>{summary ? truncate(summary) : `Summary: ${NA}`}</p>
        <ShowFacts show={show}>
          <dt>Main cast</dt>
          <dd>
            {castStatus === 'loading' && 'Loading…'}
            {castStatus === 'error' && 'Cast could not be loaded'}
            {castStatus === 'success' && <CastList cast={cast} limit={5} />}
          </dd>
        </ShowFacts>
        {show.url && (
          <a href={show.url} target="_blank" rel="noopener noreferrer">
            View on TVmaze
          </a>
        )}
      </div>
    </article>
  )
}
