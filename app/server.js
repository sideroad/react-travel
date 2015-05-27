/* global __dirname, process, console */
'use strict';


import express      from 'express';
import session      from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import React        from 'react';
import Router       from 'react-router';
import routes       from './routes';
import Marty        from 'marty';
import MartyExpress from 'marty-express';
import passport     from 'passport';
import { Strategy as OpenidConnectStrategy } from 'passport-openidconnect';

let app = express();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new OpenidConnectStrategy({
    authorizationURL: "https://accounts.google.com/o/oauth2/auth",
    tokenURL: "https://accounts.google.com/o/oauth2/token",
    userInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "https://react-travel.herokuapp.com/auth/google/return",
    scope: ["openid", "email", "profile" ]
}, (accessToken, refreshToken, profile, req, res, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    return done(null, profile);
}));


app.use(express.static(__dirname+'/../dist'));
app.get('/favicon.ico', (req, res) => { res.send(''); });

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.REACT_SECRET,
  key: 'sid',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/account', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user._json);
  } else {
    res.json({});
  }
});

app.get('/login', (req, res, next) => {
  req.session.ret = req.get('Referer');
  next();
}, passport.authenticate('openidconnect') );

app.get('/logout', function(req, res) {
 req.logout();
 req.session.destroy();
 res.redirect(req.get('Referer') || '/');
});

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/return', passport.authenticate('openidconnect', {
    failureRedirect: '/'
}), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(req.session.ret || '/');
});


app.use((req, res, next) => {
  Router.run(routes, req.path, (Handler, state) => {
    Marty.renderToString({
      type: Handler,
      props: { path: req.path, user: req.user ? req.user._json : {} },
      timeout: 5000,
      context: Marty.createContext()
    }).then( (render) => {
      console.log(render.diagnostics);
      console.log(render.html);
      let html = '<html lang="ja">' +
                 '<head>' +
                 '  <title>Enjoy trip</title>' +
                 '  <meta name="viewport" content="width=device-width, initial-scale=1" />' +
                 '  <meta httpEquiv="Cache-Control" content="no-cache" />' +
                 '  <meta httpEquiv="Pragma" content="no-cache" />' +
                 '  <meta charSet="utf8" />' +
                 '  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />' +
                 '  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css" />' +
                 '  <link rel="stylesheet" href="/bundle.css" />' +
                 '  <script src="https://maps.googleapis.com/maps/api/js?signed_in=true&libraries=places,geometry" ></script>' +
                 '</head>' +
                 '<body>' +
                 '  <div id="app">'+render.html+'</div>'+
                 '</body>' +
                 '<script src="/bundle.js?v=20150130" ></script>' +
                 '</html>';
      res.send(html).end();
    });
  });
});

// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


let port = process.env.PORT || 5000;
console.log("listening..." + port);
app.listen(port);
