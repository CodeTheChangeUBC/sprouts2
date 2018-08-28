import React from 'react';
import PropTypes from "prop-types";

export const Header = (props) => {
  return(
    <div className="container-fluid py-3">
      <div className="row justify-content-center bg-light">
        <div className="col-12">
        {!props.link && <h1 className=" text-center">{props.title}</h1> }
        {props.link && <h1 className=" text-center pr-5 mr-0 mr-sm-5">
          <a onClick={props.link} className="btn btn-lg display-1 text-body mr-0 mr-sm-5">&larr;</a> 
          {props.title}
        </h1>}
            
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
