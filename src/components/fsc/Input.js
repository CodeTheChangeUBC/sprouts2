import React from 'react';
import PropTypes from "prop-types";

export const Input = (props) => {
  return(
    <div className="">
      <h3 className="">
        {props.title}
      </h3>
      <div className="">
        <input type={props.type} className="" placeholder={props.placeholder} aria-label={props.placeholder} onChange={props.update}>
      </div>
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
