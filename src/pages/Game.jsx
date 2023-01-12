import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { validationToken } from '../api/requestTrivia';

const NUMBERTREE = 3;
const NUMBERFIVE = 5;

class Game extends Component {
  state = {
    questions: [],
    validation: false,
    value: 1,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const apiTrivia = await validationToken(token);
    const { results } = apiTrivia;
    if (apiTrivia.response_code !== NUMBERTREE) {
      this.setState({
        questions: results,
      });
    } else {
      this.setState({
        validation: true,
      });
      localStorage.removeItem('token');
    }
  }

  handleClickAnswer = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }), () => {
      const { value } = this.state;
      if (value === NUMBERFIVE) {
        this.setState({
          value: 0,
        });
      }
    });
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { questions, validation, value } = this.state;
    console.log(questions);
    console.log();
    return (
      <div>
        <Header />
        { validation && <Redirect to="/" /> }
        {questions.map((pergunta, index) => index === value && (
          <div key={ pergunta.question }>
            <h4 data-testid="question-category">{pergunta.category}</h4>
            <p data-testid="question-text">{pergunta.question}</p>
            <div data-testid="answer-options">
              {this.shuffleArray([pergunta.correct_answer, ...pergunta.incorrect_answers])
                .map((answer, indexAnswer) => {
                  if (answer === pergunta.correct_answer) {
                    return (
                      <button
                        key={ indexAnswer }
                        type="button"
                        onClick={ this.handleClickAnswer }
                        data-testid="correct-answer"
                      >
                        {answer}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={ indexAnswer }
                      type="button"
                      onClick={ this.handleClickAnswer }
                      data-testid={ `wrong-answer-${indexAnswer}` }
                    >
                      {answer}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Game;
