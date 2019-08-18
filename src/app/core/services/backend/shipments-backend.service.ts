import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Shipment, ShipmentDto } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsBackendService {

  constructor(private http: HttpClient) {
  }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${environment.API_HOST}/shipment/list`);
  }

  getShipmentById(id: string): Observable<Shipment> {
    // return this.http.request<Shipment>('GET', `${environment.API_HOST}/shipment/get`, { body: { id } });

    return this.http.post<Shipment>(`${environment.API_HOST}/shipment/get`, { id });  // but why POST?
  }

  addShipment(shipment: ShipmentDto): Observable<any> {
    return this.http.post(`${environment.API_HOST}/shipment/add`, shipment);
  }

  editShipment(shipment: ShipmentDto): Observable<any> {
    return this.http.post(`${environment.API_HOST}/shipment/update`, shipment); // why POST?
  }

}
