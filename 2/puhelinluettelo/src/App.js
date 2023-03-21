import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const addPerson = (event) => {
    event.preventDefault()
      if (persons.map(person => person.name).includes(newName)) {
        alert(`${newName} is already added to the phonebook`)
        setNewName('')
        return
      }
      const personObject = {name: newName, number: newNumber}
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
  }

  const deleteToggleFor = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`).then(response => {
        personService.getAll()
        .then(p => {setPersons(p)})})
    }
  }

  const resultsToShow = persons.filter(person => person.name.toLowerCase().includes(searchPhrase.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPhrase={searchPhrase} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <NewPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {resultsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} deleteToggle={() => deleteToggleFor(person.id)}/>)}
    </div>
  )
}

export default App