'use strict';

import config           from '../config';
import Marty            from 'marty';
import ItineraryAPI     from '../sources/ItineraryAPI';
import constants        from '../constants';
import moment           from 'moment';
import _                from 'lodash';

class ItineraryActions extends Marty.ActionCreators {
  add(spot) {
    let item = _.assign({}, spot, {
      placeId:  spot.id,
      stayFrom: moment().add(1, 'days').format('YYYY-MM-DDTHH:mm'),
      leftBy:   config.LEFT_BY[0]
    });

    return ItineraryAPI.add(item)
      .then(res => this.dispatch(constants.ITINERARY_RECEIVE, res.body))
      .catch(err => this.dispatch(constants.ITINERARY_RECEIVE_FAILED, err));  
  }
  remove(item) {
    return ItineraryAPI.remove(item.id)
      .then(res => this.dispatch(constants.ITINERARY_RECEIVE, res.body))
      .catch(err => this.dispatch(constants.ITINERARY_RECEIVE_FAILED, err));  
  }
}

export default Marty.register(ItineraryActions);