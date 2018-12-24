import React from 'react';
import AppContext from './context';
import Layout from './Layout';

export default function App(props) {
  return (
    <AppContext {...props}>
      <Layout />
    </AppContext>
  );
}
