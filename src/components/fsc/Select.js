import React from 'react';
import PropTypes from "prop-types";

export const Select = (props) => {
  let options = new Array(dropdown.length);
  for(let i = 0; i < dropdown.length; i++) {
    options.push(<option value="">{dropdown[i]}</option>);
  }

  return(
    <div className="">
      <h3 className="">
        {props.title}
      </h3>
      <select className="" onChange={props.update}>
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
