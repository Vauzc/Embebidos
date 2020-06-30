import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvanceValidator } from '../validators/por_avance';
import { PAPAValidator } from '../validators/papa';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';

var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";

var CODMQTT = Math.random();

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  Day: string;
  hor: boolean;
  Hin: number;
  Hfin: number;


  i = 0;
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public submitAttempt: boolean = false;
  public moutput: string = '';

  constructor(private _mqttService: MqttService, private modalCtrl: ModalController, public formBuilder: FormBuilder,
    private toastController: ToastController, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
    private storage: Storage, private navCtrl: NavController) {


    this.slideOneForm = formBuilder.group({
      Nombre: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.required])],
      Apellido: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.required])],
      Avance: ['', Validators.compose([AvanceValidator.isValid, Validators.required])],
      PAPA: ['', Validators.compose([PAPAValidator.isValid, Validators.required])],
      Facultad: ['', Validators.required],
      Carrera: ['', Validators.required],
      Materias: ['']
    });
      
  }

  async test(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1200,
      position: 'bottom',
    });
    toast.present();
  }

  Fac() {
    return this.slideOneForm.value.Facultad
  }
  Hor_inicio() {
    return this.slideTwoForm.value.Hora_in
  }
  Carr() {
    if (this.slideOneForm.value.Carrera == null || this.slideOneForm.value.Carrera == undefined || this.slideOneForm.value.Carrera == '') {
      return false
    } else {
      return true
    }
  }
  

  valido() {
    if (this.i > 1) {

      return true
    } else {
      return false
    }
  }

  limitar(){
    if(this.slideOneForm.valid && (this.Horario.length>0)){
      return false
    }else{
      return true
    }
  }

  async Borrar(item) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar esta materia?',
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
            this.Horario.splice(this.Horario.lastIndexOf(item), 1);
            this.i--;

          }
        }
      ]
    });

    alert.present();

  }

  async save() {
    var Data = {
      Nombre: this.slideOneForm.value.Nombre,
      Apellido: this.slideOneForm.value.Apellido,
      Avance: this.slideOneForm.value.Avance,
      PAPA: this.slideOneForm.value.PAPA,
      Facultad: this.slideOneForm.value.Facultad,
      Carrera: this.slideOneForm.value.Carrera,
      Materias: this.Horario
    }
    const alert = await this.alertCtrl.create({
      header: 'Usuario Existente',
      message: 'Intente registrarse con otro usuario o iniciar sesión',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Iniciar sesión',
          handler: () => {
            this.navCtrl.navigateForward(['/ingreso']);

          }
        }
      ]
    });
    for (var j = 0; j < Data.Materias.length; j++) {
      this.moutput = this.moutput + Data.Materias[j][0] + '$' + Data.Materias[j][1] + ';';
    }
    this.moutput = this.moutput.slice(0, -1)


    this.storage.get(Usu).then((val1) => {
      this._mqttService.unsafePublish('/TIUN/app/usuario/actualizar/' + CODMQTT + '/ask', '{"user": "' + val1 + '","nombre":"' + Data.Nombre + '","apellido":"' + Data.Apellido + '","avance":' + Data.Avance + ',"papa":' + Data.PAPA + ',"facultad":"' + Data.Facultad + '","carrera":"' + Data.Carrera + '","materias":"' + this.moutput + '"}', { qos: 0, retain: false });
    })
    this._mqttService.observe('/TIUN/app/usuario/actualizar/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.payload.toString() == "Ok") {
        this.storage.set(Nom_usu, Data.Nombre);
        this.storage.set(Ap_usu, Data.Apellido);
        this.storage.set(Avance, Data.Avance);
        this.storage.set(PAPA, Data.PAPA);
        this.storage.set(Fac_usu, Data.Facultad);
        this.storage.set(Carr_usu, Data.Carrera);
        this.storage.set(Mat_usu, this.moutput);
        console.log(Data)
        this.test("Usuario actualizado")
        this.navCtrl.navigateForward(['/tab2']);
      }
      else if (message.payload.toString() == "U") {
        alert.present();
      }
    });

  }

  ///HORARIO
  Perfil_acad: any;
  temporal1: any;
  salida: String;
  Nom: String;
  Ap: String;
  Avance_usu: String;
  PAPA_usu: String;
  Carre: String;
  Facu: String;
  public Mat: any;
  aux="";
  public Horario = [];
  event = { 
    title: ''
  };

  ngOnInit() {
    this.storage.get(Nom_usu).then((val1) => {
      this.storage.get(Ap_usu).then((val2) => {
        this.storage.get(Avance).then((val3) => {
          this.storage.get(PAPA).then((val4) => {
            this.storage.get(Carr_usu).then((val5) => {
              this.storage.get(Fac_usu).then((val6) => {
                this.storage.get(Mat_usu).then((val7) => {
                  for(var mat=0;mat<val7.split(';').length ;mat++){
                    this.aux+=val7.split(';')[mat].split('$')[0]+";";
                    this.Horario.push([val7.split(';')[mat].split('$')[0], val7.split(';')[mat].split('$')[1]]);
                  }
                  this.aux=this.aux.slice(0,-1);

                  this.Nom = val1;
                  this.Ap = val2;
                  this.Avance_usu = val3;
                  this.Facu = val6;
                  this.Carre = val5;
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
                      this.Facu = mensaje[5];
                      this.Carre = mensaje[4];
                      this.PAPA_usu = mensaje[3];
                      this.Mat = (mensaje[6]).split(',');
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

  // Create the right event format and reload source
  addEvent(item, item2) {
    if (this.Horario.length > 0) {
      for (var j = 0; j < this.Horario.length; j++) {
        if (item == this.Horario[j][0]) {
          break
        } else if (j == this.Horario.length - 1) {
          this.Horario.push([item, item2]);
          this.i++;
          this.test("Materia añadida")
          break
        }
      }
    } else {
      this.Horario.push([item, item2]);
      this.test("Materia añadida")
      this.i++;
    }

  }

  /////////////Materias

  salida_m: string;
  materias: Array<any>;
  Materias() {
    if (this.slideOneForm.value.Materias.length >= 4) {
      this.salida_m = '[{"campo":"nombre","valor":' + '"%' + this.slideOneForm.value.Materias + '%"},{"campo":"carrera","valor":' + '"%' + this.slideOneForm.value.Carrera + '%","logic":"y"}]'
      this._mqttService.unsafePublish('/TIUN/app/materias/' + CODMQTT + '/ask', this.salida_m + '', { qos: 0, retain: false });
      this._mqttService.observe('/TIUN/app/materias/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
        var top = (message.topic.toString()).split('/');

        if (top[3] = "materias") {
          this.materias = (message.payload.toString()).split('%%');
          for (var h = 0; h < (this.materias.length); h++) {
            this.materias[h] = this.materias[h].split('$');
          }
          this.materias.pop();
        }
      })
    } else {
      this.materias = [];
    }
    console.log(this.materias)
  }

}
