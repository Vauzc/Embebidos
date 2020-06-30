import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from "@ionic/angular";
import { Platform } from '@ionic/angular';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';

import { Storage } from '@ionic/storage';
var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";
declare var google;
var CODMQTT = Math.random();

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private alertCtrl: AlertController, private storage: Storage, private _mqttService: MqttService, private navCtrl: NavController, public platform: Platform) {
    console.log("mundo")
  }

  Perfil_acad: any;
  temporal1: any;
  salida: String;
  Nom: String;
  Ap: String;
  Avance_usu: String;
  PAPA_usu: String;
  Carr: String;
  Fac: String;
  Mat: any;
  aux="";
  ngOnInit() {}
  Cargar() {
    this.aux="";
    this.storage.get(Nom_usu).then((val1) => {
      this.storage.get(Ap_usu).then((val2) => {
        this.storage.get(Avance).then((val3) => {
          this.storage.get(PAPA).then((val4) => {
            this.storage.get(Carr_usu).then((val5) => {
              this.storage.get(Fac_usu).then((val6) => {
                this.storage.get(Mat_usu).then((val7) => {
                  for(var mat=0;mat<val7.split(';').length ;mat++){
                    this.aux+=val7.split(';')[mat].split('$')[0]+";";
                  }
                  this.aux=this.aux.slice(0,-1);

                  this.Nom = val1;
                  this.Ap = val2;
                  this.Avance_usu = val3;
                  this.Fac = val6;
                  this.Carr = val5;
                  this.PAPA_usu = val4;
                  this.Mat = this.aux.split(';');
                  if(this.aux.split(';')[0]==""){
                    this.Mat=[];
                  }

                  console.log(this.Nom+" ."+this.Mat+".");
                  /*this._mqttService.unsafePublish('/TIUN/app/espejo/' + CODMQTT + '/ask', val1 + '$' + val2 + '$' + val3 + '$' + val4 + '$' + val5 + '$' + val6 + '$' + this.aux, { qos: 0, retain: false });
                  this._mqttService.observe('/TIUN/app/espejo/' + CODMQTT + '/ans').subscribe(async (message: IMqttMessage) => {
                    var top = (message.topic.toString()).split('/');
                    if (top[3] = "espejo") {
                      var mensaje = (message.payload.toString()).split('$');
                      this.Nom = mensaje[0];
                      this.Ap = mensaje[1];
                      this.Avance_usu = mensaje[2];
                      this.Fac = mensaje[5];
                      this.Carr = mensaje[4];
                      this.PAPA_usu = mensaje[3];
                      this.Mat = (mensaje[6]).split(';');
                    }
                  })*/
                })
              })
            })
          })
        })
      })
    })
  }

  async act() {
    const alert = await this.alertCtrl.create({
      header: 'Actualizar información',
      message: '¿Deseas actualizar tu información?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.navCtrl.navigateForward(['/actualizar']);
          }
        }
      ]
    });

    alert.present();
  }

  ionViewDidEnter() {
    this.Cargar();
  }
  
}