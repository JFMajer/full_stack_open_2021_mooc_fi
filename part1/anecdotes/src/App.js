import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

const Button = (props) => {
  return (
    <div>
    <button onClick={props.handleclick}>{ props.text }</button>
    <button onClick={props.upvote}>vote</button>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [upDoodes, setUpDoodes] = useState(new Array(anecdotes.length).fill(0))
  const [mostUpvoted, setMostUpvoted] = useState(0)

  const getRandomNum = () => {
    return Math.floor(Math.random()*anecdotes.length);
  }

  const getRandomAnectode = () => {
    let randomNum = getRandomNum();
    setSelected(randomNum);
    mostUpvotedCalc();
  }

  const upvote = () => {
    let copyOfUpdoodes = [...upDoodes];
    copyOfUpdoodes[selected] += 1;
    console.log('copy of dogs:', copyOfUpdoodes);
    setUpDoodes(copyOfUpdoodes);
    console.log('upddodes:', upDoodes);
    mostUpvotedCalc();
  }


  //this is so clunky it hurts :(
  const mostUpvotedCalc = () => {
    let mostUpvotedIndex = mostUpvoted;
    let maxUpvotes = upDoodes[mostUpvotedIndex];
    for (let i = 0; i < anecdotes.length; i++) {
      if (upDoodes[i] > maxUpvotes) {
        mostUpvotedIndex = i;
      }
    }
    setMostUpvoted(mostUpvotedIndex);
  }


  return (
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]}
      <p>has { upDoodes[selected]} votes</p>
      <Button text={'next anectode'} handleclick={getRandomAnectode} upvote={upvote} />
      <h1>Anectode with most votes</h1>
      {anecdotes[mostUpvoted]}
      <p>has { upDoodes[mostUpvoted]} votes</p>

    </div>
  )
}

export default App