import React from 'react';
import AppContext from './context';
import Layout from './Layout';
import Spinner from './Spinner';

export default function App(props) {
  return (
    <AppContext {...props}>
      <Layout />
    </AppContext>
  );
}
