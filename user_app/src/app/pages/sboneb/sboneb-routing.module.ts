import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SbonebPage } from './sboneb.page';

const routes: Routes = [
  {
    path: '',
    component: SbonebPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SbonebPageRoutingModule {}
