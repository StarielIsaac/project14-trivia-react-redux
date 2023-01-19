import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonPlayAgain, Header } from '../components';
import { returnMessage } from './helpers';
import { resetState } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { assertions, score, history, dispatch } = this.props;

    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{returnMessage(assertions)}</h3>
        <h5 data-testid="feedback-total-score">{score}</h5>
        <h5 data-testid="feedback-total-question">{assertions}</h5>
        <ButtonPlayAgain
          nameBtn="Play Again"
          testId="btn-play-again"
          eventClick={ () => { dispatch(resetState()); history.push('/'); } }
        />
        <ButtonPlayAgain
          nameBtn="Ranking"
          testId="btn-ranking"
          eventClick={ () => { dispatch(resetState()); history.push('/ranking'); } }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedback);
