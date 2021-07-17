import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Number from './components/Number'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import phonebook from './services/phonebook';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  const hook = () => {
    phonebook
      .getAll()
      .then(allNumbers => {
        setPersons(allNumbers)
      })
  }

  useEffect(hook, [])


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const search = (e) => {
    let searchQuery = e.target.value.toLowerCase()
    setPersons(persons.map(person => {
      if (person.name.toLowerCase().includes(searchQuery)) {
        return { ...person, display: true }
      } else {
        return { ...person, display: false }
      }
    }))

  }


  const addName = (e) => {
    e.preventDefault()
    console.log('hello');
    let isTaken = false;
    const person = {
      name: newName,
      number: newNumber,
      display: true
    }
    console.log('person:', person)
    persons.map(persona => {
      if (persona.name === newName) {
        alert(`${newName} is already added to phonebook`);
        isTaken = true;
      }
    })
    if (!isTaken) {
      phonebook
        .addPerson(person)
        .then(allNumbers => {
          setPersons(persons.concat(allNumbers))
        })
    }
    setNewName('')
    setNewNumber('')
    //console.log(persons)
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter search={ search } />
        <h2>Add new</h2>
        <PersonForm addName={ addName } newName={ newName } handleNameChange={ handleNameChange } newNumber={ newNumber } handleNumberChange={ handleNumberChange } />
      </div>

      <h2>Numbers</h2>
      <ul>
        { persons.filter(person => person.display).map(person => {
          return <Number key={ person.name } person={ person } />
        }) }
      </ul>
    </div>

  )
}

export default App
