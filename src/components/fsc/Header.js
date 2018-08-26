import React from 'react';
import PropTypes from "prop-types";

export const Header = (props) => {
  return(
    <div className="">
      <h1 className="">{props.title}</h1>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
