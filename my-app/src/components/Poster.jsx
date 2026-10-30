import { useState } from 'react'

export default function Poster({ show, size = 'medium' }) {
  const [failed, setFailed] = useState(false)
  const url = show.image && (show.image[size] || show.image.medium || show.image.original)

  if (!url || failed) {
    return <div className="no-poster">Poster not available</div>
  }
  return (
    <img
      className="poster"
      src={url}
      alt={`Poster for ${show.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
