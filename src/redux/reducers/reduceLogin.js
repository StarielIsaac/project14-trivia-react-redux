import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
};

const reduceLogin = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EMAIL:
    return { ...state, email: payload.email, user: payload.user };
  default:
    return state;
  }
};

export default reduceLogin;
