import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { createRequestOption } from '../../../shared';
import { Delivery } from './delivery.model';

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private resourceUrl = ApiService.API_URL + '/deliveries';

  constructor(protected http: HttpClient) {}

  create(delivery: Delivery): Observable<HttpResponse<Delivery>> {
    return this.http.post<Delivery>(this.resourceUrl, delivery, { observe: 'response' });
  }

  update(delivery: Delivery): Observable<HttpResponse<Delivery>> {
    return this.http.put(`${this.resourceUrl}/${delivery.id}`, delivery, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Delivery>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Delivery[]>> {
    const options = createRequestOption(req);
    return this.http.get<Delivery[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
