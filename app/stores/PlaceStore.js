'use strict';

import {EventEmitter} from 'events';
import assign         from 'object-assign';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;
let CHANGE_EVENT = 'change';
let place = {};

let PlaceStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get() {
    return place;
  },
});

PlaceStore.dispatchToken = AppDispatcher.register( payload => {
  let action = payload.action;

  switch (action.type) {
    case ActionTypes.UPDATE_PLACE:
      place = action.place;
      PlaceStore.emitChange();
      break;
  }
});

export default PlaceStore;
