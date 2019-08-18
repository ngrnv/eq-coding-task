import { Component, OnInit } from '@angular/core';
import { GenericGrid } from '../../../../core/grid/generic-grid';
import { Office } from '../../../../models/models';

@Component({
  selector: 'eq-offices-list',
  templateUrl: './offices-list.component.html',
  styleUrls: ['./offices-list.component.scss']
})
export class OfficesListComponent extends GenericGrid<Office> implements OnInit {

  constructor() {
    super(
      Office,
      {
        enumerableColumns: [
          {
            name: 'PLZ',
            comparator: (filterValue: number, rowValue: number) => +rowValue === +filterValue
          }
        ]
      }
    );
  }

  ngOnInit() {
  }

  resetFilter() {
    this.filter.PLZ = null;
    this.filterGrid();
  }

}
