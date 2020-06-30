import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Tutorias } from '../tab2/tab2.page';

@Component({
  selector: 'app-Tutorias',
  templateUrl: './Tutorias.page.html',
  styleUrls: ['./Tutorias.page.scss'],
})
export class TutoriasPage implements OnInit {
  slideOpts = {
    slidesPerView: 2,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  tutorias: any = Tutorias;
  public L: Array<any> = [];
  public M: Array<any> = [];
  public Mi: Array<any> = [];
  public J: Array<any> = [];
  public V: Array<any> = [];
  public S: Array<any> = [];
  public semana: Array<any> = [];
  public shMa: Array<any> = [];
  public shDi: Array<any> = [];
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
    if (this.tutorias != null && this.tutorias != undefined && this.tutorias.lenght != 0 && this.tutorias != []) {
      for (var c = 0; c < this.tutorias.length; c++) {
        this.L.push([]);
        this.shMa.push(false);
        this.shDi.push([false, false, false, false, false, false]);
        this.M.push([]);
        this.Mi.push([]);
        this.J.push([]);
        this.V.push([]);
        this.S.push([]);
        for (var v = 0; v < this.tutorias[c].length; v++) {
          if (this.tutorias[c][v][4] == "Lunes") {
            this.L[c].push(this.tutorias[c][v]);
          } else if (this.tutorias[c][v][3] == "Martes" || this.tutorias[c][v][4] == "Martes") {
            this.M[c].push(this.tutorias[c][v]);
          } else if (this.tutorias[c][v][3] == "Miercoles" || this.tutorias[c][v][4] == "Miercoles") {
            this.Mi[c].push(this.tutorias[c][v]);
          } else if (this.tutorias[c][v][3] == "Jueves" || this.tutorias[c][v][4] == "Jueves") {
            this.J[c].push(this.tutorias[c][v]);
          } else if (this.tutorias[c][v][3] == "Viernes" || this.tutorias[c][v][4] == "Viernes") {
            this.V[c].push(this.tutorias[c][v]);
          } else if (this.tutorias[c][v][3] == "Sabado" || this.tutorias[c][v][4] == "Sabado") {
            this.S[c].push(this.tutorias[c][v]);
          }
        }
      }
      this.semana.push(this.L);
      this.semana.push(this.M);
      this.semana.push(this.Mi);
      this.semana.push(this.J);
      this.semana.push(this.V);
      this.semana.push(this.S);
    }
  }




  cerrar() {
    this.modalCtrl.dismiss()
  }
  validar(i) {
    let output = true;
    if (i == null || i == undefined || i.lenght == 0 || i == []) {
      output = false;
      return output;
    }
    let input = i.toString();
    if (input == ("null") || input == ("undefined") || input == "") {
      output = false;
    }
    return output;
  }
  validarshMa(i) {
    this.shMa[i] = !this.shMa[i]
  }
  validarshDi(i, j) {
    this.shDi[i][j] = !this.shDi[i][j]
  }
}