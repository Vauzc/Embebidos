import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestriasPage } from './Maestrias.page';

const routes: Routes = [
  {
    path: '',
    component: MaestriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestriasPageRoutingModule {}
