import React from 'react';
import PropTypes from "prop-types";

export const Select = (props) => {
  let options = new Array(dropdown.length);
  for(let i = 0; i < dropdown.length; i++) {
    options.push(<option value="">{dropdown[i]}</option>);
  }

  return(
    <div className="form-group">
      <label> {props.title} </label>
      <select className="form-control" onChange={props.update}>
        <option selected>Choose...</option>
        {options}
      </select>
    </div>
  );
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  dropdown: PropTypes.arrayOf(PropTypes.string).isRequired,
  update: PropTypes.func.isRequired
};

export default Select;
