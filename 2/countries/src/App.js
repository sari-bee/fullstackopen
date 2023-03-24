import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries((response.data.map(({
        name, capital, area, languages, flags}) => ({
        name : name.common, capital, area, languages, flags : flags.png})))
      )
    )
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  if (country === null) {
    return (
      <div>
        <form onSubmit={handleSearch}>
          country: <input value={value} onChange={handleChange} />
          <button type="submit">Find</button>
        </form>
      </div>
    )
  }

  const nameToShow = countries.filter(c => c.name === country).map(c => c.name)
  const capitalToShow = countries.filter(c => c.name === country).map(c => c.capital)
  const areaToShow = countries.filter(c => c.name === country).map(c => c.area)
  const languagesToShow = countries.filter(c => c.name === country).map(c => c.languages)
  const languagesBrokenDown = Object.keys(languagesToShow[0]).map(key => <li key={key}>{languagesToShow[0][key]}</li>)
  const flagToShow = countries.filter(c => c.name === country).map(c => c.flags)

  return (
    <div>
      <form onSubmit={handleSearch}>
        find countries <input value={value} onChange={handleChange} />
        <button type="submit">Find</button>
      </form>
      <h2>{nameToShow}</h2>
      <p>capital {capitalToShow}<br/>
      area {areaToShow}</p>
      <b>languages:</b>
      <ul>
      {languagesBrokenDown}
      </ul>
      <img src={flagToShow}></img>
    </div>
  )
}

export default App