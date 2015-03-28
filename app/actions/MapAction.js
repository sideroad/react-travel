'use strict';

import request        from 'superagent';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;

// TODO Loading
export default {
  updateLocation(location) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_LOCATION,
      location: location
    });
  },
  updateRadius(radius) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_RADIUS,
      radius: radius
    });
  }
};
