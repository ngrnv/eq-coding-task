import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShipmentsBackendService } from '../services/shipments-backend.service';
import { Shipment } from '../../../models/models';

@Injectable()
export class ShipmentsResolver implements Resolve<Shipment[]> {

  constructor(private shipments: ShipmentsBackendService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Shipment[]> {
    return this.shipments.getAllShipments();
  }


}
