import React from 'react'
import style from './Card.module.css'

function Card({ image, name, diet }) {
    return (
        <div className={style.cardContainer}>
            <div className={style.textContainer}>
                <p className={style.cardName}>{name}</p>
                <p className={style.cardDiet}>{diet.map(diet => diet + ', ')}</p>
            </div>
            <img className={style.cardImg} src={image} alt='img not found' />
        </div>
    )
}

export default Card
