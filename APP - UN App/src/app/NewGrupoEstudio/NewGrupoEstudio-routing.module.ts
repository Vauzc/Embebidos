import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGrupoEstudioPage } from './NewGrupoEstudio.page';

const routes: Routes = [
  {
    path: '',
    component: NewGrupoEstudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGrupoEstudioPageRoutingModule {}
