import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../components';
import { validationToken } from '../api';
import { calculateScore, randomAnswers } from './helpers';
import { changeScore, someAcertion, addPlayer } from '../redux/actions';
import './game.css';

const NUMBER_TREE = 3;
const TIME_ANSWER = 5000;
const TIME_QUESTION = 31000;
const COUNT_ONE_SEG = 1000;

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    click: false,
    disabled: true,
    time: 30,
    answers: [],
    interval: undefined,
    timeout: undefined,
  };

  async componentDidMount() {
    const {
      props: { history },
      startForAnswer,
    } = this;
    const apiTrivia = await validationToken(localStorage.getItem('token'));
    const { results } = apiTrivia;
    if (apiTrivia.response_code !== NUMBER_TREE) {
      this.setState(
        {
          questions: results,
        },
        () => {
          const {
            state: { questions, currentQuestion },
          } = this;

          this.setState({
            answers: randomAnswers(questions, currentQuestion),
          }, () => startForAnswer());
        },
      );
    } else {
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  componentDidUpdate(_prevProp, prevState) {
    const {
      state: { currentQuestion, disabled, questions },
      handlerClick,
      startForAnswer,
    } = this;

    if (prevState.currentQuestion !== currentQuestion) {
      this.setState({
        answers: randomAnswers(questions, currentQuestion),
        time: 30,
      }, () => startForAnswer());
    }

    if (prevState.disabled !== disabled && !disabled) {
      const timeout = setTimeout(() => handlerClick(), TIME_QUESTION);
      const interval = setInterval(
        () => this.setState((state) => ({ time: state.time - 1 })),
        COUNT_ONE_SEG,
      );

      this.setState({ interval, timeout });
    }
  }

  handlerClick = (
    { target: { name } } = { target: { name: '' } },
    currentAns = false,
    dificulty = '',
  ) => {
    const {
      state: { interval, timeout, questions, currentQuestion, time },
      props: { dispatch, history, player },
    } = this;

    clearInterval(interval);
    clearTimeout(timeout);

    this.setState({
      click: true,
      disabled: true,
    });

    if (currentAns) {
      const valueScore = calculateScore(time, dificulty);
      dispatch(changeScore(valueScore));
      dispatch(someAcertion(1));
    }

    if (name === 'next' && questions.length > currentQuestion + 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        click: false,
        disabled: true,
      }));
    } else if (name === 'next' && questions.length === currentQuestion + 1) {
      dispatch(addPlayer(player));

      history.push('/feedbeck');
    }
  };

  startForAnswer = () => setTimeout(
    () => this.setState({
      disabled: false,
    }),
    TIME_ANSWER,
  );

  render() {
    const {
      state: { questions, currentQuestion, click, disabled, answers, time },
      handlerClick,
    } = this;

    return (
      <>
        <Header />
        <p>{time}</p>
        <h2 data-testid="question-category">
          {questions.length !== 0 ? questions[currentQuestion].category : ''}
        </h2>
        <h3 data-testid="question-text">
          {questions.length !== 0 ? questions[currentQuestion].question : ''}
        </h3>
        <div data-testid="answer-options">
          { answers.map((answer, i) => (
            answer === questions[currentQuestion].correct_answer ? (
              <button
                key={ `aswer-${i + 1}` }
                className={ click ? 'correct' : '' }
                type="button"
                onClick={ (e) => handlerClick(
                  e,
                  true,
                  questions[currentQuestion].dificulty,
                ) }
                data-testid="correct-answer"
                disabled={ disabled }
              >
                {answer}
              </button>
            ) : (
              <button
                key={ `aswer-${i + 1}` }
                className={ click ? 'incorrect' : '' }
                type="button"
                onClick={ handlerClick }
                data-testid={ `wrong-answer-${i}` }
                disabled={ disabled }
              >
                {answer}
              </button>
            )))}
          {
            click
            && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ handlerClick }
                name="next"
              >
                Next
              </button>
            )
          }
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
  player: propTypes.shape({
    name: propTypes.string.isRequired,
    assertions: propTypes.number.isRequired,
    score: propTypes.number.isRequired,
    gravatarEmail: propTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Game);
