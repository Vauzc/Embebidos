import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposUPage } from './GruposU.page';

const routes: Routes = [
  {
    path: '',
    component: GruposUPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposUPageRoutingModule {}
