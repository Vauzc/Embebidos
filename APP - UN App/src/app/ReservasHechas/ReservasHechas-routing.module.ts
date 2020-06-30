import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservasHechasPage } from './ReservasHechas.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasHechasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasHechasPageRoutingModule {}
