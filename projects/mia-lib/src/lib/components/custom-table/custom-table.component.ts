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

  source: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  private selection = new SelectionModel<{}>(true, []); // store selection data

  /** Definitions: data */

  @Input() data!: Observable<Array<T>>;
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

  readonly select = 'select';
  @Input() enableCheckbox: boolean = false;
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
    if (changes.data && changes.data.currentValue) {
      this.getData();
    }
  }

  ngOnInit(): void {
    this.configDisplayColumns();
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();
  }

  private getData(): void {
    this.data
      .pipe(takeUntil(this._destroyed$))
      .subscribe((response: Array<T>) => {
        this.source = new MatTableDataSource<T>(response);
        this.source.sort = this.sort;
        this.source.paginator = this.pageable ? this.paginator : null;
      });

    this.selection = new SelectionModel<{}>(true, []);
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

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}