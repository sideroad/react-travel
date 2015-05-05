'use strict';

import Marty  from 'marty';
import config from '../config';


class UserAPI extends Marty.HttpStateSource {
  take() {
    return this.get({
      url: '/account'
    });
  }
}
export default Marty.register(UserAPI);
