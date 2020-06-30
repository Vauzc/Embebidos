import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutTheAppPageRoutingModule } from './AboutTheApp-routing.module';

import { AboutTheAppPage } from './AboutTheApp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutTheAppPageRoutingModule
  ],
  declarations: [AboutTheAppPage]
})
export class AboutTheAppPageModule {}
