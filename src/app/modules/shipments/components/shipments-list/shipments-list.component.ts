import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericGrid } from '../../../../core/grid/generic-grid';
import { Shipment } from 'src/app/models/models';
import { prop, pipe, props } from 'ramda';

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
        enumerableColumns: [
          { name: 'weight', valueFn: prop('id'), textFn: prop('desc') },
          { name: 'type', valueFn: prop('id'), textFn: pipe(prop('name'), (name: string) => name.charAt(0).toUpperCase() + name.slice(1)) },
          { name: 'office', valueFn: prop('id'), textFn: pipe(props(['PLZ', 'name']), ([plz, name]) => `${plz}, ${name}`) },
          { name: 'delivered', filterValues: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }] }
        ]
      }
    );
  }

  ngOnInit() {
  }

}
