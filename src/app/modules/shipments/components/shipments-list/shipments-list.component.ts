import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericGrid } from '../../../../core/grid/generic-grid';
import { Shipment } from 'src/app/models/models';
import { prop } from 'ramda';

@Component({
  selector: 'eq-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentsListComponent extends GenericGrid<Shipment> implements OnInit {

  constructor() {
    super(
      Shipment,
      {
        enumerableColumns: [{ name: 'weight', valueFn: prop('id'), textFn: prop('desc') }]
      }
    );
  }

  ngOnInit() {
  }

}
