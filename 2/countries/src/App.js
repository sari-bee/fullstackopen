import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')

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
    setValue(event.target.value)
  }

  if (value === '') {
    return (
      <div>
        <form>
          country: <input value={value} onChange={handleSearch} />
        </form>
      </div>
    )
  }

  const nameToShow = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.name)
  const capitalToShow = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.capital)
  const areaToShow = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.area)
  const languagesToShow = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.languages)
  const languagesBrokenDown = Object.keys(languagesToShow[0]).map(key => <li key={key}>{languagesToShow[0][key]}</li>)
  const flagToShow = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.flags)

  console.log(nameToShow)

  if (nameToShow.length > 10) {
    return (
      <div>
        <form>
          country: <input value={value} onChange={handleSearch} />
        </form>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (nameToShow.length > 1) {
    return (
      <div>
        <form>
          country: <input value={value} onChange={handleSearch} />
        </form>
        <p>{nameToShow.map(name => <p>{name}</p>)}</p>
      </div>
    )
  }

  return (
    <div>
      <form>
        country: <input value={value} onChange={handleSearch} />
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