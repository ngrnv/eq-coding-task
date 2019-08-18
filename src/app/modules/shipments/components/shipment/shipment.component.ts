import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shipment, ShipmentDto } from 'src/app/models/models';
import { map, switchMap, tap } from 'rxjs/operators';
import { ShipmentsBackendService } from '../../../../core/services/backend/shipments-backend.service';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';

@Component({
  selector: 'eq-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit, OnDestroy {

  shipment$: Observable<Shipment>;

  editMode = false;
  processing = false;

  reloadShipment$ = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute,
              private shipments: ShipmentsBackendService
  ) {
    this.shipment$ = combineLatest(
      this.route.data.pipe(map(data => data.shipment)),
      this.reloadShipment$.pipe(
        tap(() => this.processing = true),
        switchMap(id => id ? this.shipments.getShipmentById(id) : of(null)),
        tap(() => this.processing = false),
      )
    ).pipe(
      map(([shipment, reloaded]) => reloaded ? reloaded : shipment)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onEdit() {
    this.editMode = true;
  }

  onResult(shipment: ShipmentDto) {
    this.processing = true;
    this.shipments.editShipment(shipment).pipe(
      tap(res => {
        this.processing = false;
        this.editMode = false;
        this.reloadShipment$.next(res.id);
      }),
    ).subscribe();
  }

  onCancel() {
    this.editMode = false;
  }

}
