'use strict';

import config      from '../config';
import Marty       from 'marty';
import constants   from '../constants';
import UserQueries from '../queries/UserQueries';
import _           from 'lodash';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);
    this.state.user = {};
    this.handlers = {
      receive: constants.USER_RECEIVE,
    };
  }

  take() {
    return this.fetch({
      id: 'user',
      locally() {
        return this.state.user;
      },
      remotely() {
        return UserQueries.for(this).take();
      }
    });
  }

  receive( user ) {
    this.setState({
      user: user
    });
  }

  hasLoggin(){
    return this.state.user.id ? true : false;
  }

}

export default Marty.register(UserStore);
