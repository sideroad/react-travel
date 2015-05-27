'use strict';

import Marty  from 'marty';
import config  from '../config';
import constants  from '../constants';

class PlaceAPI extends Marty.HttpStateSource {
  getSpot(place) {
    return this.get({
      url: config.API_HOST + '/'+config.LANG+'/spots/' + encodeURIComponent( place )
    });
  }
  getNearby(options) {
    return this.get({
      url: config.API_HOST + '/'+config.LANG+'/nearby/' + options.lat + ',' + options.lng + '/' + options.types+'/' + options.radius
    });
  }
}
export default Marty.register(PlaceAPI);