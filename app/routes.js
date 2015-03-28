'use strict';

import React    from 'react';
import App      from './components/App';
import Top      from './components/Top';
import Hotels   from './components/Hotels';
import {
  Route,
  DefaultRoute,
} from 'react-router';

export default (
    <Route name="top" handler={App} path="/">
      <Route name="hotels"  handler={Hotels} />
      <DefaultRoute handler={Top} />
    </Route>
)
