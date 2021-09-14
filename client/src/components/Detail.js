import React from 'react'
import { getRecipeById } from '../actions/index.js'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './Detail.module.css'

function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeById(props.match.params.idReceta));
    }, [dispatch])

    const recipeDetails = useSelector((state) => state.recipes)


    return (
        <div>
            {recipeDetails.length > 0 ?
                <div>
                    <h1>{recipeDetails[0].name}</h1>
                    <img src={recipeDetails[0].image ? recipeDetails[0].image : '../assets/image-not-found.png'} alt='no image' />
                    <h3>Score {recipeDetails[0].score}</h3>
                    <h3>Healthy Level {recipeDetails[0].healthyLevel}</h3>
                    <p className={styles.text} dangerouslySetInnerHTML={{ __html: recipeDetails[0].summary }} ></p>
                    <p>{recipeDetails[0].dietsAvailable}</p>
                    <Link to='/home'className={styles.button}><button>Back Home</button></Link>
                </div> : 'la prueba de que no quiere andar'}
        </div>
    )
}

export default Detail
