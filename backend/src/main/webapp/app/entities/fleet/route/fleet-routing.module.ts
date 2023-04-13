import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FleetComponent } from '../list/fleet.component';
import { FleetDetailComponent } from '../detail/fleet-detail.component';
import { FleetUpdateComponent } from '../update/fleet-update.component';
import { FleetRoutingResolveService } from './fleet-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fleetRoute: Routes = [
  {
    path: '',
    component: FleetComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FleetDetailComponent,
    resolve: {
      fleet: FleetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FleetUpdateComponent,
    resolve: {
      fleet: FleetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FleetUpdateComponent,
    resolve: {
      fleet: FleetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fleetRoute)],
  exports: [RouterModule],
})
export class FleetRoutingModule {}
