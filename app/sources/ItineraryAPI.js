'use strict';

import Marty  from 'marty';
import config from '../config';


class ItineraryAPI extends Marty.HttpStateSource {
  getAll(userId) {
    return this.get({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/'+userId
    });
  }
  add( userId, item ) {
    return this.post({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/'+userId+'/add/',
      body: item
    });
  }
  remove( userId, id ) {
    return this.post({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/'+userId+'/remove/'+id,
    });
  }
}
export default Marty.register(ItineraryAPI);
