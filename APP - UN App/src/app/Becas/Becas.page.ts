import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular"

var Nom_usu: string = "Nombre";
var Ap_usu: string = "Apellido";
var Usu: string = "username";
var Avance: string = "Avance";
var PAPA: string = "PAPA";
var Carr_usu: string = "Carrera";
var Fac_usu: string = "Facultad";
var Mat_usu: string = "Materias";

@Component({
  selector: 'app-Becas',
  templateUrl: './Becas.page.html',
  styleUrls: ['./Becas.page.scss'],
})
export class BecasPage implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  listado=[
    { nombre: 'Pepito Alejo', info:   'Pérez Sanchez' },
    { nombre: 'P.A.P.A.', info:   '4.1' },
    { nombre: 'Carrera', info:   'Ing. Mecanica' },
    { nombre: 'Facultad', info:   'Ingenieria' },
    { nombre: 'Porcentaje de avance', info:   '86.4%' }
  ]
  listado2=[
    { nombre: 'Creditos aprovados', info:  ' ' },
    { nombre: 'citacion a inscripcion', info:   '' },
    { nombre: 'Horario', info:   '' },
    { nombre: 'Mis deudas', info:   '' }
  ]


  cerrar(){
    this.modalCtrl.dismiss()
  }
}
