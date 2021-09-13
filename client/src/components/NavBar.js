import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeByName } from '../actions/index';

function NavBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipeByName(name))
    }

    return (
        <div>
            <input type='text' onChange={(e) => { handleInput(e) }} placeholder='search recipes...' />
            <button type='submit' onClick={(e) => { handleSubmit(e) }}>Search</button>
        </div>
    )
}

export default NavBar
