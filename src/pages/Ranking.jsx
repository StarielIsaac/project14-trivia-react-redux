import React, { Component } from 'react';
import propTypes from 'prop-types';
import ButtonPlayAgain from '../components/ButtonPlayAgain';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ButtonPlayAgain
          historyProps={ history }
          nameBtn="Retornar a tela de Login"
          id="btn-go-home"
          local="/"
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
