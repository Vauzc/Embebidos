import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GOtrosPageRoutingModule } from './g-otros-routing.module';

import { GOtrosPage } from './g-otros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GOtrosPageRoutingModule
  ],
  declarations: [GOtrosPage]
})
export class GOtrosPageModule {}
