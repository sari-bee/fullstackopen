import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

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

  const handleSearch = (event) => {
    setValue(event.target.value)
  }

  if (value === '') {
    return (
      <div>
        <form>
          find countries <input value={value} onChange={handleSearch} />
        </form>
      </div>
    )
  }

  const countriesFiltered = countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
  const nameToShow = countriesFiltered.map(c => c.name)

  if (nameToShow.length === 0) {
    return (
      <div>
        <form>
        find countries <input value={value} onChange={handleSearch} />
        </form>
        <p>No matches</p>
      </div>
    )
  }

  if (nameToShow.length > 10) {
    return (
      <div>
        <form>
        find countries <input value={value} onChange={handleSearch} />
        </form>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (nameToShow.length > 1) {
    return (
      <div>
        <form>
        find countries <input value={value} onChange={handleSearch} />
        </form>
        {nameToShow.map(name => <p key={name}>{name} <button value={name} onClick={handleSearch}>Show</button></p>)}
      </div>
    )
  }

  return (
    <div>
      <form>
      find countries <input value={value} onChange={handleSearch} />
      </form>
      <Country countriesFiltered={countriesFiltered}/>
    </div>
  )

}

export default App