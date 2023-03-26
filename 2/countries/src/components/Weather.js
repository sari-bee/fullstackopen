const Weather = ({countriesFiltered, temperature, weathericon, weatherdesc, wind}) => {
    return (
        <>
        <h3>Weather in {countriesFiltered.map(c => c.capital + " ")}</h3>
        <p>temperature {temperature} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weathericon}@2x.png`} title={weatherdesc} alt={weatherdesc}></img>
        <p>wind {wind} m/s</p>
        </>
    )
}

export default Weather