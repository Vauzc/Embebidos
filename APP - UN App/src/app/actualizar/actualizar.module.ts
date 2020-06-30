import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActualizarPageRoutingModule } from './actualizar-routing.module';

import { ActualizarPage } from './actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ActualizarPageRoutingModule
  ],
  declarations: [ActualizarPage]
})
export class ActualizarPageModule {}
