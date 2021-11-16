import {
  ChangeDetectorRef, Component, ContentChild, Directive, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, TemplateRef, ViewChild
} from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';

@Directive({
  selector: '[dtCell]'
})

export class DataTableCellDirective {
  constructor(public template: TemplateRef<any>) { }
}

/**
 * @description column that shows simply shows text content for the header and row cells. 
 * By default, the name of this column will be assumed to be both the header
 * text and data property used to access the data value to show in cells. 
 * To override the header text, provide a label text. 
 * To override the data cell values, provide a dataAccessor function that provides the string to display for each row's cell.
 *
 * @note this component sets itself as visually hidden since it will show up in the `mat-table`
 * DOM because it is an empty element with an ng-container (nothing rendered). It should not
 * interfere with screen readers.
 */

@Component({
  selector: 'dt-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent<T> implements OnInit, OnDestroy {

  sortDirection: SortDirection = ''; // The current direction of sorting of the column

  /**
   * @description column name: used to reference this column
   */


  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = name;
    this.columnDef.name = name;
  }
  private _name: string;

  /**
   * @description label for the column header. 
   * If it's not test, the header text will default to the column name
   */

  @Input() label: string;

  /**
   * @description Accessor function to retrieve the data should provided to the cell
   * If it's not set, the data cells will assume that the column name is the same as data property the cells should display.
   */

  @Input() dataAccessor: (data: T, name: string) => string;

  /* sort */

  @Input() sortable: boolean = true;

  @Output() sortUpdate = new EventEmitter<string>();

  @ViewChild(MatColumnDef, { static: true }) columnDef: MatColumnDef;
  @ContentChild(DataTableCellDirective, { static: true, read: TemplateRef }) readonly template;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Optional() public table: MatTable<unknown>,
  ) { }

  /**
   * @description formatted version of the name if label is not present
   */

  getTitle(): string {
    return this.label || this.columnDef.name; // and titleCase
  }

  getData(data: T): unknown {
    return this.dataAccessor ? this.dataAccessor(data, this.name) : data[this.name];
  }

  /**
   * @description trigger a sort action on this column by emitting a sort update action to the parent table
   */

  sort(): void {
    this.sortUpdate.emit(this.name);
  }

  ngOnInit(): void {
    if (this.table) {
      this.cdr.detectChanges();
      this.table.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.removeColumnDef(this.columnDef);
    }
  }
}
