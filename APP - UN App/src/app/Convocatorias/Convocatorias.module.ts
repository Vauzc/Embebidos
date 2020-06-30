import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvocatoriasPageRoutingModule } from './Convocatorias-routing.module';

import { ConvocatoriasPage } from './Convocatorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvocatoriasPageRoutingModule
  ],
  declarations: [ConvocatoriasPage]
})
export class ConvocatoriasPageModule {}
