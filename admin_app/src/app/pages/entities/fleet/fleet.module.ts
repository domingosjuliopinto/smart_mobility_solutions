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

import { FleetPage } from './fleet';
import { FleetUpdatePage } from './fleet-update';
import { Fleet, FleetService, FleetDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class FleetResolve implements Resolve<Fleet> {
  constructor(private service: FleetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Fleet> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Fleet>) => response.ok),
        map((fleet: HttpResponse<Fleet>) => fleet.body)
      );
    }
    return of(new Fleet());
  }
}

const routes: Routes = [
  {
    path: '',
    component: FleetPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FleetUpdatePage,
    resolve: {
      data: FleetResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FleetDetailPage,
    resolve: {
      data: FleetResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FleetUpdatePage,
    resolve: {
      data: FleetResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [FleetPage, FleetUpdatePage, FleetDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class FleetPageModule {}
