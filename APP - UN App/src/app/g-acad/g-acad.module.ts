import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GAcadPageRoutingModule } from './g-acad-routing.module';

import { GAcadPage } from './g-acad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GAcadPageRoutingModule
  ],
  declarations: [GAcadPage]
})
export class GAcadPageModule {}
