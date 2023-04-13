import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ParcelComponent } from '../list/parcel.component';
import { ParcelDetailComponent } from '../detail/parcel-detail.component';
import { ParcelUpdateComponent } from '../update/parcel-update.component';
import { ParcelRoutingResolveService } from './parcel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const parcelRoute: Routes = [
  {
    path: '',
    component: ParcelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParcelDetailComponent,
    resolve: {
      parcel: ParcelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParcelUpdateComponent,
    resolve: {
      parcel: ParcelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParcelUpdateComponent,
    resolve: {
      parcel: ParcelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(parcelRoute)],
  exports: [RouterModule],
})
export class ParcelRoutingModule {}
