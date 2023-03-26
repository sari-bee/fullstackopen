const Country = ({countriesFiltered}) => {

    const capitals = countriesFiltered.map(c => c.capital)
    const capitalsToShow = Object.keys(capitals[0]).map(key => capitals[0][key] + " ")
    const languages = countriesFiltered.map(c => c.languages)
    const languagesToShow = Object.keys(languages[0]).map(key => <li key={key}>{languages[0][key]}</li>)

    return (
        <>
            <h2>{countriesFiltered.map(c => c.name)}</h2>
            <p>capital {capitalsToShow}<br/>
            area {countriesFiltered.map(c => c.area)}</p>
            <b>languages:</b>
            <ul>
            {languagesToShow}
            </ul>
            <img src={countriesFiltered.map(c => c.flags)} alt={countriesFiltered.map(c => c.flagsalt)} title={countriesFiltered.map(c => c.flagsalt)}></img><br/>
        </>
    )
}

export default Country