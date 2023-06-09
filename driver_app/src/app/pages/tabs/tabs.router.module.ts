import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
          },
        ],
      },
      {
        path: 'parcel',
        children: [
          {
            path: '',
            loadChildren: () => import('../entities/parcel/parcel.module').then(m => m.ParcelPageModule),
          },
        ],
      },
      {
        path: 'fleet',
        children: [
          {
            path: '',
            loadChildren: () => import('../entities/fleet/fleet.module').then(m => m.FleetPageModule),
          },
        ],
      },
      {
        path: 'routing',
        children: [
          {
            path: '',
            loadChildren: () => import('../routing/routing.module').then(m => m.RoutingPageModule),
          },
        ],
      },
      {
        path: 'track',
        children: [
          {
            path: '',
            loadChildren: () => import('../track/track.module').then(m => m.TrackPageModule),
          },
        ],
      },
      {
        path: 'delivery',
        children: [
          {
            path: '',
            loadChildren: () => import('../entities/delivery/delivery.module').then(m => m.DeliveryPageModule),
          },
        ],
      },
      {
        path: 'driverstats',
        children: [
          {
            path: '',
            loadChildren: () => import('../driverstats/driverstats.module').then(m => m.DriverStatsPageModule),
          },
        ],
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapPageModule),
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
