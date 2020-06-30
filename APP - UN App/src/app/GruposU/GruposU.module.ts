import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { GruposUPageRoutingModule } from './GruposU-routing.module';
import { GruposUPage } from './GruposU.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposUPageRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [GruposUPage]
})
export class GruposUPageModule {}
