import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import ButtonPlayAgain from '../components/ButtonPlayAgain';
import { loadRanking } from '../redux/actions';

class Ranking extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadRanking());
  }

  render() {
    const { topPlayers, history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {topPlayers.map(({ name, score, gravatarEmail }, i) => {
            const hash = md5(gravatarEmail).toString();

            return (
              <li key={ `player-${i + 1}` }>
                <img
                  src={ `https://www.gravatar.com/avatar/${hash}` }
                  alt={ name }
                  data-testid={ `player-avatar-${i}` }
                />
                <span data-testid={ `player-name-${i}` }>{name}</span>
                <span data-testid={ `player-score-${i}` }>{score}</span>
              </li>
            );
          })}
        </ul>
        <ButtonPlayAgain
          nameBtn="Retornar a tela de Login"
          testId="btn-go-home"
          eventClick={ () => history.push('/') }
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  topPlayers: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    score: propTypes.number.isRequired,
    gravatarEmail: propTypes.string.isRequired,
  })).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapStateToProps = ({ ranking: { topPlayers } }) => ({
  topPlayers,
});

export default connect(mapStateToProps)(Ranking);
