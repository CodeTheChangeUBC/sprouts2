import React from 'react';
import PropTypes from "prop-types";

export const Header = (props) => {
  return(
    <div className="bg-light py-3 shadow-sm sticky-top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {!props.link && <h3 className="text-center mb-0">{props.title}</h3> }
            {props.link && <h3 className="text-center mb-0">
              <a onClick={props.link} className="btn btn-lg btn-link position-absolute d-flex align-self-center p-0 pr-3">&larr;</a> 
              {props.title}
            </h3>}  
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
