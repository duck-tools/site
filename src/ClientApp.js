import React from 'react';
import { createRoot, render } from 'react-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

const root = document.getElementById('root');
const appData = JSON.parse(root.dataset.app);
// createRoot(root).render(<App />);

function ServerApp() {
  return (
    <React.StrictMode>
      <React.ConcurrentMode>
        <App {...appData} />
      </React.ConcurrentMode>
    </React.StrictMode>
  );
}

render(<ServerApp />, root);

if (process.env.NODE_ENV === 'production') {
  register();
} else {
  unregister();
}
