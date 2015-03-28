'use strict';

import {EventEmitter} from 'events';
import assign         from 'object-assign';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';
let hotels = [];

let HotelsStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAll() {
    return hotels;
  },
});

HotelsStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch (action.type) {
    case ActionTypes.RECEIVE_HOTELS_BY_PLACE:
      hotels = action.hotels;
      HotelsStore.emitChange();
      break;
  }
});

export default HotelsStore;
