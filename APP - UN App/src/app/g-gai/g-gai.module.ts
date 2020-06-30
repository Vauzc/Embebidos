import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GGaiPageRoutingModule } from './g-gai-routing.module';

import { GGaiPage } from './g-gai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GGaiPageRoutingModule
  ],
  declarations: [GGaiPage]
})
export class GGaiPageModule {}
