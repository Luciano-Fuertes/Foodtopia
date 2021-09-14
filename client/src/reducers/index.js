import {
    GET_DIET_TYPE,
    GET_RECIPE_BY_ID,
    GET_RECIPE_BY_NAME,
    POST_NEW_RECIPE,
    GET_ALL_RECIPES,
    FILTER_CREATED,
    FILTER_BY_DIET,
    ORDER_BY_NAME,
    ORDER_BY_SCORE
} from "../actions/actionType"

const initialState = {
    recipes: [],
    recipesBackup: [],
    dietType: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: payload,
                recipesBackup: payload,
            }
        case GET_DIET_TYPE:
            return {
                ...state,
                dietType: payload,
            }
        case FILTER_BY_DIET:
            const allRecipes = state.recipesBackup;
            const filtered = payload === 'All Diets' ? allRecipes : allRecipes.filter(recipes => recipes.dietsAvailable.includes(payload))
            return {
                ...state,
                recipes: filtered,
            }
        case FILTER_CREATED:
            const backupRecipes = state.recipesBackup
            const isOriginal = payload === 'Created' ? backupRecipes.filter(recipes => recipes.dbRecipe) : backupRecipes.filter(recipes => !recipes.dbRecipe);
            return {
                ...state,
                recipes: payload === 'All' ? state.recipesBackup : isOriginal,
            }
        case ORDER_BY_NAME:
            let nameSort = payload === 'Asc' ?
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (b.name > a.name) return -1
                    else return 0
                }) :
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return -1
                    if (b.name > a.name) return 1
                    else return 0;
                })
            return {
                ...state,
                recipes: nameSort,
            }
        case ORDER_BY_SCORE:
            let scoreSort = payload === 'Score Up' ?
                state.recipes.sort((a, b) => {
                    if (a.score > b.score) return 1
                    if (b.score > a.score) return -1
                    return 0
                }) :
                state.recipes.sort((a, b) => {
                    if (a.score > b.score) return -1
                    if (b.score > a.score) return 1
                    return 0;
                })
            return {
                ...state,
                recipes: scoreSort,
            }
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipes: payload
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipes: payload
            }
        case POST_NEW_RECIPE:
            return {
                ...state,
            }
        default: return state;

    }
};