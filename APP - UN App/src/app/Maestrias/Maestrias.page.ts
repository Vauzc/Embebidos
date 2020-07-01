import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { posgrados } from '../tab2/tab2.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-Maestrias',
  templateUrl: './Maestrias.page.html',
  styleUrls: ['./Maestrias.page.scss'],
})
export class MaestriasPage implements OnInit {
  Posgrados:any=posgrados;
  Especializacion:Array<any>=[];
  Maestria:Array<any>=[];
  Doctorado:Array<any>=[];
  constructor(private modalCtrl : ModalController,private browser : InAppBrowser) { }

  ngOnInit() {
    if (this.Posgrados != null && this.Posgrados != undefined && this.Posgrados.lenght != 0 && this.Posgrados != []) {
    for(var h=0;h<this.Posgrados.length;h++){
        if(this.Posgrados[h][1]=="Especializacion"){
          this.Especializacion.push(this.Posgrados[h])
        }else if(this.Posgrados[h][1]=="Maestria"){
          this.Maestria.push(this.Posgrados[h])
        }else if(this.Posgrados[h][1]=="Doctorado"){
          this.Doctorado.push(this.Posgrados[h])
        }
    }
  }

  }



 
  validar(i){
    let output=true;
    if(i==null||i==undefined||i.length==0){
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