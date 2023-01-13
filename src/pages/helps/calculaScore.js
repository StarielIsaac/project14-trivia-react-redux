const TEN = 10;
const TREE = 3;

const calculateScore = (timer, dificulty) => {
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

export default calculateScore;
