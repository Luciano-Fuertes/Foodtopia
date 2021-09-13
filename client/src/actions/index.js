import axios from 'axios';
import {
    GET_ALL_RECIPES,
    FILTER_BY_DIET,
    FILTER_CREATED,
    ORDER_BY_NAME,
    GET_RECIPE_BY_NAME,
    GET_RECIPE_BY_ID,
    GET_DIET_TYPE
} from './actionType';

export function getAllRecipes() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: json.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}
export function getRecipeByName(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: json.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}
export function getRecipeById(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${payload}`);
            return dispatch({
                type: GET_RECIPE_BY_ID,
                payload: json.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getDietType() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: GET_DIET_TYPE,
                payload: json.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}


export function filterByDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function postNewRecipe(payload) {
    return async function () {
        var json = await axios.post(`http://localhost:3001/recipe`, payload)
        return json;
    }
}