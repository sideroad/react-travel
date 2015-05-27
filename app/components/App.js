'use strict';

import React          from 'react';
import {RouteHandler} from 'react-router';
import UserStore      from '../stores/UserStore';

export default React.createClass({
  displayName: 'App',

  componentWillMount() {
    UserStore.receive(this.props.user);
  },

  render() {
    return (
        <RouteHandler />
    );
  }
});
