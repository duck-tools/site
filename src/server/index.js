import express from 'express';
import compression from 'compression';
import path from 'path';
import { configureSession } from './config/session';
import { renderApp } from './renderer';
import { authRouter } from './routes/auth';

const app = express();

app.use(compression());
app.use(configureSession());
app.use('/assets', express.static(path.join('assets')));
app.use('/', authRouter);

app.use((req, res) => res.send(renderApp()));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App started on port ${port}`));