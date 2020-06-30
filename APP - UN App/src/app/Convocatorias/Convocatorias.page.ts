import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { convocatorias } from '../tab2/tab2.page';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";

@Component({
  selector: 'app-Convocatorias',
  templateUrl: './Convocatorias.page.html',
  styleUrls: ['./Convocatorias.page.scss'],
})
export class ConvocatoriasPage implements OnInit {
  constructor(private modalCtrl : ModalController,private browser : InAppBrowser,private storage: Storage,) { }
  Convocatorias:any=convocatorias;
  ngOnInit() {
  }

  cerrar(){
    this.modalCtrl.dismiss()
  }
  validar(i){
    let output=true;
    if(i==null||i==undefined){
      output=false;
      return output;
    }
    let input=i.toString();
    if(input==("null")||input==("undefined")){
      output=false;
    }
    return output;
  }
  openUrl (url: string){
    const link=url
    this.browser.create(link, '_self')
  }
  
}
