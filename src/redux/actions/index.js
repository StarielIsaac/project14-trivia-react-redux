export const ADD_EMAIL = 'ADD_EMAIL';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const SOME_ASSERTION = 'SOME_ASSERTION';

export const addEmail = (email, user) => ({
  type: ADD_EMAIL,
  payload: { email, user },
});

export const changeScore = (pont) => ({
  type: CHANGE_SCORE,
  payload: pont,
});

export const someAcertion = (assertions) => ({
  type: SOME_ASSERTION,
  payload: assertions,
});
