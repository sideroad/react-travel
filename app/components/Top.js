'use strict';

import React   from 'react';
import Navigation     from './Navigation';
import Place   from './Place';
import Impress from './Impress';
import Footer  from './Footer';

export default React.createClass({
  displayName: 'Top',

  contextTypes: {
    marty: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <Navigation />
        <Place />
        <Impress />
        <Footer />
      </div>
    );
  }
});
