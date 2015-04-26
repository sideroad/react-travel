'use strict';

import config           from '../config';
import Marty            from 'marty';
import ItineraryAPI     from '../sources/ItineraryAPI';
import constants        from '../constants';

class ItineraryQueries extends Marty.Queries {
  getAll() {
    return ItineraryAPI.getAll()
      .then(res => this.dispatch(constants.ITINERARY_RECEIVE, res.body || []))
      .catch(err => this.dispatch(constants.ITINERARY_RECEIVE_FAILED, err));
  }
}
export default Marty.register(ItineraryQueries);
