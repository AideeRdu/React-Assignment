import SearchForm from './SearchForm.jsx'
import ResultsSummary from './ResultsSummary.jsx'
import ShowList from './ShowList.jsx'

// Conditional rendering: one message or the results, depending on status.
export default function GalleryPage({ query, shows, status, error, onSearch }) {
  return (
    <>
      <SearchForm initialValue={query} onSearch={onSearch} disabled={status === 'loading'} />

      {status === 'loading' && <p className="message">Searching…</p>}
      {status === 'error' && <p className="message error">{error}</p>}
      {status === 'empty' && (
        <p className="message error">Enter a show title or keyword to search.</p>
      )}
      {status === 'noresults' && (
        <p className="message error">
          No shows found for "{query}". Try a different title or keyword.
        </p>
      )}
      {status === 'success' && (
        <>
          <ResultsSummary query={query} count={shows.length} />
          <ShowList shows={shows} />
        </>
      )}
    </>
  )
}
