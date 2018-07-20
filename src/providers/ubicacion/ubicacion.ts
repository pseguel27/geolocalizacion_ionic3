import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class UbicacionProvider {

  constructor( public geolocation:Geolocation) {
    
  }

  iniciarGeolocalizacion(){

    this.geolocation.getCurrentPosition().then(( resp ) => {
      // resp.coords.latitude
      // resp.coords.longitude

      console.log( resp.coords );

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {

      console.log( 'whatch: ', data );
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

}
