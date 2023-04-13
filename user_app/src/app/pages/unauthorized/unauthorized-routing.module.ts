import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { unauthorizedPage } from './unauthorized.page';

const routes: Routes = [
  {
    path: '',
    component: unauthorizedPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class unauthorizedPageRoutingModule {}
