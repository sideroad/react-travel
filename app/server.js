/* global __dirname, process, console */
'use strict';

import express  from 'express';
import React    from 'react';
import Router   from 'react-router';
import routes   from './routes';
import ReactAsync from 'react-async';

let app = express();

app.use(express.static(__dirname+'/../dist'));
app.get('/favicon.ico', (req, res) => { res.send(''); });

app.use((req, res, next) => {
  Router.run(routes, req.path, (Handler) => {
    try {
      ReactAsync.renderToStringAsync(<Handler path={req.path} />, (err, markup) => {
        if(err) {
          return next();
        }
        return res.send(markup);
      });
    } catch(err) {
      return next();
    }
  });
});

// handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  })
})

let port = process.env.PORT || 5000;
console.log("listening..." + port);
app.listen(port);
