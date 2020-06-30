import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GGaiPage } from './g-gai.page';

const routes: Routes = [
  {
    path: '',
    component: GGaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GGaiPageRoutingModule {}
