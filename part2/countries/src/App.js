import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY


const DisplaySearchResults = (props) => {
  const [state, setState] = useState(true)
  const switchState = () => {
    setState(!state)
  }
  //console.log(state)
  return (
    <div>
      { props.country.name }
      <button onClick={ switchState }>{state ? 'show details' : 'hide'}</button>
      <div>
        {state ? <div></div> : <div>{<ReturnOne country={props.country} />}</div>}
      </div>
    </div>
  )
}

const DisplayInfo = () => {
  return (
    <div>Too many matches, specify another filter</div>
  )
}

const ReturnOne = (props) => {

  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}$units=m`)
      .then(response => {
        setWeather(response.data.current)
      })
  }

  useEffect(hook, [])
  //console.log('props: ', props)
  //console.log(props.country.flag)
  return (
    <div>
      <h1>{ props.country.name }</h1>
      <div>capital: { props.country.capital }</div>
      <div>population: { props.country.population }</div>
      { props.country.languages.map(language => {
        return <div key={language.name}>{ language.name }</div>
      }) }
      <img src={ props.country.flag } width="300" alt="flag"></img>

      <h2>Weather in {props.country.capital}</h2>
      <p><b>temperature:</b> {weather.temperature}</p>
      <img src={weather.weather_icons }></img>
      <p><b>wind:</b> {weather.wind_speed} kmh direction {weather.wind_dir} </p>
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [toDisplay, setToDisplay] = useState([])


  const hook = () => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const search = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    let countriesToDisplay = []
    setToDisplay(countriesToDisplay)
    //console.log('toDisplay', toDisplay)
    countries.map(country => {
      if (country.name.toLowerCase().includes(searchQuery)) {
        countriesToDisplay.push(country)
      }
    })
  }

  let whatToReturn;
  if (toDisplay.length > 1 && toDisplay.length <= 10) {
    whatToReturn = toDisplay.map(country => {
      return <DisplaySearchResults key={country.name} country={ country } />
    })
  } else if (toDisplay.length > 10) {
    whatToReturn = <DisplayInfo />
  } else if (toDisplay.length === 1) {
    whatToReturn = toDisplay.map(country => {
      return <ReturnOne key={country.name} country={ country } />
    })
  }


  return (
    <div>
      <div>
        <h2>Countries</h2>
        Find countries <input onChange={ search }></input>
      </div>
      <div>
        { whatToReturn }
      </div>
    </div>
  );
}

export default App;
