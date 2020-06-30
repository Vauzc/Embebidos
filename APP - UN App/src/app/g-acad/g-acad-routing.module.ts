import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GAcadPage } from './g-acad.page';

const routes: Routes = [
  {
    path: '',
    component: GAcadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GAcadPageRoutingModule {}
