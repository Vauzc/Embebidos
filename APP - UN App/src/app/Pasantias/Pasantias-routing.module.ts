import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasantiasPage } from './Pasantias.page';

const routes: Routes = [
  {
    path: '',
    component: PasantiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasantiasPageRoutingModule {}
