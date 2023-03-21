import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => {
  return <>{name} {number}<br/></>
}

const Filter = ({searchPhrase, handleSearchChange}) => {
  return <><form>filter shown with <input value={searchPhrase} onChange={handleSearchChange}/></form></>
}

const AddPerson = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return <><form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/><br/>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form></>
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchPhrase(event.target.value)
  }

  const resultsToShow = persons.filter(person => person.name.toLowerCase().includes(searchPhrase.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPhrase={searchPhrase} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {resultsToShow.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App