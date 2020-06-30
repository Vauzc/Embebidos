import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//import { CODMQTT } from '../tab2/tab2.page';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

var CODMQTT = Math.random();

@Component({
	selector: 'app-ReservasHechas',
	templateUrl: './ReservasHechas.page.html',
	styleUrls: ['./ReservasHechas.page.scss'],
})
export class ReservasHechasPage implements OnInit {
	public Reservas: Array<{ cod: number, mesa: number, inicio: string, fin: string }> = [];
	Conf: Array<{ val: string, set: boolean }> = [];
	usersia:string;
    key:string = 'username';
	constructor(private modalCtrl: ModalController, private toastController: ToastController, public platform: Platform, private _mqttService: MqttService, private storage: Storage) {
		this._mqttService.observe('/TIUN/app/reservas/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
			if (message.topic.toString().split("/")[4] == "eliminar") {
				if (message.payload.toString() == "Ok") { 
					this.storage.get(this.key).then((val) => {this.usersia=val; });
					this.test("Reserva eliminada"); 
					this.storage.get(this.key).then((val) => {
						this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
					});
				}
				else {
					this.test("Error al eliminar reserva");
				}
			} else {
				if (message.payload.toString() == "E") { this.test("Usuario vacío"); }
				else if (message.payload.toString() == "U") { this.test("Usuario inexistente"); }
				else if (message.payload.toString() == "R") { 
					this.test("No hay Reservas para hoy"); 
					this.Reservas=[];
				}
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
			}
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


	ngOnInit() {
		this.storage.get(this.key).then((val) => {
			this._mqttService.unsafePublish('/TIUN/app/reservas/miconsulta/' + CODMQTT + '/ask', val, { qos: 0, retain: false });
		  });
	}


	cerrar() {
		this.modalCtrl.dismiss()
	}

	Eliminar(item) {
		var temp = item.cod;

		this.storage.get(this.key).then((val) => {
			this._mqttService.unsafePublish('/TIUN/app/reservas/eliminar/' + CODMQTT + '/ask', '{"cod":' + temp + ',"nombre":"' + val + '"}', { qos: 0, retain: false });
		});
		

	}

}
