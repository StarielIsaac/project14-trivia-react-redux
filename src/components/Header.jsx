import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <span>
          Score:
          <span data-testid="header-score">{score}</span>
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { gravatarEmail, name, score } }) => ({
  gravatarEmail,
  name,
  score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
