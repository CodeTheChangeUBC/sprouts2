import React from 'react';
import PropTypes from "prop-types";

export const Button = (props) => {
  return(
    <button type="button" className={`btn ${props.color}`} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
