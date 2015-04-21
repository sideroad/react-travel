'use strict';

import Reflux  from 'reflux';
import request from 'superagent';
import config  from '../config';
import Actions from '../actions';
import moment  from 'moment';

var items = [];
export default Reflux.createStore({

  init: function() {
    this.listenToMany(Actions);
  },

  onGetItinerary: function( place ) {
    var that = this;
    request
      .get(config.API_HOST + '/'+config.LANG+'/itinerary/' )
      .accept('json')
      .end((err, res) => {
        items = res.body;
        that.trigger({
          items: items
        });
    });
  },

  onAddItem: function( spot ){
    var that = this;
    spot.order = items.length + 1;
    spot.stayFrom = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');
    spot.leftBy  = config.LEFT_BY[0];
    request
      .post(config.API_HOST + '/'+config.LANG+'/itinerary/add/' )
      .send(spot)
      .end((err, res) => {
        items.push(spot);
        that.trigger({
          items: items
        });
      });
  }

});

