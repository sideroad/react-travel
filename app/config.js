/* global navigator */
'use strict';

export default {
  LANG: typeof navigator !== 'undefined' ? navigator.language : 'en',
  API_HOST: 'https://react-travel-api.herokuapp.com',
  LEFT_BY: [
    'driving',
    'walking',
    'bicycling',
    'transit'
  ],
  GOOGLE_API_KEY: 'AIzaSyCAMFUPXk_xra48EVWuAWEuqmfGowdrMGc'
};