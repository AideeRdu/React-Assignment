import { NA } from '../utils.js'

// Shows up to `limit` cast members. Names only on cards;
// names with characters when showCharacters is true.
export default function CastList({ cast, limit, showCharacters = false }) {
  if (!cast.length) return <>{NA}</>

  return (
    <ul className="cast-list">
      {cast.slice(0, limit).map(({ person, character }) => (
        // A person can play several characters, so combine both IDs for a stable key.
        <li key={`${person.id}-${character.id}`}>
          {person.name}
          {showCharacters && character.name ? ` as ${character.name}` : ''}
        </li>
      ))}
    </ul>
  )
}
