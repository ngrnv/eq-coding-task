import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Shipment } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsBackendService {

  constructor(private http: HttpClient) { }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${environment.API_HOST}/shipment/list`);
  }
}
