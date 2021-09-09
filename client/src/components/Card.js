import React from 'react'

function Card({image, name, diet}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{diet}</h5>
            <img src={image} alt='img not found'/>
        </div>
    )
}

export default Card
