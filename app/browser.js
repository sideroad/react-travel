'use strict';

import React    from 'react';
import Marty    from 'marty';
import Router   from 'react-router';
import routes   from './routes';

window.React = React;
window.Marty = Marty;

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler path={window.location.pathname} />, document);
});
