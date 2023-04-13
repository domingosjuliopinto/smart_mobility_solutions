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

import { DeliveryPage } from './delivery';
import { DeliveryUpdatePage } from './delivery-update';
import { Delivery, DeliveryService, DeliveryDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class DeliveryResolve implements Resolve<Delivery> {
  constructor(private service: DeliveryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Delivery> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Delivery>) => response.ok),
        map((delivery: HttpResponse<Delivery>) => delivery.body)
      );
    }
    return of(new Delivery());
  }
}

const routes: Routes = [
  {
    path: '',
    component: DeliveryPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryUpdatePage,
    resolve: {
      data: DeliveryResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryDetailPage,
    resolve: {
      data: DeliveryResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryUpdatePage,
    resolve: {
      data: DeliveryResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [DeliveryPage, DeliveryUpdatePage, DeliveryDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class DeliveryPageModule {}
