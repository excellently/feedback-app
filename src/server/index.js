import path from 'path';
import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../routes';
import * as db from './utils/DataBaseUtils';
import bodyParser from 'body-parser';
import { PORT, DEV_PORT, IS_PRODUCTION } from '../etc/config.js';
import favicon from 'serve-favicon';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();

db.setUpConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, '../../public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../../public/assets')));

app.get('/messages/all', (req, res) => {
  db.getMessages().then(data => res.send(data));
});

app.post('/message', (req, res) => {
  db.createMessage(req.body)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }

    const componentHTML = ReactDom.renderToString(<RouterContext {...renderProps} />);

    return res.end(renderHTML(componentHTML));
  });
});

const ASSET_URL = !IS_PRODUCTION ? `http://localhost:${DEV_PORT}` : '.';

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FeedBack App</title>
        <link rel="stylesheet" href="${ASSET_URL}/styles.css">
      </head>
      <body>
        <div id="react-view"><div>${componentHTML}</div></div>
        <script type="application/javascript" src="${ASSET_URL}/bundle.js"></script>
      </body>
    </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
