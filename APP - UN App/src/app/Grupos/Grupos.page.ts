import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { GruposEPage } from '../GruposE/GruposE.page';
import { GruposUPage } from '../GruposU/GruposU.page';

@Component({
  selector: 'app-Grupos',
  templateUrl: './Grupos.page.html',
  styleUrls: ['./Grupos.page.scss'],
})
export class GruposPage {

  constructor(private modalCtrl : ModalController) {}

  listado = [
    {
      nombre: 'Grupos Estudiantiles',
      pag:    '',
      icono:  'bicycle-outline'
    }
  ]

  listado2 = [
    {
      nombre: 'Grupos Universitarios',
      pag:    '',
      icono:  'library-outline'
    }
  ]



}