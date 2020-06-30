import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabReservaMesasPage } from './tabReservaMesas.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabReservaMesasPageRoutingModule } from './tabReservaMesas-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabReservaMesasPage }]),
    TabReservaMesasPageRoutingModule,
  ],
  declarations: [TabReservaMesasPage]
})
export class TabReservaMesasPageModule {}
