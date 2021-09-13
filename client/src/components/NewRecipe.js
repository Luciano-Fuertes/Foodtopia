import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postNewRecipe, getDietType } from '../actions'
import { Link, useHistory } from 'react-router-dom'

function NewRecipe() {
    const dispatch = useDispatch()
    const getDiets = useSelector((state) => state.dietType)

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
            [e.target.name]: e.target.value,
        })
    }

    const handleDietsChange = (e) => {
        setFormInput({
            ...formInput,
            dietsAvailable: [...formInput.dietsAvailable,e.target.value],
        })
    }



    return (
        <div>
            <h2>Build a new recipe!</h2>
            <form>
                <div>
                    <label>Name</label>
                    <input onChange={handleChange} type='text' name='name' value={formInput.name} />
                </div>
                <div>
                    <label>Picture</label>
                    <input onChange={handleChange} type='text' name='image' value={formInput.image} />
                </div>
                <div>
                    <label>Summary</label>
                    <input onChange={handleChange} type='text' name='summary' value={formInput.summary} />
                </div>
                <div>
                    <label>Ingredient</label>
                    <input onChange={handleChange} type='text' name='ingredient' value={formInput.ingredient} />
                </div>
                <div>
                    <label>Score</label>
                    <input onChange={handleChange} type='number' name='score'
                        min='1' max='100' placeholder='From 1 to 100' />
                </div>
                <div>
                    <label>Healthy Level</label>
                    <input onChange={handleChange} type='number' name='healthyLevel' value={formInput.healthyLevel}
                        min='1' max='100' placeholder='From 1 to 100' />
                </div>
                <div>
                    <label>Cooking Steps</label>
                    <input onChange={handleChange} type='text area' name='cookingSteps' value={formInput.cookingSteps} />
                </div>
                <div>
                    <label>Diet Type</label>
                    <select>
                    {getDiets.map((diet) => {
                        return (<option onChange={handleDietsChange} type='checkbox' name={diet.name}>{diet.name}</option> );
                    })}
                    </select>
                </div>
                <div>
                    <Link to='/home'><button>Back</button></Link>
                    <button type='submit'>Submit Recipe</button>
                </div>
            </form>
        </div>
    )
}

export default NewRecipe
