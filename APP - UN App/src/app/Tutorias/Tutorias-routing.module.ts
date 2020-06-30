import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutoriasPage } from './Tutorias.page';

const routes: Routes = [
  {
    path: '',
    component: TutoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutoriasPageRoutingModule {}
