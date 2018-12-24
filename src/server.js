import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ServerApp from './ServerApp';
import { ServerStyleSheet } from 'styled-components';

const app = express();

function renderApp() {
  let tags = '';
  let html = '';
  if (process.env.SSR_ENABLED) {
    const sheet = new ServerStyleSheet();
    const App = React.createFactory(ServerApp);
    html = ReactDOM.renderToString(sheet.collectStyles(App()));
    tags = sheet.getStyleTags();
  }
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Duck Tools</title>
        ${tags}
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="/assets/client.bundle.js"></script>
    </html>
  `;
}

app.use('/assets', express.static(path.join('assets')));

app.use((req, res) => res.send(renderApp()));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App started on port ${port}`));
