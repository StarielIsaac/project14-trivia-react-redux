export const requestToken = async () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json());

export const validationToken = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json());
