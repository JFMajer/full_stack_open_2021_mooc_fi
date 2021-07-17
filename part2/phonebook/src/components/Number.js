import React from 'react';

const Number = (props) =>
{
  return (
    <li>{ props.person.name } { props.person.number } <button onClick={removeNote}>delete</button></li>
  )
}

export default Number