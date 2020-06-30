import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { IngresoPageRoutingModule } from './ingreso-routing.module';

import { IngresoPage } from './ingreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IngresoPageRoutingModule
  ],
  declarations: [IngresoPage]
})
export class IngresoPageModule {}
