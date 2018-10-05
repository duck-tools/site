import React from 'react';
import { render } from 'react-dom';
import App from './App';

function ServerApp() {
  return <App />;
}

render(<ServerApp />, document.getElementById('root'));
