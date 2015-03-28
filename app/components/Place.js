'use strict';

import React                    from 'react/addons';
import AppPlaceActionCreators from '../actions/AppPlaceActionCreators';


export default React.createClass({
  displayName: 'Place',
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return {
      place: ''
    };
  },
  componentDidMount() {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      AppPlaceActionCreators.updatePlace(places[0]);
    });
  },
  _onSubmit(e){
    e.preventDefault();
  },
  render() {
    let style = {
      title: {
        fontFamily: "'Poiret One', cursive"
      }
    };

    return (
      <div>
        <form role="form" onSubmit={this._onSubmit} >
          <input id="pac-input" className="controls" type="text" placeholder="Where you go?" valueLink={this.linkState('place')} />
        </form>
      </div>
    );
  }
});






