import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public navCtrl: NavController, public _ubicacionProv:UbicacionProvider) {

    this._ubicacionProv.iniciarGeolocalizacion();

  }

}
