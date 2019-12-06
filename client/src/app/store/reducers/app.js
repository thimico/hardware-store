import { ActionTypes } from '../types';

const initialState = {
    loading: false,
    error: undefined
};

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.APPLICATION_LOADING: {
            return { ...state, loading: action.payload.loading };
        }
        case ActionTypes.APPLICATION_ERROR: {
            return { ...state, error: action.payload.error };
        }
        default: {
            return state;
        }
    }
}