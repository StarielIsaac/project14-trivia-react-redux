import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { returnMessage } from './helps/calculaScore';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{returnMessage(assertions)}</h3>
        <h5 data-testid="feedback-total-score">{score}</h5>
        <h5 data-testid="feedback-total-question">{assertions}</h5>
        <button type="button">Play Again</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
