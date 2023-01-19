import { ADD_EMAIL, CHANGE_SCORE, SOME_ASSERTION, RESET_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EMAIL:
    return { ...state, gravatarEmail: payload.email, name: payload.user };

  case CHANGE_SCORE:
    return { ...state, score: state.score + payload };

  case SOME_ASSERTION:
    return { ...state, assertions: state.assertions + payload };

  case RESET_STATE:
    return INITIAL_STATE;

  default:
    return state;
  }
};
