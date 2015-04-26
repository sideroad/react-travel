/* global __dirname, process, console */
'use strict';

import express  from 'express';
import React    from 'react';
import Router   from 'react-router';
import routes   from './routes';
import Marty    from 'marty';
import MartyExpress from 'marty-express';

let app = express();

app.use(express.static(__dirname+'/../dist'));
app.get('/favicon.ico', (req, res) => { res.send(''); });

app.use((req, res, next) => {
  Router.run(routes, req.path, (Handler) => {
    Marty.renderToString({
      type: Handler,
      props: { path: req.path },
      timeout: 5000,
      context: Marty.createContext()
    }).then(function (render) {
      console.log(render.diagnostics);
      res.send(render.html).end();
    });
  });
});

// handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});

let port = process.env.PORT || 5000;
console.log("listening..." + port);
app.listen(port);
