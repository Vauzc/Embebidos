import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabReservaMesasPage } from './tabReservaMesas.page';

const routes: Routes = [
  {
    path: '',
    component: TabReservaMesasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabReservaMesasPageRoutingModule {}
