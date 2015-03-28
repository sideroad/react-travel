'use strict';

import request        from 'superagent';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;

// TODO Loading
export default {
  updatePlace(place) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.UPDATE_PLACE,
      place: place
    });
  }
};
