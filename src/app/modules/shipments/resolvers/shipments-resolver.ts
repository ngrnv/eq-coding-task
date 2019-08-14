import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShipmentsBackendService } from '../services/shipments-backend.service';
import { Shipment } from '../../../models/models';
import { GlobalLoaderService } from '../../../core/services/global-loader.service';

@Injectable()
export class ShipmentsResolver implements Resolve<Shipment[]> {

  constructor(private shipments: ShipmentsBackendService, private loader: GlobalLoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Shipment[]> {
    this.loader.loading$.next(true);
    return this.shipments.getAllShipments().pipe(
      tap(() => this.loader.loading$.next(false))
    );
  }


}
