/* global google, document */

'use strict';

import React      from 'react/addons';
import Reflux     from 'reflux';
import ReactAsync from 'react-async';
import Actions    from '../actions';
import PlaceStore from '../stores/PlaceStore';
import SpotDetail from './SpotDetail';

var gm;
var markers = [];
export default React.createClass({
  displayName: 'Map',

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin],
  getInitialStateAsync(cb) {
    Actions.placeUpdate(this.props.place);
    PlaceStore.listen(function(data) {
      console.log(data);
      return cb(null, data);
    });
  },

  componentDidMount() {
    this.listenTo(PlaceStore, this.refreshMap);
    // Actions.placeUpdate(this.props.place);

    gm = new google.maps.Map(document.getElementById('map-canvas'),{
      center: new google.maps.LatLng(35.681382,139.766084),
      zoom: 15,
      styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
    });    
  },

  componentWillReceiveProps(props) {
    if(typeof(props.place) !== "undefined") {
      console.log(props.place);
      Actions.placeUpdate(props.place);
    }
  },

  refreshMap(data) {
    this.setState(data);

    var spots = this.state.spots;

    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    spots.forEach((spot) => {
      let marker = new google.maps.Marker({
        map: gm,
        anchorPoint: new google.maps.Point(0, -29)
      });
      marker.setPosition(spot.geometry.location);
      marker.setVisible(true);
      markers.push(marker);
    });

    if(spots[0]) {
      gm.setCenter(spots[0].geometry.location);
    }
  },

  hoge(){

    var placesService = new google.maps.places.PlacesService(gm);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return; 
      }


      placesService.getDetails({
        placeId: place.place_id
      }, (place, status) => {
        infowindow.setContent('<div class="gm-iw gm-sm">'+
                              '  <div class="gm-title">' + place.name + '</div>'+
                              '  <div class="gm-basicinfo">'+
                              '    <div class="gm-addr">' + place.adr_address + '</div>'+
                              '    <div class="gm-website"><a href="'+place.website+'">'+place.website+'</a></div>'+
                              '  </div>'+
                              '  <div class="gm-photos"><img src="'+place.photos[0].getUrl({maxWidth: 200, maxHeight: 200})+'"></div>'+
                              '</div>');
        infowindow.open(gm, marker);        
      });

    });

    let el, 
        elements = document.getElementsByClassName('rt-spot-type-btn');

    for(let i = 0; i < elements.length; i++){
      ((el) => {
        el.addEventListener('click', () => {
          placesService.nearbySearch({
            location: gm.getCenter(),
            types: el.getAttribute('data-spot-type').split(','),
            radius: google.maps.geometry.spherical.computeDistanceBetween(gm.getBounds().getNorthEast(), gm.getBounds().getSouthWest())
          }, (results, status) => {
            console.log(results, status);
          });
        });
      })(elements[i]);

    }

  },

  componentWillUnmount() {
  },

  _onSubmit(e){
    e.preventDefault();
  },

  _onMapChange(){
    // this.setState({
    //   center: MapStore.getLocation(),
    //   radius: MapStore.getRadius()
    // });
    // let center = this.state.center;
    // let radius = this.state.radius;

  },

  _onPlaceChange() {
    this.setState({ place: PlaceStore.get() });
    let place = this.state.place;
  },


  render() {
    let spots = this.state.spots || [];
    let spot = '';

    if( spots.length === 1 ) {
      spot = <SpotDetail spot={spots[0]} />
    }

    return (
      <div>

        <div className="rt-map">
          <div id="map-canvas" className="main" ></div>
          {spot}
        </div>

        <div className="rt-spot-type text-right">
          <div className="btn-group btn-group-lg">
            <button data-spot-type="shopping_mall,store" className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-shopping-cart"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button data-spot-type="restaurant" className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-cutlery"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button data-spot-type="lodging" className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-bed"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button data-spot-type="airport,train_station,subway_station,bus_station" className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-plane"></span></button>
          </div>
        </div>


      </div>
    );
  }
});






