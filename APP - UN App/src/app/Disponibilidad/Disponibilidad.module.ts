import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponibilidadPageRoutingModule } from './Disponibilidad-routing.module';

import { DisponibilidadPage } from './Disponibilidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponibilidadPageRoutingModule
  ],
  declarations: [DisponibilidadPage]
})
export class DisponibilidadPageModule {}
