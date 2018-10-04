const express = require('express');

const app = express();

app.use((req, res) => res.send('Hello, Heroku!'));

app.listen(process.env.PORT || 3000, () => console.log('App started'));
