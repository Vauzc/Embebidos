import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular"
import { gruposu } from '../tab2/tab2.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-GruposU',
  templateUrl: './GruposU.page.html',
  styleUrls: ['./GruposU.page.scss'],
})
export class GruposUPage implements OnInit{
  Gruposu:any=gruposu;
  constructor(private modalCtrl : ModalController,private browser : InAppBrowser) { }
  ngOnInit() {
  }
  validar(i){
    let output=true;
    if(i==null||i==undefined){
      output=false;
      return output;
    }
    let input=i.toString();
    if(input==("null")||input==("undefined")||input==("")){
      output=false;
    }
    return output;
  }
  openUrl (url: string){
    const link=url
    this.browser.create(link, '_self')
  }
}