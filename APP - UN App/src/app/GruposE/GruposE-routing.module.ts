import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposEPage } from './GruposE.page';

const routes: Routes = [
  {
    path: '',
    component: GruposEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposEPageRoutingModule {}
