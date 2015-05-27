'use strict';

import React      from 'react/addons';
import Router     from 'react-router';
import PlaceStore from '../stores/PlaceStore';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Place',
  mixins: [ React.addons.LinkedStateMixin ],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState(){
    return {
      place: this.props.place
    };
  },
  componentDidMount() {
    var input = document.getElementById('pac-input'),
        autocomp = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomp, 'place_changed', () => {
      var place = autocomp.getPlace();
      console.log(place);
      this.setState({
        className: 'rt-place in-map',
        place: place.name
      });
      this.context.router.transitionTo('/spot/'+encodeURIComponent(place.name));
    });

  },
  submit(e){
    e.preventDefault();
  },
  render() {
    let className = 'rt-place ' + ( this.props.isSearch ? 'in-map' : '' );
    return (
        <div className={className}>
          <form role="form" onSubmit={this.submit} className="form-group">
            <div className="input-group input-group-lg">
              <input id="pac-input" className="form-control" type="text" placeholder="Where are you going?" valueLink={this.linkState('place')}  />
              <div className="input-group-addon btn-info rt-place-search"><span className="glyphicon glyphicon-search"></span></div>
            </div>
          </form>
        </div>
    );
  }
});






