const TEN = 10;
const TREE = 3;

export const calculateScore = (timer, dificulty) => {
  const valueDifuculty = () => {
    switch (dificulty.toLowerCase()) {
    case 'hard':
      return TREE;

    case 'medium':
      return 2;

    default:
      return 1;
    }
  };

  return TEN + timer * valueDifuculty();
};

export const returnMessage = (assertions) => {
  if (assertions < TREE) {
    return 'Could be better...';
  }

  return 'Well Done!';
};

export const randomAnswers = (arr, index) => {
  if (arr) {
    const answersJoined = [arr[index].correct_answer, ...arr[index].incorrect_answers];

    for (let i = arr && answersJoined.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [answersJoined[i], answersJoined[j]] = [answersJoined[j], answersJoined[i]];
    }

    return answersJoined;
  }

  return [];
};
