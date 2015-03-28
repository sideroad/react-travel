'use strict';

import React     from 'react';
import Map       from './Map';
import Place     from './Place';
import Hotels    from './Hotels';

export default React.createClass({
  displayName: 'Top',
  render() {
    let style = {
      title: {
        fontFamily: "'Playfair Display SC', serif"
      }
    };
    return (
      <div>
        <header className="page-header">
          <h1 style={style.title}>TopPage</h1>
        </header>
        <div className="top-container"></div>
        <Map />
        <Place />
        <Hotels />
      </div>
    );
  }
});
