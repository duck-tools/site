import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ServerApp from './ServerApp';

const app = express();

function renderApp() {
  const App = React.createFactory(ServerApp);
  const html = ReactDOM.renderToString(App());
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Duck Tools</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="/assets/client.bundle.js"></script>
    </html>
  `;
}

app.use((req, res) => res.send(renderApp()));

app.listen(process.env.PORT || 3000, () => console.log('App started'));
