import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {Platform} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

var CODMQTT = Math.random();

@Component({
  selector: 'app-Disponibilidad',
  templateUrl: './Disponibilidad.page.html',
  styleUrls: ['./Disponibilidad.page.scss'],
})
export class DisponibilidadPage implements OnInit{
  Mesas: string;

  constructor(public loadingController: LoadingController, private modalCtrl : ModalController, public platform:Platform,private _mqttService: MqttService,private toastController: ToastController) {
    this.presentLoading();
    this._mqttService.observe('/TIUN/app/reservas/Actualizar/ans').subscribe((message: IMqttMessage) => 
  	{
      this.Mesas=message.payload.toString();
      document.getElementById("tabla").innerHTML=this.Mesas;
  	});
  	
  }

  //////////////////////////////////////////////////////////////////////////////
  ngOnInit(){
    this._mqttService.unsafePublish('/TIUN/app/reservas/Actualizar/ask', "", {qos: 0, retain: false});
  }


  async v(){
    const toast = await this.toastController.create({
        message: this.Mesas,
        duration: 1200,
        position: 'bottom',
      });
      toast.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere un momento...',
      duration: 3500,
      spinner:  "circular",
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


}
