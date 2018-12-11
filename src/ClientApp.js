import React from 'react';
import { createRoot, render } from 'react-dom';
import App from './App';

function ServerApp() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const root = document.getElementById('root');
// createRoot(root).render(<App />);

render(<ServerApp />, root);
