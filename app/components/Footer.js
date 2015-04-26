'use strict';

import React  from 'react';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'Footer',
  render() {
    return (
      <footer>
        <div className="well well-lg">
          <Link to="top">TOP</Link>&nbsp;|&nbsp;
          <a href="https://github.com/sideroad/react-travel/">github</a>
        </div>
      </footer>
    );
  }
});
