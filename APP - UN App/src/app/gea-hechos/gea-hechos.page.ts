import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {Platform} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//import {CODMQTT} from '../tab2/tab2.page';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

var CODMQTT = Math.random();

@Component({
  selector: 'app-gea-hechos',
  templateUrl: './gea-hechos.page.html',
  styleUrls: ['./gea-hechos.page.scss'],
})
export class GeaHechosPage implements OnInit {
	Reservas: Array<{cod:number,responsable: string,reserva:number,inicio:string,fin:string,activo:string,comentarios:string,materia:string,mesa:string}>=[];

	Conf: Array<{val:string,set:boolean}>=[];
	usersia:string;
    key:string = 'username';
  	constructor(private modalCtrl : ModalController, private toastController: ToastController, public platform:Platform,private _mqttService: MqttService, private storage: Storage) {  
	  	this._mqttService.observe('/TIUN/app/geap/+/'+CODMQTT+'/ans').subscribe((message: IMqttMessage) => 
	  	{
			if (message.topic.toString().split("/")[4] == "eliminar") {
				if (message.payload.toString() == "Ok") { 
					this.test("GEA eliminado"); 
					this.storage.get(this.key).then((val) => {
						this._mqttService.unsafePublish('/TIUN/app/geap/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
					});
				}
				else {
					this.test("Error al eliminar reserva");
				}
			}
			else{
				if(message.payload.toString()=="E"){this.test("Usuario vacío");}
				else if(message.payload.toString()=="U"){this.test("Usuario inexistente");}
				else if(message.payload.toString()=="R"){
					this.test("No hay grupos activos");
					this.Reservas=[];
				}
				else{
						var rp=message.payload.toString().split("$")
						var rp_2=rp[0].split(";")
						var rp_3;
						this.Reservas=[];
					for(var c=0;c<rp_2.length-1;c++){
							rp_3=rp_2[c].split(",");
						this.Reservas.push({
								cod:parseInt((rp_3)[0]),
								responsable:((rp_3)[1]),
								reserva:parseInt((rp_3)[2]), 
								inicio:((rp_3)[3]),
								fin:((rp_3)[4]),
								activo:((rp_3)[5]),
								comentarios:((rp_3)[6]),
								materia:((rp_3)[8]),
								mesa:((rp_3)[9])
							});
					}
					if(message.payload.toString().split("$")[1].toString()=="n"){
						this.Conf.push({val:"",set:false});
					}
					else{
						var confirmadas=message.payload.toString().split("$")[1].split(";");
						for(var cont=0;cont<confirmadas.length;cont++){
							this.Conf.push({val:"Mesa "+confirmadas[cont].toString()+" confirmada",
								set:true});
						}
					}
				}
		    }   
	    });
	}

	async test(a){
		const toast = await this.toastController.create({
		    message: a,
		    duration: 1200,
		    position: 'bottom',
		});
		toast.present();
	}

	ngOnInit(){
		this.storage.get(this.key).then((val) => {
			this._mqttService.unsafePublish('/TIUN/app/geap/miconsulta/'+CODMQTT+'/ask', val, {qos: 0, retain: false});
		});
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

	Eliminar(item) {
		var temp = item.cod;
		this.storage.get(this.key).then((val) => {
			this._mqttService.unsafePublish('/TIUN/app/geap/eliminar/' + CODMQTT + '/ask', '{"cod":' + temp + ',"nombre":"' + val + '"}', { qos: 0, retain: false });
		});
    }

	cerrar(){
		this.modalCtrl.dismiss()
	}
}
