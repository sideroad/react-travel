'use strict';

import Marty  from 'marty';
import config from '../config';


class ItineraryAPI extends Marty.HttpStateSource {
  getAll() {
    return this.get({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/'
    });
  }
  add( item ) {
    return this.post({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/add/',
      body: item
    });
  }
  remove( id ) {
    return this.post({
      url: config.API_HOST + '/'+config.LANG+'/itinerary/remove/'+id+'/',
    });
  }
}
export default Marty.register(ItineraryAPI);
