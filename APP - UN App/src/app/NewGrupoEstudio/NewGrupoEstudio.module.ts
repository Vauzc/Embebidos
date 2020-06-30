import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGrupoEstudioPageRoutingModule } from './NewGrupoEstudio-routing.module';

import { NewGrupoEstudioPage } from './NewGrupoEstudio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGrupoEstudioPageRoutingModule
  ],
  declarations: [NewGrupoEstudioPage]
})
export class NewGrupoEstudioPageModule {}
