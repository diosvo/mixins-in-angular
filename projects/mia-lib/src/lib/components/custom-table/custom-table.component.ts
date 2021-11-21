import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input,
  OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CustomTableAbstractDirective } from './custom-table-abstract.directive';


@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CustomTableComponent<T> extends CustomTableAbstractDirective<T> implements OnInit, AfterViewInit, OnDestroy {

  data: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  private selection = new SelectionModel<{}>(true, []); // store selection data

  /** Definitions: columns and data */

  @Input() tableName: string;
  @Input() dataSource!: Observable<Array<T>>;

  /** Pagination */

  @Input() pageable: boolean = true;
  @Input() showFirstLastButtons: boolean = false;
  @Input() pageSizeOptions: Array<number> = [5, 10, 20];
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  /** Sort */

  sort: MatSort = new MatSort();

  @Input() sortable: boolean = true;
  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';

  /** Filter */

  @Input() filterable: boolean = false;

  /** Checkbox */

  @Input() enableCheckbox: boolean = false;
  @Input() allowMultiSelect: boolean;

  @Output() action = new EventEmitter();
  @Output() selectedRows = new EventEmitter();

  private destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {
    super([]);
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
  }

  ngAfterViewInit(): void {
    this.dataSource
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: Array<T>) => {
        this.data = new MatTableDataSource<T>(response);
        this.data.paginator = this.pageable ? this.paginator : null;
      });

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

  trackByIdx(idx: number): number {
    return idx;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}