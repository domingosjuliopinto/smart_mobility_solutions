import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { createRequestOption } from '../../../shared';
import { Fleet } from './fleet.model';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private resourceUrl = ApiService.API_URL + '/fleets';

  constructor(protected http: HttpClient) {}

  create(fleet: Fleet): Observable<HttpResponse<Fleet>> {
    return this.http.post<Fleet>(this.resourceUrl, fleet, { observe: 'response' });
  }

  update(fleet: Fleet): Observable<HttpResponse<Fleet>> {
    return this.http.put(`${this.resourceUrl}/${fleet.id}`, fleet, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Fleet>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Fleet[]>> {
    const options = createRequestOption(req);
    return this.http.get<Fleet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
