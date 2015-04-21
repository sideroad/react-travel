'use strict';

import Reflux  from 'reflux';
import request from 'superagent';
import config  from '../config';
import Actions from '../actions';
import moment  from 'moment';

var results = [];
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
        that.trigger({
          items: res.body || []
        });
    });
  },

  onAddItem: function( spot ){
    var that = this;
    spot.stayFrom = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm');
    spot.leftBy  = config.LEFT_BY[0];
    request
      .post(config.API_HOST + '/'+config.LANG+'/itinerary/add/' )
      .send(spot)
      .end((err, res) => {
        results.push(spot);
        that.trigger({
          items: results
        });
      });
  }

});

