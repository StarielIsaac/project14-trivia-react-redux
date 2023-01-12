export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email, user) => ({
  type: ADD_EMAIL,
  payload: { email, user },
});
