/* eslint-disable no-unused-expressions */
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
  columnNames: Array<string> = [];

  selection = new SelectionModel<{}>(); // store selection data
  dataSource: MatTableDataSource<{}>;

  @Input() enableCheckbox: boolean;
  @Input() allowMultiSelect: boolean;

  @Input() data: Array<object>;
  @Input() columnDefinition: Array<Table.Column>;
  @Input() paginationConfig: Table.Pagination;

  @Output() selectedRows = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

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


  ngOnInit(): void {
    for (const column of this.columnDefinition) {
      this.columnNames.push(column.name);
    }

    if (this.enableCheckbox) {
      this.columnNames.splice(0, 0, 'select');
      this.columnDefinition.splice(0, 0, {
        'name': 'select',
        'displayName': '#'
      });
    }

    this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClick(row: { position: number }): void {
    this.selectedRowIndex = row.position;
  }
}
