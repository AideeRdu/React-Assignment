import { useState } from 'react'

// Controlled form: the input's value always comes from state.
export default function SearchForm({ initialValue, onSearch, disabled }) {
  const [text, setText] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(text.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="query" className="visually-hidden">
        Show title or keyword
      </label>
      <input
        id="query"
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search for a show, e.g. Breaking Bad"
      />
      <button type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  )
}
