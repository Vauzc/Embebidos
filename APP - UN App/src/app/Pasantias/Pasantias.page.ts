import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular"
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaboralPage } from '../Laboral/Laboral.page';


@Component({
  selector: 'app-Pasantias',
  templateUrl: './Pasantias.page.html',
  styleUrls: ['./Pasantias.page.scss'],
})
export class PasantiasPage implements OnInit {

  ngOnInit() {
  }

   constructor(private modalCtrl : ModalController, private browser : InAppBrowser) {} 
 

  listado = [
    {
      nombre: 'Laboral',
      pag:    'PerfilPage',
      icono:  'cash-outline'
    }
  ]

  listado2 = [
    {
      nombre: 'SPOPA',
      url: 'http://www.spopa.unal.edu.co',
      pag:    '',
      icono:  'people-circle-outline'
    }
  ]



  openLaboralPage(){
    this.modalCtrl.create({
      component : LaboralPage
    }).then(modal => modal.present())
  }

  openUrl (url: string){
    const link=url
    this.browser.create(link, '_self')
  }

  cerrar(){
    this.modalCtrl.dismiss()
  }

}
