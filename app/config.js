/* global navigator,window */
'use strict';

var env = typeof navigator !== 'undefined' && typeof window !== 'undefined' ? 'client' : 'server';

export default {
  LANG: env == 'client' ? 
            navigator.language || 'en' :
            'en',
  WEB_HOST: env == 'client' ?
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