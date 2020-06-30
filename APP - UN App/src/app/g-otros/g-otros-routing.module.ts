import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GOtrosPage } from './g-otros.page';

const routes: Routes = [
  {
    path: '',
    component: GOtrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GOtrosPageRoutingModule {}
