import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, TemplateRef, ViewChild
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
  disableSorting?: boolean;
}

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})

export class CustomTableComponent<T> implements OnChanges, OnInit, AfterViewInit {

  /** Definitions: data */

  @Input() data: Array<T>;
  @Input() columns: Array<TableColumn> = [];
  @Input() style: Record<string, string>;

  /** Pagination */

  @Input() pageable = true;
  @Input() showFirstLastButtons = false;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatPaginator) private set matPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @Input() length: number;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number;
  @Input() pageSizeOptions: Array<number>;
  @Output() pageChanges = new EventEmitter<PageEvent>();

  /** Sort */

  @Input() defaultSortColumn: string = 'id';
  @Input() defaultSortDirection: SortDirection = 'asc';
  @ViewChild(MatSort) private readonly sort: MatSort;

  /** Filter */

  @Input() filterable = false;

  /** Checkbox */

  readonly select = 'select';
  @Input() enableCheckbox = false;
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

  source: MatTableDataSource<T>;
  private selection = new SelectionModel<{}>(true, []); // store selection data

  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.data && changes.data.currentValue) {
      this.source = new MatTableDataSource(changes.data.currentValue);
    };
  }

  ngOnInit(): void {
    this.configDisplayColumns();
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();

    this.source.sort = this.sort;
    this.source.paginator = this.pageable ? this.configPaginator() : null;
    this.cdr.detectChanges();

    this.selection = new SelectionModel<{}>(true, []);
  }

  private configPaginator(): MatPaginator {
    // length = calling data from API when page index changes
    return this.length === undefined ? this.paginator : this.matPaginator;
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