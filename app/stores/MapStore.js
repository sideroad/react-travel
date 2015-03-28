'use strict';

import {EventEmitter} from 'events';
import assign         from 'object-assign';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';
let map = {
  location: null,
  radius: 1
};

let MapStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getLocation() {
    return map.location;
  },
  getRadius() {
    return map.radius;
  }
});

MapStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch (action.type) {
    case ActionTypes.UPDATE_LOCATION:
      map.location = action.location;
      MapStore.emitChange();
      break;
    case ActionTypes.UPDATE_RADIUS:
      let radius = action.radius;
      if(radius > 3) {
        radius = 3;
      }
      map.radius = radius;
      MapStore.emitChange();
  }
});

export default MapStore;
