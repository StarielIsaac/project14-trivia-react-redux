import { ADD_EMAIL, CHANGE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EMAIL:
    return { ...state, gravatarEmail: payload.email, name: payload.user };
  case CHANGE_SCORE:
    return { ...state, score: state.score + payload };
  default:
    return state;
  }
};

export default player;
