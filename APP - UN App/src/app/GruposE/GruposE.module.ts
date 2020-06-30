import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GruposEPageRoutingModule } from './GruposE-routing.module';
import { GruposEPage } from './GruposE.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposEPageRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [GruposEPage]
})
export class GruposEPageModule {}
