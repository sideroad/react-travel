'use strict';

import Reflux  from 'reflux';
import request from 'superagent';
import config  from '../config';
import Actions from '../actions';

export default Reflux.createStore({

  init: function() {
    this.listenToMany(Actions);
  },

  onPlaceUpdate: function( place ) {
    var self = this;
    request
      .get(config.API_HOST + '/'+config.LANG+'/spots/' + decodeURIComponent( place ))
      .accept('json')
      .end((err, res) => {
        let results = res.body || [];

        self.trigger({
          place: place,
          spots: results.slice(0,1)
        });
    });
  }

});

