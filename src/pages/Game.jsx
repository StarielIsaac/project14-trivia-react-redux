import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { validationToken } from '../api/requestTrivia';
import './game.css';

const NUMBERTREE = 3;
const NUMBERFIVE = 5;
const TIMER = 3000;
const TIMEANSWER = 5000;
const TIMEQUESTION = 30000;
const COUNTONESEG = 1000;

class Game extends Component {
  state = {
    questions: [],
    validation: false,
    value: -1,
    click: false,
    disabled: true,
    time: 30,
    answerState: [],
    interval: '',
    timeout: '',
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
    this.setState({
      value: 0,
    });
  }

  componentDidUpdate(_prevProp, prevState) {
    const { value, disabled, questions } = this.state;
    if (prevState.value !== value) {
      setTimeout(() => {
        this.setState({
          disabled: false,
        });
      }, TIMEANSWER);
      const answer = this.shuffleArray(
        [questions[value].correct_answer, ...questions[value].incorrect_answers],
      );
      this.setState({
        answerState: answer,
        time: 30,
      });
    }
    if (prevState.disabled !== disabled && disabled !== true) {
      const myTimeout = setTimeout(() => this.handleClickAnswer(), TIMEQUESTION);
      const myinteval = setInterval(() => this.setState((state) => (
        { time: state.time - 1 })), COUNTONESEG);
      this.setState({ interval: myinteval, timeout: myTimeout });
    }
  }

  handleClickAnswer = () => {
    const { interval, timeout } = this.state;
    clearInterval(interval);
    clearTimeout(timeout);
    this.setState({
      click: true,
    });
    setTimeout(() => {
      this.setState((prevState) => ({
        value: prevState.value + 1,
      }), () => {
        const { value } = this.state;
        if (value === NUMBERFIVE) {
          this.setState({
            value: 0,
            click: false,
            disabled: true,
          });
        } else {
          this.setState({
            click: false,
            disabled: true,
          });
        }
      });
    }, TIMER);
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const {
      questions, validation, value, click, disabled, answerState, time } = this.state;
    return (
      <div>
        <Header />
        <p>{time}</p>
        { validation && <Redirect to="/" /> }
        {questions.map((pergunta, index) => index === value && (
          <div key={ pergunta.question }>
            <h4 data-testid="question-category">{pergunta.category}</h4>
            <p data-testid="question-text">{pergunta.question}</p>
            <div data-testid="answer-options">
              {answerState.map((answer, indexAnswer) => {
                if (answer === pergunta.correct_answer) {
                  return (
                    <button
                      key={ indexAnswer }
                      className={ click ? 'correct' : '' }
                      type="button"
                      onClick={ this.handleClickAnswer }
                      data-testid="correct-answer"
                      disabled={ disabled }
                    >
                      {answer}
                    </button>
                  );
                }
                return (
                  <button
                    key={ indexAnswer }
                    className={ click ? 'incorrect' : '' }
                    type="button"
                    onClick={ this.handleClickAnswer }
                    data-testid={ `wrong-answer-${indexAnswer}` }
                    disabled={ disabled }
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
