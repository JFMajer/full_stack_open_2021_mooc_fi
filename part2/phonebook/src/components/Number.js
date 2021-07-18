import React from 'react';

const Number = (props) => {
  return (
    <li>{ props.person.name } { props.person.number } <button onClick={props.handleDelete}>delete</button></li>
  )
}

export default Number