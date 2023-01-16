import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { returnMessage } from './helps';
import Header from '../components/Header';
import ButtonPlayAgain from '../components/ButtonPlayAgain';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{returnMessage(assertions)}</h3>
        <h5 data-testid="feedback-total-score">{score}</h5>
        <h5 data-testid="feedback-total-question">{assertions}</h5>
        <ButtonPlayAgain
          historyProps={ history }
          nameBtn="Play Again"
          id="btn-play-again"
          local="/"
        />
        <ButtonPlayAgain
          historyProps={ history }
          nameBtn="Ranking"
          id="btn-ranking"
          local="/ranking"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
