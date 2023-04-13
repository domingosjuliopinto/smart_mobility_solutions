import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'parcel',
        data: { pageTitle: 'smsbackendApp.parcel.home.title' },
        loadChildren: () => import('./parcel/parcel.module').then(m => m.ParcelModule),
      },
      {
        path: 'fleet',
        data: { pageTitle: 'smsbackendApp.fleet.home.title' },
        loadChildren: () => import('./fleet/fleet.module').then(m => m.FleetModule),
      },
      {
        path: 'delivery',
        data: { pageTitle: 'smsbackendApp.delivery.home.title' },
        loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
