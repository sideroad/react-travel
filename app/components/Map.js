'use strict';

import React        from 'react';
import PlaceStore   from '../stores/PlaceStore';
import HotelsStore  from '../stores/HotelsStore';
import MapStore     from '../stores/MapStore';
import HotelsAction from '../actions/HotelsAction';
import MapAction    from '../actions/MapAction';

var gm;
var markers = [];

export default React.createClass({
  displayName: 'Map',
  getInitialState() {
    return {
      center: MapStore.getLocation(),
      radius: MapStore.getRadius(),
      hotels: [],
      place: PlaceStore.get()
    };
  },
  componentDidMount() {
    gm = new google.maps.Map(document.getElementById('map-canvas'),{
      center: new google.maps.LatLng(35.681382,139.766084),
      zoom: 15
    });

    PlaceStore.addChangeListener(this._onPlaceChange);
    MapStore.addChangeListener(this._onMapChange);
    HotelsStore.addChangeListener(this._onHotelsChange);

    google.maps.event.addListener(gm, 'dragend', ()=>{
      MapAction.updateLocation(gm.getBounds().getCenter());
    });
    google.maps.event.addListener(gm, 'zoom_changed', ()=>{
      let center = gm.getBounds().getCenter();
      let radius = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(
        center,
        gm.getBounds().getNorthEast()
      ) / 1000);
      MapAction.updateRadius(radius);
    });

  },

  componentWillUnmount() {
    PlaceStore.removeChangeListener(this._onPlaceChange);
    MapStore.removeChangeListener(this._onMapChange);
    HotelsStore.removeChangeListener(this._onHotelsChange);
  },

  _onMapChange(){
    this.setState({
      center: MapStore.getLocation(),
      radius: MapStore.getRadius()
    });
    let center = this.state.center;
    let radius = this.state.radius;
    HotelsAction.fetchByLocation(center, radius);

  },

  _onHotelsChange() {
    this.setState({ hotels: HotelsStore.getAll() });
    let hotels = this.state.hotels;

    markers.forEach( marker => {
      marker.setMap(null);
    });

    hotels.forEach(( hotel, index ) => {
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: gm,
        icon: 'hotel68.png',
        title: hotel.basic.hotelName,
        position: new google.maps.LatLng(hotel.basic.latitude, hotel.basic.longitude)
      });
      markers.push(marker);
    });

  },

  _onPlaceChange() {
    this.setState({ place: PlaceStore.get() });
    let place = this.state.place;

    var bounds = new google.maps.LatLngBounds();
    var image = {
      url: 'landmark3.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    var marker = new google.maps.Marker({
      map: gm,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    gm.setCenter(place.geometry.location);
    setTimeout(()=>{
      MapAction.updateLocation(gm.getBounds().getCenter());
    }, 100);
  },


  render() {
    return (
      <div>
        <div id="map-canvas"></div>
      </div>
    );
  }
});






