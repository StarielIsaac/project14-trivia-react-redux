const TEN = 10;
const TREE = 3;

export const calculateScore = (timer, dificulty) => {
  const valueDifuculty = () => {
    if (dificulty === 'hard') {
      return TREE;
    } if (dificulty === 'medium') {
      return 2;
    }
    return 1;
  };

  return TEN + (timer * valueDifuculty());
};

export const returnMessage = (assertions) => {
  if (assertions < TREE) {
    return 'Could be better...';
  }
  return 'Well Done!';
};
