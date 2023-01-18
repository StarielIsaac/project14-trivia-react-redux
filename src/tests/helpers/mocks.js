/* eslint-disable max-len */
export const obj = { response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: '508b87ccf72cab7115abaace5a4459ffb36f42479a25614413936c8ad8b5deea',
};

export const userMaicon = {
  name: 'Maicon',
  assertions: 4,
  score: 120,
  gravatarEmail: 'maicon@email.com',
};

export const questionsResponse = {
  response_code: 0,
  results: [
    {
      category: 'Geography',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The Republic of Malta is the smallest microstate worldwide.',
      correct_answer: 'False',
      incorrect_answers: [
        'True',
      ],
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'hard',
      question: 'In quantum physics, which of these theorised sub-atomic particles has yet to be observed?',
      correct_answer: 'Graviton',
      incorrect_answers: [
        'Z boson',
        'Tau neutrino',
        'Gluon',
      ],
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Generally, which component of a computer draws the most power?',
      correct_answer: 'Video Card',
      incorrect_answers: [
        'Hard Drive',
        'Processor',
        'Power Supply',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the most expensive weapon in Counter-Strike: Global Offensive?',
      correct_answer: 'Scar-20/G3SG1',
      incorrect_answers: [
        'M4A1',
        'AWP',
        'R8 Revolver',
      ],
    },
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Who was the Author of the manga Uzumaki?',
      correct_answer: 'Junji Ito',
      incorrect_answers: [
        'Noboru Takahashi',
        'Akira Toriyama',
        'Masashi Kishimoto',
      ],
    },
  ],
};

export const invalidTokenQuestionsResponse = {
  response_code: 3,
  results: [],
}


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
