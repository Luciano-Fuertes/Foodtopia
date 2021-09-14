import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeByName } from '../actions/index';
import styles from './NavBar.module.css'

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
            <input className={styles.inputBar}type='text' onChange={(e) => { handleInput(e) }} placeholder='Search recipes...' />
            <button className={styles.button} type='submit' onClick={(e) => { handleSubmit(e) }}>Search</button>
        </div>
    )
}

export default NavBar
