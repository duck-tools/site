import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthenticationContext = createContext();

export default function Authentication(props) {
  const [isAuthenticated, setAuthenticated] = useState(props.isAuthenticated);
  return (
    <AuthenticationContext.Provider value={isAuthenticated}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool
};

Authentication.defaultProps = {
  isAuthenticated: false
};
