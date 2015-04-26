'use strict';

import Marty  from 'marty';
import config  from '../config';
import constants  from '../constants';
import PlaceQueries  from '../queries/PlaceQueries';

class PlaceStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state = {
      place: '',
      spots: {}
    };
    this.handlers = {
      addSpots: constants.PLACE_GET_SPOTS
    };
  }

  addSpots(spots, place, id) {
    this.state.place = place;
    this.state.spots[place || id] = spots;
    this.hasChanged();
  }

  getNearby(options){
    options.id = [ 
               options.lat,
               options.lng,
               options.types
             ].join('/');

    return this.fetch({
      id: options.id,
      locally(){
        return this.state.spots[options.id];
      },
      remotely(){
        return PlaceQueries.for(this).getNearby(options);
      }
    });
  }

  getPlace() {
    return this.state.place;
  }

  getSpot( place ) {
    return this.fetch({
      id: place,
      locally() {
        return this.state.spots[place];
      },
      remotely() {
        return PlaceQueries.for(this).getSpot(place);
      }
    });
  }
}

export default Marty.register(PlaceStore);
