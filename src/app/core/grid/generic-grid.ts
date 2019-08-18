import { Input } from '@angular/core';
import { intersection, prop, uniqBy, find, propEq } from 'ramda';

export abstract class GenericGrid<T> {

  config: GridConfig<T>;
  getColumnConfig: (columnName: string) => EnumerableFilterColumnConfig<T>;

  public columns: string[] = [];
  public filterValueLists: FilterValueLists = {};
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

      this.filterValueLists = this.buildFilterValueLists(this.config.enumerableColumns);

      this.displayedData = [...this.data];
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
    this.getColumnConfig = getColumnConfig(this.config.enumerableColumns);
  }

  public updateFilter(columnName: keyof T, selectedValues: any | any[]): void {
    if (!selectedValues || !selectedValues.length) {
      this.filter[columnName as string] = null;
    } else {
      this.filter[columnName as string] = selectedValues;
    }
    this.filterGrid();
  }

  public filterGrid(): void {
    this.displayedData = this.data.filter(row => {
      const filterResult: boolean[] = Object.keys(this.filter).map(filteredColumnName => {
        if (!this.filter[filteredColumnName] || !this.filter[filteredColumnName].length) {
          return true;
        }
        const valueFn = this.getColumnConfig(filteredColumnName).valueFn;
        const rowColumnValue = valueFn ? valueFn(row[filteredColumnName]) : row[filteredColumnName];
        return this.compareValues(rowColumnValue, this.filter[filteredColumnName], this.getColumnConfig(filteredColumnName).comparator);
      });
      return filterResult.every(res => !!res);
    });
  }

  private compareValues(rowColumnValue: any, filterValue: any, comparator?: (filterValue: any, rowValue: any) => boolean): boolean {
    if (Array.isArray(filterValue)) {
      if (comparator) {
        return !!filterValue.find(val => comparator(val, rowColumnValue));
      } else {
        return filterValue.includes(rowColumnValue);
      }
    } else {
      if (comparator) {
        return comparator(filterValue, rowColumnValue);
      } else {
        return filterValue === rowColumnValue;
      }
    }
  }

  private buildFilterValueLists(enumerableColumns: EnumerableFilterColumnConfig<T>[]): FilterValueLists {
    const result: FilterValueLists = {};
    this.config.enumerableColumns.forEach(column => {
      if (column.filterValues) {
        result[column.name as string] = column.filterValues;
        return;
      }
      const textFn = column.textFn || column.valueFn;
      let filterValues = this.data.map(row => ({
          text: textFn ? textFn(row[column.name]) : row[column.name],
          value: column.valueFn ? column.valueFn(row[column.name]) : row[column.name]
        } as FilterValue)
      );
      filterValues = uniqBy(prop('value'), filterValues);
      result[column.name as string] = filterValues;
    });
    return result;
  }

}

const getColumnConfig =
  (columnConfigs: EnumerableFilterColumnConfig<any>[]) => (columnName: string) => find(propEq('name', columnName))(columnConfigs);

export interface GridConfig<T> {
  enumerableColumns: EnumerableFilterColumnConfig<T>[];
}

export interface EnumerableFilterColumnConfig<T> {
  name: keyof T;
  filterValues?: FilterValue[];
  valueFn?: (obj: any) => any;
  textFn?: (obj: any) => any;
  comparator?: (filterValue: any, rowValue: any) => boolean;
}

export interface FilterValue {
  text: string;
  value: any;
}

export interface FilterValueLists {
  [key: string]: FilterValue[];
}
