'use strict';

import request        from 'superagent';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import AppConstants   from '../constants/AppConstants';

let ActionTypes = AppConstants.ActionTypes;

// TODO Loading
export default {
  fetchByPlace(place) {
    request.get(
      `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?format=json&datumType=1&latitude=${place.geometry.location.lat()}&longitude=${place.geometry.location.lng()}&applicationId=378f8bc5ce7c5ac5ff3621e61c637d67`,
      res => {
        let hotels = res.body.hotels || [];

        AppDispatcher.handleViewAction({
          type: ActionTypes.RECEIVE_HOTELS_BY_PLACE,
          hotels: hotels.map( ( hotel ) => {
            return {
              basic: hotel.hotel[0].hotelBasicInfo, 
              rating: hotel.hotel[1].hotelRatingInfo
            };
          })
        });
      }
    );
  }
};
