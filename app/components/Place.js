'use strict';

import React  from 'react/addons';
import Reflux from 'reflux';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default React.createClass({
  displayName: 'Place',
  mixins: [Reflux.LinkedStateMixin, React.addons.LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState(){
    return {
      place: ''
    };
  },

  componentDidMount() {
    var input = document.getElementById('pac-input'),
        searchBox = new google.maps.places.SearchBox(input);
  },
  submit(e){
    e.preventDefault();
    var input = document.getElementById('pac-input');

    if(input.value){
      this.setState({
        className: 'rt-place container in-map'
      });
      this.context.router.transitionTo('/spot/'+encodeURIComponent(input.value));      
    }
  },
  render() {
    let className = 'rt-place container ' + ( this.props.isSearch ? 'in-map' : '' );
    return (
        <div className={className}>
          <form role="form" onSubmit={this.submit} className="form-group">
            <div className="input-group input-group-lg">
              <input id="pac-input" className="form-control" type="text" placeholder="Where you go?" valueLink={this.linkState('place')}  />
              <div className="input-group-addon btn-info rt-place-search"><span className="glyphicon glyphicon-search"></span></div>
            </div>
          </form>
        </div>
    );
  }
});






