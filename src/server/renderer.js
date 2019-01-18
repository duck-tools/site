import React from 'react';
import ReactDOM from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import ServerApp from '../ServerApp';

export function renderApp() {
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
        <meta name="viewport" contnet="width=device-width">
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
