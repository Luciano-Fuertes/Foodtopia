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
                    <h1 className= {styles.title}>{recipeDetails[0].name}</h1>
                    <div className={styles.container}>
                        <div>
                            <img src={recipeDetails[0].image ? recipeDetails[0].image : '../assets/image-not-found.png'} alt='no image' />
                        </div>
                        <div>
                            <div className={styles.scoresContainer}>
                                <h3>Score {recipeDetails[0].score}</h3>
                                <h3>Healthy Level {recipeDetails[0].healthyLevel}</h3>
                            </div>
                            <h4>Recommended for diets</h4>
                            <p>{recipeDetails[0].dietsAvailable.map(diet => diet + ', ')}</p>
                            <h4>Summary</h4>
                            <p className={styles.text} dangerouslySetInnerHTML={{ __html: recipeDetails[0].summary }} ></p>
                        </div>
                    </div>
                    <div>
                        {recipeDetails[0].cookingSteps && <p>{recipeDetails[0].cookingSteps}</p>}
                    </div>
                    <Link to='/home'><button className={styles.button}>Back Home</button></Link>
                </div> : 'la prueba de que no quiere andar'}
        </div>
    )
}

export default Detail
