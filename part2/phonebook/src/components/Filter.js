import React from 'react';

const Filter = ({search}) => {
    return (
        <div>search for <input onChange={ search }></input> </div>
    )
}

export default Filter