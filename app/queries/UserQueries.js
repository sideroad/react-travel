/* global location */
'use strict';

import config           from '../config';
import Marty            from 'marty';
import UserAPI     from '../sources/UserAPI';
import constants        from '../constants';

class UserQueries extends Marty.Queries {
  take() {
    return UserAPI.take()
      .then((res) => {
        this.dispatch(constants.USER_RECEIVE, res.body || []);
      })
      .catch(err => this.dispatch(constants.USER_RECEIVE_FAILED, err));
  }
}
export default Marty.register(UserQueries);
