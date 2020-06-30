import { Component, OnInit} from '@angular/core';
import { NavController } from "@ionic/angular";
import { ToastController } from '@ionic/angular';

var Usu: string = "username";
var Mat_usu: string = "Materias";

import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { Storage } from '@ionic/storage';

var CODMQTT = Math.random();


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  salida:String='[';
  materias: Array<any>=[];
  Conf: Array<{val:string,set:boolean}>=[];
  Reservas: Array<{cod:number,responsable: string,reserva:number,inicio:string,fin:string,activo:string,lugar:string,comentarios:string,materia:string,mesa:string}>=[];

  usuario: string;
  materia_G: string;
  coments: string = "";
  coments2:string="";
  crear: boolean = false;
  Hini: { numero: number, set: boolean } = { numero: 0, set: false };
  Hfin: Array<{ text: string, value: number, set: boolean }> = [{ text: "00:00", value: 0, set: false },
  { text: "01:00", value: 1, set: false },
  { text: "02:00", value: 2, set: false },
  { text: "03:00", value: 3, set: false },
  { text: "04:00", value: 4, set: false },
  { text: "05:00", value: 5, set: false },
  { text: "06:00", value: 6, set: false },
  { text: "07:00", value: 7, set: false },
  { text: "08:00", value: 8, set: false },
  { text: "09:00", value: 9, set: false },
  { text: "10:00", value: 10, set: false },
  { text: "11:00", value: 11, set: false },
  { text: "12:00", value: 12, set: false },
  { text: "13:00", value: 13, set: false },
  { text: "14:00", value: 14, set: false },
  { text: "15:00", value: 15, set: false },
  { text: "16:00", value: 16, set: false },
  { text: "17:00", value: 17, set: false },
  { text: "18:00", value: 18, set: false },
  { text: "19:00", value: 19, set: false },
  { text: "20:00", value: 20, set: false },
  { text: "21:00", value: 21, set: false },
  { text: "22:00", value: 22, set: false },
  { text: "23:00", value: 23, set: false }];
  Hfin1: { text: string, value: number, set: boolean } = { text: "00:00", value: 0, set: false };
  RMesa: any = "ninguna";
  Mesas: Array<number>;
  libres: Array<any>;
  geas:Array<any>;
  geaso:Array<any>=[];
  codR: number;
  codG: number;
  boolgea:Array<any>=[];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  prueba:string;
  usersia:string;
  key:string = 'username';
  constructor(private navCtrl: NavController , private _mqttService: MqttService, private toastController: ToastController, private storage: Storage) {
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
			else if(message.topic.toString().split("/")[4] == "miconsulta"){
        this.Reservas=[];
				if(message.payload.toString()=="E"){this.test("Usuario vacío");}
				else if(message.payload.toString()=="U"){this.test("Usuario inexistente");}
				else if(message.payload.toString()=="R"){
					this.test("No hay grupos activos");}
				else{
						var rp=message.payload.toString().split("$")
						var rp_2=rp[0].split(";")
            var rp_3;
            var rp_4;
						this.Reservas=[];
					for(var c=0;c<rp_2.length-1;c++){
              this.boolgea.push(false);
              rp_3=rp_2[c].split("¬");
              rp_4=((rp_3)[6]).split("^")
						this.Reservas.push({
								cod:parseInt((rp_3)[0]),
								responsable:((rp_3)[1]),
								reserva:parseInt((rp_3)[2]), 
								inicio:((rp_3)[3]),
								fin:((rp_3)[4]),
                activo:((rp_3)[5]),
                lugar:((rp_4)[0]),
								comentarios:((rp_4)[1]),
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
      
      this._mqttService.observe('/TIUN/app/+/+/' + CODMQTT + '/ans').subscribe((message: IMqttMessage) => {
        if (message.topic.toString() == "/TIUN/app/reservas/consulta/" + CODMQTT + "/ans") {
          this.libres = ("ninguna," + message.payload.toString()).split(',');
          this.libres.pop();
        }
        else if (message.topic.toString() == "/TIUN/app/reservas/reservar/" + CODMQTT + "/ans") {
          if (message.payload.toString() != "err") {
            this.codR = parseInt(message.payload.toString());
            this.ReservaV(this.codR);
          }
          else {
            this.codR = -1;
            this.ReservaV(-1);
          }
        }
        else if (message.topic.toString() == "/TIUN/app/geap/crear/" + CODMQTT + "/ans") {
          if (message.payload.toString() != "err") {
            this.codG = parseInt(message.payload.toString());
            this.creacionV(this.codG);
          }
          else {
            this.codG = -1;
            this.creacionV(-1);
          }
        }
      });
  }

  async test(a){
		const toast = await this.toastController.create({
		    message: a,
		    duration: 1200,
		    position: 'middle',
		});
		toast.present();
  }
  ngOnInit(){}

  Cargar(){
    var temp;
    this.materias=[];
    this.storage.get(Mat_usu).then((valmat) => {
      for(var h=0;h<valmat.split(';').length;h++){
        this.salida=this.salida+'"'+ valmat.split(';')[h].split('$')[0] +'",'
      }
      this.salida=this.salida.slice(0,-1)+']'
      this._mqttService.unsafePublish('/TIUN/app/geap/consulta/'+CODMQTT+'/ask', this.salida+"", {qos: 0, retain: false});
      this._mqttService.observe('/TIUN/app/geap/consulta/'+CODMQTT+'/ans').subscribe((message: IMqttMessage) => 
	  	{
			if (message.topic.toString().split("/")[4] == "consulta") {
        this.geas=message.payload.toString().split(";")
        for(var c=0;c<this.geas.length;c++){
          this.geas[c]=this.geas[c].split("¬")
        }
        this.storage.get(Usu).then((valmat2) => {
          for(var c=0;c<this.geas.length;c++){
            temp=this.geas[c][6].split("^");
            if(valmat2!=this.geas[c][1]){
              this.geaso.push({
                fac:this.geas[c][10],
                mat:this.geas[c][8],
                Hini:this.geas[c][3],
                Hfin:this.geas[c][4],
                lug:temp[0],
                com:temp[1],
                res:this.geas[c][1]
              })
            }
          }
        })
      }
      this.salida='[';
      });
      var valma=valmat.split(';');
      var valm;
      for(var c = 0;c<valmat.length;c++){
        valm=valma[c].split('$');
        this.materias.push({"text":valm[0],"value":valm[1],"set":false})
      }
    });
    this.storage.get(this.key).then((val) => {
			this._mqttService.unsafePublish('/TIUN/app/geap/miconsulta/'+CODMQTT+'/ask', val, {qos: 0, retain: false});
    });
    this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', "{}", { qos: 0, retain: false });

  }

  validar(i){
    let output=true;
    if(i==null||i==undefined||i.length==0){
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
    this.Actualizarres();
  }

  async Confirmacion() {
      //this.RMesa=this.Mesas[this.IMesa];
      if (this.RMesa != "ninguna") {
        this.storage.get(Usu).then((val1) => {
          this._mqttService.unsafePublish('/TIUN/app/reservas/reservar/' + CODMQTT + '/ask', '{"nombre": "' + val1 + '", "mesa":' + this.RMesa + ',"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });
        })
        const toast = await this.toastController.create({
          message: "reservando mesa " + this.RMesa,
          duration: 2000,
          position: 'middle',
        });
        toast.present();
      }
      else {
        this.codR = -1;
        this.creacion();
      }
      
  }
  
  validate(i) {
      (this.Hini).set = true;
      (this.Hfin1).value = 0;
  
      for (var c = 0; c < 24; c++) {
        (this.Hfin[c]).set = false;
      }
      if (parseFloat(i) + 1 < 24) {
        (this.Hfin[parseFloat(i) + 1]).set = true;
      }
      else {
        (this.Hfin[0]).set = true;
      }
      if (parseFloat(i) + 2 < 24) {
        (this.Hfin[parseFloat(i) + 2]).set = true;
      }
      else {
        (this.Hfin[0]).set = true;
      }
  }
  
    validate2() {
      (this.Hfin1).set = true;
      if (this.Hfin1.value == 0) { this.Hfin1.value = 24; }
      this._mqttService.unsafePublish('/TIUN/app/reservas/consulta/' + CODMQTT + '/ask', '{"inicio":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + '}', { qos: 0, retain: false });
  
    }
  
    Ajuste(a) {
      this.RMesa = a;
    }
  
    async ReservaV(a) {
      var text;
      if (a == -1) { text = "Reserva de mesa fallida, intente nuevamente"; }
      else { text = 'Felicitaciones, la mesa ' + this.RMesa + ' se ha reservado correctamente'; }
      this.Cargar();
      const toast = await this.toastController.create({
        message: text,
        duration: 2000,
        position: 'middle',
      });
      toast.present();
      if (a != -1) {
        this.creacion();
      }
    }
  
    creacion() {
      var a;
      if (this.codR == -1) { a = '"n"'; }
      else { a = this.codR; }
      this.storage.get(Usu).then((val1) => {
        this._mqttService.unsafePublish('/TIUN/app/geap/crear/' + CODMQTT + '/ask', '{"Responsable":"' + val1 + '","Reserva":' + a + ',"ini":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + ',"act":0,"comment":"' + this.coments +'^'+ this.coments2 + '","materia":"' + this.materia_G + '"}', { qos: 0, retain: false });
      })
      this.Actualizarres();
    }
  
    async creacionV(a) {
      var text;
      if (a == -1) {
         text = "Creacion de gea fallida, intente nuevamente"; 
        }    else { 
          text = 'Felicitaciones, su grupo de estudio se ha creado correctamente'; 
          // this.navCtrl.navigateForward(['/tab2']);
          // this.storage.get(Usu).then((val1) => {
          //   this._mqttService.unsafePublish('/TIUN/app/geap/crear/' + CODMQTT + '/ask', '{"Responsable":"' + val1 + '","Reserva":' + a + ',"ini":' + this.Hini.numero + ',"fin":' + this.Hfin1.value + ',"act":0,"comment":"' + this.coments +'^'+ this.coments2 + '","materia":"' + this.materia_G + '"}', { qos: 0, retain: false });
          // })
          this.Actualizarres();
        }
  
      const toast = await this.toastController.create({
        message: text,
        duration: 2000,
        position: 'middle',
      });
      toast.present();
    }
    validarcrear() {
      if (this.coments != undefined && this.coments != null && this.coments != '' && this.Hini.numero != undefined && this.Hini.numero != null && this.Hfin1.value != undefined && this.Hfin1.value != null && this.Hfin1.value != 0 && this.materia_G != undefined && this.materia_G != null) {
        this.crear = false;
      } else {
        this.crear = true;
      }
      return this.crear
    }



    Actualizarres(){
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
			else if (message.topic.toString().split("/")[4] == "miconsulta") {
        this.Reservas=[];
				if(message.payload.toString()=="E"){this.test("Usuario vacío");}
				else if(message.payload.toString()=="U"){this.test("Usuario inexistente");}
				else if(message.payload.toString()=="R"){
					this.test("No hay grupos activos");
				}
				else{
						var rp=message.payload.toString().split("$")
						var rp_2=rp[0].split(";")
            var rp_3;
            var rp_4;
						this.Reservas=[];
					for(var c=0;c<rp_2.length-1;c++){
              rp_3=rp_2[c].split("¬");
              rp_4=((rp_3)[6]).split("^")
						this.Reservas.push({
								cod:parseInt((rp_3)[0]),
								responsable:((rp_3)[1]),
								reserva:parseInt((rp_3)[2]), 
								inicio:((rp_3)[3]),
								fin:((rp_3)[4]),
                activo:((rp_3)[5]),
                lugar:((rp_4)[0]),
								comentarios:((rp_4)[1]),
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
      this.Cargar();
    }
  
    ionViewDidEnter() {
      this.Cargar();
    }

    validarGeas(item){
      var bool=true;
      if(item==null||item==undefined||item.length==0){
        bool=false;
      }
      return bool;
    }
    valgeas(item){
      this.boolgea[item]=!this.boolgea[item]
    }
}