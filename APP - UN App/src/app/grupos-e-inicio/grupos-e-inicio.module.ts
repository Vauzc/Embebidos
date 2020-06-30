import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposEInicioPageRoutingModule } from './grupos-e-inicio-routing.module';

import { GruposEInicioPage } from './grupos-e-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposEInicioPageRoutingModule
  ],
  declarations: [GruposEInicioPage]
})
export class GruposEInicioPageModule {}
