import React from 'react';
import PropTypes from 'prop-types';

export const Header = (props) => {
  return (
    <div className="bg-light py-3 shadow-sm sticky-top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {renderButton(props.link, props.title)}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderButton = (link, title) => {
  const backBtn = link ? (<button onClick={link} className="btn btn-lg btn-link position-absolute d-flex align-self-center p-0 pr-3 text-body no-underline">&larr;</button>) : undefined;
  return (
    <h3 className="text-center mb-0">
      {backBtn}
      {title}
    </h3>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.func,
};

export default Header;
