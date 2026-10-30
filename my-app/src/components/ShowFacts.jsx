import { formatDate, formatUpdated, formatGenres, formatRating } from '../utils.js'

// The details shared by the card and the detail page.
// `children` lets each page add its own extra rows.
export default function ShowFacts({ show, children }) {
  return (
    <dl className="facts">
      <dt>Premiered</dt>
      <dd>{formatDate(show.premiered)}</dd>
      <dt>Last updated</dt>
      <dd>{formatUpdated(show.updated)}</dd>
      <dt>Genres</dt>
      <dd>{formatGenres(show.genres)}</dd>
      <dt>Rating</dt>
      <dd>{formatRating(show.rating)}</dd>
      {children}
    </dl>
  )
}
