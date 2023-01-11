import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import requestToken from '../api/requestTrivia';
import { addEmail } from '../redux/actions';

const regex = /[\w.]+@[a-z]+\.com(([a-z]+){1,2})?/i;

class Login extends Component {
  state = {
    user: '',
    email: '',
    verification: true,
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email, user } = this.state;
    const date = await requestToken();
    console.log(date);
    const { token } = date;
    history.push('/game');
    localStorage.setItem('token', token);
    dispatch(addEmail(email, user));
  };

  HandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { user, email } = this.state;
      if (user.length > 0 && regex.test(email)) {
        this.setState({
          verification: false,
        });
      }
    });
  };

  render() {
    const { user, email, verification } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Logo />
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="user"
              id="name"
              data-testid="input-player-name"
              value={ user }
              onChange={ this.HandleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail::
            <input
              type="email"
              name="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.HandleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ verification }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: {},
};

export default connect()(Login);
