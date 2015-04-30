'use strict';

import React     from 'react';
import Nav       from './Nav';
import Map       from './Map';
import Place     from './Place';
import Itinerary from './Itinerary';
import Footer    from './Footer';
import Router    from 'react-router';
import NearbyUtils  from '../utils/NearbyUtils';

import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Spot',

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render() {
    let params = this.context.router.getCurrentParams();
    let place = decodeURIComponent(params.place);

    return (
      <div>
        <Nav />
        <Place isSearch="true" place={place}/>
        <Map 
          place={place} 
        />
        <Itinerary />
        <Footer />
      </div>
    );
  }
});
