import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonPlayAgain from '../components/ButtonPlayAgain';
import { loadRanking } from '../redux/actions';

class Ranking extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadRanking());
  }

  render() {
    const { ranking, history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img
                src={ player.avatar }
                alt={ player.name }
                data-testid={ `player-avatar-${index}` }
              />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ul>
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
  ranking: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    score: propTypes.number.isRequired,
    avatar: propTypes.string.isRequired,
  })).isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking.ranking,
});

export default connect(mapStateToProps)(Ranking);
