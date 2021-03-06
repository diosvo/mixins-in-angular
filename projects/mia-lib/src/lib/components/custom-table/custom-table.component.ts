import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Input,
  OnChanges, OnInit, Output, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';
import { TableColumnDirective } from './custom-table-abstract.directive';

export interface TableColumn {
  key: string;
  flex?: string;
  header?: string;
  tooltip?: boolean;
  truncate?: boolean;
  disableSorting?: boolean;
}

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomTableComponent<T> implements OnChanges, OnInit, AfterViewInit {

  /** Definitions: data */

  @Input() set data(source: T[]) {
    this.setDataSource(source);
    this.source.sort = this.matSort;
    this.source.paginator = this.paginator;
  }
  @Input() trackByKey: string;
  @Input() columns: TableColumn[] = [];
  @ViewChild('table', { read: ElementRef }) private tableRef: ElementRef;

  /** Styles */

  @Input() style: Record<string, string>;

  /** Pagination */

  @Input() showFirstLastButtons = false;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatPaginator) private set matPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: Array<number>;
  @Output() pageChanges = new EventEmitter<PageEvent>();

  /** Sort */

  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';
  @ViewChild(MatSort) private readonly matSort: MatSort;

  /** Filter */

  @Input() filterable = false;

  /** Checkbox */

  readonly select = 'select';
  @Input() enableCheckbox = false;
  @Output() selectedRows = new EventEmitter();

  /** construct columns definitions  */

  @ContentChildren(TableColumnDirective) private columnDefs: QueryList<TableColumnDirective>;
  get columnTemplates(): { [key: string]: TemplateRef<any> } {
    if (!isEmpty(this.columnDefs)) {
      const columnTemplates: { [key: string]: TemplateRef<any> } = {};
      for (const column of this.columnDefs.toArray()) {
        columnTemplates[column.columnName] = column.columnTemplate;
      }
      return columnTemplates;
    }
    return {};
  }
  displayColumns: string[];

  readonly DEFAULT_PAGESIZE = 5;
  source = new MatTableDataSource<T>([]);
  selection = new SelectionModel<T>(true, []); // store selection data

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.pageSizeOptions && changes.pageSizeOptions.currentValue) {
      this.pageSize = changes.pageSizeOptions.currentValue[0];
    }
  }

  ngOnInit(): void {
    this.configDisplayColumns();
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();
    this.source.sort = this.matSort;
    this.configPaginator();
  }

  private setDataSource(source: T[]): void {
    this.source = new MatTableDataSource<T>(source);
  }

  getIndex(index: number): number {
    return this.length
      ? index
      : this.pageIndex * (this.pageSize ?? this.DEFAULT_PAGESIZE) + index;
  }

  sortTable(sort: MatSort): void {
    this.matSort.active = this.columns.find((column: TableColumn) => isEqual(column.key, sort.active)).key;
  }

  private configPaginator(): void {
    // length = calling data from API when page index changes
    this.source.paginator = isUndefined(this.length) ? this.paginator : this.matPaginator;
  }

  private configDisplayColumns(): void {
    this.displayColumns = this.columns.map(({ key }) => key);

    if (this.enableCheckbox && this.displayColumns.indexOf(this.select) < 0) {
      this.displayColumns.splice(0, 0, this.select);
      this.columns.splice(0, 0, {
        key: this.select
      });
    }
  }

  private configColumnTemplates(): void {
    for (const column of this.columnDefs.toArray()) {
      this.columnTemplates[column.columnName] = column.columnTemplate;
    }
  }

  onPageChanged(event: PageEvent): void {
    this.pageChanges.emit(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    window.requestAnimationFrame(() =>
      this.tableRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }

  /**
   * @description Checkbox
   */

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.source.data.length;
    return isEqual(numSelected, numRows);
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.source.data.forEach(row => this.selection.select(row));
  }

  trackByFn(_: number, item: T): T {
    // TODO: can not get trackByKey even thought we already declare it in specific component
    return this.trackByKey ? item[this.trackByKey] : item;
  }
}