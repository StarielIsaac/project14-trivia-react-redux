export const ADD_EMAIL = 'ADD_EMAIL';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const SOME_ASSERTION = 'SOME_ASSERTION';
export const RESET_STATE = 'RESET_STATE';
export const ADD_PLAYER = 'ADD_PLAYER';
export const LOAD_RANKING = 'LOAD_RANKING';

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

export const resetState = () => ({
  type: RESET_STATE,
});

export const addPlayer = (player) => {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  const playerIndex = ranking.findIndex(
    ({ name, gravatarEmail }) => gravatarEmail === player.gravatarEmail
    || name === player.name,
  );

  if (playerIndex < 0) ranking.push(player);

  else if (ranking[playerIndex].score < player.score) {
    ranking[playerIndex] = player;
  }

  localStorage.setItem('ranking', JSON.stringify(ranking));

  return {
    type: ADD_PLAYER,
    payload: ranking,
  };
};

export const loadRanking = () => {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  ranking.sort((a, b) => b.score - a.score);

  return {
    type: LOAD_RANKING,
    payload: ranking,
  };
};
