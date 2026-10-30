// Not the owner of the input: it only receives the shared state as props.
export default function ResultsSummary({ query, count }) {
  return (
    <p className="message" role="status">
      Showing {count} result{count === 1 ? '' : 's'} for "{query}".
    </p>
  )
}
