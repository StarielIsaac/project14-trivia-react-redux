import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, user } = this.props;
    const hash = md5(email).toString();
    console.log(hash);
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{user}</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.reduceLogin.email,
  user: state.reduceLogin.user,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
