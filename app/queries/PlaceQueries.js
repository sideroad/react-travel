'use strict';

import Marty  from 'marty';
import config  from '../config';
import constants  from '../constants';
import PlaceAPI  from '../sources/PlaceAPI';


class PlaceQueries extends Marty.Queries {
  getSpot(place) {
    return PlaceAPI.getSpot(place)
      .then(res => this.dispatch(constants.PLACE_GET_SPOTS, (res.body || []).slice(0,1), place))
      .catch(err => this.dispatch(constants.PLACE_GET_SPOTS_FAILED, place, err));
  }
  getNearby(options) {
    return PlaceAPI.getNearby(options)
      .then(res => this.dispatch(constants.PLACE_GET_SPOTS, res.body || [], null, options.id))
      .catch(err => this.dispatch(constants.PLACE_GET_SPOTS_FAILED, err));
  }
}
export default Marty.register(PlaceQueries);