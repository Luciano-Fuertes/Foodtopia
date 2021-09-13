import React from 'react'

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
                    <li className="number" key={num}>
                        <a onClick={() => pageHandler(num)}>{num}</a>
                    </li>)
                })}
            </ul>
        </nav>
    )
}

export default Pages
