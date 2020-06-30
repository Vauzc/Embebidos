import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposEInicioPage } from './grupos-e-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: GruposEInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposEInicioPageRoutingModule {}
