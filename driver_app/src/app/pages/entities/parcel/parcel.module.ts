import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { ParcelPage } from './parcel';
import { ParcelUpdatePage } from './parcel-update';
import { Parcel, ParcelService, ParcelDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ParcelResolve implements Resolve<Parcel> {
  constructor(private service: ParcelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Parcel> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Parcel>) => response.ok),
        map((parcel: HttpResponse<Parcel>) => parcel.body)
      );
    }
    return of(new Parcel());
  }
}

const routes: Routes = [
  {
    path: '',
    component: ParcelPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParcelUpdatePage,
    resolve: {
      data: ParcelResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParcelDetailPage,
    resolve: {
      data: ParcelResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParcelUpdatePage,
    resolve: {
      data: ParcelResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [ParcelPage, ParcelUpdatePage, ParcelDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class ParcelPageModule {}
