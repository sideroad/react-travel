'use strict';

import config           from '../config';
import Marty            from 'marty';
import ItineraryAPI     from '../sources/ItineraryAPI';
import ItineraryQueries from '../queries/ItineraryQueries';
import constants        from '../constants';
import _                from 'lodash';

class ItineraryStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state = {
      items: undefined
    };
    this.handlers = {
      receive: constants.ITINERARY_RECEIVE,
    };
  }

  getAll() {
    return this.fetch({
      id: 'items',
      locally() {
        return this.state.items;
      },
      remotely() {
        return ItineraryQueries.for(this).getAll();
      }
    });
  }

  receive( items ) {
    this.state.items = items;
    this.hasChanged();
  }

}

export default Marty.register(ItineraryStore);
