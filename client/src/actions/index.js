import axios from 'axios';
import { GET_RECIPE_BY_NAME } from './actionType';

export function getRecipe() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: GET_RECIPE_BY_NAME,
            payload: json.data
        })
    }
}