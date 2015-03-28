'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';

export default React.createClass({
  displayName: 'App',
  render() {
    let title = `Enjoy your trip`;
    return (
      <html lang="ja">
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta charSet="utf8" />
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css" />
        <link rel="stylesheet" href="bundle.css" />
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
      </head>
      <body>
        <div id="app" className="container">
          <RouteHandler />
        </div>
      </body>
      <script src="bundle.js?v=20150130"></script>
      </html>
    );
  }
});
