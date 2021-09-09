import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import NavBar from './NavBar';

function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)

    useEffect(() => {
        dispatch(getRecipe())
    }, [dispatch])

    function handleClick(event) {
        event.preventDefault()
        dispatch(getRecipe())
    }

    return (
        <div>
            <NavBar className="Nav"/>
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
                {allRecipes?.map((c) => {
                    return (
                        <div>
                            <Link to={'/home/' + c.id}>
                                <Card name={c.name} diet={c.diet} image={c.image} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home
