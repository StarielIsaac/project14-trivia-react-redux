import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetState } from '../redux/actions';

class ButtonPlayAgain extends Component {
  HandleClickPlayAgain = () => {
    const { dispatch, historyProps, local } = this.props;
    dispatch(resetState());
    historyProps.push(local);
  };

  render() {
    const { nameBtn, id } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid={ id }
          onClick={ this.HandleClickPlayAgain }
        >
          {nameBtn}
        </button>
      </div>
    );
  }
}

ButtonPlayAgain.propTypes = {
  historyProps: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
  nameBtn: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  local: propTypes.string.isRequired,
};

export default connect()(ButtonPlayAgain);
