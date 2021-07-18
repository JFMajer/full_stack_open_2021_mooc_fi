//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Number from './components/Number'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebook from './services/phonebook';

const ShowMessage = ({message}) => {
  if (message === '') {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const ShowErrorMessage = ({errorMessage}) => {
  if (errorMessage === '') {
    return null
  }
  return (
    <div className="errorMessage">
      {errorMessage}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
        let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if (confirm) {
          phonebook
            .updateNumber(persona.id, person)
            .then(iGotPersonBack => {
              setPersons(persons.map(p => p.id === iGotPersonBack.id ? iGotPersonBack : p))
            })
            .then(() => {
              setMessage(`Number for ${persona.name} updated`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Something bad happened: ${error}`)
            })
        }
        return isTaken = true;
      }
    })
    if (!isTaken) {
      phonebook
        .addPerson(person)
        .then(allNumbers => {
          setPersons(persons.concat(allNumbers))
        })
        .then(() => {
          setMessage(`Person ${person.name} has been added to phonebook!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {
    const id = person.id;
    let confirm = window.confirm(`you sure you want to remove ${person.name}?`)
    if (confirm) {
      phonebook
        .deletePerson(id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
        )
        .then(() => {
          setMessage(`Person ${person.name} has been removed!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter search={ search } />
        <h2>Add new</h2>
        <PersonForm addName={ addName } newName={ newName } handleNameChange={ handleNameChange } newNumber={ newNumber } handleNumberChange={ handleNumberChange } />
      </div>
      <ShowMessage message={message} />
      <ShowErrorMessage errorMessage={errorMessage} />
      <h2>Numbers</h2>
      <ul>
        { persons.filter(person => person.display).map(person => {
          return <Number key={ person.name } person={ person } handleDelete={ () => handleDelete(person) } />
        }) }
      </ul>
    </div>

  )
}

export default App
