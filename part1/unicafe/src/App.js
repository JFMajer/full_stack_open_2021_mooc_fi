import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const Button = (props) =>
{
  return (
    <button type="button" onClick={ props.handleclick }>{ props.name }</button>
  )
}

const Statistics = ({ good, neutral, bad, average, clicks, percPositive }) =>
{
  if (clicks === 0)
  {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
      <Statistic text='good' value={ good } />
      <Statistic text='neutral' value={ neutral } />
      <Statistic text='bad' value={ bad } />
      <Statistic text='all' value={ clicks } />
      <Statistic text='average' value={ average } />
      <Statistic text='positive' value={ percPositive } />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) =>
{
  if (text === 'positive') {
    return (
      <tr>
      <td>{ text }</td><td>{ value } %</td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{ text }</td><td>{ value }</td>
    </tr>
  )
}


const App = () =>
{
  const nameGood = 'good';
  const nameNeutral = 'neutral';
  const nameBad = 'bad';
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setClicks] = useState(0);

  const plusGood = () =>
  {
    setGood(good + 1);
    setClicks(allClicks + 1);
  }
  const plusNeutral = () =>
  {
    setNeutral(neutral + 1);
    setClicks(allClicks + 1);
  }
  const plusBad = () =>
  {
    setBad(bad + 1);
    setClicks(allClicks + 1);
  }

  const average = () =>
  {
    return ((good * 1) + (bad * (-1))) / (allClicks);
  }

  const percPositive = () =>
  {
    return (good * 100) / (allClicks)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={ nameGood } handleclick={ plusGood } />
      <Button name={ nameNeutral } handleclick={ plusNeutral } />
      <Button name={ nameBad } handleclick={ plusBad } />
      <h1>statistics</h1>
      <Statistics good={ good } neutral={ neutral } bad={ bad } average={ average() } clicks={ allClicks } percPositive={ percPositive() } />
    </div>
  );
}

export default App;
