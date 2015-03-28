'use strict';

import React     from 'react';
import Map       from './Map';
import Place     from './Place';
import Hotels    from './Hotels';

export default React.createClass({
  displayName: 'Top',
  render() {
    return (
      <div>
        <div className="top-container"></div>
        <Map />
        <Place />
        <Hotels />
        <div>Icons made by <a href="http://www.flaticon.com/authors/google" title="Google">Google</a>, <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
      </div>
    );
  }
});
