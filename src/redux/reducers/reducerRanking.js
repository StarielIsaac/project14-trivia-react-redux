import { ADD_PLAYER, LOAD_RANKING } from '../actions';

const INITIAL_STATE = {
  topPlayers: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_PLAYER:
    return { ...state, topPlayers: payload };

  case LOAD_RANKING:
    return { ...state, topPlayers: payload };

  default:
    return state;
  }
};
