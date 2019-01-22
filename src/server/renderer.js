import React from 'react';
import ReactDOM from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import ServerApp from '../ServerApp';

export function renderApp(data) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Duck Tools</title>
        ${tags}
      </head>
      <body>
        <div id="root" data-app='${JSON.stringify(data)}'>${html}</div>
      </body>
      <script src="/client.bundle.js"></script>
    </html>
  `;
}
