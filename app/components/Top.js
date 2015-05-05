'use strict';

import React   from 'react';
import Navigation     from './Navigation';
import Place   from './Place';
import Impress from './Impress';
import Footer  from './Footer';
import Router  from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Top',

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    marty: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <Navigation />
        <Place />
        <Impress />
        <Footer />
      </div>
    );
  }
});
