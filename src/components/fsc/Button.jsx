import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  return (
    <button type="button" className={`btn ${props.color}`} onClick={props.onClick} disabled={props.disabled}>
      {props.title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
