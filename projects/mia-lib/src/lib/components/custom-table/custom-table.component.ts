import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, Component, ContentChildren, EventEmitter, Input,
  OnChanges, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableColumnDirective } from './custom-table-abstract.directive';

export interface TableColumn {
  key: string;
  header?: string;
  disableSorting?: boolean;
}

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})

export class CustomTableComponent<T> implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  data: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  private selection = new SelectionModel<{}>(true, []); // store selection data

  /** Definitions: data */

  @Input() dataSource!: Observable<Array<T>>;
  @Input() columns: Array<TableColumn> = [];

  /** Pagination */

  @Input() pageable: boolean = true;
  @Input() showFirstLastButtons: boolean = false;
  @Input() pageSizeOptions: Array<number> = [5, 10, 20];
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  /** Sort */

  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';
  @ViewChild(MatSort) private sort: MatSort;

  /** Filter */

  @Input() filterable: boolean = false;

  /** Checkbox */

  @Input() enableCheckbox: boolean = false;
  @Input() allowMultiSelect: boolean;

  @Output() action = new EventEmitter();
  @Output() selectedRows = new EventEmitter();

  private _destroyed$ = new Subject<boolean>();

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

  constructor() { }

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.dataSource && changes.dataSource.currentValue) {
      this.getDataSource();
    }
  }

  ngOnInit(): void {
    this.configDisplayColumns();
    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();
  }

  private getDataSource(): void {
    this.dataSource
      .pipe(takeUntil(this._destroyed$))
      .subscribe((response: Array<T>) => {
        this.data = new MatTableDataSource<T>(response);
        this.data.sort = this.sort;
        this.data.paginator = this.pageable ? this.paginator : null;
      });
  }

  private configDisplayColumns(): void {
    this.displayColumns = this.columns.map(({ key }) => key);

    if (this.enableCheckbox && this.displayColumns.indexOf('select') < 0) {
      this.displayColumns.splice(0, 0, 'select');
      this.columns.splice(0, 0, {
        key: 'select'
      });
    }
  }

  private configColumnTemplates(): void {
    for (const column of this.columnDefs.toArray()) {
      this.columnTemplates[column.columnName] = column.columnTemplate;
    }
  }

  /**
   * @description Checkbox
   */

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.data.data.forEach(row => this.selection.select(row));
    this.selectedRows.emit(this.selection.selected);
  }

  rowSelect(): void {
    this.selectedRows.emit(this.selection.selected);
  }

  trackByIdx(idx: number): number {
    return idx;
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}