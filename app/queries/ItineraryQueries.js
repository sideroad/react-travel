'use strict';

import config           from '../config';
import Marty            from 'marty';
import ItineraryAPI     from '../sources/ItineraryAPI';
import UserAPI          from '../sources/UserAPI';
import constants        from '../constants';

class ItineraryQueries extends Marty.Queries {
  getAll() {
    return UserAPI.take().then(res => 
      ItineraryAPI.getAll(res.body.id)
        .then(res => this.dispatch(constants.ITINERARY_RECEIVE, res.body || []))
        .catch(err => this.dispatch(constants.ITINERARY_RECEIVE_FAILED, err))
    );
  }
}
export default Marty.register(ItineraryQueries);
