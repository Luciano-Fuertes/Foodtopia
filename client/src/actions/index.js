import axios from 'axios';
import { GET_ALL_RECIPES } from './actionType';

export function getRecipe() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: json.data
        })
    }
}