'use strict';

import React  from 'react';
import Router    from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Nav',
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="app">Logo will be here</Link>
          </div>
        </div>
      </nav>
    );
  }
});
