import { Component, Input } from '@angular/core';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { User } from '@lib/services/users/user-service.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lookup-users-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {

  @Input() users: Observable<Array<User>>;

  columns: Array<TableColumn> = [
    {
      key: 'name'
    },
    {
      key: 'username'
    }
  ];

  constructor() { }

}
