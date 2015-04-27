/* global google, document */

'use strict';

import React        from 'react/addons';
import Marty        from 'marty';
import PlaceStore   from '../stores/PlaceStore';
import PlaceQueries from '../queries/PlaceQueries';
import NearbyUtils  from '../utils/NearbyUtils';
import SpotDetail   from './SpotDetail';
import Router     from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

var gm;
var markers = [];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: (props.spots||[])[0],
      spots: props.spots||[],
      zoom: props.nearby.zoom,
      lat: props.nearby.lat,
      lng: props.nearby.lng
    };
  }

  setMarkers(spots){
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

      google.maps.event.addListener(marker, 'click', () => {
        gm.panTo(marker.getPosition());
        this.setState({
          active: spot
        });
      });
      markers.push(marker);
    });

    if(spots.length === 1) {
      gm.setCenter(spots[0].geometry.location);
    }
  }

  componentDidMount() {
    gm = new google.maps.Map(document.getElementById('map-canvas'),{
      center: new google.maps.LatLng(this.state.lat, this.state.lng),
      zoom: this.state.zoom,
      styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
    });

    let spots = this.props.spots;
    this.setMarkers(spots);
  }

  componentWillReceiveProps(props) {
    this.setMarkers(props.spots);
  }

  nearbySearch(types){
    let nearbyId = NearbyUtils.stringify(gm, types);

    this.context.router.transitionTo('/nearby/'+nearbyId);      
  }

  _onMapChange(){
    // this.setState({
    //   center: MapStore.getLocation(),
    //   radius: MapStore.getRadius()
    // });
    // let center = this.state.center;
    // let radius = this.state.radius;

  }

  render() {
    let active = this.state.active;
    let spot = '';

    if( active ) {
      spot = <SpotDetail spot={active} showDetail={true} />
    }

    return (
      <div>

        <div className="rt-map">
          <div id="map-canvas" className="main" ></div>
          {spot}
        </div>

        <div className="rt-spot-type text-right">
          <div className="btn-group btn-group-lg">
            <button onClick={this.nearbySearch.bind(this, "shopping_mall|store")} className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-shopping-cart"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button onClick={this.nearbySearch.bind(this, "restaurant")} className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-cutlery"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button onClick={this.nearbySearch.bind(this, "lodging")} className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-bed"></span></button>
          </div>
          <div className="btn-group btn-group-lg">
            <button onClick={this.nearbySearch.bind(this, "airport|train_station|subway_station|bus_station")} className="btn btn-default rt-circle-btn rt-spot-type-btn btn-info" ><span className="glyphicon glyphicon-plane"></span></button>
          </div>
        </div>


      </div>
    );
  }
};

Map.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Marty.createContainer(Map, {
  listenTo: PlaceStore,
  fetch: {
    spots() {
      if(this.props.place) {
        return PlaceStore.for(this).getSpot(this.props.place);
      } else {
        return PlaceStore.for(this).getNearby(this.props.nearby);
      }
    }
  }
});





