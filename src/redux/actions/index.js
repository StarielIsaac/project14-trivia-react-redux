export const ADD_EMAIL = 'ADD_EMAIL';
export const CHANGE_SCORE = 'CHANGE_SCORE';

export const addEmail = (email, user) => ({
  type: ADD_EMAIL,
  payload: { email, user },
});

export const changeScore = (pont) => ({
  type: CHANGE_SCORE,
  payload: pont,
});
