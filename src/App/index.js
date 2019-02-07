import React from 'react';
import { hot } from 'react-hot-loader/root';
import AppContext from './context';
import Layout from './Layout';

function App(props) {
  return (
    <AppContext {...props}>
      <Layout />
    </AppContext>
  );
}

export default hot(App);
