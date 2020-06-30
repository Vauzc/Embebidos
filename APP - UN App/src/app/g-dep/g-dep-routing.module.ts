import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GDepPage } from './g-dep.page';

const routes: Routes = [
  {
    path: '',
    component: GDepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GDepPageRoutingModule {}
