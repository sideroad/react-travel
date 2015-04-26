'use stgict';

export default {
  get(params){
    let nearby = {};

    for( let key in params) {
      if(params[key] !== 'undefined' || !params[key]) {
        nearby[key] = params[key];
      }
    }

    return {
      lat: Number(nearby.lat||35.681382),
      lng: Number(nearby.lng||139.766084),
      types: nearby.types,
      radius: Number(nearby.radius || 2000),
      zoom: Number(nearby.zoom || 15)
    };
  },
  radius(gm){
    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(gm.getBounds().getNorthEast(), gm.getBounds().getSouthWest()));
  },
  stringify(gm, types){
    let location = gm.getCenter();
    return [
      location.lat(), 
      location.lng(),
      types,
      this.radius(gm),
      gm.getZoom()
    ].join('/');
  }

};