import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { DisponibilidadPage } from '../Disponibilidad/Disponibilidad.page';
import { ReservasHechasPage } from '../ReservasHechas/ReservasHechas.page';

var Usu: string = "username";
//import {CODMQTT} from '../tab2/tab2.page';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


var CODMQTT = Math.random();
var contador = 0;

@Component({
  selector: 'app-tabReservaMesas',
  templateUrl: 'tabReservaMesas.page.html',
  styleUrls: ['tabReservaMesas.page.scss']
})

export class TabReservaMesasPage implements OnInit {
  IMesa: number;
  RMesa;
  Rmeson;
  Mesas: Array<number>;
  Horario: string;

  libres: Array<any>;
  Hinicio: number;
  Hini: { numero: any, set: boolean } = { numero: 0, set: false };
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
  public Reservas: Array<{ cod: number, mesa: number, inicio: string, fin: string }> = [];
  public bool = false;
  public bool2 = false;
  Conf: Array<{ val: string, set: boolean }> = [];
  usersia: string;
  key: string = 'username';

  //////////////////////////////////////////////////////////////////////////////
  constructor(public platform: Platform, private toastController: ToastController,
    private modalCtrl: ModalController, private _mqttService: MqttService,
    private PickerController: PickerController, private storage: Storage) {

    this._mqttService.observe('/TIUN/app/reservas/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      var top = message.topic.toString().split('/');
      if (top[4] == "consulta") {
        this.libres = message.payload.toString().split(',');
        this.libres.pop();
      }
      else if (top[4] == "reservar") {
        if (message.payload.toString() != "err") {
          this.ReservaV(1);
        }
        else {
          this.ReservaV(0);
        }
      }
    });
    this.storage.get(this.key).then((val) => {
      this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
    });
    this._mqttService.observe('/TIUN/app/reservas/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.topic.toString().split("/")[4] == "eliminar") {
        if (message.payload.toString() == "Ok") {
          this.storage.get(this.key).then((val) => { this.usersia = val; });
          this.test("Reserva eliminada");
          this.storage.get(this.key).then((val) => {
            this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
          });
        }
        else {
          this.test("Error al eliminar reserva");
        }
      } else {
        if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
        else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
        else if (message.payload.toString() == "R") {
          this.test("No hay Reservas para hoy");
          this.Reservas = [];
        }
        else {
          var rp = message.payload.toString().split("$")[0].split(";");
          this.Reservas = [];
          for (var c = 0; c < rp.length - 1; c++) {
            this.Reservas.push({
              cod: parseInt(rp[c].split(",")[0]),
              mesa: parseInt(rp[c].split(",")[1]),
              inicio: rp[c].split(",")[2],
              fin: rp[c].split(",")[3]
            });
          }
          if (message.payload.toString().split("$")[1].toString() == "n") {
            this.Conf.push({ val: "", set: false });
          }
          else {
            var confirmadas = message.payload.toString().split("$")[1].split(";");
            for (var cont = 0; cont < confirmadas.length; cont++) {
              this.Conf.push({
                val: "Mesa " + confirmadas[cont].toString() + " confirmada",
                set: true
              });
            }
          }
        }
      }
    });


  }

  //////////////////////////////////////////////////////////////////////////////
  ngOnInit(){}
  Cargar() {
    this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', "{}", { qos: 0, retain: false });
    this.storage.get(this.key).then((val) => {
      this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
    });
    this._mqttService.observe('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.topic.toString().split("/")[4] == "eliminar") {
        if (message.payload.toString() == "Ok") {
          this.storage.get(this.key).then((val) => { this.usersia = val; });
          this.test("Reserva eliminada");
          this.storage.get(this.key).then((val) => {
            this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
          });
        }
        else {
          this.test("Error al eliminar reserva");
        }
      } else {
        if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
        else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
        else if (message.payload.toString() == "R") {
          this.test("No hay Reservas para hoy");
          this.Reservas = [];
        }
        else {
          var rp = message.payload.toString().split("$")[0].split(";");
          this.Reservas = [];
          for (var c = 0; c < rp.length - 1; c++) {
            this.Reservas.push({
              cod: parseInt(rp[c].split(",")[0]),
              mesa: parseInt(rp[c].split(",")[1]),
              inicio: rp[c].split(",")[2],
              fin: rp[c].split(",")[3]
            });
          }
          if (message.payload.toString().split("$")[1].toString() == "n") {
            this.Conf.push({ val: "", set: false });
          }
          else {
            var confirmadas = message.payload.toString().split("$")[1].split(";");
            for (var cont = 0; cont < confirmadas.length; cont++) {
              this.Conf.push({
                val: "Mesa " + confirmadas[cont].toString() + " confirmada",
                set: true
              });
            }
          }
        }
      }
    });

  }
  ionViewDidEnter() {
    this.Cargar();
  }


  //////////////////////////////////////////////////////////////////////////////
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
    this.bool2=true;
  }

  async validate3() {
    const toast = await this.toastController.create({
      message: 'Mesas actualizadas de ' + this.Hini.numero + ':00 a ' + this.Hfin1.value + ':00',
      duration: 1200,
      position: 'bottom',
    });
    toast.present();
    if (this.Hfin1.value == 0) { this.Hfin1.value = 24; }
    this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', '{"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });
    this.bool = true;
    console.log(this.Reservas)
  }


  //////////////////////////////////////////////////////////////////////////////
  async Reservar() {
    this.storage.get(this.key).then((val) => {
      this._mqttService.unsafePublish('/TIUN/app/reservas/reservar/' + CODMQTT + '/ask', '{"nombre": "' + val + '", "mesa":' + this.RMesa + ',"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });
    });
    const toast = await this.toastController.create({
      message: "reservando mesa " + this.RMesa,
      duration: 2000,
      position: 'middle',
    });
    toast.present();

  }

  Ajuste(a) {
    this.RMesa = a;
  }

  async ReservaV(a) {
    var text;
    if (a != 1) { text = "Reserva fallida, intente nuevamente"; }
    else {
      this.storage.get(this.key).then((val) => {
        this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
      });
      this.Actualizarres();
      text = 'Felicitaciones, la mesa ' + this.RMesa + ' se ha reservado correctamente';
      this.bool = false;
      this.bool2 = false;
      this.Hini.numero = '';
      this.Hfin1.value = null;
      
    }

    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  async test(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1200,
      position: 'middle',
    });
    toast.present();
  }


  Eliminar(item) {
    var temp = item.cod;
    this.storage.get(this.key).then((val) => {
      this._mqttService.unsafePublish('/TIUN/app/reservas/eliminar/' + CODMQTT + '/ask', '{"cod":' + temp + ',"nombre":"' + val + '"}', { qos: 0, retain: false });
    });
    console.log("borrar")
    this.Actualizarres();

  }

  Actualizarres() {
    this._mqttService.observe('/TIUN/app/reservas/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.topic.toString().split("/")[4] == "eliminar") {
        if (message.payload.toString() == "Ok") {
          this.storage.get(this.key).then((val) => { this.usersia = val; });
          this.test("Reserva eliminada");
          this.storage.get(this.key).then((val) => {
            this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
          });
        }
        else {
          this.test("Error al eliminar reserva");
        }
      } else {
        if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
        else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
        else if (message.payload.toString() == "R") {
          this.test("No hay Reservas para hoy");
          this.Reservas = [];
        }
        else {
          var rp = message.payload.toString().split("$")[0].split(";");
          this.Reservas = [];
          for (var c = 0; c < rp.length - 1; c++) {
            this.Reservas.push({
              cod: parseInt(rp[c].split(",")[0]),
              mesa: parseInt(rp[c].split(",")[1]),
              inicio: rp[c].split(",")[2],
              fin: rp[c].split(",")[3]
            });
          }
          if (message.payload.toString().split("$")[1].toString() == "n") {
            this.Conf.push({ val: "", set: false });
          }
          else {
            var confirmadas = message.payload.toString().split("$")[1].split(";");
            for (var cont = 0; cont < confirmadas.length; cont++) {
              this.Conf.push({
                val: "Mesa " + confirmadas[cont].toString() + " confirmada",
                set: true
              });
            }
          }
        }
      }
    });
  }

  Fin() {
    if (this.Rmeson != null) {
      return true
    } else {
      return false
    }
  }

  
}
