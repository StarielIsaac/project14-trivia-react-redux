import { combineReducers } from 'redux';
import player from './reduceLogin';
import ranking from './reducerRanking';

const rootReducer = combineReducers({ player, ranking });

export default rootReducer;
