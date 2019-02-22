import React, { useContext } from 'react';
import { AuthenticationContext } from '../context';

export default function Home() {
  const { displayName } = useContext(AuthenticationContext);
  return (
    <h1>Welcome, {displayName}!</h1>
  );
};
