import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboralPageRoutingModule } from './Laboral-routing.module';

import { LaboralPage } from './Laboral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboralPageRoutingModule
  ],
  declarations: [LaboralPage]
})
export class LaboralPageModule {}
