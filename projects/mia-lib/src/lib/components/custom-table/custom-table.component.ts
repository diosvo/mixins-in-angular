import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { NgClass, NgForOf, NgIf, NgTemplateOutlet, TitleCasePipe, UpperCasePipe } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input,
  OnChanges, Output, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import { SlugifyPipe } from '@lib/pipes/slugify.pipe';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';
import { TableColumnDirective } from './custom-table-abstract.directive';

interface ColumnProperties {
  flex: string;
  header: string;
  tooltip: boolean;
  truncate: boolean;
  isExpanded: boolean;
  disableSorting: boolean;
}

export type TableColumn = { key: string } & Partial<ColumnProperties>;

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    TitleCasePipe,
    UpperCasePipe,
    NgTemplateOutlet,

    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatPaginatorModule,

    SlugifyPipe,
    HighlightDirective
  ],
  styleUrls: ['./custom-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' }
    },
  ]
})

export class CustomTableComponent<T> implements OnChanges, AfterViewInit {
  /** Definitions: data */

  @Input() @Required set data(source: T[]) {
    this.setDataSource(source);
    this.displayedColumns = this.columns.map(({ key }) => key);
    this.configDisplayColumns();
    this.configPaginator();
    this.configSorting();
  }
  @Input() trackByKey: string;
  @Input() @Required columns: TableColumn[] = [];
  @ViewChild('table', { read: ElementRef }) private tableRef: ElementRef;

  /** Styles */

  @Input() highlight: string;
  @Input() style: Record<string, unknown>;

  /** Pagination */

  @Input() showFirstLastButtons = false;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatPaginator) private set matPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[];
  @Output() pageChanges = new EventEmitter<PageEvent>();

  /** Sort */

  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: SortDirection = 'asc';
  @ViewChild(MatSort) private readonly matSort: MatSort;

  /** Checkbox */

  @Input() enableCheckbox = false;
  @Output() selectedRows = new EventEmitter<T[]>();

  /* Expansion */

  @Input() enableExpansion = false;
  @Input() rightPanel = false;
  @ContentChild('expandedDetail') expandedTemplate: TemplateRef<ElementRef>;

  /** Constants */

  readonly select = 'select';
  readonly expand = 'expand';
  readonly actions = 'actions';

  /** construct columns definitions  */

  @ContentChildren(TableColumnDirective) private columnDefs: QueryList<TableColumnDirective>;
  get columnTemplates(): Record<string, TemplateRef<ElementRef>> {
    if (!isEmpty(this.columnDefs)) {
      const columnTemplates: Record<string, TemplateRef<ElementRef>> = {};
      for (const column of this.columnDefs.toArray()) {
        columnTemplates[column.columnName] = column.columnTemplate;
      }
      return columnTemplates;
    }
    return {};
  }
  protected displayedColumns: string[]; // columns declaration + able to add/ remove columns

  protected readonly DEFAULT_PAGESIZE = 5;
  protected source = new MatTableDataSource<T>([]);
  protected selection = new SelectionModel<T>(true, []); // store selection data

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.pageSizeOptions && changes.pageSizeOptions.currentValue) {
      this.pageSize = changes.pageSizeOptions.currentValue[0];
    }
  }

  ngAfterViewInit(): void {
    this.configColumnTemplates();
  }

  private setDataSource(source: T[]): void {
    this.source = new MatTableDataSource<T>(source);
  }

  getIndex(index: number): number {
    // TODO: now pageSize returns `NaN` cus it's undefined
    return this.length
      ? index
      : this.pageIndex * (this.pageSize ?? this.DEFAULT_PAGESIZE) + index;
  }

  sortTable(sort: MatSort): void {
    this.matSort.active = this.columns.find((column: TableColumn) => isEqual(column.key, sort.active)).key;
  }

  private configSorting(): void {
    this.source.sort = this.matSort;

    if (isEmpty(this.defaultSortColumn)) {
      this.defaultSortColumn = this.displayedColumns[0];
    } else if (!this.displayedColumns.includes(this.defaultSortColumn)) {
      throw Error('The provided default key for sorting does not exist in the column declaration.');
    }
  }

  private configPaginator(): void {
    // length = calling data from API when page index changes
    this.source.paginator = isUndefined(this.length) ? this.paginator : this.matPaginator;
  }

  private configDisplayColumns(): void {
    if (this.enableCheckbox) {
      if (!this.displayedColumns.includes(this.select)) {
        this.displayedColumns.unshift(this.select);
      }
    }
    if (this.enableExpansion) {
      if (!this.displayedColumns.includes(this.expand)) {
        this.rightPanel ? this.displayedColumns.push(this.expand) : this.displayedColumns.unshift(this.expand);
      }
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
    this.isAllSelected()
      ? this.deselectAll()
      : this.source.data.forEach((row: T) => this.selection.select(row));
  }

  deselectAll(): void {
    this.selection.clear();
    this.selectedRows.emit([]);
  }

  trackByFn(_: number, item: T): T {
    // TODO: can not get trackByKey even thought we already declare it in specific component
    return this.trackByKey ? item[this.trackByKey] : item;
  }
}
