import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvocatoriasPage } from './Convocatorias.page';

const routes: Routes = [
  {
    path: '',
    component: ConvocatoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvocatoriasPageRoutingModule {}
