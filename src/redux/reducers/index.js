import { combineReducers } from 'redux';
import player from './reducerPlayer';
import ranking from './reducerRanking';

export default combineReducers({ player, ranking });
