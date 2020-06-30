import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasPage } from './Noticias.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasPageRoutingModule {}
