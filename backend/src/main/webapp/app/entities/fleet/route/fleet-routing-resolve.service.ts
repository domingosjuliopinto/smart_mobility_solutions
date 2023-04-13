import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFleet } from '../fleet.model';
import { FleetService } from '../service/fleet.service';

@Injectable({ providedIn: 'root' })
export class FleetRoutingResolveService implements Resolve<IFleet | null> {
  constructor(protected service: FleetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFleet | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fleet: HttpResponse<IFleet>) => {
          if (fleet.body) {
            return of(fleet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
