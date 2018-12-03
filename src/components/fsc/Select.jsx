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
  const options = new Array(dropdown.length);
  for (let i=0; i<dropdown.length; i++) {
    options.push(
      <option key={i} value={dropdown[i]}>{dropdown[i]}</option>
    );
  }
  return options;
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
