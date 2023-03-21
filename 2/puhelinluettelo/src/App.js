import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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

  const handleNotificationMessageChange = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {setNotificationMessage(null)}, 5000)  
  }

  const addPerson = (event) => {
    event.preventDefault()
      if (persons.map(person => person.name).includes(newName)) {
        const person_id = persons.find(person => person.name === newName).id
        changeNumberFor(person_id)
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
      handleNotificationMessageChange(`${newName} added successfully`)
  }

  const deleteItemFor = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      const name = persons.find(person => person.id === id).name
      personService.deleteOne(id)
        .then(response =>{personService.getAll()
          .then(p => setPersons(p))})
      handleNotificationMessageChange(`${name} deleted`)
    }
  }
  
  const changeNumberFor = id => {
    if (window.confirm(`${persons.find(person => person.id === id).name} is already added to the phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person, number: newNumber }
      personService.changeNumber(id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      handleNotificationMessageChange(`Number changed for ${person.name}`)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const resultsToShow = persons.filter(person => person.name.toLowerCase().includes(searchPhrase.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter searchPhrase={searchPhrase} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <NewPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {resultsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} deleteItem={() => deleteItemFor(person.id)}/>)}
    </div>
  )
}

export default App