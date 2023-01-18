import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import { requestToken } from '../api';
import { addEmail } from '../redux/actions';

const regex = /[\w.]+@[a-z]+(\.com|(\.[a-z]+){2,3})/i;

class Login extends Component {
  state = {
    user: '',
    email: '',
    verification: true,
  };

  handlerClick = async () => {
    const {
      state: { email, user },
      props: { history, dispatch },
    } = this;

    const { token } = await requestToken();

    dispatch(addEmail(email, user));

    localStorage.setItem('token', token);

    history.push('/game');
  };

  handlerChange = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        const {
          state: { user, email },
        } = this;

        this.setState({
          verification: user.length === 0 || !regex.test(email),
        });
      },
    );
  };

  render() {
    const {
      state: { user, email, verification },
      props: { history },
      handlerChange,
      handlerClick,
    } = this;

    return (
      <div>
        <Logo />
        <form>
          <label htmlFor="name">
            Nome:
            {' '}
            <input
              type="text"
              name="user"
              id="name"
              data-testid="input-player-name"
              value={ user }
              onChange={ handlerChange }
            />
          </label>
          <label htmlFor="email">
            E-mail:
            {' '}
            <input
              type="email"
              name="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ handlerChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ verification }
            onClick={ handlerClick }
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
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
