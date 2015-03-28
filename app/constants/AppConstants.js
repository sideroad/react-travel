'use strict';

import keyMirror from 'react/lib/keyMirror';

export default {
  ActionTypes: keyMirror({
    RECEIVE_TRACKS_BY_ARTIST: null,
    RECEIVE_TRACKS_BY_COUNTRY: null,
    RECEIVE_HOTELS_BY_PLACE: null,
    UPDATE_PLACE: null,
    UPDATE_LOCATION: null,
    UPDATE_RADIUS: null
  }),
  PayloadSources: keyMirror({
    VIEW_ACTION: null
  })
};
