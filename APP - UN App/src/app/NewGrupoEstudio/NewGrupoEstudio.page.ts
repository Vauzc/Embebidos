import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
declare var google;


import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';


var Usu: string = "username";
var Mat_usu: string = "Materias";
var CODMQTT = Math.random();

@Component({
  selector: 'app-NewGrupoEstudio',
  templateUrl: './NewGrupoEstudio.page.html',
  styleUrls: ['./NewGrupoEstudio.page.scss'],
})
export class NewGrupoEstudioPage implements OnInit {

  usuario: string;
  materias: Array<any> = [];
  materia_G: string;
  coments: string = "";
  crear: boolean = false;
  Hini: { numero: number, set: boolean } = { numero: 0, set: false };
  Hfin: Array<{ text: string, value: number, set: boolean }> = [{ text: "00:00", value: 0, set: false },
  { text: "01:00", value: 1, set: false },
  { text: "02:00", value: 2, set: false },
  { text: "03:00", value: 3, set: false },
  { text: "04:00", value: 4, set: false },
  { text: "05:00", value: 5, set: false },
  { text: "06:00", value: 6, set: false },
  { text: "07:00", value: 7, set: false },
  { text: "08:00", value: 8, set: false },
  { text: "09:00", value: 9, set: false },
  { text: "10:00", value: 10, set: false },
  { text: "11:00", value: 11, set: false },
  { text: "12:00", value: 12, set: false },
  { text: "13:00", value: 13, set: false },
  { text: "14:00", value: 14, set: false },
  { text: "15:00", value: 15, set: false },
  { text: "16:00", value: 16, set: false },
  { text: "17:00", value: 17, set: false },
  { text: "18:00", value: 18, set: false },
  { text: "19:00", value: 19, set: false },
  { text: "20:00", value: 20, set: false },
  { text: "21:00", value: 21, set: false },
  { text: "22:00", value: 22, set: false },
  { text: "23:00", value: 23, set: false }];
  Hfin1: { text: string, value: number, set: boolean } = { text: "00:00", value: 0, set: false };
  RMesa: any = "ninguna";
  Mesas: Array<number>;
  libres: Array<any>;
  codR: number;
  codG: number;

  constructor(private navCtrl: NavController , private _mqttService: MqttService, private toastController: ToastController, private storage: Storage) {
    this._mqttService.observe('/TIUN/app/+/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.topic.toString() == "/TIUN/app/reservas/consulta/" + CODMQTT + "/ans") {
        this.libres = ("ninguna," + message.payload.toString()).split(',');
        this.libres.pop();
      }
      else if (message.topic.toString() == "/TIUN/app/reservas/reservar/" + CODMQTT + "/ans") {
        if (message.payload.toString() != "err") {
          this.codR = parseInt(message.payload.toString());
          this.ReservaV(this.codR);
        }
        else {
          this.codR = -1;
          this.ReservaV(-1);
        }
      }
      else if (message.topic.toString() == "/TIUN/app/geap/crear/" + CODMQTT + "/ans") {
        if (message.payload.toString() != "err") {
          this.codG = parseInt(message.payload.toString());
          this.creacionV(this.codG);
        }
        else {
          this.codG = -1;
          this.creacionV(-1);
        }
      }
    });
  }

  ngOnInit() {

    this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', "{}", { qos: 0, retain: false });
    this.storage.get(Mat_usu).then((valmat) => {
      for (var c = 0; c < valmat.length; c++) {
        this.materias.push({ "text": (valmat[c])[0], "value": (valmat[c])[1], "set": false })
      }
    });
  }

  async Confirmacion() {
    //this.RMesa=this.Mesas[this.IMesa];
    if (this.RMesa != "ninguna") {
      this.storage.get(Usu).then((val1) => {
        this._mqttService.unsafePublish('/TIUN/app/reservas/reservar/' + CODMQTT + '/ask', '{"nombre": "' + val1 + '", "mesa":' + this.RMesa + ',"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });
      })
      const toast = await this.toastController.create({
        message: "reservando mesa " + this.RMesa,
        duration: 2000,
        position: 'middle',
      });
      toast.present();
    }
    else {
      this.codR = -1;
      this.creacion();
    }
    
  }

  validate(i) {
    (this.Hini).set = true;
    (this.Hfin1).value = 0;

    for (var c = 0; c < 24; c++) {
      (this.Hfin[c]).set = false;
    }
    if (parseFloat(i) + 1 < 24) {
      (this.Hfin[parseFloat(i) + 1]).set = true;
    }
    else {
      (this.Hfin[0]).set = true;
    }
    if (parseFloat(i) + 2 < 24) {
      (this.Hfin[parseFloat(i) + 2]).set = true;
    }
    else {
      (this.Hfin[0]).set = true;
    }
  }

  validate2() {
    (this.Hfin1).set = true;
    if (this.Hfin1.value == 0) { this.Hfin1.value = 24; }
    this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', '{"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });

  }

  Ajuste(a) {
    this.RMesa = a;
  }

  async ReservaV(a) {
    var text;
    if (a == -1) { text = "Reserva de mesa fallida, intente nuevamente"; }
    else { text = 'Felicitaciones, la mesa ' + this.RMesa + ' se ha reservado correctamente'; }

    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
    if (a != -1) {
      this.creacion();
    }
  }

  creacion() {
    var a;
    if (this.codR == -1) { a = '"n"'; }
    else { a = this.codR; }
    this.storage.get(Usu).then((val1) => {
      this._mqttService.unsafePublish('/TIUN/app/geap/crear/' + CODMQTT + '/ask', '{"Responsable":"' + val1 + '","Reserva":' + a + ',"ini":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + ',"act":0,"comment":"' + this.coments + '","materia":"' + this.materia_G + '"}', { qos: 0, retain: false });
    })
  }

  async creacionV(a) {
    var text;
    if (a == -1) {
       text = "creacion de gea fallida, intente nuevamente"; 
      }    else { 
        text = 'Felicitaciones, su grupo de estudio se ha creado correctamente'; 
        this.navCtrl.navigateForward(['/tab2']);
      }

    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  validarcrear() {
    if (this.usuario != undefined && this.usuario != null && this.usuario != "" && this.Hini.numero != undefined && this.Hini.numero != null && this.Hfin1.value != undefined && this.Hfin1.value != null && this.Hfin1.value != 0 && this.materia_G != undefined && this.materia_G != null) {
      this.crear = true;
    } else {
      this.crear = false;
    }
    return this.crear
  }

}
