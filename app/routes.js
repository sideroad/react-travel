'use strict';

import React    from 'react';
import App      from './components/App';
import Top      from './components/Top';
import Spot     from './components/Spot';
import {
  Route,
  DefaultRoute,
} from 'react-router';

export default (
    <Route name="app" handler={App} path="/" >
      <DefaultRoute name="top" handler={Top} />
      <Route name="spot" handler={Spot} path="/spot/:place" />
      <Route name="nearby" handler={Spot} path="/nearby/:lat/:lng/:types/:radius/:zoom" />
    </Route>
)
