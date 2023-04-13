import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { createRequestOption } from '../../../shared';
import { Parcel } from './parcel.model';

@Injectable({ providedIn: 'root' })
export class ParcelService {
  private resourceUrl = ApiService.API_URL + '/parcels';

  constructor(protected http: HttpClient) {}

  create(parcel: Parcel): Observable<HttpResponse<Parcel>> {
    return this.http.post<Parcel>(this.resourceUrl, parcel, { observe: 'response' });
  }

  update(parcel: Parcel): Observable<HttpResponse<Parcel>> {
    return this.http.put(`${this.resourceUrl}/${parcel.id}`, parcel, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Parcel>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Parcel[]>> {
    const options = createRequestOption(req);
    return this.http.get<Parcel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
