import React from 'react';
import PropTypes from "prop-types";

export const Select = (props) => {
  let dropdown = props.dropdown;
  let options = new Array(dropdown.length);
  for(let i = 0; i < dropdown.length; i++) {
    options.push(<option key={(i+1)} value={dropdown[i]}>{dropdown[i]}</option>);
  }

  return(
    <div className="form-group">
      <label> {props.title} </label>
      <select value={props.value} className="form-control" onChange={props.update}>
        <option key="0" value="Choose...">Choose...</option>
        {options}
      </select>
    </div>
  );
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dropdown: PropTypes.arrayOf(PropTypes.string).isRequired,
  update: PropTypes.func.isRequired
};

export default Select;
