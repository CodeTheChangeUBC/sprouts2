import React from 'react';
import PropTypes from 'prop-types';

export const Select = (props) => {
  const title = props.renderTitle ? <label>{props.title}</label> : undefined;

  return (
    <div className="form-group">
      {title}
      <select value={props.value} className="custom-select" onChange={props.update} disabled={props.disabled}>
        <option key="0" value={props.default}>{props.default}</option>
        {createDropdown(props.dropdown)}
      </select>
    </div>
  );
};

const createDropdown = (dropdown) => {
  let counter = 0;
  return dropdown.forEach((item) => {
    counter++;
    return (
      <option key={counter} value={item}>
        {item}
      </option>
    );
  });
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dropdown: PropTypes.arrayOf(PropTypes.string).isRequired,
  update: PropTypes.func.isRequired,
  default: PropTypes.string,
  disabled: PropTypes.bool,
  renderTitle: PropTypes.bool,
};

Select.defaultProps = {
  renderTitle: true,
  default: 'Choose...',
};

export default Select;
