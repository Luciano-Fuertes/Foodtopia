import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, getDietType, filterByDiet, filterCreated, orderByName } from '../actions';
import Card from './Card';
import NavBar from './NavBar';
import Pages from './Pages';
import styles from './Home.module.css';

function Home() {

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllRecipes())
        dispatch(getDietType())
    }, [dispatch])

    const allRecipes = useSelector((state) => state.recipes)
    const allDiets = useSelector((state) => state.dietType)
    const [render, setRender] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipe = allRecipes.slice(indexFirst, indexLast);

    const pageHandler = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function handleClick(e) {
        e.preventDefault()
        dispatch(getAllRecipes())
    }

    function handleOrder(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setRender(`${e.target.value} order`);
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    function handleDietFilter(e) {
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1);
    }

    return (
        <div>
            <NavBar className="Nav" />
            <Link to='/recipe' className={styles.button}>Submit New Recipe</Link>
            <button className={styles.button} onClick={e => { handleClick(e) }}>
                Show All Recipes
            </button>
            <div>
                <select onChange={e => handleOrder(e)}>
                    <option value='Asc'>Asc</option>
                    <option value='Desc'>Desc</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>All</option>
                    <option value='Existent'>Existent</option>
                    <option value='Created'>Created</option>
                </select>
                <select onChange={e => handleDietFilter(e)}>
                    <option value='All Diets'>All Diets</option>
                    {allDiets?.map((diet) => {
                        return (
                            <option value={diet.name}>{diet.name}</option>
                        )
                    })}
                </select>
                <Pages
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pageHandler={pageHandler}
                />
                <div className={styles.container}>
                    {currentRecipe?.map((c) => {
                        return (
                            <div>
                                <Link to={'/home/' + c.id}>
                                    <Card
                                        name={c.name}
                                        diet={c.diet}
                                        image={c.image ? c.image : '../assets/image-not-found.png'}
                                        key={c.id} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
