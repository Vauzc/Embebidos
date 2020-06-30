import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasantiasPageRoutingModule } from './Pasantias-routing.module';

import { PasantiasPage } from './Pasantias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasantiasPageRoutingModule
  ],
  declarations: [PasantiasPage]
})
export class PasantiasPageModule {}
