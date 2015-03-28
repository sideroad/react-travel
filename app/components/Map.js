'use strict';

import React                    from 'react';
import PlaceStore               from '../stores/PlaceStore';
import AppHotelsActionCreators  from '../actions/AppHotelsActionCreators';


export default React.createClass({
  displayName: 'Map',
  getInitialState() {
    return {
      map: '',
      place: PlaceStore.get()
    };
  },
  componentDidMount() {
    this.setState({
      map: new google.maps.Map(document.getElementById('map-canvas'), {
       mapTypeId: google.maps.MapTypeId.ROADMAP
      })
    });
    let map = this.state.map;

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));
    map.fitBounds(defaultBounds);

    PlaceStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    PlaceStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({ place: PlaceStore.get() });
    let place = this.state.place;
    let map = this.state.map;

    var bounds = new google.maps.LatLngBounds();
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    bounds.extend(place.geometry.location);

    map.fitBounds(bounds);
    AppHotelsActionCreators.fetchByPlace(place);
  },

  render() {
    let style = {
      title: {
        fontFamily: "'Poiret One', cursive"
      }
    };

    return (
      <div>
        <div id="map-canvas"></div>
      </div>
    );
  }
});






