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
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapPageModule),
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
        path: 'unauthorized',
        children: [
          {
            path: '',
            loadChildren: () => import('../unauthorized/unauthorized.module').then(m => m.unauthorizedPageModule),
          },
        ],
      },
      {
        path: 'sboneb',
        children: [
          {
            path: '',
            loadChildren: () => import('../sboneb/sboneb.module').then(m => m.SbonebPageModule),
          },
        ],
      },
      {
        path: 'selfnavig',
        children: [
          {
            path: '',
            loadChildren: () => import('../selfnavig/selfnavig.module').then(m => m.SelfnavigPageModule),
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
        path: 'delivery',
        children: [
          {
            path: '',
            loadChildren: () => import('../entities/delivery/delivery.module').then(m => m.DeliveryPageModule),
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
