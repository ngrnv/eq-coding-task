import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office, Shipment } from 'src/app/models/models';
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
}
