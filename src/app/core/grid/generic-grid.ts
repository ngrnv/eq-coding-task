import { Input } from '@angular/core';
import { intersection, prop, uniqBy } from 'ramda';

export abstract class GenericGrid<T> {

  config: GridConfig<T>;

  public columns: string[] = [];
  public filterValueLists: { [key: string]: FilterValue[] } = {};
  public filter: { [key: string]: any } = {};
  public sort: { [key: string]: any } = {};

  _data: T[] = [];
  @Input() set data(dataArray: T[]) {
    this._data = dataArray;
    if (this.config && this.config.enumerableColumns) {

      // validate enumerable columns
      const enumerableColumns = this.config.enumerableColumns;
      if (intersection(this.columns, enumerableColumns.map(column => column.name as string)).length !== enumerableColumns.length) {
        console.error('Incorrect enumerableColumns in config; [props, enumerableColumns]', this.columns, enumerableColumns);
        throw Error('Incorrect enumerableColumns in config');
      }
      this.config.enumerableColumns.forEach(column => {
        const textFn = column.textFn || column.valueFn;
        let filterValues = this.data.map(row => ({
            text: textFn ? textFn(row[column.name]) : row[column.name],
            value: column.valueFn ? column.valueFn(row[column.name]) : row[column.name]
          } as FilterValue)
        );
        filterValues = uniqBy(prop('value'), filterValues);
        this.filterValueLists[column.name as string] = filterValues;
      });

      this.displayedData = [...this.data];

      console.log('filterValueLists', this.filterValueLists);
    }
  }

  get data(): T[] {
    return this._data;
  }

  displayedData: T[];

  constructor(dataType: new () => T, config: GridConfig<T>) {
    this.columns = Object.getOwnPropertyNames(new dataType());
    this.columns.map(columnName => {
      this.sort[columnName] = null;
      this.filter[columnName] = null;
    });
    this.config = config;
  }

  public filterGrid(columnName: keyof T, selectedValues: any | any[]) {
    console.log('filterGrid', selectedValues);
    if (!selectedValues || selectedValues.length === 0) {
      this.filter[columnName as string] = null;
    } else {
      this.filter[columnName as string] = selectedValues;
    }
    this.displayedData = this.data.filter(row => {
      const filterResult: boolean[] = Object.keys(this.filter).map(filteredColumnName => {
        if (!this.filter[filteredColumnName] || this.filter[filteredColumnName].length === 0) {
          return true;
        }
        const valueFn = this.config.enumerableColumns.find(column => column.name === filteredColumnName).valueFn;
        const value = valueFn ? valueFn(row[filteredColumnName]) : row[filteredColumnName];
        return this.filter[filteredColumnName].includes(value);
      });
      return filterResult.every(res => !!res);
    });
    console.log('filter', this.filter);
  }

}

export interface GridConfig<T> {
  enumerableColumns: { name: keyof T, valueFn?: (obj: any) => any, textFn?: (obj: any) => any }[];
}

export interface FilterValue {
  text: string;
  value: any;
}
