'use strict';

import React     from 'react';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';
import Actions from '../actions';

export default React.createClass({
  displayName: 'SpotDetail',

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  addItem(e) {
    e.preventDefault();
    Actions.addItem(this.props.spot);
  },

  render() {
    let spot = this.props.spot;
    let stars = [];
    let roundRating = Math.round(spot.rating);

    for( let i of [1,2,3,4,5] ){
      if(roundRating >= i) {
        stars.push(<span className="glyphicon glyphicon-star" key={i} />);
      } else {
        stars.push(<span className="glyphicon glyphicon-star-empty" key={i} />);
      }
    }

    let img;
    if(spot.photo) {
      img = (<img className="thumbnail" src={spot.photo} alt={spot.name} />);
    }

    let title = spot.website ? (<a href={spot.website} target="_blank" >{spot.name}</a>) : (<span>{spot.name}</span>);

    return (
      <div className="col-sm-6 col-md-4 pull-right rt-map-info">
        <div className="thumbnail">
          <div className="rt-close-btn">
            <a href="#"><span className="glyphicon glyphicon-remove"></span></a>
          </div>
          {img}
          <div className="caption clearfix">
            <h4 className="ellipsis">{title}</h4>
            <p>
              {spot.address}
            </p>
            <p>
              <span className="stars">
                {stars}
              </span>
              {spot.rating}
            </p>
            <div className="pull-right">
              <a href="#" onClick={this.addItem} className="btn btn-primary" role="button"><span className="glyphicon glyphicon-heart" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});



