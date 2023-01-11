import { combineReducers } from 'redux';
import reduceLogin from './reduceLogin';

const rootReducer = combineReducers({ reduceLogin });

export default rootReducer;
