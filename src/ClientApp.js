import React from 'react';
import { createRoot, render } from 'react-dom';
import App from './App';
import { register, unregister } from './serviceWorker';

const root = document.getElementById('root');
const appData = JSON.parse(root.dataset.app);

function ServerApp({ enableStrict }) {
  const body = (
    <App {...appData} />
  );

  return enableStrict
    ? <React.StrictMode><React.ConcurrentMode>{body}</React.ConcurrentMode></React.StrictMode>
    : body;
}

//render(<ServerApp />, root);
createRoot(root).render(<ServerApp />);

if (process.env.NODE_ENV === 'production') {
  register();
} else {
  unregister();
}
