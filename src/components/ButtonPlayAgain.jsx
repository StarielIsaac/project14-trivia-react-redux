import React from 'react';
import propTypes from 'prop-types';

function ButtonPlayAgain({ nameBtn, testId, eventClick }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ testId }
        onClick={ eventClick }
      >
        {nameBtn}
      </button>
    </div>
  );
}

ButtonPlayAgain.propTypes = {
  nameBtn: propTypes.string.isRequired,
  testId: propTypes.string,
  eventClick: propTypes.func,
};

ButtonPlayAgain.defaultProps = {
  eventClick: undefined,
  testId: undefined,
};

export default ButtonPlayAgain;
