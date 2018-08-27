import React from 'react';
import PropTypes from "prop-types";

export const Input = (props) => {
  return(
    <div className="form-group">
      <label> {props.title} </label>
      <input type={props.type} className="form-control" placeholder={props.placeholder} aria-label={props.placeholder} onChange={props.update}>
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  type: PropTypes.string
};

Input.defaultProps = {
  type: "text"
}

export default Input;
