export function renderApp() {
  return `
    <!DOCTYPE html>
    <html lang="en-us">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Duck Tools</title>
      </head>
      <body>
        <div id="root"></div>
        <noscript>Javascript not enabled? No app for you!</noscript>
      </body>
      <script src="/assets/client.bundle.js"></script>
    </html>
  `;
}
