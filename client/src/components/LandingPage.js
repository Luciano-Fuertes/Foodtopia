import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles.landing} >
            <div className={styles.text}>
            <h1 className={styles.h1}>Welcome to Foodtopia</h1>
            <Link to='/home'>
                <button className={styles.button}>Enter</button>
            </Link>
            </div>
        </div>
    )
}

export default LandingPage
