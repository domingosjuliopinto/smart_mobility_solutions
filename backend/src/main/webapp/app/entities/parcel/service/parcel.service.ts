import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParcel, NewParcel } from '../parcel.model';

export type PartialUpdateParcel = Partial<IParcel> & Pick<IParcel, 'id'>;

export type EntityResponseType = HttpResponse<IParcel>;
export type EntityArrayResponseType = HttpResponse<IParcel[]>;

@Injectable({ providedIn: 'root' })
export class ParcelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parcels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(parcel: NewParcel): Observable<EntityResponseType> {
    return this.http.post<IParcel>(this.resourceUrl, parcel, { observe: 'response' });
  }

  update(parcel: IParcel): Observable<EntityResponseType> {
    return this.http.put<IParcel>(`${this.resourceUrl}/${this.getParcelIdentifier(parcel)}`, parcel, { observe: 'response' });
  }

  partialUpdate(parcel: PartialUpdateParcel): Observable<EntityResponseType> {
    return this.http.patch<IParcel>(`${this.resourceUrl}/${this.getParcelIdentifier(parcel)}`, parcel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParcel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParcel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getParcelIdentifier(parcel: Pick<IParcel, 'id'>): number {
    return parcel.id;
  }

  compareParcel(o1: Pick<IParcel, 'id'> | null, o2: Pick<IParcel, 'id'> | null): boolean {
    return o1 && o2 ? this.getParcelIdentifier(o1) === this.getParcelIdentifier(o2) : o1 === o2;
  }

  addParcelToCollectionIfMissing<Type extends Pick<IParcel, 'id'>>(
    parcelCollection: Type[],
    ...parcelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parcels: Type[] = parcelsToCheck.filter(isPresent);
    if (parcels.length > 0) {
      const parcelCollectionIdentifiers = parcelCollection.map(parcelItem => this.getParcelIdentifier(parcelItem)!);
      const parcelsToAdd = parcels.filter(parcelItem => {
        const parcelIdentifier = this.getParcelIdentifier(parcelItem);
        if (parcelCollectionIdentifiers.includes(parcelIdentifier)) {
          return false;
        }
        parcelCollectionIdentifiers.push(parcelIdentifier);
        return true;
      });
      return [...parcelsToAdd, ...parcelCollection];
    }
    return parcelCollection;
  }
}
