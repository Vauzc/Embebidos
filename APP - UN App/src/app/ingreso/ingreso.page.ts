import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';

var CODMQTT = Math.random();
var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})

export class IngresoPage implements OnInit {
  public slideOneForm: FormGroup;
  constructor( private storage: Storage, private _mqttService: MqttService, private navCtrl: NavController, public formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.slideOneForm = formBuilder.group({
      User: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });

  }

  ngOnInit() {
  }

  async save() {
    console.log("soeihfr")
    const alert = await this.alertCtrl.create({
      header: 'Usuario Inexistente',
      message: 'El usuario que ha ingresado no existe',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    
    this._mqttService.unsafePublish('/TIUN/app/login/' + CODMQTT + '/ask', '{"user": "' + this.slideOneForm.value.User + '"}', { qos: 0, retain: false });
    this._mqttService.observe('/TIUN/app/login/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.payload.toString() != "U" && message.payload.toString() != "H") {
        var info = (message.payload.toString()).split('#');
        this.storage.set(Usu, info[0]);
        this.storage.set(Nom_usu, info[1]);
        this.storage.set(Ap_usu, info[2]);        
        this.storage.set(Avance, info[3]);
        this.storage.set(PAPA,info[4]);
        this.storage.set(Carr_usu, info[5]);
        this.storage.set(Fac_usu, info[6]);        
        this.storage.set(Mat_usu, info[7]);
        this.navCtrl.navigateForward(['/tab2']);
        
      } else {
         alert.present();
      }
    });

    
  }
}
