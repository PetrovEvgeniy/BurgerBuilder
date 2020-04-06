import * as actionTypes from '../actions/actionsTypes';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
}

const addIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice  + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const removeIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}

const setIngredients = (state,action) => {
    return{
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 2,
        error: false,
        building: false
    };
}

const fetchIngredientsFailed = (state,action) => {
    return{
        ...state,
        error: true
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action)
           
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action)
           
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action)
           
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action)

        default: return state;
    }
};

export default reducer;