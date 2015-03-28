'use strict';

import React  from 'react';
import HotelsStore    from '../stores/HotelsStore';

export default React.createClass({
  displayName: 'Hotels',
  getInitialState() {
    return {
      hotels: HotelsStore.getAll(),
    };
  },
  componentDidMount: function() {
    HotelsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    HotelsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ hotels: HotelsStore.getAll() });
  },
  render() {
    let style = {
      title: {
        fontFamily: "'Poiret One', cursive"
      }
    };

    let hotels = this.state.hotels.map( (hotel, index) => {
      return (
        <li className="list-group-item" key={index}>
          <span className="label label-info">{index+1}</span>
          <a href={hotel.basic.hotelInformationUrl} target="_blank"><span>{hotel.basic.hotelName}</span></a>
        </li>
      );
    });
    return (
      <ul className="list-group">
        {hotels}
      </ul>
    );
  }
});
