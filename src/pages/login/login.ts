import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  constructor( public navCtrl: NavController, 
               private alertCtrl: AlertController, 
               public LoadingCtrl: LoadingController,
               public _usuarioProv: UsuarioProvider ){

  }

  ionViewDidLoad() {
    this.slides.paginationType = "progress";
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput() {

    let alert = this.alertCtrl.create({
      title: 'Ingrese el usuario',
      inputs: [
        {
          name: 'codigo',
          placeholder: 'Código'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'},
        {
          text: 'Ingresar',
          handler: data => {
            this.verificarUsuario( data.codigo );
          }
        }
      ]
    });
    alert.present();
  }

  verificarUsuario( clave:string ){

    let loading = this.LoadingCtrl.create({
      content: "verificando"
    });

    loading.present();

    this._usuarioProv.verificaUsuario( clave )
      .then( existe => {
        
        loading.dismiss();
        
        if(existe){
          this.slides.lockSwipes(false);
          this.slides.freeMode = true;
          this.slides.slideNext()
          this.slides.lockSwipes(true);
          this.slides.freeMode = false;
        }else{
          this.alertCtrl.create({
            title: 'Usuario incorrecto',
            subTitle: 'Hable con el administrador o intentelo nuevamente.',
            buttons: ['Aceptar']
          }).present();

        }

      });

  }

  ingresar(){

    this.navCtrl.setRoot(HomePage);

  }

}
