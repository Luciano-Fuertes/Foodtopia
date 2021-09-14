import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postNewRecipe, getDietType } from '../actions'
import { Link, useHistory } from 'react-router-dom'
import styles from './NewRecipe.module.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name must be provided'
    }
    if (!input.summary) {
        errors.summary = 'Summary must be provided'
    }
    if (!input.ingredient) {
        errors.ingredient = 'Ingredients must be provided'
    }
    if (isNaN(input.score)) {
        errors.score = 'Only numbers are allowed'
    }
    if (isNaN(input.healthyLevel)) {
        errors.healthyLevel = 'Only numbers are allowed'
    }
    if (input.score > 100 || input.score < 1) {
        errors.score = 'The Score must be between 1 and 100'
    }
    if (input.healthyLevel > 100 || input.healthyLevel < 1) {
        errors.healthyLevel = 'The Healthy Level must be between 1 and 100'
    }


    return errors;
}


function NewRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const getDiets = useSelector((state) => state.dietType)
    const [errors, setErrors] = useState({})
    const [formInput, setFormInput] = useState({
        name: '',
        image: '',
        summary: '',
        ingredient: '',
        score: '',
        healthyLevel: '',
        cookingSteps: '',
        dietsAvailable: [],
    })

    useEffect(() => {
        dispatch(getDietType())
    }, [dispatch]);

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
        })
        setErrors(validate({
            ...formInput,
            [e.target.name]: e.target.value
        }))
    }

    const handleDietsChange = (e) => {
        setFormInput({
            ...formInput,
            dietsAvailable: [...formInput.dietsAvailable, e.target.value],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postNewRecipe(formInput))
        alert('Recipe successfully built!')
        setFormInput({
            name: '',
            image: '',
            summary: '',
            ingredient: '',
            score: '',
            healthyLevel: '',
            cookingSteps: '',
            dietsAvailable: [],
        })
        history.push('/home')
    }

    const handleReset = () => {
        setFormInput({
            name: '',
            image: '',
            summary: '',
            ingredient: '',
            score: '',
            healthyLevel: '',
            cookingSteps: '',
            dietsAvailable: [],
        })
    }



    return (
        <div>
            <h2>Build a new recipe!</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name </label>
                    <input required="required" onChange={(e) => handleChange(e)} type='text' name='name' value={formInput.name} />
                </div>
                <div>
                    <label>Picture </label>
                    <input onChange={(e) => handleChange(e)} type='text' name='image' value={formInput.image} />
                </div>
                <div>
                    <label>Summary </label>
                    <input required="required" onChange={(e) => handleChange(e)} type='text' name='summary' value={formInput.summary} />
                </div>
                <div>
                    <label>Ingredients </label>
                    <input required="required" onChange={(e) => handleChange(e)} type='text' name='ingredient' value={formInput.ingredient} />
                </div>
                <div>
                    <label>Score </label>
                    <input onChange={(e) => handleChange(e)} type='number' name='score'
                        min='1' max='100' />
                </div>
                <div>
                    <label>Healthy Level </label>
                    <input onChange={(e) => handleChange(e)} type='number' name='healthyLevel' value={formInput.healthyLevel}
                        min='1' max='100' />
                </div>
                <div>
                    <label>Cooking Steps </label>
                    <input onChange={(e) => handleChange(e)} type='textarea' name='cookingSteps' value={formInput.cookingSteps} />
                </div>
                <div>
                    <label>Diet Type </label>
                    <select onChange={handleDietsChange}>
                        {getDiets.map((diet) => {
                            return (<option name={diet.name}>{diet.name}</option>);
                        })}
                    </select>
                    <ul><li>{formInput.dietsAvailable.map(diet => diet + ', ')}</li></ul>
                </div>
                <div>
                    <Link to='/home'><button className={styles.button}>Back</button></Link>
                    <button className={styles.button} type='submit'>Submit Recipe</button>
                    <button className={styles.button} type='reset' onClick={handleReset} >Reset all</button>
                </div>
            </form>
            {errors.name && <p>{errors.name}</p>}
            {errors.summary && <p>{errors.summary}</p>}
            {errors.ingredient && <p>{errors.ingredient}</p>}
            {errors.score && <p>{errors.score}</p>}
            {errors.healthyLevel && <p>{errors.healthyLevel}</p>}
        </div>
    )
}

export default NewRecipe
