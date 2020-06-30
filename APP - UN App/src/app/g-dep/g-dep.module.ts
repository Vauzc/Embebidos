import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GDepPageRoutingModule } from './g-dep-routing.module';

import { GDepPage } from './g-dep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GDepPageRoutingModule
  ],
  declarations: [GDepPage]
})
export class GDepPageModule {}
