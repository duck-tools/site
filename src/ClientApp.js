import React from 'react';
import { unstable_createRoot, render } from 'react-dom';
import { register, unregister } from './serviceWorker';

const root = document.getElementById('root');

async function loadApp() {
  const { default: App } = await import(/* webpackPrefetch: true */'./App');

  function UseStrict({ children, enableStrict }) {
    return enableStrict
      ? <React.StrictMode>{ children }</React.StrictMode>
      : <>{ children }</>;
  }

  function UseConcurrent({ children, enableConcurrent }) {
    return enableConcurrent
      ? <React.unstable_ConcurrentMode>{ children }</React.unstable_ConcurrentMode>
      : <>{ children }</>;
  }

  function ServerApp({ enableStrict = false, enableConcurrent = false }) {
    return (
      <UseStrict enableStrict={enableStrict}>
        <UseConcurrent enableConcurrent={enableConcurrent}>
          <App />
        </UseConcurrent>
      </UseStrict>
    );
  }

  //render(<ServerApp />, root);
  unstable_createRoot(root).render(<ServerApp enableConcurrent={false} enableStrict={false} />);
}

loadApp();

if (process.env.NODE_ENV === 'production') {
  register();
} else {
  unregister();
}
