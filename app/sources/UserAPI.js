'use strict';

import Marty  from 'marty';
import config from '../config';


class UserAPI extends Marty.HttpStateSource {
  take() {
    return this.get({
      url: config.WEB_HOST + '/account'
    });
  }
}
export default Marty.register(UserAPI);
