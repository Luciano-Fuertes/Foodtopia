import {
    GET_DIET_TYPE,
    GET_RECIPE_BY_ID,
    GET_RECIPE_BY_NAME,
    POST_RECIPE
} from "../actions/actionType"

const initialState = {
    recipes: [],
    dietType: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipes: payload,
            }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
            }
        case GET_DIET_TYPE:
            return {
                ...state,
            }
        case POST_RECIPE:
            return {
                ...state,
            }

    }
};