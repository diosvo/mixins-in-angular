import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input,
  OnChanges, OnInit, Output, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgChanges } from '@lib/helpers/mark-function-properties';
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

  @Input() data: Array<T>;
  @Input() columns: Array<TableColumn> = [];

  /** Styles */

  @Input() style: Record<string, string>;

  /** Pagination */

  @Input() showFirstLastButtons: boolean = false;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatPaginator) private set matPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: Array<number>;
  @Output() pageChanges = new EventEmitter<PageEvent>();

  /** Sort */

  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';
  @ViewChild(MatSort) private readonly sort: MatSort;

  /** Filter */

  @Input() filterable: boolean = false;

  /** Checkbox */

  readonly select = 'select';
  @Input() enableCheckbox: boolean = false;
  @Output() selectedRows = new EventEmitter();

  /** construct columns definitions  */

  @ContentChildren(TableColumnDirective) private columnDefs: QueryList<TableColumnDirective>;
  get columnTemplates(): { [key: string]: TemplateRef<any> } {
    if (this.columnDefs !== null) {
      const columnTemplates: { [key: string]: TemplateRef<any> } = {};
      for (const column of this.columnDefs.toArray()) {
        columnTemplates[column.columnName] = column.columnTemplate;
      }
      return columnTemplates;
    }
    return {};
  }
  displayColumns: Array<string>;

  readonly DEFAULT_PAGESIZE = 5;
  source: MatTableDataSource<T>;
  private selection = new SelectionModel<{}>(true, []); // store selection data

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.data.currentValue && !changes.data.firstChange) {
      this.source.data = changes.data.currentValue;
      this.source.sort = this.sort;
      this.configPaginator();
    };

    if (changes.pageSizeOptions && changes.pageSizeOptions.currentValue) {
      this.pageSize = changes.pageSizeOptions.currentValue[0];
    }
  }

  ngOnInit(): void {
    this.configDisplayColumns();
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();

    this.source = new MatTableDataSource(this.data);
    this.source.sort = this.sort;
    this.configPaginator();

    this.selection = new SelectionModel<{}>(true, []);
  }

  getIndex(index: number): number {
    return this.length
      ? index
      : this.pageIndex * (this.pageSize ?? this.DEFAULT_PAGESIZE) + index;
  }

  private configPaginator(): void {
    // length = calling data from API when page index changes
    this.source.paginator = this.length === undefined ? this.paginator : this.matPaginator;
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
  }

  /**
   * @description Checkbox
   */

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.source.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.source.data.forEach(row => this.selection.select(row));
  }

  trackByIdx(idx: number): number {
    return idx;
  }
}