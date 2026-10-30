// Helper functions: fetching, fallbacks, and formatting.

export const API = 'https://api.tvmaze.com'
export const NA = 'Not available'

// Fetch JSON, checking res.ok before calling res.json().
// Throws an Error with a friendly message (and a .status for HTTP errors).
export async function fetchJson(url, signal) {
  let res
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new Error('Could not reach TVmaze. Check your connection and try again.')
  }
  if (!res.ok) {
    const message =
      res.status === 429
        ? 'TVmaze is rate limiting requests. Please wait a few seconds and try again.'
        : `Request failed (HTTP ${res.status}).`
    const error = new Error(message)
    error.status = res.status
    throw error
  }
  return res.json()
}

// Cast lists rarely change, so remember them to avoid repeat requests
// (for example, when going gallery -> detail -> gallery).
const castCache = new Map()

export async function getCast(showId, signal) {
  if (castCache.has(showId)) return castCache.get(showId)
  const cast = await fetchJson(`${API}/shows/${showId}/cast`, signal)
  castCache.set(showId, cast)
  return cast
}

// Remove HTML tags. DOMParser does not run scripts or load images.
export function stripHtml(html) {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim()
}

export function truncate(text, max = 220) {
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

export function formatDate(value) {
  if (!value) return NA
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return isNaN(date) ? NA : date.toLocaleDateString(undefined, { dateStyle: 'medium' })
}

export function formatUpdated(seconds) {
  if (typeof seconds !== 'number') return NA
  return new Date(seconds * 1000).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function formatGenres(genres) {
  return genres && genres.length ? genres.join(', ') : NA
}

export function formatRating(rating) {
  return rating && typeof rating.average === 'number' ? `${rating.average} / 10` : NA
}

export function getNetwork(show) {
  return show.network?.name || show.webChannel?.name || NA
}
