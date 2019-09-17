import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Spinner from '../Spinner';

export const AuthenticationContext = createContext();

const GET_PROFILE = gql`{
  profile {
    displayName
    picture
  }
}`;

export default function Authentication(props) {
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) return <Spinner size="24" />;
  if (error) return `Error! ${error.message}`;

  const authData = !!data.profile ? data.profile : {};
  return (
    <AuthenticationContext.Provider value={authData}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};
