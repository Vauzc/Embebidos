import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeaHechosPageRoutingModule } from './gea-hechos-routing.module';

import { GeaHechosPage } from './gea-hechos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeaHechosPageRoutingModule
  ],
  declarations: [GeaHechosPage]
})
export class GeaHechosPageModule {}
