import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import NavBar from './NavBar';
import Pages from './Pages';

function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipe = allRecipes.slice(indexFirst, indexLast);

    const pageHandler = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getRecipe())
    }, [dispatch])

    function handleClick(event) {
        event.preventDefault()
        dispatch(getRecipe())
    }

    return (
        <div>
            <NavBar className="Nav" />
            <Link to='/recipe'>Submit New Recipe</Link>
            <button onClick={e => { handleClick(e) }}>
                Show All Recipes
            </button>
            <div>
                <select>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
                <select>
                    <option value='all'>All</option>
                    <option value='existent'>Existent</option>
                    <option value='created'>Created</option>
                </select>
                <Pages
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pageHandler={pageHandler}
                />
                {currentRecipe?.map((c) => {
                    return (
                        <div>
                            <Link to={'/home/' + c.id}>
                                <Card name={c.name} diet={c.diet} image={c.image} key={c.id} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
