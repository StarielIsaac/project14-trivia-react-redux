import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { validationToken } from '../api';
import { calculateScore } from './helps';
import { changeScore, someAcertion, addPlayer } from '../redux/actions';
import './game.css';

const NUMBER_TREE = 3;
const FOUR = 4;
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
      randomAnswers,
    } = this;
    const apiTrivia = await validationToken(localStorage.getItem('token'));
    const { results } = apiTrivia;
    if (apiTrivia.response_code !== NUMBER_TREE) {
      this.setState({
        questions: results,
        // answers: results.length > 0 && randomAnswers(results, 0),
      }, () => {
        const { questions } = this.state;
        this.setState({
          answers: randomAnswers(questions, 0),
        });
      });

      startForAnswer();
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
      randomAnswers,
    } = this;

    if (prevState.currentQuestion !== currentQuestion) {
      startForAnswer();

      this.setState({
        answers: randomAnswers(questions, currentQuestion),
        time: 30,
      });
    }

    if (prevState.disabled !== disabled && disabled === false) {
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

    if (currentAns) {
      const valueScore = calculateScore(time, dificulty);
      dispatch(changeScore(valueScore));
      dispatch(someAcertion(1));
    }

    this.setState({
      click: true,
      disabled: true,
    });

    if (name === 'next' && questions.length > currentQuestion + 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        click: false,
        disabled: true,
      }));
    } else if (name === 'next' && currentQuestion === FOUR) {
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

  randomAnswers = (arr, index) => {
    const answersJoined = [arr[index].correct_answer, ...arr[index].incorrect_answers];

    for (let i = answersJoined.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answersJoined[i], answersJoined[j]] = [answersJoined[j], answersJoined[i]];
    }
    return answersJoined;
  };

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
                onClick={ (e) => handlerClick(e, false) }
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
  player: propTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Game);
