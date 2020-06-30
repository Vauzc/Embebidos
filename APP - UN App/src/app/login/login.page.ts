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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // @ViewChild('signupSlider') signupSlider;
  Day: string;
  hor: boolean;
  Hin: number;
  Hfin: number;


  i = 0;
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public submitAttempt: boolean = false;
  public moutput:string='';

  constructor(private _mqttService: MqttService, private modalCtrl: ModalController, public formBuilder: FormBuilder,
    private toastController: ToastController, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
    private storage: Storage, private navCtrl: NavController) {
    this.slideOneForm = formBuilder.group({
      Nombre: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      Apellido: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.required])],
      Usuario: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      Avance: ['', Validators.compose([AvanceValidator.isValid, Validators.required])],
      PAPA: ['', Validators.compose([PAPAValidator.isValid, Validators.required])],
      Facultad: ['', Validators.required],
      Carrera: ['', Validators.required],
      Materias: ['', Validators.required]
    });

  }

  async test(a) {
    console.log("prueba")
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
  limitar(){
    if(this.slideOneForm.valid && (this.Horario.length>0)){
      return false
    }else{
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
      Usuario: this.slideOneForm.value.Usuario,
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

    for(var j=0;j<Data.Materias.length;j++){
      this.moutput=this.moutput+Data.Materias[j][0]+'$'+Data.Materias[j][1]+';';
    }
    this.moutput = this.moutput.slice(0, -1)
    this._mqttService.unsafePublish('/TIUN/app/registro/' + CODMQTT + '/ask', '{"user": "' + Data.Usuario + '","nombre":"'+Data.Nombre+ '","apellido":"'+Data.Apellido+ '","avance":'+Data.Avance+ ',"papa":'+Data.PAPA+ ',"facultad":"'+Data.Facultad+ '","carrera":"'+Data.Carrera+ '","materias":"'+this.moutput+'"}', { qos: 0, retain: false });
    this._mqttService.observe('/TIUN/app/registro/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
      if (message.payload.toString() == "Ok") {
        this.storage.set(Nom_usu, Data.Nombre);
        this.storage.set(Ap_usu, Data.Apellido);
        this.storage.set(Avance, Data.Avance);
        this.storage.set(PAPA, Data.PAPA);
        this.storage.set(Fac_usu, Data.Facultad);
        this.storage.set(Carr_usu, Data.Carrera);
        this.storage.set(Mat_usu, this.moutput);
        this.storage.set(Usu, Data.Usuario);
        console.log("Auxilio")
        this.navCtrl.navigateForward(['/tab2']);
      }
      else if (message.payload.toString() == "U") { 
        alert.present();
      }
    });

  }

0

  ///HORARIO

  public Horario = [];
  event = {
    title: ''
  };

  ngOnInit() {


  }


  // Create the right event format and reload source
  addEvent(item,item2) {
    if (this.Horario.length > 0) {
      for (var j = 0; j < this.Horario.length; j++) {
        if (item == this.Horario[j][0]) {
          break
        } else if (j == this.Horario.length - 1) {
          this.Horario.push([item,item2]);
          this.i++;
          this.test("Materia añadida")
          break
        }
      }
    } else {
      this.Horario.push([item,item2]);
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