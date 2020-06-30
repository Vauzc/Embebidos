import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasHechasPageRoutingModule } from './ReservasHechas-routing.module';

import { ReservasHechasPage } from './ReservasHechas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasHechasPageRoutingModule
  ],
  declarations: [ReservasHechasPage]
})
export class ReservasHechasPageModule {}
