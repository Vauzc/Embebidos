import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeaHechosPage } from './gea-hechos.page';

const routes: Routes = [
  {
    path: '',
    component: GeaHechosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeaHechosPageRoutingModule {}
