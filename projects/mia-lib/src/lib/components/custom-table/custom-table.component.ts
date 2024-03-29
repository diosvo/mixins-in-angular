import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet, TitleCasePipe, UpperCasePipe } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input,
  OnChanges, Output, QueryList, TemplateRef, ViewChild
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatHeaderRow, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import { SlugifyPipe } from '@lib/pipes/slugify.pipe';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';
import { distinctUntilChanged, fromEvent, map, Observable } from 'rxjs';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { TableColumnDirective } from './custom-table-abstract.directive';

interface ColumnProperties {
  flex: string;
  header: string;
  expandable: boolean;
  tooltip: boolean;
  truncate: boolean;
  sortable: boolean;
  visible: boolean;
}

export type TableColumn = { key: string } & Partial<ColumnProperties>;

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  standalone: true,
  imports: [
    /* @angular */
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe,
    TitleCasePipe,
    UpperCasePipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
    /* @material */
    MatSortModule,
    MatMenuModule,
    DragDropModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    /* @lib */
    SlugifyPipe,
    HighlightDirective,
    CustomButtonComponent,
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
})

export class CustomTableComponent<T> implements OnChanges, AfterViewInit {

  /** Definitions: data */

  @Input() @Required set data(source: T[]) {
    this.setDataSource(source);

    if (source.length > 0) {
      this.configDisplayColumns();
      this.configPaginator();
      this.configSorting();
    }
  }
  @Input() trackByKey: string;
  @Input() enableReorderColumns = false;
  @Input() @Required columns: TableColumn[] = [];

  /** Styles */

  @Input() highlight: string;
  @Input() style: Record<string, unknown>;

  /** Header */

  protected fixedHeader$: Observable<boolean>;
  @ViewChild(MatHeaderRow, { read: ElementRef }) private readonly headerRef: ElementRef;

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
  @ContentChild('expandedDetail') protected readonly expandedTemplate: TemplateRef<ElementRef>;

  /** Constants */

  protected form: FormGroup;
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

  @ContentChild('actions') protected readonly actionsTemplate: TemplateRef<ElementRef>;
  protected displayedColumns: string[]; // columns declaration + able to add/ remove columns

  protected readonly DEFAULT_PAGESIZE = 10;
  protected source = new MatTableDataSource<T>([]);
  protected selection = new SelectionModel<T>(true, []); // store selection data

  ngOnChanges(changes: NgChanges<CustomTableComponent<T>>): void {
    if (changes.pageSizeOptions && changes.pageSizeOptions.currentValue) {
      this.pageSize = changes.pageSizeOptions.currentValue[0];
    }
    // TODO: if there does not cache in/visible columns in local storage => get al columns by injected data
    if (changes.columns && changes.columns.firstChange) {
      this.displayedColumns = changes.columns.currentValue.map(({ key }) => key).concat(this.actions);
      this.columnsToDisplay(this.displayedColumns);
    }
  }

  ngAfterViewInit(): void {
    this.fixedHeader$ = this.isFixed$();
    this.configColumnTemplates();
  }

  /**
   * @description Configurations
   */

  private setDataSource(source: T[]): void {
    this.source = new MatTableDataSource<T>(source);
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
        this.displayedColumns.unshift(this.expand);
      }
    }
  }

  private configColumnTemplates(): void {
    for (const column of this.columnDefs.toArray()) {
      this.columnTemplates[column.columnName] = column.columnTemplate;
    }
  }

  private columnsToDisplay(columns: string[]): void {
    const controls = columns.reduce((accumulator, name, index) => {
      const disabled = index < 1 || isEqual(name, this.actions);
      // do not change the position of the first and last column
      accumulator[name] = new FormControl({ value: true, disabled }, { nonNullable: true });
      return accumulator;
    }, {});
    this.form = new FormGroup(controls);
    this.modifyColumns();
  }

  onPageChanged(event: PageEvent): void {
    this.pageChanges.emit(event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  /**
   * @returns Checkbox (first place at the table)
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

  /**
   * @returns Columns configuration
   */

  modifyColumns(): void {
    this.columns.forEach((column: TableColumn) => column.visible = this.form.getRawValue()[column.key]);
  }

  showAllColumns(all: boolean): void {
    Object.keys(this.form.value).forEach((key: string) => this.form.patchValue({ [key]: all }));
  }

  changeColumnPosition(event: CdkDragDrop<T>): void {
    // update position in dropdown selection
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

    // update view 
    let fromIndex = event.previousIndex;
    let toIndex = event.currentIndex;

    if (this.displayedColumns.includes(this.expand)) {
      fromIndex++;
      toIndex++;
    }
    if (this.displayedColumns.includes(this.select)) {
      fromIndex++;
      toIndex++;
    }

    const element = this.displayedColumns.splice(fromIndex, 1)[0];
    this.displayedColumns.splice(toIndex, 0, element);
  }

  /**
   * @description Utils
   */

  private isFixed$(): Observable<boolean> {
    return fromEvent(window, 'scroll').pipe(
      map(() => window.scrollY > this.headerRef.nativeElement.offsetTop),
      distinctUntilChanged()
    );
  }
}
