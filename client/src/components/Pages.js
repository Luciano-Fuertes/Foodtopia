import React from 'react'
import styles from './Pages.module.css'

function Pages({ recipesPerPage, allRecipes, pageHandler }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul>
                {pageNumbers?.map((num) => {
                    return (
                    <button className={styles.number} key={num}>
                        <a onClick={() => pageHandler(num)}>{num}</a>
                    </button>)
                })}
            </ul>
        </nav>
    )
}

export default Pages
