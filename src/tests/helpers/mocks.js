export const tokenValid = {
  response_code: 0,
  results: [
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Which of the following languages is used as a scripting language in the Unity 3D game engine?',
      correct_answer: 'C#',
      incorrect_answers: ['Java', 'C++', 'Objective-C'],
    },

    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'In the first Left 4 Dead, you can play as either of these four characters.',
      correct_answer: 'Francis, Bill, Zoey, and Louis',
      incorrect_answers: [
        'Bender, Andrew, Allison, and Brian',
        'Coach, Ellis, Nick, and Rochelle',
        'Harry, Ron, Hermione and Dumbledore',
      ],
    },

    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What was the original name of the search engine &quot;Google&quot;?',
      correct_answer: 'BackRub',
      incorrect_answers: ['CatMassage', 'SearchPro', 'Netscape Navigator'],
    },

    {
      category: 'Entertainment: Comics',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Who was the inspiration for Cuthbert Calculus in the Tintin series?',
      correct_answer: 'Auguste Picard',
      incorrect_answers: ['Jacques Piccard', 'Will Morris', 'J. Cecil Maby'],
    },

    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'Foie gras is a French delicacy typically made from what part of a duck or goose?',
      correct_answer: 'Liver',
      incorrect_answers: ['Heart', 'Stomach', 'Intestines'],
    },
  ],
  response_message: 'Token Generated Successfully!',
  token: '508b87ccf72cab7115abaace5a4459ffb36f42479a25614413936c8ad8b5deea',
};

export const tokenInvalid = {
  response_code: 3,
  results: [],
};

export const questions = {
  response_code: 0,
  results: [
    {
      category: 'Geography',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The Republic of Malta is the smallest microstate worldwide.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },

    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'hard',
      question:
        'In quantum physics, which of these theorised sub-atomic particles has yet to be observed?',
      correct_answer: 'Graviton',
      incorrect_answers: ['Z boson', 'Tau neutrino', 'Gluon'],
    },
  ],
};

export const maiconSucess = {
  name: 'Maicon',
  assertions: 4,
  score: 120,
  gravatarEmail: 'maicon@email.com',
};

export const maiconFail = {
  name: 'Maicon',
  assertions: 2,
  score: 90,
  gravatarEmail: 'maicon@email.com',
};

export const localStorageMock = (() => {
  let store = {
    ranking: [
      { name: 'Ricardo', assertions: 4, score: 200, gravatarEmail: 'ricardo@am.com' },
      { name: 'José', assertions: 3, score: 160, gravatarEmail: 'jose@am.com' },
      { name: 'Maria', assertions: 5, score: 240, gravatarEmail: 'maria@am.com' },
    ],
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

export const localStorageMockClear = (() => {
  let store = {};

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();
