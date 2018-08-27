import React from 'react';
import PropTypes from "prop-types";

export const Header = (props) => {
  return(
    <div className="row bg-secondary text-white">
      <div className="col-12">
        <h1 className="text-center">{props.title}</h1>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
