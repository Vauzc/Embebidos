import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposPageRoutingModule } from './Grupos-routing.module';

import { GruposPage } from './Grupos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposPageRoutingModule
  ],
  declarations: [GruposPage]
})
export class GruposPageModule {}
