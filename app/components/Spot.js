'use strict';

import React     from 'react';
import Nav       from './Nav';
import Map       from './Map';
import Place     from './Place';
import Itinerary from './Itinerary';
import Router    from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Spot',

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render() {
    var place = decodeURIComponent( this.context.router.getCurrentParams().place );
    return (
      <div>
        <Nav />
        <Place isSearch="true" />
        <Map place={place} />
        <Itinerary />
      </div>
    );
  }
});
