import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office, Shipment, ShipmentDto } from 'src/app/models/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficesBackendService {

  constructor(private http: HttpClient) {
  }

  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(`${environment.API_HOST}/office/list`);
  }

  getOfficetById(id: string): Observable<Office> {
    return this.http.post<Office>(`${environment.API_HOST}/office/get`, { id });
  }

  getOfficetByZIP(zip: string): Observable<Office> {
    return this.http.post<Office>(`${environment.API_HOST}/office/getByZip`, { zip });
  }

  addOffice(office: Office): Observable<any> {
    return this.http.post(`${environment.API_HOST}/office/add`, office);
  }

  editOffice(office: Office): Observable<any> {
    return this.http.post(`${environment.API_HOST}/office/update`, office);
  }

  deleteOffice(id: string) {
    return this.http.post(`${environment.API_HOST}/office/delete`, { id });
  }
}
