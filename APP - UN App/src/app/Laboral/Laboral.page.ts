import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular"
import { laboral } from '../tab2/tab2.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-Laboral',
  templateUrl: './Laboral.page.html',
  styleUrls: ['./Laboral.page.scss'],
})
export class LaboralPage implements OnInit {
  Laboral:any=laboral;
  constructor(private modalCtrl : ModalController,private browser : InAppBrowser) { }

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
