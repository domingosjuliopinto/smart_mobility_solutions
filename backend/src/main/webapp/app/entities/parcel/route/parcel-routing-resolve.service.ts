import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParcel } from '../parcel.model';
import { ParcelService } from '../service/parcel.service';

@Injectable({ providedIn: 'root' })
export class ParcelRoutingResolveService implements Resolve<IParcel | null> {
  constructor(protected service: ParcelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParcel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((parcel: HttpResponse<IParcel>) => {
          if (parcel.body) {
            return of(parcel.body);
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
