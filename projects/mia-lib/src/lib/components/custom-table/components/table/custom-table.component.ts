import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input,
  OnDestroy, OnInit, Output, QueryList, ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, SortDirection } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent<T> implements OnInit, AfterViewInit, OnDestroy {
  selectedRowIndex = -1;

  displayedColumns: Array<string> = [];
  data: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  private selection = new SelectionModel<{}>(true, []); // store selection data

  /** Definitions: columns and data */

  @Input() columns: Array<string>;
  @Input() dataSource: Observable<Array<T>>;

  /** Pagination */

  @Input() pagination: boolean = true;
  @Input() pageSizeOptions: Array<number> = [5, 10, 20];
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  /** Sort */

  sort: MatSort = new MatSort();

  @Input() sortable: boolean = true;
  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';

  /** Filter */

  @Input() filterable: boolean = true;

  /** Checkbox */

  @Input() enableCheckbox: boolean = false;
  @Input() allowMultiSelect: boolean;

  @Output() action = new EventEmitter();
  @Output() selectedRows = new EventEmitter();

  /** Column definitions added via dt-column.component */

  @ContentChildren(ColumnComponent) private dtColumns: QueryList<ColumnComponent<T>>;

  /** References to the table in this template */

  @ViewChild(MatTable) private table: MatTable<T>;

  private destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.displayedColumns.push('select');
    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
  }

  ngAfterViewInit(): void {
    this.columns = this.columns || this.dtColumns.map(({ name }) => name);

    this.dataSource
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Array<T>) => {
        this.data = new MatTableDataSource<T>(response);
        this.data.sort = this.sort;
        this.data.paginator = this.pagination ? this.paginator : null;

        // If there's sorting, default sort must also be set for table interactions to work
        if (this.sortable) {
          const sortableColumns = this.dtColumns
            .filter(({ sortable, name }) => sortable && this.columns.includes(name))
            .map(({ name }) => name);

          // Only implement sorting if there are sortable columns 
          if (sortableColumns.length > 0) {
            this.data.sort = this.sort;
            this.sort.sort(<MatSortable>{
              id: this.defaultSortColumn && sortableColumns.includes(this.defaultSortColumn) ? this.defaultSortColumn : sortableColumns[0],
              start: this.defaultSortDirection
            });
          }
        }
      });

    /** dt-column.component to the table */

    this.dtColumns.forEach(({ name, columnDef, sortable, sortUpdate }) => {
      this.table.addColumnDef(columnDef);

      console.log(columnDef);
      

      /** Sort header for each sortable column */

      if (sortable) {
        this.sort.register(<MatSortable>{
          id: name,
          start: this.defaultSortDirection
        });

        sortUpdate
          .pipe(takeUntil(this.destroy$))
          .subscribe((column: string) =>
            this.sort.sort(<MatSortable>{
              id: column,
              start: this.defaultSortDirection
            })
          );
      }
    });

    /** Update sort direction information back to the column for display update, when sorting event occurs */

    this.sort.sortChange.subscribe(({ active, direction }) =>
      this.dtColumns.find(({ name }) => name === active).sortDirection = direction
    );

    this.cdr.detectChanges();
  }

  /**
   * @description Checkbox
   */

  private isAllSelected(): boolean {
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

  onClick(row: { position: number }): void {
    this.selectedRowIndex = row.position;
  }

  trackByIdx(idx: number): number {
    return idx;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
