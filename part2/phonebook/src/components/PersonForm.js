import React from 'react';

const PersonForm = (props) =>
{
    return (
        <form onSubmit={ props.addName }>
            name: <input value={ props.newName } onChange={ props.handleNameChange } />
            number: <input value={ props.newNumber } onChange={ props.handleNumberChange } />
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm