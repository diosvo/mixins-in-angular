import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from '../../models/custom-table.interface';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnChanges, OnInit, AfterViewInit {
  selectedRowIndex = -1;

  selection = new SelectionModel<{}>(true, []); // store selection data
  dataSource: MatTableDataSource<{}>;
  displayedColumns: Array<string> = [];

  @Input() enableCheckbox: boolean;
  @Input() allowMultiSelect: boolean;

  @Input() data: Array<object> = [];
  @Input() columns: Array<Table.Column>;

  @Output() action = new EventEmitter();
  @Output() selectedRows = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    // check box column
    this.displayedColumns.push('select');

    // table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(item => item.columnDef));

    // action buttons
    this.displayedColumns.push('action');

    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @description Checkbox
   */

  private isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
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
}
