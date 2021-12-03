import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { IUser } from '@lib/models/user';
import { UsersService } from '@lib/services/users/users.service';
import { catchError, Observable, Subject, throwError } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  users$: Observable<Array<User>>;
  errorMessage$ = new Subject<string>();

  columns: Array<TableColumn> = [
    { key: 'id' },
    { key: 'name' },
    { key: 'email' },
    { key: 'actions', disableSorting: true },
  ];

  constructor(private readonly userService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.userService.all().pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      }),
    );
  }
}
