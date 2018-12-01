import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  return (
    <div className="form-group">
      <label>
        {props.title}
      </label>
      <input
        type={props.type}
        value={props.value}
        className="form-control rounded-0 border-left-0 border-right-0 border-top-0"
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        onChange={props.update}
        disabled={props.disabled}
        required={!props.disabled && 'required'}
      />
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
