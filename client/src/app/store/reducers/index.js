import { combineReducers } from 'redux';
import { appReducer } from './app';
import { productsReducer } from './products';

export default combineReducers({
    app: appReducer,
    productsAPI: productsReducer,
});