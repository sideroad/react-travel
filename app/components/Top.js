'use strict';

import React   from 'react';
import Nav     from './Nav';
import Place   from './Place';
import Impress from './Impress';
import Footer  from './Footer';
import Router  from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Top',

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div>
        <Nav />
        <Place />
        <Impress />
        <Footer />
      </div>
    );
  }
});
