import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestriasPageRoutingModule } from './Maestrias-routing.module';

import { MaestriasPage } from './Maestrias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestriasPageRoutingModule
  ],
  declarations: [MaestriasPage]
})
export class MaestriasPageModule {}
