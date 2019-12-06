import { ActionTypes } from '../types';
import axios from 'axios';

// const DEV_API = 'http://localhost:8080';
const PROD_API = 'http://10.202.70.108:5000';

const API = PROD_API;

const dispatchLoading = (loading = false) => {
    return {
        type: ActionTypes.APPLICATION_LOADING,
        payload: {loading}
    }
};

const dispatchError = (error = new Error('Ocorreu um erro inesperado')) => {
    return {
        type: ActionTypes.APPLICATION_ERROR,
        payload: {error}
    }
}

export const getCategories = () => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.get(`${API}/categories`);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.GET_CATEGORIES, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const getCategory = (id) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.get(`${API}/categories/${id}`);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.GET_CATEGORY, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const search = (value) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.get(`${API}/search/products?q=${value}`);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.SEARCH_PRODUCTS, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const getProduct = (id) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.get(`${API}/products/${id}`);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.GET_PRODUCT, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const paginateProducts = (page = 1, limit = 5) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.get(`${API}/products?page=${page}&limit=${limit}`);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.PAGINATE_PRODUCTS, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const save = (values, callback) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            
            if(values.id !== 0) {
                const data = await axios.put(`${API}/products/${values.id}`, values);

                dispatch({type:ActionTypes.PUT_PRODUCT, payload: data});
                callback(true);
            } else {
                const data = await axios.post(`${API}/products`, values);

                callback(true);
                dispatch({type:ActionTypes.POST_PRODUCT, payload: data});
            }

            dispatch(dispatchLoading(false));
        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}

export const deleteProduct = (id, callback) => {
    return async dispatch => {
        dispatch(dispatchLoading(true))

        try {
            const data = await axios.delete(`${API}/products/${id}`);

            callback(data.status === 204);

            dispatch(dispatchLoading(false));
            dispatch({type:ActionTypes.DELETE_PRODUCT, payload: data});

        } catch (error) {
            console.error(error);

            dispatch(dispatchLoading(false))
            dispatch(dispatchError(error))
        }
    };
}
