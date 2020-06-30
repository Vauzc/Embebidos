import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

import { ReservasHechasPage } from '../ReservasHechas/ReservasHechas.page';
import { PopoverController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { USERDATA } from '../app.module';
import { Storage } from '@ionic/storage';

var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";


export var Tutorias: Array<any>;
export var convocatorias: any;
export var laboral: any;
export var posgrados: any;
export var materias: any;
export var gruposu: any;
var verificado = false;
var verificado_2 = false;
var verificado_3 = false;
var verificado_4 = false;
var verificado_5 = false;
var verificado_6 = false;
var contador = 0;
var contador1 = 0;
var CODMQTT = Math.random();

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  Reservas: Array<{ cod: number, mesa: number, inicio: string, fin: string }> = [];
  ReservasGEA: Array<{ cod: number, responsable: string, reserva: number, inicio: string, fin: string, activo: string, comentarios: string, materia: string, mesa: string }> = [];
  Conf: Array<{ val: string, set: boolean }> = [];
  inputtext: string;
  usersia: string;
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private menu: MenuController,
    private _mqttService: MqttService,
    public platform: Platform,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    private toastController: ToastController,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]

    };

    this._mqttService.observe('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      this.Reservas = [];
      if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
      else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
      else if (message.payload.toString() == "R") { this.test("No hay Reservas para hoy"); }
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
    });


    this._mqttService.observe('/TIUN/app/geap/miconsulta/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      this.ReservasGEA.length = 0;
      if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
      else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
      else if (message.payload.toString() == "R") { this.test("No hay grupos activos"); }
      else {
        var rp = message.payload.toString().split("$")
        var rp_2 = rp[0].split(";")
        var rp_3;
        this.ReservasGEA.length = 0;
        console.log(this.ReservasGEA.length)
        for (var c = 0; c < rp_2.length - 1; c++) {
          rp_3 = rp_2[c].split("¬");
          this.ReservasGEA.push({
            cod: parseInt((rp_3)[0]),
            responsable: ((rp_3)[1]),
            reserva: parseInt((rp_3)[2]),
            inicio: ((rp_3)[3]),
            fin: ((rp_3)[4]),
            activo: ((rp_3)[5]),
            comentarios: ((rp_3)[6]),
            materia: ((rp_3)[8]),
            mesa: ((rp_3)[9])
          });
        }
        console.log(this.ReservasGEA)
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
    });

  }
  salida: String = '[';
  salida_c: String = '[';
  salida_l: String = '[';
  salida_p: String = '[';
  salida_g: String = '[';
  ngOnInit(){
    
  }
  Inicio() {
    CODMQTT=Math.random();
    this.salida= '[';
    this.salida_c= '[';
    this.salida_l= '[';
    this.salida_p= '[';
    this.salida_g= '[';

    this.storage.get(Nom_usu).then((val) => {
      if (val == null || val == undefined || val == '') {
        this.navCtrl.navigateForward(['/home']); 
      } else {
        this.storage.get(Mat_usu).then((valmat) => {console.log(valmat)
          for (var h = 0; h < valmat.split(';').length; h++) {
            this.salida = this.salida + '{"campo":"materia","valor":"' + valmat.split(';')[h].split('$')[0] + '"},';
          }
          this.salida = this.salida.slice(0, -1) + ']';
          this._mqttService.unsafePublish('/TIUN/app/tutorias/' + CODMQTT + '/ask', this.salida + '', { qos: 0, retain: false });
          this._mqttService.observe('/TIUN/app/tutorias/' + CODMQTT + '/ans').subscribe(async (message: IMqttMessage) => {
            if (!verificado && message.payload.toString() != "err") {
              CODMQTT = parseInt(message.payload.toString());
              verificado = true;
            }
            var top = (message.topic.toString()).split('/');
            if (top[3] = "tutorias") {
              Tutorias = (message.payload.toString()).split('#');
              for (var h = 0; h < (Tutorias.length); h++) {
                if(Tutorias[h].length>0){
                  Tutorias[h] = Tutorias[h].split(';');
                }else{
                  Tutorias.splice(h,1);
                  console.log(Tutorias);
                  h--
                }
              }
              if(Tutorias.length>0){
                for (var h = 0; h < Tutorias.length; h++) {
                  Tutorias[h].pop();
                  for (var c = 0; c < Tutorias[h].length; c++) {
                    Tutorias[h][c] = Tutorias[h][c].split('$');
                  }
                }
              }else{
                Tutorias=null;
              }
            }
          })
        })
        this.storage.get(Fac_usu).then((valfac) => {
          this.salida_c = this.salida_c + '{"campo":"facultad","valor":"%' + valfac + '%"},'
          this.salida_c = this.salida_c.slice(0, -1) + ']'
          this._mqttService.unsafePublish('/TIUN/app/convocatorias/' + CODMQTT + '/ask', this.salida_c + '', { qos: 0, retain: false });
          this._mqttService.observe('/TIUN/app/convocatorias/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
            if (!verificado_2 && message.payload.toString() != "err") {
              CODMQTT = parseInt(message.payload.toString());
              verificado_2 = true;
              //alert(CODMQTT);
            }
            var top = (message.topic.toString()).split('/');
            if (top[3] = "convocatorias") {
              convocatorias = (message.payload.toString()).split(';');
              for (var h = 0; h < (convocatorias.length); h++) {
                convocatorias[h] = convocatorias[h].split('$');
              }
              convocatorias.pop();
            }
          })
        });
        this.storage.get(Avance).then((valava) => {
          var outfast;
          if(valava<=33){
            outfast="Tipo I"
          }else if(valava<=66){
            outfast="Tipo II"
          }else{
            outfast="Tipo III"
          }
          this.salida_l = this.salida_l + '{"campo":"avance","valor":"' + outfast + '"}]',
          this._mqttService.unsafePublish('/TIUN/app/laboral/' + CODMQTT + '/ask', this.salida_l + '', { qos: 0, retain: false });
          this._mqttService.observe('/TIUN/app/laboral/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
            if (!verificado_3 && message.payload.toString() != "err") {
              CODMQTT = parseInt(message.payload.toString());
              verificado_3 = true;
            }
            var top = (message.topic.toString()).split('/');
            if (top[3] = "laboral") {
              laboral = (message.payload.toString()).split(';');
              for (var h = 0; h < (laboral.length); h++) {
                laboral[h] = laboral[h].split('$');
              }
              laboral.pop();
            }
          })
        })
        this.storage.get(Fac_usu).then((valfac) => {
          this.salida_p = this.salida_p + '{"campo":"facultad","valor":"%' + valfac + '%"},'
          this.salida_p = this.salida_p.slice(0, -1) + ']'
          this._mqttService.unsafePublish('/TIUN/app/posgrados/' + CODMQTT + '/ask', this.salida_p + '', { qos: 0, retain: false });
          this._mqttService.observe('/TIUN/app/posgrados/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
            if (!verificado_4 && message.payload.toString() != "err") {
              CODMQTT = parseInt(message.payload.toString());
              verificado_4 = true;
              //alert(CODMQTT);
            }
            var top = (message.topic.toString()).split('/');
            if (top[3] = "posgrados") {
              posgrados = (message.payload.toString()).split(';');
              for (var h = 0; h < (posgrados.length); h++) {
                posgrados[h] = posgrados[h].split('$');
              }
              posgrados.pop();
            }
          })
        });
        this.storage.get(Fac_usu).then((valfac) => {
          this.salida_g = this.salida_g + '{"campo":"facultad","valor":"%' + valfac + '%"},'
          this.salida_g = this.salida_g.slice(0, -1) + ']'
          this._mqttService.unsafePublish('/TIUN/app/gruposu/' + CODMQTT + '/ask', this.salida_g + '', { qos: 0, retain: false });
          this._mqttService.observe('/TIUN/app/gruposu/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
            if (!verificado_6 && message.payload.toString() != "err") {
              CODMQTT = parseInt(message.payload.toString());
              verificado_6 = true;
              //alert(CODMQTT);
            }
            var top = (message.topic.toString()).split('/');
            if (top[3] = "gruposu") {
              gruposu = (message.payload.toString()).split(';');
              for (var h = 0; h < (gruposu.length); h++) {
                gruposu[h] = gruposu[h].split('$');
              }
              gruposu.pop();
            }
          })
        })

        //// YOO intentoNavcontroller
        this.storage.get(Usu).then((val2) => {
          this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val2, { qos: 0, retain: false });
          this._mqttService.unsafePublish('/TIUN/app/geap/miconsulta/' + CODMQTT + '/ask', val2, { qos: 0, retain: false });

        });


      }
    });

  }

  async salir(){
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Salida',
      message: '¿Estás seguro de que deseas salir de la aplicación?',
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
              this.storage.set(Nom_usu, '');
              this.storage.set(Ap_usu, '');
              this.storage.set(Usu, '');
              this.storage.set(Avance, '');
              this.storage.set(Carr_usu, '');
              this.storage.set(Fac_usu, '');
              this.storage.set(Mat_usu, '');
              this.storage.set(PAPA, '');
              this.navCtrl.navigateForward(['/home']); 
          }
        }
      ]
    });

    alert.present();
  }


  ////YO
  async test(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1200,
      position: 'bottom',
    });
  }

  Mesasreservadas() {
    var temp = 24;
    var tempindex;
    if (this.Reservas.length > 0) {
      for (var i = 0; i < this.Reservas.length; i++) {
        var temp2 = this.Reservas[i].inicio;
        if (temp > parseInt(temp2.split(":")[0], 10)) {
          temp = parseInt(temp2.split(":")[0], 10);
          tempindex = i;
        }
      }
      var Proxima = [this.Reservas[tempindex].mesa, this.Reservas[tempindex].inicio.split(":")[0] + ':' + this.Reservas[tempindex].inicio.split(":")[1], this.Reservas[tempindex].fin.split(":")[0] + ':' + this.Reservas[tempindex].fin.split(":")[1]]
      return Proxima
    } else{
      return 'No tienes mesas reservadas para hoy'
    }
  }

  GEA() {
    var tem = 24;
    var temindex;
    if (this.ReservasGEA.length > 0) {
      for (var i = 0; i < this.ReservasGEA.length; i++) {
        var tem2 = this.ReservasGEA[i].inicio;
        if (tem > parseInt(tem2.split(":")[0], 10)) {
          tem = parseInt(tem2.split(":")[0], 10);
          temindex = i;
        }
      }
      var Prox = [this.ReservasGEA[temindex].materia, this.ReservasGEA[temindex].inicio.split(":")[0] + ':' + this.ReservasGEA[temindex].inicio.split(":")[1], this.ReservasGEA[temindex].fin.split(":")[0] + ':' + this.ReservasGEA[temindex].fin.split(":")[1], this.ReservasGEA[temindex].comentarios.split("^")[0]]
      return Prox
    } else {
      return 'No'
    }
  }
  /////
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  listado = [
    {
      nombre: 'Perfil Académico',
      pag: 'PerfilPage',
      icono: 'school'
    }
  ]

  listado2 = [
    {
      nombre: 'Tutorias',
      pag: '',
      icono: 'trail-sign'
    }
  ]

  listado3 = [
    {
      nombre: 'Grupos',
      pag: '',
      icono: 'people'
    }
  ]

  listado4 = [
    {
      nombre: 'Convocatorias',
      pag: '',
      icono: 'pie-chart'
    }
  ]

  listado5 = [
    {
      nombre: 'Becas',
      pag: '',
      icono: 'rocket'
    }
  ]

  listado6 = [
    {
      nombre: 'Posgrados',
      pag: '',
      icono: 'ribbon'
    }
  ]

  listado7 = [
    {
      nombre: 'Pasantías y laboral',
      pag: '',
      icono: 'body-outline'
    }
  ]

  listado8 = [
    {
      nombre: 'Noticias y eventos',
      pag: '',
      icono: 'alert-outline'
    }
  ]

  listado9 = [
    {
      nombre: 'Acerca de la app',
      pag: 'AboutTheApp',
      icono: 'terminal-outline'
    }
  ]

  listado10 = [
    {
      nombre: 'Mi horario',
      pag: '',
      icono: 'alarm-outline'
    }
  ]


  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;

  slideOptsOne = {
    initialSlide: 1,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    autoplay: true,
    spaceBetween: 5
  };
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  saveData() {
    this.storage.set(Nom_usu, this.inputtext);
  }

  loadData() {
    this.storage.get(Nom_usu).then((val) => {
      console.log('Your username is', val);
    });
  }

   ionViewDidEnter() {
     this.Inicio();
     this.storage.get(Usu).then((val) => {
      this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
      this._mqttService.unsafePublish('/TIUN/app/geap/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
    });
    this._mqttService.observe('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      this.Reservas = [];
      if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
      else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
      else if (message.payload.toString() == "R") { this.test("No hay Reservas para hoy"); }
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
    });
    this._mqttService.observe('/TIUN/app/geap/miconsulta/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      this.ReservasGEA.length = 0;
      if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
      else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
      else if (message.payload.toString() == "R") { this.test("No hay grupos activos"); }
      else {
        var rp = message.payload.toString().split("$")
        var rp_2 = rp[0].split(";")
        var rp_3;
        this.ReservasGEA.length = 0;
        console.log(this.ReservasGEA.length)
        for (var c = 0; c < rp_2.length - 1; c++) {
          rp_3 = rp_2[c].split("¬");
          this.ReservasGEA.push({
            cod: parseInt((rp_3)[0]),
            responsable: ((rp_3)[1]),
            reserva: parseInt((rp_3)[2]),
            inicio: ((rp_3)[3]),
            fin: ((rp_3)[4]),
            activo: ((rp_3)[5]),
            comentarios: ((rp_3)[6]),
            materia: ((rp_3)[8]),
            mesa: ((rp_3)[9])
          });
        }
        console.log(this.ReservasGEA)
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
    });
     this.Mesasreservadas();
     this.GEA();
   }
   


}
