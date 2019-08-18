import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Office } from '../../../models/models';
import { GlobalLoaderService } from '../../../core/services/global-loader.service';
import { OfficesBackendService } from '../../../core/services/backend/offices-backend.service';

@Injectable()
export class OfficeResolver implements Resolve<Office> {

  constructor(private offices: OfficesBackendService, private loader: GlobalLoaderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Office> {
    this.loader.loading$.next(true);
    return this.offices.getOfficetById(route.params.id).pipe(
      tap(() => this.loader.loading$.next(false))
    );
  }


}
