import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutTheAppPage } from './AboutTheApp.page';

const routes: Routes = [
  {
    path: '',
    component: AboutTheAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutTheAppPageRoutingModule {}
