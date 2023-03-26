import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [weathericon, setWeatherIcon] = useState('01d')
  const [weatherdesc, setWeatherDesc] = useState('')
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries((response.data.map(({
        name, capital, area, languages, flags, flagsalt, capitalInfo}) => ({
        name : name.common, capital, area, languages, flags : flags.png, flagsalt : flags.alt, capitalInfo : capitalInfo.latlng})))
      )
    )
  }, [])

  const handleSearch = (event) => {
    setValue(event.target.value)
  }

  const searchWeather = (event) => {
    event.preventDefault()
    const lat = countriesFiltered.map(c => c.capitalInfo[0])
    const lon = countriesFiltered.map(c => c.capitalInfo[1])
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    .then(response => { 
      setTemperature(response.data.current.temp)
      setWind(response.data.current.wind_speed)
      setWeatherIcon(response.data.current.weather[0].icon)
      setWeatherDesc(response.data.current.weather[0].description)
    })
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
    <div onLoad={searchWeather}>
      <form>
      find countries <input value={value} onChange={handleSearch} />
      </form>
      <Country countriesFiltered={countriesFiltered}/>
      <Weather countriesFiltered={countriesFiltered} temperature={temperature} wind={wind} weathericon={weathericon} weatherdesc={weatherdesc}/>
    </div>
  )
}

export default App