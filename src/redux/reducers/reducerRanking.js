import { ADD_PLAYER, LOAD_RANKING } from '../actions';

const INITIAL_STATE = {
  ranking: [],
};

const ranking = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_PLAYER:
    return { ...state, ranking: payload };
  case LOAD_RANKING:
    return { ...state, ranking: payload };
  default:
    return state;
  }
};

export default ranking;
