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
};

export const tokenInvalid = {
  response_code: 3,
  results: [],
};
