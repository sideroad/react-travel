/* global navigator */
'use strict';

export default {
  LANG: typeof navigator !== 'undefined' ? navigator.language : 'en',
  WEB_HOST: typeof navigator !== 'undefined' ? 
            window.location.protocol + '//' + window.location.host : 
            'https://react-travel.herokuapp.com',
  API_HOST: 'https://react-travel-api.herokuapp.com',
  LEFT_BY: [
    'driving',
    'walking',
    'bicycling',
    'transit'
  ],
  GOOGLE_API_KEY: 'AIzaSyCAMFUPXk_xra48EVWuAWEuqmfGowdrMGc'
};