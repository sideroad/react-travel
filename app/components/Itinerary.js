'use strict';

import React           from 'react/addons';
import Marty           from 'Marty';
import Router          from 'react-router';
import ItineraryStore  from '../stores/ItineraryStore';
import ItineraryAction from '../actions/ItineraryAction';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

class Itinerary extends React.Component {
  remove(item) {
    ItineraryAction.remove(item);
  }

  render() {
    console.log(this.props.items);
    let items = this.props.items || [],
        $items = [],
        index = 0;

    for( let item of items) {
      let stars = [];
      let roundRating = Math.round(item.rating);

      for( let i of [1,2,3,4,5] ){
        if(roundRating >= i) {
          stars.push(<span className="glyphicon glyphicon-star" key={i} />);
        } else {
          stars.push(<span className="glyphicon glyphicon-star-empty" key={i} />);
        }
      }

      let img;
      if(item.photo) {
        img = (<img className="thumbnail" src={item.photo} alt={item.name} />);
      }

      let title = item.website ? (<a href={item.website} target="_blank" >{item.name}</a>) : (<span>{item.name}</span>);

      let key = item.id;

      $items.push(
        <div className="rt-item col-sm-6 col-md-3" key={key} > 
          <div className="thumbnail">
            {img}
            <div className="caption clearfix">
              <h4 className="ellipsis">{title}</h4>
              <p>
                <span className="stars">
                  {stars}
                </span>
                {item.rating}
              </p>
              <p className="form-inline">
                <label htmlFor="start-from1">Stay from</label> 
                <input type="datetime-local" className="from-control" id="start-from1" />
              </p>
              <p className="form-inline ">
                <div className="pull-left">
                  <select className="form-control">
                    <option>Drive</option>                    
                    <option>Walking</option>                    
                    <option>Transit</option>                    
                  </select>
                </div>
                <div className="pull-right">
                  <a href="#" className="btn btn-primary" role="button"><span className="glyphicon glyphicon-map-marker"></span></a>
                  <a href="#" onClick={this.remove.bind(this,item)} className="btn btn-primary" role="button"><span className="glyphicon glyphicon-trash"></span></a>
                </div>
              </p>
            </div>
          </div>
        </div>
      );
      index++;
    }

    return (
      <div className="container" role="main">
        <div className="rt-spots">
          <div className="row">
            {$items}
          </div>       
        </div>
      </div>      
    );
  }
};

export default Marty.createContainer(Itinerary, {
  listenTo: ItineraryStore,
  fetch: {
    items() {
      return ItineraryStore.for(this).getAll();
    }
  }
});



