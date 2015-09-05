'use strict';

import React           from 'react/addons';
import Marty           from 'marty';
import Router          from 'react-router';
import DateTimeField   from 'react-bootstrap-datetimepicker';
import ItineraryStore  from '../stores/ItineraryStore';
import UserStore  from '../stores/UserStore';
import ItineraryAction from '../actions/ItineraryAction';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

class Itinerary extends React.Component {
  remove(item) {
    ItineraryAction.remove(this.props.user, item);
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

      let dateId = item.id+'-date';
      let mapLink = "/spot/"+title;

      $items.push(
        <div className="rt-item col-sm-6 col-md-3" key={item.id} > 
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
                <DateTimeField />
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
                  <a href={mapLink} className="btn btn-primary" role="button"><span className="glyphicon glyphicon-map-marker"></span></a>
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
  listenTo: [ ItineraryStore, UserStore ],
  fetch: {
    items() {
      return ItineraryStore.for(this).getAll();
    },
    user() {
      return UserStore.for(this).take();
    }
  }
});



