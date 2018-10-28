import React from 'react';
import PropTypes from "prop-types";

export const Select = (props) => {
  let dropdown = props.dropdown;
  let options = new Array(dropdown.length);
  for(let i = 0; i < dropdown.length; i++) {
    options.push(<option key={(i+1)} value={dropdown[i]}>{dropdown[i]}</option>);
  }

  let title;
  if(props.renderTitle) {
    title = <label>{props.title}</label>
  } else {
    title = <div/>
  }
  
  return(
    <div className="form-group">
      {title}
      <select value={props.value} className="custom-select" onChange={props.update} disabled={props.disabled}>
        <option key="0" value={props.default}>{props.default}</option>
        {options}
      </select>
    </div>
  );
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dropdown: PropTypes.arrayOf(PropTypes.string).isRequired,
  update: PropTypes.func.isRequired,
  default: PropTypes.string,
  disabled: PropTypes.bool
};

Select.defaultProps = {
  renderTitle: true,
  default: "Choose..."
};

export default Select;
