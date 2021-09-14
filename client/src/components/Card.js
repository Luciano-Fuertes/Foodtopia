import React from 'react'
import style from './Card.module.css'

function Card({ image, name, diet }) {
    return (
        <div className={style.cardContainer}>
            <div className={style.textContainer}>
                <h3 className={style.cardName}>{name}</h3>
                <h5 className={style.cardDiet}>{diet.map(diet => diet + ', ')}</h5>
            </div>
            <img className={style.cardImg} src={image} alt='img not found' />
        </div>
    )
}

export default Card
