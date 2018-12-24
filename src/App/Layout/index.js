import React, { useContext } from 'react';
import { AuthenticationContext } from '../context';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';

export default function Layout(props) {
  const isAuthenticated = useContext(AuthenticationContext);

  return isAuthenticated ? <Authenticated {...props} /> : <Unauthenticated {...props} />;
}
