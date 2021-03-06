'use strict';

import ItineraryAction from '../actions/ItineraryAction';
import Marty           from 'marty';
import UserStore       from '../stores/UserStore';
import React           from 'react';
import Router          from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';



class SpotDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: props.showDetail
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      showDetail: props.showDetail
    });
  }

  add(e) {
    e.preventDefault();
    ItineraryAction.add(this.props.user, this.props.spot);
  }

  close(e){
    e.preventDefault();
    this.setState({
      showDetail: false
    });
  }

  render() {
    let spot = this.props.spot;
    let stars = [];
    let roundRating = Math.round(spot.rating);
    let style = {
      display: this.state.showDetail ? 'block' : 'none'
    };

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
      <div className="col-sm-4 col-md-4 pull-right rt-map-info" style={style} >
        <div className="thumbnail">
          <div className="rt-close-btn">
            <a href="#" onClick={this.close.bind(this)} ><span className="glyphicon glyphicon-remove"></span></a>
          </div>
          {img}
          <div className="caption clearfix">
            <h5 className="ellipsis">{title}</h5>
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
              <a href="#" onClick={this.add.bind(this)} className="btn btn-primary" role="button"><span className="glyphicon glyphicon-heart" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

SpotDetail.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Marty.createContainer(SpotDetail, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.take();
    }
  }
});



