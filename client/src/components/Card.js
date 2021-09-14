import React from 'react'
import style from './Card.module.css'

function Card({image, name, diet}) {
    return (
        <div>
            <h3 className={style.cardName}>{name}</h3>
            <h5 className={style.cardDiet}>{diet}</h5>
            <img className={style.cardImg} src={image} alt='img not found'/>
        </div>
    )
}

export default Card
