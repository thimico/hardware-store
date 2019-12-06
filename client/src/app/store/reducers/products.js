import { ActionTypes } from '../types';

const initialState = {
    categories: [],
    category: {
        products: [],
    },
    products: [],
    product: undefined,
    pagination: {},
};

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.GET_CATEGORIES: {
            return { ...state, categories: action.payload.data };
        }
        case ActionTypes.GET_CATEGORY: {
            return { ...state, category: action.payload.data };
        }
        case ActionTypes.SEARCH_PRODUCTS: {
            return { ...state, products: action.payload.data };
        }
        case ActionTypes.GET_PRODUCT: {
            return { ...state, product: action.payload.data };
        }
        case ActionTypes.PAGINATE_PRODUCTS: {
            return { ...state, pagination: action.payload.data };
        }
        case ActionTypes.POST_PRODUCT: {
            let products = state.products.concat([action.payload.data]);

            return { ...state, products };
        }
        case ActionTypes.PUT_PRODUCT: {
            return { ...state };
        }
        case ActionTypes.DELETE_PRODUCT: {
            return { ...state };
        }
        default: {
            return state;
        }
    }
}