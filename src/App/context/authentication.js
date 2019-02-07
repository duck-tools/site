import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthenticationContext = createContext();

export default function Authentication(props) {
  const [authData] = useState({
    displayName: props.authData.displayName,
    picture: props.authData.picture
  });
  return (
    <AuthenticationContext.Provider value={authData}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  authData: PropTypes.object
};

Authentication.defaultProps = {
  authData: {}
};
