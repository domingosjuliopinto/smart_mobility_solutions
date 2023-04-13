import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFleet, NewFleet } from '../fleet.model';

export type PartialUpdateFleet = Partial<IFleet> & Pick<IFleet, 'id'>;

export type EntityResponseType = HttpResponse<IFleet>;
export type EntityArrayResponseType = HttpResponse<IFleet[]>;

@Injectable({ providedIn: 'root' })
export class FleetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fleets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fleet: NewFleet): Observable<EntityResponseType> {
    return this.http.post<IFleet>(this.resourceUrl, fleet, { observe: 'response' });
  }

  update(fleet: IFleet): Observable<EntityResponseType> {
    return this.http.put<IFleet>(`${this.resourceUrl}/${this.getFleetIdentifier(fleet)}`, fleet, { observe: 'response' });
  }

  partialUpdate(fleet: PartialUpdateFleet): Observable<EntityResponseType> {
    return this.http.patch<IFleet>(`${this.resourceUrl}/${this.getFleetIdentifier(fleet)}`, fleet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFleet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFleet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFleetIdentifier(fleet: Pick<IFleet, 'id'>): number {
    return fleet.id;
  }

  compareFleet(o1: Pick<IFleet, 'id'> | null, o2: Pick<IFleet, 'id'> | null): boolean {
    return o1 && o2 ? this.getFleetIdentifier(o1) === this.getFleetIdentifier(o2) : o1 === o2;
  }

  addFleetToCollectionIfMissing<Type extends Pick<IFleet, 'id'>>(
    fleetCollection: Type[],
    ...fleetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fleets: Type[] = fleetsToCheck.filter(isPresent);
    if (fleets.length > 0) {
      const fleetCollectionIdentifiers = fleetCollection.map(fleetItem => this.getFleetIdentifier(fleetItem)!);
      const fleetsToAdd = fleets.filter(fleetItem => {
        const fleetIdentifier = this.getFleetIdentifier(fleetItem);
        if (fleetCollectionIdentifiers.includes(fleetIdentifier)) {
          return false;
        }
        fleetCollectionIdentifiers.push(fleetIdentifier);
        return true;
      });
      return [...fleetsToAdd, ...fleetCollection];
    }
    return fleetCollection;
  }
}
